import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Bond } from '../bond';
import { BondService } from '../bond.service';
import { BondTypeLabels } from '../bondType';
import { TermTypeLabels } from '../terms/termType';

@Component({
  selector: 'app-bond',
  standalone: true,
  imports: [RouterModule, DatePipe],
  templateUrl: './bond.component.html',
  styleUrl: './bond.component.css',
})
export class BondComponent implements OnInit {
  public bond: Bond | null = null;

  public bondTypeLabels = BondTypeLabels;
  public termTypeLabels = TermTypeLabels;

  constructor(
    private route: ActivatedRoute,
    public service: BondService,
  ) {}

  ngOnInit() {
    const id: number = Number(this.route.snapshot.params['id']);
    this.service.getBond(id).subscribe((data) => {
      if (!data) {
        this.bond = null;
        return;
      }
      this.bond = data;
    });
  }
}
