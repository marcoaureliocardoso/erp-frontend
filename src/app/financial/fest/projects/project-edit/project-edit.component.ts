import { NgClass, formatDate, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Grantor } from '../grantors/grantor';
import { GrantorService } from '../grantors/grantor.service';
import { Project } from '../project';
import { ProjectService } from '../project.service';

registerLocaleData(localePt);

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [RouterModule, FormsModule, NgClass],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-Br' }],
})
export class ProjectEditComponent implements OnInit {
  @ViewChild('frm') public projectForm!: NgForm;

  public editMode: boolean = false;
  public project: Project | null = null;

  public grantors: Grantor[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private grantorService: GrantorService,
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.params['id']);

    this.grantorService.getGrantors().subscribe((data) => {
      // setTimeout(() => {
      this.grantors = data.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

      if (id) {
        this.projectService.getProject(id).subscribe((data) => {
          if (!data) {
            this.project = null;
            return;
          }
          this.editMode = true;
          this.project = data;

          setTimeout(() => {
            this.projectForm.setValue({
              name: this.project!.name,
              grantor: this.project!.grantor.id,
              code: this.project!.code,
              startDate: formatDate(this.project!.startDate, 'yyyy-MM-dd', 'pt-Br', 'UTC-3'),
              endDate: formatDate(this.project!.endDate, 'yyyy-MM-dd', 'pt-Br', 'UTC-3'),
            });
          }, 0);
        });
      } else {
        this.project = <Project>{ id: 0, name: '', grantor: {}, code: '', startDate: new Date(), endDate: new Date() };
      }
      // }, 0);
    });
  }

  public submit(form: NgForm) {
    let newProject: Project;

    const dateRegex: RegExp = /(\d{4})-(\d{2})-(\d{2})/;
    const startDateMatches = dateRegex.exec(form.value.startDate);
    const endDateMatches = dateRegex.exec(form.value.endDate);

    const startDate = new Date(Number(startDateMatches![1]), Number(startDateMatches![2]) - 1, Number(startDateMatches![3]), 5, 0, 0, 0);
    const endDate = new Date(Number(endDateMatches![1]), Number(endDateMatches![2]) - 1, Number(endDateMatches![3]), 5, 0, 0, 0);

    const newGrantor = this.grantors.find((g) => g.id === Number(form.value.grantor));

    if (this.editMode) {
      newProject = <Project>{ id: this.project!.id, name: form.value.name, grantor: newGrantor, code: form.value.code, startDate: startDate, endDate: endDate };
      this.projectService.update(newProject).subscribe((data) => {
        this.project = data;
      });
      this.router.navigate(['../..'], { relativeTo: this.route });
    } else {
      newProject = <Project>{ id: 0, name: form.value.name, grantor: newGrantor, code: form.value.code, startDate: startDate, endDate: endDate };
      this.projectService.create(newProject).subscribe((data) => {
        this.project = data;
      });
      this.router.navigate(['..'], { relativeTo: this.route });
    }
  }
}
