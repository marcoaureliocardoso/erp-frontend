import { Routes } from '@angular/router';

import { ContractEventListComponent } from './financial/contracts/contract-events/contract-event-list/contract-event-list.component';
import { ContractListComponent } from './financial/contracts/contract-list/contract-list.component';
import { ContractComponent } from './financial/contracts/contract/contract.component';
import { CourseListComponent } from './financial/courses/course-list/course-list.component';
import { EmployeeListComponent } from './financial/employees/employee-list/employee-list.component';
import { EmployeeComponent } from './financial/employees/employee/employee.component';
import { GrantorListComponent } from './financial/projects/grantors/grantor-list/grantor-list.component';
import { ProjectListComponent } from './financial/projects/project-list/project-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'ERP - Início', pathMatch: 'full' },
  { path: 'financeiro/termos', component: ContractListComponent, title: 'ERP - Termos' },
  { path: 'financeiro/termos/:id', component: ContractComponent, title: 'ERP - Termo' },
  { path: 'financeiro/cursos', component: CourseListComponent, title: 'ERP - Cursos' },
  { path: 'financeiro/colaboradores', component: EmployeeListComponent, title: 'ERP - Colaboradores' },
  { path: 'financeiro/colaboradores/:id', component: EmployeeComponent, title: 'ERP - Colaborador' },
  { path: 'financeiro/projetos', component: ProjectListComponent, title: 'ERP - Projetos' },
  { path: 'financeiro/fomentadores', component: GrantorListComponent, title: 'ERP - Fomentadores' },
  { path: 'financeiro/contrato-eventos', component: ContractEventListComponent, title: 'ERP - Eventos' },
  { path: '**', component: HomeComponent, title: 'ERP - Início' },
];
