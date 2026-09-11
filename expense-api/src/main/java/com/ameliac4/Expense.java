package com.ameliac4;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Expense extends PanacheEntity {
    public BigDecimal amount;
    public String description;
    public LocalDate expenseDate;

    @ManyToOne
    public Category category;
}