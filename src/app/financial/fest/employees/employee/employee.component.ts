import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { CpfFormatPipe } from '../../../../shared/cpf-format.pipe';
import { EducationLabels } from '../../../../shared/education';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [RouterModule, DatePipe, CpfFormatPipe],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  public employee: Employee | null = null;
  public employeeId: number | null = null;

  public educationLabels = EducationLabels;

  constructor(
    private route: ActivatedRoute,
    public service: EmployeeService,
  ) {}

  ngOnInit() {
    const id: number = Number(this.route.snapshot.params['id']);
    this.service.getEmployee(id).subscribe((data) => {
      if (!data) {
        this.employee = null;
        return;
      }
      this.employee = data;
    });
  }
}
