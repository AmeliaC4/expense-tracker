export interface Category {
    id: number;
    name: string;
}

export interface Expense {
    id?: number;
    amount: number;
    description: string;
    expenseDate: string;
    category: Category;
}

export interface CategorySummary {
    categoryName: string;
    total: number;
}