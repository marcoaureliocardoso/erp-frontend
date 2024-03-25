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
import { Bond } from '../bond';
import { BondService } from '../bond.service';
import { BondType, BondTypeFromString, BondTypeLabels } from '../bondType';

@Component({
  selector: 'app-bond-edit',
  standalone: true,
  imports: [RouterModule, FormsModule, NgClass],
  templateUrl: './bond-edit.component.html',
  styleUrl: './bond-edit.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-Br' }],
})
export class BondEditComponent implements OnInit {
  @ViewChild('frm') public bondForm!: NgForm;

  public editMode: boolean = false;
  public bond: Bond | null = null;

  public projects: Project[] = [];
  public courses: Course[] = [];
  public employees: Employee[] = [];

  public bondTypeOptions: string[] = Object.keys(BondType).filter((key) => isNaN(Number(key)));
  public bondTypeOptionsLabels = BondTypeLabels;
  public stringToBondType = BondTypeFromString;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bondService: BondService,
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
            this.bondService.getBond(id).subscribe((data) => {
              if (!data) {
                this.bond = null;
                return;
              }
              this.editMode = true;
              this.bond = data;

              setTimeout(() => {
                this.bondForm.setValue({
                  type: this.bond!.type,
                  role: this.bond!.role,
                  project: this.bond!.project.id,
                  course: this.bond!.course.id,
                  employee: this.bond!.employee.id,
                  startDate: formatDate(this.bond!.startDate, 'yyyy-MM-dd', 'pt-Br', 'UTC-3'),
                  endDate: formatDate(this.bond!.endDate, 'yyyy-MM-dd', 'pt-Br', 'UTC-3'),
                });
              }, 0);
            });
          } else {
            this.bond = <Bond>{
              id: 0,
              type: BondType.FULL_TIME,
              role: '',
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
    let newBond: Bond;

    const dateRegex: RegExp = /(\d{4})-(\d{2})-(\d{2})/;
    const startDateMatches = dateRegex.exec(form.value.startDate);
    const endDateMatches = dateRegex.exec(form.value.endDate);

    const startDate = new Date(Number(startDateMatches![1]), Number(startDateMatches![2]) - 1, Number(startDateMatches![3]), 5, 0, 0, 0);
    const endDate = new Date(Number(endDateMatches![1]), Number(endDateMatches![2]) - 1, Number(endDateMatches![3]), 5, 0, 0, 0);

    const newProject = this.projects.find((g) => g.id === Number(form.value.project));
    const newCourse = this.courses.find((g) => g.id === Number(form.value.course));
    const newEmployeeGiven = this.employees.find((g) => g.id === Number(form.value.employee));

    if (this.editMode) {
      newBond = <Bond>{ id: this.bond!.id, type: this.bond!.type, role: this.bond!.role, project: newProject, course: newCourse, employee: newEmployeeGiven, startDate: startDate, endDate: endDate };
      this.bondService.update(newBond).subscribe((data) => {
        this.bond = data;
      });
      this.router.navigate(['../..'], { relativeTo: this.route });
    } else {
      newBond = <Bond>{ id: 0, type: this.bond!.type, role: this.bond!.role, project: newProject, course: newCourse, employee: newEmployeeGiven, startDate: startDate, endDate: endDate };
      this.bondService.create(newBond).subscribe((data) => {
        this.bond = data;
      });
      this.router.navigate(['..'], { relativeTo: this.route });
    }
  }
}
