import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense, Category, CategorySummary } from '../models/expense.model';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/expenses';
    private categoriesUrl = 'http://localhost:8080/api/categories';

    getExpenses():Observable<Expense[]> {
        return this.http.get<Expense[]>(this.apiUrl);
    }

    getCategories():Observable<Category[]> {
        return this.http.get<Category[]>(this.categoriesUrl);
    }

    createExpense(expense: Expense): Observable<Expense> {
        return this.http.post<Expense>(this.apiUrl, expense);
    }

    updateExpense(id: number, expense: Expense): Observable<Expense> {
        return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense);
    }

    deleteExpense(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    
    getExpense(id: number): Observable<Expense> {
        return this.http.get<Expense>(`${this.apiUrl}/${id}`);
    }

    getSummary(month: string): Observable<CategorySummary[]> {
        return this.http.get<CategorySummary[]>(`http://localhost:8080/api/summary?month=${month}`);
    }

}
