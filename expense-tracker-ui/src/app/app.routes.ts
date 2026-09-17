import { Routes } from '@angular/router';
import { ExpenseList } from './components/expense-list/expense-list';
import { ExpenseForm } from './components/expense-form/expense-form';
import { Summary } from './components/summary/summary';

export const routes: Routes = [
{ path: 'expenses/new', component: ExpenseForm },
{ path: 'expenses/:id/edit', component: ExpenseForm},
{ path: '', redirectTo: 'expenses', pathMatch: 'full' },
{ path: 'expenses', component: ExpenseList },
{ path: 'summary', component: Summary},
];

