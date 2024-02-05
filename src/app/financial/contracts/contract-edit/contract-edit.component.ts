import { NgClass, formatDate } from '@angular/common';
import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Course } from '../../courses/course';
import { CourseService } from '../../courses/course.service';
import { Employee } from '../../employees/employee';
import { EmployeeService } from '../../employees/employee.service';
import { Grantor } from '../../projects/grantors/grantor';
import { GrantorService } from '../../projects/grantors/grantor.service';
import { Project } from '../../projects/project';
import { ProjectService } from '../../projects/project.service';
import { Contract } from '../contract';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-edit',
  standalone: true,
  imports: [RouterModule, FormsModule, NgClass],
  templateUrl: './contract-edit.component.html',
  styleUrl: './contract-edit.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-Br' }],
})
export class ContractEditComponent implements OnInit {
  @ViewChild('frm') public contractForm!: NgForm;

  public editMode: boolean = false;
  public contract: Contract | null = null;

  public grantors: Grantor[] = [];
  public projects: Project[] = [];
  public courses: Course[] = [];
  public employees: Employee[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contractService: ContractService,
    private grantorService: GrantorService,
    private projectService: ProjectService,
    private courseService: CourseService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.params['id']);

    this.grantorService.getGrantors().subscribe((data) => {
      this.grantors = data.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

      this.projectService.getProjects().subscribe((data) => {
        this.projects = data.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

        this.courseService.getCourses().subscribe((data) => {
          this.courses = data.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

          this.employeeService.getEmployees().subscribe((data) => {
            this.employees = data.sort((a, b) => (a.givenName < b.givenName ? -1 : a.givenName > b.givenName ? 1 : 0));

            if (id) {
              this.contractService.getContract(id).subscribe((data) => {
                if (!data) {
                  this.contract = null;
                  return;
                }
                this.editMode = true;
                this.contract = data;

                setTimeout(() => {
                  this.contractForm.setValue({
                    grantor: this.contract!.grantorId,
                    project: this.contract!.projectId,
                    course: this.contract!.courseId,
                    employee: this.contract!.employeeId,
                    beginDate: formatDate(this.contract!.beginDate, 'yyyy-MM-dd', 'pt-Br', 'UTC-3'),
                    endDate: formatDate(this.contract!.endDate, 'yyyy-MM-dd', 'pt-Br', 'UTC-3'),
                  });
                }, 0);
              });
            } else {
              this.contract = <Contract>{
                id: 0,
                grantorId: 0,
                grantorName: '',
                projectId: 0,
                projectName: '',
                courseId: 0,
                courseName: '',
                employeeId: 0,
                employeeGivenName: '',
                employeeSurname: '',
                beginDate: new Date(),
                endDate: new Date(),
                informDeadlineOfFirstRecess: new Date(),
                informDeadlineOfSecondRecess: new Date(),
              };
            }
          });
        });
      });
    });
  }

  public submit(form: NgForm) {
    let newContract: Contract;

    const grantorName = this.grantors.find((g) => g.id === Number(form.value.grantor))?.name;
    const projectName = this.projects.find((g) => g.id === Number(form.value.project))?.name;
    const courseName = this.courses.find((g) => g.id === Number(form.value.course))?.name;
    const employeeGivenName = this.employees.find((g) => g.id === Number(form.value.employee))?.givenName;
    const employeeSurname = this.employees.find((g) => g.id === Number(form.value.employee))?.surname;

    const dateRegex: RegExp = /(\d{4})-(\d{2})-(\d{2})/;
    const beginDateMatches = dateRegex.exec(form.value.beginDate);
    const endDateMatches = dateRegex.exec(form.value.endDate);

    const beginDate = new Date(Number(beginDateMatches![1]), Number(beginDateMatches![2]) - 1, Number(beginDateMatches![3]), 5, 0, 0, 0);
    const endDate = new Date(Number(endDateMatches![1]), Number(endDateMatches![2]) - 1, Number(endDateMatches![3]), 5, 0, 0, 0);

    if (this.editMode) {
      newContract = <Contract>{
        id: this.contract!.id,
        grantorId: form.value.grantor,
        grantorName: grantorName,
        projectId: form.value.project,
        projectName: projectName,
        courseId: form.value.course,
        courseName: courseName,
        employeeId: form.value.employee,
        employeeGivenName: employeeGivenName,
        employeeSurname: employeeSurname,
        beginDate: beginDate,
        endDate: endDate,
      };
      this.contractService.update(newContract).subscribe((data) => {
        this.contract = data;
      });
    } else {
      newContract = <Contract>{
        id: 0,
        grantorId: form.value.grantor,
        grantorName: grantorName,
        projectId: form.value.project,
        projectName: projectName,
        courseId: form.value.course,
        courseName: courseName,
        employeeId: form.value.employee,
        employeeGivenName: employeeGivenName,
        employeeSurname: employeeSurname,
        beginDate: beginDate,
        endDate: endDate,
      };
      this.contractService.create(newContract).subscribe((data) => {
        this.contract = data;
      });
    }
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
