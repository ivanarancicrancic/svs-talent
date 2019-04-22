package de.ersatzteil.ersatzteilhandel24api.webService;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mysql.cj.xdevapi.JsonParser;
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

@WebServlet("/ersatzteilhandel24apiValid/OrderSave")
public class OrderSaveServlet extends HttpServlet {
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
        JsonNode orderJsonNode = jsonNode.get("orderToSave");
        Order orderToSave = new Order();
        if (orderJsonNode != null) {
            orderToSave.setOrder_id(orderJsonNode.get("order_id").asText());
            String firstName=(orderJsonNode.get("firstName").asText());
            orderToSave.setFirstName(firstName);
            orderToSave.setLastName(orderJsonNode.get("lastName").asText());
            orderToSave.setCompanyName(orderJsonNode.get("companyName").asText());
            orderToSave.setCountry(orderJsonNode.get("country").asText());
            orderToSave.setCity(orderJsonNode.get("city").asText());
            orderToSave.setStreet(orderJsonNode.get("street").asText());
            orderToSave.setHouseNumber(orderJsonNode.get("houseNumber").asText());
            orderToSave.setPostcode(orderJsonNode.get("postcode").asText());
            orderToSave.setLatest(orderJsonNode.get("latest").asInt());
            orderToSave.setAnrede(orderJsonNode.get("anrede").asText());
            orderToSave.setEmail(orderJsonNode.get("email").asText());
            orderToSave.setGrossPrice(orderJsonNode.get("grossPrice").asText());
            orderToSave.setNetPrice(orderJsonNode.get("netPrice").asText());
            orderToSave.setGrossPriceWD(orderJsonNode.get("grossPriceWD").asText());
            orderToSave.setNetPriceWD(orderJsonNode.get("netPriceWD").asText());
            orderToSave.setGrossPriceWD(orderJsonNode.get("grossPriceWD").asText());
            orderToSave.setPaymentMethod(orderJsonNode.get("paymentMethod").asText());
            orderToSave.setShippingWay(orderJsonNode.get("shippingWay").asText());
            orderToSave.setPhoneNumber(orderJsonNode.get("phoneNumber").asText());
        }
        Order order_item = new Order();
        try{
            ProjectManager projectManager= new ProjectManager();
            projectManager.editOrder(orderToSave);
            OrderServlet.latestSelected ++ ;
            order_item.setLatest(OrderServlet.latestSelected);
            response.setContentType("application/json");
            mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
            DateFormat fmt = new SimpleDateFormat("dd-MMM-yyyy");
            mapper.setDateFormat(fmt);
            mapper.writeValue(response.getOutputStream(), orderToSave);
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
