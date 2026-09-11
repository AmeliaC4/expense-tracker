package com.ameliac4;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

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

}