package de.ersatzteil.ersatzteilhandel24api.webService;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import de.ersatzteil.ersatzteilhandel24api.client.ProjectManager;
import de.ersatzteil.ersatzteilhandel24api.model.Order;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@WebServlet("/ersatzteilhandel24apiValid/Orders")
public class OrderServlet extends HttpServlet {
    public static int latestSelected = 0;

    static String extractPostRequestBody(HttpServletRequest request) throws IOException {
        if ("POST".equalsIgnoreCase(request.getMethod())) {
            Scanner s = new Scanner(request.getInputStream(), "UTF-8").useDelimiter("\\A");
            return s.hasNext() ? s.next() : "";
        }
        return "";
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        String result = extractPostRequestBody(request);
        JsonNode jsonNode = mapper.readTree(result);
        String startDate = jsonNode.get("startDate").asText();
        String endDate = jsonNode.get("endDate").asText();
        java.util.Date dateFrom = new Date();
        java.util.Date dateTo=new Date();
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        format.setTimeZone(TimeZone.getTimeZone("UTC"));
        try {
            dateFrom = format.parse(startDate);
            dateTo = format.parse(endDate);
        }
        catch (ParseException e){
            e.printStackTrace();
        }

        List<Order> order_items = new ArrayList<>();
        try {
            ProjectManager projectManager = new ProjectManager();
            order_items = projectManager.getFilteredOrders(dateFrom, dateTo);
            if(order_items.get(0).getOrder_id() == null){
                order_items.get(0).setLatest(0);
            }
            else {
                latestSelected++;
                for (Order o : order_items)
                    o.setLatest(latestSelected);
            }
            response.setContentType("application/json");
            mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
            DateFormat fmt = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss");
            mapper.setDateFormat(fmt);
            mapper.writeValue(response.getOutputStream(), order_items);
            return;
        }
        catch (Exception e){
            e.printStackTrace();
            response.sendError(response.SC_NOT_FOUND,
                    "No recognized search engine specified.");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        List<Order> order_items = new ArrayList<>();
        try{
            ProjectManager projectManager= new ProjectManager();
            order_items = projectManager.getOrderList();
            response.setContentType("application/json");
            mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
            DateFormat fmt = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss");
            mapper.setDateFormat(fmt);
            mapper.writeValue(response.getOutputStream(), order_items);
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }
}
