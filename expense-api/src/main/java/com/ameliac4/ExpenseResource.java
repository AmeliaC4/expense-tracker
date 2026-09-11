package com.ameliac4;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.lang.module.ResolutionException;
import java.util.List;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.PathParam;

import javax.annotation.processing.Generated;

@Path("/api/expenses")
public class ExpenseResource {
    @GET 
    @Produces(MediaType.APPLICATION_JSON)
    public List<Expense> list() {
        return Expense.listAll();

    }

    @POST 
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response create(Expense expense) {
        expense.id = null;
        expense.persist();
        return Response.status(Response.Status.CREATED).entity(expense).build();

    } 
    
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response update(@PathParam("id") Long id, Expense updated) {
        Expense expense = Expense.findById(id);
        if (expense == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        expense.amount = updated.amount;
        expense.description = updated.description;
        expense.expenseDate = updated.expenseDate;
        expense.category = updated.category;
        return Response.ok(expense).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = Expense.deleteById(id);
        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build();
    }
}