package de.ersatzteil.ersatzteilhandel24api.webService;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import de.ersatzteil.ersatzteilhandel24api.client.ProjectManager;
import de.ersatzteil.ersatzteilhandel24api.model.TotalPrices;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Scanner;
import java.util.TimeZone;

@WebServlet("/ersatzteilhandel24apiValid/RecalculateTotalPricesServlet")
public class RecalculateTotalPricesServlet extends HttpServlet {

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
        String startDate = jsonNode.get("startDate").asText();
        String endDate = jsonNode.get("endDate").asText();
        Date dateFrom = new Date();
        Date dateTo=new Date();
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        format.setTimeZone(TimeZone.getTimeZone("UTC"));
        try {
            dateFrom = format.parse(startDate);
            dateTo = format.parse(endDate);
        }
        catch (ParseException e){
            e.printStackTrace();
        }
        TotalPrices totalPrices = new TotalPrices();
        try{
            ProjectManager projectManager= new ProjectManager();
            totalPrices = projectManager.recalculateFilteredTotalPrices(dateFrom,dateTo);
            response.setContentType("application/json");
            mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
            DateFormat fmt = new SimpleDateFormat("dd-MMM-yyyy");
            mapper.setDateFormat(fmt);
            mapper.writeValue(response.getOutputStream(), totalPrices);
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        TotalPrices totalPrices = new TotalPrices();
        try{
            ProjectManager projectManager= new ProjectManager();
            totalPrices = projectManager.recalculateTotalPrices();
            response.setContentType("application/json");
            mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
            DateFormat fmt = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss");
            mapper.setDateFormat(fmt);
            mapper.writeValue(response.getOutputStream(), totalPrices);
            return;
        }
        catch(Exception e)
        {
            response.sendError(response.SC_NOT_FOUND,
                    "No recognized search engine specified.");
            e.printStackTrace();
        }
    }
}
