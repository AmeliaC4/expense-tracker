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
}
