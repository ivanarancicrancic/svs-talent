package de.ersatzteil.ersatzteilhandel24api.webService;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import de.ersatzteil.ersatzteilhandel24api.client.ProjectManager;
import de.ersatzteil.ersatzteilhandel24api.model.IOrderArticleGrossPriceRequestModel;
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

@WebServlet("/ersatzteilhandel24apiValid/UpdateGrossPrice")
public class UpdateGrossPriceServlet extends HttpServlet {
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
        JsonNode orderJsonNode = jsonNode.get("newGrossPriceValue");
        IOrderArticleGrossPriceRequestModel newGrossPriceValue = new IOrderArticleGrossPriceRequestModel();
        if (newGrossPriceValue != null) {
            String orArId = (orderJsonNode.get("orArId").asText());
            newGrossPriceValue.setOrArId(orArId);
            String grossPrice = orderJsonNode.get("grossPrice").asText();
            try{
                if(Integer.parseInt(grossPrice) < 0) throw new Exception();
                newGrossPriceValue.setGrossPrice(grossPrice);
                ProjectManager projectManager= new ProjectManager();
                projectManager.updateGrossPriceOrder(newGrossPriceValue);
                response.setContentType("application/json");
                mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
                DateFormat fmt = new SimpleDateFormat("dd-MMM-yyyy");
                mapper.setDateFormat(fmt);
                OrderArticles order_article_to_update = new OrderArticles();
                mapper.writeValue(response.getOutputStream(), order_article_to_update);
                return;
            }
            catch(Exception e){
                final String errorMessage = " Illegal grossPrice argument";
                System.out.println("ErrorMessage: " + errorMessage);
                JsonNode reply = mapper.createObjectNode();
                int code = HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
                response.setStatus(code);
                mapper.writeValue(response.getOutputStream(), reply);
            }
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }
}
