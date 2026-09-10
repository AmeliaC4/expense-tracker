package com.ameliac4;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

import javax.annotation.processing.Generated;

@Path("/api/categories")
public class CategoryResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Category> list() {
        return Category.listAll();
    }
}