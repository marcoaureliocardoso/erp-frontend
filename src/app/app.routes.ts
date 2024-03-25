import { Routes } from '@angular/router';

import { BondEditComponent } from './financial/fest/bonds/bond-edit/bond-edit.component';
import { BondEventListComponent } from './financial/fest/bonds/bond-event-reminders/bond-event-reminder-list/bond-event-reminder-list.component';
import { BondListComponent } from './financial/fest/bonds/bond-list/bond-list.component';
import { BondComponent } from './financial/fest/bonds/bond/bond.component';
import { CourseEditComponent } from './financial/fest/courses/course-edit/course-edit.component';
import { CourseListComponent } from './financial/fest/courses/course-list/course-list.component';
import { EmployeeEditComponent } from './financial/fest/employees/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './financial/fest/employees/employee-list/employee-list.component';
import { EmployeeComponent } from './financial/fest/employees/employee/employee.component';
import { GrantorEditComponent } from './financial/fest/projects/grantors/grantor-edit/grantor-edit.component';
import { GrantorListComponent } from './financial/fest/projects/grantors/grantor-list/grantor-list.component';
import { ProjectEditComponent } from './financial/fest/projects/project-edit/project-edit.component';
import { ProjectListComponent } from './financial/fest/projects/project-list/project-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'ERP - Início', pathMatch: 'full' },
  { path: 'financeiro/fest/vinculos', component: BondListComponent, title: 'ERP - Vínculos' },
  { path: 'financeiro/fest/vinculos/cadastrar', component: BondEditComponent, title: 'ERP - Cadastrar Vínculo' },
  { path: 'financeiro/fest/vinculos/:id', component: BondComponent, title: 'ERP - Vínculo' },
  { path: 'financeiro/fest/vinculos/:id/editar', component: BondEditComponent, title: 'ERP - Editar Vínculo' },
  { path: 'financeiro/fest/cursos', component: CourseListComponent, title: 'ERP - Cursos' },
  { path: 'financeiro/fest/cursos/cadastrar', component: CourseEditComponent, title: 'ERP - Cadastrar Curso' },
  { path: 'financeiro/fest/cursos/:id/editar', component: CourseEditComponent, title: 'ERP - Editar Curso' },
  { path: 'financeiro/fest/colaboradores', component: EmployeeListComponent, title: 'ERP - Colaboradores' },
  { path: 'financeiro/fest/colaboradores/cadastrar', component: EmployeeEditComponent, title: 'ERP - Cadastrar Colaborador' },
  { path: 'financeiro/fest/colaboradores/:id', component: EmployeeComponent, title: 'ERP - Colaborador' },
  { path: 'financeiro/fest/colaboradores/:id/editar', component: EmployeeEditComponent, title: 'ERP - Editar Colaborador' },
  { path: 'financeiro/fest/projetos', component: ProjectListComponent, title: 'ERP - Projetos' },
  { path: 'financeiro/fest/projetos/cadastrar', component: ProjectEditComponent, title: 'ERP - Cadastrar Projeto' },
  { path: 'financeiro/fest/projetos/:id/editar', component: ProjectEditComponent, title: 'ERP - Editar Projeto' },
  { path: 'financeiro/fest/fomentadores', component: GrantorListComponent, title: 'ERP - Fomentadores' },
  { path: 'financeiro/fest/fomentadores/cadastrar', component: GrantorEditComponent, title: 'ERP - Cadastrar Fomentador' },
  { path: 'financeiro/fest/fomentadores/:id/editar', component: GrantorEditComponent, title: 'ERP - Editar Fomentador' },
  { path: 'financeiro/fest/contrato-alertas', component: BondEventListComponent, title: 'ERP - Alertas de Eventos' },
  { path: '**', component: HomeComponent, title: 'ERP - Início' },
];
