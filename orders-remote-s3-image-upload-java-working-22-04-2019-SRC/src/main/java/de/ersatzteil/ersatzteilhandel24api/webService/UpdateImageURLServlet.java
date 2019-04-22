package de.ersatzteil.ersatzteilhandel24api.webService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.ersatzteil.ersatzteilhandel24api.client.ProjectManager;
import java.util.Scanner;

@WebServlet("/ersatzteilhandel24apiValid/orderArticle/updateUrl")
public class UpdateImageURLServlet extends HttpServlet {
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
        String orArId = jsonNode.get("orArId").asText();
        String fileUrl = jsonNode.get("fileUrl").asText();
        String key = jsonNode.get("key").asText();
        System.out.println("OrArId: "+ orArId);
        System.out.println("FileUrl: " + fileUrl);
        System.out.println("Key: " + key);
        ProjectManager projectManager= new ProjectManager();
        try {
            projectManager.setProductImageUrl(orArId, key, fileUrl);
        }catch (Exception e){
            System.out.println("Exception");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }
}



