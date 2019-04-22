package de.ersatzteil.ersatzteilhandel24api.webService;

import com.amazonaws.HttpMethod;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
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
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@WebServlet("/ersatzteilhandel24apiValid/OrderArticlesServlet")
public class OrderArticlesServlet extends HttpServlet {
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
        String order_id = jsonNode.get("order_id").asText();
        List<OrderArticles> order_articles = new ArrayList<>();
        try{
            String accessKeyId = "AKIAJLVOOJ5OXSCDQFLA";
            String secretAccessKey =  "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";
            String region = "us-east-1";
            String bucketName = "ersatzteil-handel";
//                    String subdirectory = "orders/";

            //AWS Access Key ID and Secret Access Key
            BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKeyId, secretAccessKey);
            System.out.println("BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKeyId, secretAccessKey) executed!!!");

            //This class connects to AWS S3 for us
            AmazonS3 s3client = AmazonS3ClientBuilder.standard().withRegion(region)
                    .withCredentials(new AWSStaticCredentialsProvider(awsCreds)).build();
            System.out.println("s3Client built!!!");
            ProjectManager projectManager= new ProjectManager();
            order_articles = projectManager.getOrderArticlesList(order_id);
            for (OrderArticles orderArticle : order_articles){
                    // Generate URL
                System.out.println("Generating pre-signed URL.");
                java.util.Date expiration = new java.util.Date();
                long milliSeconds = expiration.getTime();
                milliSeconds += 1000 * 60 * 60; // Add 1 hour.
                expiration.setTime(milliSeconds);
                GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(bucketName, orderArticle.getImageKey());
                generatePresignedUrlRequest.setMethod(HttpMethod.GET);
                generatePresignedUrlRequest.setExpiration(expiration);
                URL url = s3client.generatePresignedUrl(generatePresignedUrlRequest);
                System.out.println("Pre-Signed URL = " + url.toString() + " ,for imageArticle with imageName: " + orderArticle.getImageKey());
                orderArticle.setArticlePictureUrl(url.toString());
            }
            OrderServlet.latestSelected ++ ;
            response.setContentType("application/json");
            mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
            DateFormat fmt = new SimpleDateFormat("dd-MMM-yyyy");
            mapper.setDateFormat(fmt);
            mapper.writeValue(response.getOutputStream(), order_articles);
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
