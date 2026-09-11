package com.ameliac4;

public class CategorySummary {
    public String categoryName;
    public java.math.BigDecimal total;

    public CategorySummary (String categoryName, java.math.BigDecimal total) {
        this.categoryName = categoryName;
        this.total = total;
    }
}