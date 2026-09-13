import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpenseService } from './services/expense.service';
import { Expense } from './models/expense.model';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private expenseService = inject(ExpenseService);
  expenses = signal<Expense[]>([]);

  ngOnInit(): void {
    this.expenseService.getExpenses().subscribe(data => {
      this.expenses.set(data);
    });
  }

  deleteExpense(expense: Expense): void {
    if (!expense.id) return;
    if (!confirm(`Delete "${expense.description}"?`)) return;
    this.expenseService.deleteExpense(expense.id).subscribe(() => {
      this.expenses.update(list => list.filter(e => e.id !== expense.id));
    });
  }
}
