import { NgClass } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-edit',
  standalone: true,
  imports: [RouterModule, FormsModule, NgClass],
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.css',
})
export class CourseEditComponent implements OnInit {
  @ViewChild('frm') public courseForm!: NgForm;

  public editMode: boolean = false;
  public course: Course | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.params['id']);
    if (id) {
      this.courseService.getCourse(id).subscribe((data) => {
        if (!data) {
          this.course = null;
          return;
        }
        this.editMode = true;
        this.course = data;

        setTimeout(() => {
          this.courseForm.setValue({ name: this.course!.name });
        }, 0);
      });
    } else {
      this.course = <Course>{ id: 0, name: '' };
    }
  }

  public submit(form: NgForm) {
    let newCourse: Course;
    if (this.editMode) {
      newCourse = <Course>{ id: this.course!.id, name: form.value.name };
      this.courseService.update(newCourse).subscribe((data) => {
        this.course = data;
      });
      this.router.navigate(['../..'], { relativeTo: this.route });
    } else {
      newCourse = <Course>{ id: 0, name: form.value.name };
      this.courseService.create(newCourse).subscribe((data) => {
        this.course = data;
      });
      this.router.navigate(['..'], { relativeTo: this.route });
    }
  }
}
