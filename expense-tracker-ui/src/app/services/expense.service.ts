import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/expenses';

    getExpenses():Observable<Expense[]> {
        return this.http.get<Expense[]>(this.apiUrl);
    }
}