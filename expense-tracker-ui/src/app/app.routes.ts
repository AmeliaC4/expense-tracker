import { Routes } from '@angular/router';
import { ExpenseList } from './components/expense-list/expense-list';


export const routes: Routes = [
{ path: '', redirectTo: 'expenses', pathMatch: 'full' },
{ path: 'expenses', component: ExpenseList },
];

