import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  styleUrl: './expense-list.css',
  templateUrl: './expense-list.html',
  imports: [RouterLink, CurrencyPipe]
})
export class ExpenseList implements OnInit {
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

  pendingDelete = signal<Expense | null>(null);

  requestDelete(expense: Expense): void {
    this.pendingDelete.set(expense);
  }

  cancelDelete(): void {
    this.pendingDelete.set(null);
  }

  confirmDelete(): void {
    const expense = this.pendingDelete();
    if (!expense || !expense.id) return;
    this.expenseService.deleteExpense(expense.id).subscribe(() => {
      this.expenses.update(list => list.filter(e => e.id !== expense.id));
      this.pendingDelete.set(null);
    });
  }
}
