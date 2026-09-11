package com.ameliac4;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import java.time.YearMonth;
import java.util.List;

@Path("/api/summary")
public class SummaryResource {
    @GET 
    @Produces(MediaType.APPLICATION_JSON)
    public List<CategorySummary> summary(@QueryParam("month") String month) {
        YearMonth ym = (month!= null) ? YearMonth.parse(month) : YearMonth.now();
        return Expense.getEntityManager()
            .createQuery(
                "select new com.ameliac4.CategorySummary(e.category.name, sum(e.amount)) " +
                "from Expense e " +
                "where e.expenseDate >= :start and e.expenseDate <= :end " +
                "group by e.category.name "+ 
                "order by e.category.name",
                CategorySummary.class)
            .setParameter("start", ym.atDay(1))
            .setParameter("end", ym.atEndOfMonth())
            .getResultList();
    }
}