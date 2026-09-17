import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  private route = inject(ActivatedRoute);
  editingId: number | null = null;

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

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editingId = Number(idParam);
      this.expenseService.getExpense(this.editingId).subscribe(expense => {
        this.form.patchValue({
          amount: expense.amount as any,
          description: expense.description,
          expenseDate: expense.expenseDate,
          categoryId: expense.category.id as any,
        });
      });
    }
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
    const request = this.editingId
      ? this.expenseService.updateExpense(this.editingId, expense)
      : this.expenseService.createExpense(expense);
    request.subscribe(() => {
      this.router.navigate(['/expenses']);
    });
  }
}