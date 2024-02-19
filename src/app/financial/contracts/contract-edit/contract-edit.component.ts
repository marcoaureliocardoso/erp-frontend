import { NgClass, formatDate } from '@angular/common';
import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Course } from '../../courses/course';
import { CourseService } from '../../courses/course.service';
import { Employee } from '../../employees/employee';
import { EmployeeService } from '../../employees/employee.service';
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

  public projects: Project[] = [];
  public courses: Course[] = [];
  public employees: Employee[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contractService: ContractService,
    private projectService: ProjectService,
    private courseService: CourseService,
    private employeeService: EmployeeService,
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.params['id']);

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
                  project: this.contract!.project.id,
                  course: this.contract!.course.id,
                  employee: this.contract!.employee.id,
                  startDate: formatDate(this.contract!.startDate, 'yyyy-MM-dd', 'pt-Br', 'UTC-3'),
                  endDate: formatDate(this.contract!.endDate, 'yyyy-MM-dd', 'pt-Br', 'UTC-3'),
                });
              }, 0);
            });
          } else {
            this.contract = <Contract>{
              id: 0,
              project: {},
              course: {},
              employee: {},
              startDate: new Date(),
              endDate: new Date(),
              informDeadlineOfFirstRecess: new Date(),
              informDeadlineOfSecondRecess: new Date(),
            };
          }
        });
      });
    });
  }

  public submit(form: NgForm) {
    let newContract: Contract;

    const dateRegex: RegExp = /(\d{4})-(\d{2})-(\d{2})/;
    const startDateMatches = dateRegex.exec(form.value.startDate);
    const endDateMatches = dateRegex.exec(form.value.endDate);

    const startDate = new Date(Number(startDateMatches![1]), Number(startDateMatches![2]) - 1, Number(startDateMatches![3]), 5, 0, 0, 0);
    const endDate = new Date(Number(endDateMatches![1]), Number(endDateMatches![2]) - 1, Number(endDateMatches![3]), 5, 0, 0, 0);

    const newProject = this.projects.find((g) => g.id === Number(form.value.project));
    const newCourse = this.courses.find((g) => g.id === Number(form.value.course));
    const newEmployeeGiven = this.employees.find((g) => g.id === Number(form.value.employee));

    if (this.editMode) {
      newContract = <Contract>{ id: this.contract!.id, project: newProject, course: newCourse, employee: newEmployeeGiven, startDate: startDate, endDate: endDate };
      this.contractService.update(newContract).subscribe((data) => {
        this.contract = data;
      });
      this.router.navigate(['../..'], { relativeTo: this.route });
    } else {
      newContract = <Contract>{ id: 0, project: newProject, course: newCourse, employee: newEmployeeGiven, startDate: startDate, endDate: endDate };
      this.contractService.create(newContract).subscribe((data) => {
        this.contract = data;
      });
      this.router.navigate(['..'], { relativeTo: this.route });
    }
  }
}
