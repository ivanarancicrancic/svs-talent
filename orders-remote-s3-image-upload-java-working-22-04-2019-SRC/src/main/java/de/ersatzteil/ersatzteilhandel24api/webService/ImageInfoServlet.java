package de.ersatzteil.ersatzteilhandel24api.webService;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import de.ersatzteil.ersatzteilhandel24api.client.ProjectManager;
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

@WebServlet("/ersatzteilhandel24apiValid/orderArticle/getUrlInfo")
public class ImageInfoServlet extends HttpServlet {

    static String extractPostRequestBody(HttpServletRequest request) throws IOException {
        if ("POST".equalsIgnoreCase(request.getMethod())) {
            Scanner s = new Scanner(request.getInputStream(), "UTF-8").useDelimiter("\\A");
            return s.hasNext() ? s.next() : "";
        }
        return "";
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("Entered doPost ggetUrlInfo!!!!!!!");
        ObjectMapper mapper = new ObjectMapper();
        String result = extractPostRequestBody(request);
        JsonNode jsonNode = mapper.readTree(result);
        String orArId = jsonNode.get("orArId").asText();

        ProjectManager projectManager= new ProjectManager();
        try {
           String fileName =  projectManager.getUrlInfo(orArId);
            OrderArticles orderArticles = new OrderArticles();
            orderArticles.setOrArId(orArId);
            orderArticles.setImageKey(fileName);
            response.setContentType("application/json");
            mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
            DateFormat fmt = new SimpleDateFormat("dd-MMM-yyyy");
            mapper.setDateFormat(fmt);
            System.out.println("Filename going to be sent to react: " + fileName);
            mapper.writeValue(response.getOutputStream(), orderArticles);
            return;
        }catch (Exception e){
            System.out.println("Exception");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }
}
