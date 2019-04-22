package de.ersatzteil.ersatzteilhandel24api.webService;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.*;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Scanner;

@WebServlet("/ersatzteilhandel24apiValid/orderArticle/uploadImage")
@MultipartConfig
public class ImageUploadServlet extends HttpServlet {

    private static final long serialVersionUID = 5619951677845873534L;
    private static final String UPLOAD_DIR = "uploads";
    public ImageUploadServlet() {
        super();
    }

    static String extractPostRequestBody(HttpServletRequest request) throws IOException {
        if ("POST".equalsIgnoreCase(request.getMethod())) {
            Scanner s = new Scanner(request.getInputStream(), "UTF-8").useDelimiter("\\A");
            return s.hasNext() ? s.next() : "";
        }
        return "";
    }

    private String getFileName(final Part part) {
        final String partHeader = part.getHeader("content-disposition");
//        LOGGER.log(Level.INFO, "Part Header = {0}", partHeader);
        for (String content : part.getHeader("content-disposition").split(";")) {
            if (content.trim().startsWith("filename")) {
                return content.substring(
                        content.indexOf('=') + 1).trim().replace("\"", "");
            }
        }
        return null;
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("Entered uploadFile DO POST !!!!!!");
        String cwd = System.getProperty("user.dir");
        System.out.println("Current working directory : " + cwd);
        String applicationPath = "." + File.separator  +  "target"  + File.separator  + "ServletFileUpload" ;
        // constructs path of the directory to save uploaded file

        String uploadFilePath = "C:\\Users\\ivana\\Desktop\\orders-backUp-29-03-2019\\orders-backend\\target\\ersatzteilhandel24apiValid\\uploads";
        System.out.println("UploadPath: "  + uploadFilePath);

        // creates upload folder if it does not exists
        File uploadFolder = new File(uploadFilePath);
        if (!uploadFolder.exists()) {
            uploadFolder.mkdirs();
        }
//        PrintWriter writer = response.getWriter();
        // write all files in upload folder
        for (Part part : request.getParts()) {
            if (part != null && part.getSize() > 0) {
                System.out.println("Image to be uploaded has size > 0");
                final String fileName123 = getFileName(part);
                System.out.println("Full path: " + fileName123);
                String nam = fileName123.substring(fileName123.lastIndexOf('\\') + 1);
                System.out.println("Just name: " + nam);
                String fileName = 	Paths.get(part.getSubmittedFileName()).getFileName().toString();
                System.out.println("File name is: " + fileName);
                String contentType = part.getContentType();
                System.out.println("Content type is: " + contentType);
                // allows only JPEG files to be uploaded
                if (!contentType.equalsIgnoreCase("image/jpeg")) {
                    System.out.println("Image ignored becuase it is not jpeg");
                    continue;
                }
                part.write(uploadFilePath + File.separator + fileName);
                System.out.println("Headers are set");
//                // checks if the request actually contains upload file
                if (!ServletFileUpload.isMultipartContent(request)) {
                    System.out.println("Request is not multipartContent");
                    return;
                }
                // configures upload settings
                //get the file chosen by the user
                Part filePart = part;
                String fileName1 = filePart.getSubmittedFileName();
                System.out.println("fileName ISss: " + fileName1);
                if(fileName1.endsWith(".jpg") || fileName1.endsWith(".png")){
                    System.out.println("Image is JPG or PNG!!");
                    InputStream fileInputStream = filePart.getInputStream();

                    String accessKeyId = "AKIAJLVOOJ5OXSCDQFLA";
                    String secretAccessKey =  "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";
                    String region = "us-east-1";
                    String bucketName = "ersatzteil-handel";
//                  String subdirectory = "orders/";

                    //AWS Access Key ID and Secret Access Key
                    BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKeyId, secretAccessKey);
                    System.out.println("BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKeyId, secretAccessKey) executed!!!");

                    //This class connects to AWS S3 for us
                    AmazonS3 s3client = AmazonS3ClientBuilder.standard().withRegion(region)
                            .withCredentials(new AWSStaticCredentialsProvider(awsCreds)).build();
                    System.out.println("s3Client built!!!");

                    //Specify the file's size
                    ObjectMetadata metadata = new ObjectMetadata();
                    metadata.setContentLength(filePart.getSize());
                    System.out.println("metadata.setContentLength(filePart.getSize()) with filePart.getSize(): " + filePart.getSize());

                    System.out.println("This is the fileName: " + fileName1);
                    //Create the upload request, giving it a bucket name, subdirectory, filename, input stream, and metadata
                    PutObjectRequest uploadRequest = new PutObjectRequest(bucketName, fileName1, fileInputStream, metadata);
                    System.out.println("PutObjectRequest uploadRequest = new PutObjectRequest(bucketName, subdirectory + fileName1, fileInputStream, metadata); execiteed!");

                    //Make it public so we can use it as a public URL on the internet
//                  uploadRequest.setCannedAcl(CannedAccessControlList.PublicRead);
                    System.out.println(" uploadRequest.setCannedAcl(CannedAccessControlList.PublicRead);");

                    //Upload the file. This can take a while for big files!
                    s3client.putObject(uploadRequest);
                    System.out.println("s3client.putObject(uploadRequest); executeed!!!");

                    //Create a URL using the bucket, subdirectory, and file name
                    String fileUrl = "http://s3.amazonaws.com/" + bucketName + "/" + fileName1;
                    System.out.println("fileUrl: " + fileUrl);
                    System.out.println("Upload another image");

                    ObjectMapper mapper = new ObjectMapper();
                    System.out.println("Now we should remove the old image on Amazon S3 server");
                    try{
//                          s3client.deleteObject(new DeleteObjectRequest(bucketName, "orders/C:UsersivanaDesktopconverse.jpg"));
//                          s3client.deleteObject(new DeleteObjectRequest(bucketName, "C:UsersivanaDesktopconverse.jpg"));
                        System.out.println("Mapper will write a fileUrl to react: " + fileUrl);
                        response.setContentType("application/json");
                        System.out.println("response.setContentType(\"application/json\");");
                        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
                        System.out.println("mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);");
                        DateFormat fmt = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss");
                        mapper.setDateFormat(fmt);
                        System.out.println("mapper.setDateFormat(fmt) executed");
                        mapper.writeValue(response.getOutputStream(), fileUrl);
                        System.out.println(" mapper.writeValue(response.getOutputStream(), fileUrl); executeed");
                        return;
                    } catch (AmazonServiceException e) {
                        System.err.println(e.getErrorMessage());
                        System.exit(1);
                    }
                }
                else{
                    //the file was not a JPG or PNG
                    System.out.println("Please only upload JPG or PNG files.");
                }
            }
        }
    }
}
