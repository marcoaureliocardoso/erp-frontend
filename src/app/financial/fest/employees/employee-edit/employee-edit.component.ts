import { NgClass, formatDate } from '@angular/common';
import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Education, EducationFromString, EducationLabels } from '../../../../shared/education';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [RouterModule, FormsModule, NgClass],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-Br' }],
})
export class EmployeeEditComponent implements OnInit {
  @ViewChild('frm') public employeeForm!: NgForm;

  public editMode: boolean = false;
  public employee: Employee | null = null;

  public educationOptions: string[] = Object.keys(Education).filter((key) => isNaN(Number(key)));
  public educationOptionsLabels = EducationLabels;
  public stringToEducation = EducationFromString;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.params['id']);
    // console.log(this.educationOptions);

    // for (const edu of this.enumKeys(Education)) {
    //   const value = Education[edu];

    //   if (typeof value === 'string') {
    //     //console.log(`Value: ${Education[edu]}`);
    //     console.log(`Value: ${value}`);
    //     console.log(`Label: ${EducationLabels[value]}`);
    //   }
    // }
    // console.log(this.educationOptionsLabels);
    // console.log(this.educationOptionsLabels[Education.ADULT_EDUCATION]);

    if (id) {
      this.employeeService.getEmployee(id).subscribe((data) => {
        if (!data) {
          this.employee = null;
          return;
        }
        this.editMode = true;
        this.employee = data;

        setTimeout(() => {
          this.employeeForm.setValue({
            givenName: this.employee!.givenName,
            surname: this.employee!.surname,
            identityNumber: this.employee!.identityNumber,
            birthDate: formatDate(this.employee!.birthDate, 'yyyy-MM-dd', 'pt-Br', 'UTC-3'),
            education: this.employee!.education,
            address: this.employee!.address,
            email: this.employee!.email,
          });
        }, 0);
      });
    } else {
      this.employee = <Employee>{ id: 0, givenName: '', surname: '', identityNumber: '', birthDate: new Date(), education: Education.UNSPECIFIED, address: '', email: '' };
    }
  }

  public submit(form: NgForm) {
    let newEmployee: Employee;

    const dateRegex: RegExp = /(\d{4})-(\d{2})-(\d{2})/;
    const birthDateMatches = dateRegex.exec(form.value.birthDate);

    const birthDate = new Date(Number(birthDateMatches![1]), Number(birthDateMatches![2]) - 1, Number(birthDateMatches![3]), 5, 0, 0, 0);

    if (this.editMode) {
      newEmployee = <Employee>{ id: this.employee!.id, givenName: form.value.givenName, surname: form.value.surname, identityNumber: form.value.identityNumber, birthDate: birthDate, education: form.value.education, address: form.value.address, email: form.value.email };
      this.employeeService.update(newEmployee).subscribe((data) => {
        this.employee = data;
      });
      this.router.navigate(['../..'], { relativeTo: this.route });
    } else {
      newEmployee = <Employee>{
        id: 0,
        givenName: form.value.givenName,
        surname: form.value.surname,
        identityNumber: form.value.identityNumber,
        birthDate: birthDate,
        education: form.value.education,
        address: form.value.address,
        email: form.value.email,
      };
      this.employeeService.create(newEmployee).subscribe((data) => {
        this.employee = data;
      });
      this.router.navigate(['..'], { relativeTo: this.route });
    }
  }

  // private enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  //   return Object.keys(obj).filter(k => !Number.isNaN(k)) as K[]
  // }
}
