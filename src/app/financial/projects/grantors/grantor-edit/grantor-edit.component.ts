import { NgClass } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Grantor } from '../grantor';
import { GrantorService } from '../grantor.service';

@Component({
  selector: 'app-grantor-edit',
  standalone: true,
  imports: [RouterModule, FormsModule, NgClass],
  templateUrl: './grantor-edit.component.html',
  styleUrl: './grantor-edit.component.css',
})
export class GrantorEditComponent implements OnInit {
  @ViewChild('frm') public grantorForm!: NgForm;

  public editMode: boolean = false;
  public grantor: Grantor | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private grantorService: GrantorService) {}

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.params['id']);
    if (id) {
      this.grantorService.getGrantor(id).subscribe((data) => {
        if (!data) {
          this.grantor = null;
          return;
        }
        this.editMode = true;
        this.grantor = data;

        setTimeout(() => {
          this.grantorForm.setValue({ name: this.grantor!.name });
        }, 0);
      });
    } else {
      this.grantor = <Grantor>{ id: 0, name: '' };
    }
  }

  public submit(form: NgForm) {
    let newGrantor: Grantor;
    if (this.editMode) {
      newGrantor = <Grantor>{ id: this.grantor!.id, name: form.value.name };
      this.grantorService.update(newGrantor).subscribe((data) => {
        this.grantor = data;
      });
    } else {
      newGrantor = <Grantor>{ id: 0, name: form.value.name };
      this.grantorService.create(newGrantor).subscribe((data) => {
        this.grantor = data;
      });
    }
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
