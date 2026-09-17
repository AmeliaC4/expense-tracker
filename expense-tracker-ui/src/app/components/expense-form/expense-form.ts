import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { Category } from '../../models/expense.model';

@Component({
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css'
})
export class ExpenseForm implements OnInit {
  private fb = inject(FormBuilder);
  private expenseService = inject(ExpenseService);
  router = inject(Router);

  categories = signal<Category[]>([]);

  form = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    description: ['', Validators.required],
    expenseDate: ['', Validators.required],
    categoryId: [null, Validators.required],
  });

  ngOnInit(): void {
    this.expenseService.getCategories().subscribe(data => {
      this.categories.set(data);
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    const expense = {
      amount: Number(v.amount),
      description: v.description!,
      expenseDate: v.expenseDate!,
      category: { id: Number(v.categoryId), name: '' },
    };
    this.expenseService.createExpense(expense).subscribe(() => {
      this.router.navigate(['/expenses']);
    });
  }
}