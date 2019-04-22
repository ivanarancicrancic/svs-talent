package de.ersatzteil.ersatzteilhandel24api.webService;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import de.ersatzteil.ersatzteilhandel24api.client.ProjectManager;
import de.ersatzteil.ersatzteilhandel24api.model.IOrderArticleQuantityRequestModel;
import de.ersatzteil.ersatzteilhandel24api.model.OrderArticles;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Scanner;

@WebServlet("/DecrementArticlesQuantityServlet")
public class DecrementArticlesQuantityServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    static String extractPostRequestBody(HttpServletRequest request) throws IOException {
        if ("POST".equalsIgnoreCase(request.getMethod())) {
            Scanner s = new Scanner(request.getInputStream(), "UTF-8").useDelimiter("\\A");
            return s.hasNext() ? s.next() : "";
        }
        return "";
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        String result = extractPostRequestBody(request);
        JsonNode jsonNode = mapper.readTree(result);
        JsonNode orderJsonNode = jsonNode.get("newQuantityValue");
        IOrderArticleQuantityRequestModel newQuantityValue = new IOrderArticleQuantityRequestModel();
        if (newQuantityValue != null) {
            String orArId = (orderJsonNode.get("orArId").asText());
            newQuantityValue.setOrArId(orArId);
            String quantity = orderJsonNode.get("quantity").asText();
                try{
                    if (Integer.parseInt(quantity) < 0) {
                        throw new ServletException("HTTP GET Method Is Not Supported.");
                    }
                    newQuantityValue.setQuantity(quantity);
                    ProjectManager projectManager= new ProjectManager();
                    projectManager.decrementQuantityOrder(newQuantityValue);
                    response.setContentType("application/json");
                    mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
                    DateFormat fmt = new SimpleDateFormat("dd-MMM-yyyy");
                    mapper.setDateFormat(fmt);
                    OrderArticles order_to_decrement = new OrderArticles();
                    mapper.writeValue(response.getOutputStream(), order_to_decrement);
                }
                catch(Exception e)
                {
                    final String errorMessage = " Illegal argument";
                    System.out.println("ErrorMessage: " + errorMessage);
                    JsonNode reply = mapper.createObjectNode();
                    int code = HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
                    response.setStatus(code);
                    mapper.writeValue(response.getOutputStream(), reply);
                }
        }
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        throw new ServletException("HTTP GET Method Is Not Supported.");
    }
}
