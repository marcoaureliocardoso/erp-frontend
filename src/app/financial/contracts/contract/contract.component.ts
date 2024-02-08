import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Contract } from '../contract';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [RouterModule, DatePipe],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.css',
})
export class ContractComponent implements OnInit {
  public contract: Contract | null = null;

  constructor(
    private route: ActivatedRoute,
    public service: ContractService,
  ) {}

  ngOnInit() {
    const id: number = Number(this.route.snapshot.params['id']);
    this.service.getContract(id).subscribe((data) => {
      if (!data) {
        this.contract = null;
        return;
      }
      this.contract = data;
    });
  }
}
