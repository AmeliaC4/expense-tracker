package com.ameliac4;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class Category extends PanacheEntity {
    public String name;
}