import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { CategorySummary } from '../../models/expense.model';

@Component({
  imports: [FormsModule, CurrencyPipe],
  selector: 'app-summary',
  styleUrl: './summary.css',
  templateUrl: './summary.html',
})
export class Summary implements OnInit {
  private expenseService = inject(ExpenseService);

  month = new Date().toISOString().slice(0, 7);
  rows = signal<CategorySummary[]>([]);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.expenseService.getSummary(this.month).subscribe(data => {
      this.rows.set(data);
    });
  }

  grandTotal(): number {
    return this.rows().reduce((sum, r) => sum + r.total, 0);
  }
}
