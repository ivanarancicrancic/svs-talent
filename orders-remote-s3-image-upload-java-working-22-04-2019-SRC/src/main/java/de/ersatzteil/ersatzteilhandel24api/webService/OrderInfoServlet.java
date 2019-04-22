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
import java.text.SimpleDateFormat;
import java.util.Scanner;

@WebServlet("/ersatzteilhandel24apiValid/OrderDetail")
public class OrderInfoServlet extends HttpServlet {
    static String extractPostRequestBody(HttpServletRequest request) throws IOException {
        if ("POST".equalsIgnoreCase(request.getMethod())) {
            Scanner s = new Scanner(request.getInputStream(), "UTF-8").useDelimiter("\\A");
            return s.hasNext() ? s.next() : "";
        }
        return "";
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        String result = extractPostRequestBody(request);
        JsonNode jsonNode = mapper.readTree(result);
        String order_id = jsonNode.get("orderId").asText();
        Order order_item = new Order();
        try{
            ProjectManager projectManager= new ProjectManager();
            order_item = projectManager.getOrderDetails(order_id);
            OrderServlet.latestSelected ++ ;
            order_item.setLatest(OrderServlet.latestSelected);
            response.setContentType("application/json");
            mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
            DateFormat fmt = new SimpleDateFormat("dd-MMM-yyyy");
            mapper.setDateFormat(fmt);
            mapper.writeValue(response.getOutputStream(), order_item);
            return;
        }
        catch(Exception e)
        {
            response.sendError(response.SC_NOT_FOUND,
                    "No recognized search engine specified.");
            e.printStackTrace();
        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }
}
