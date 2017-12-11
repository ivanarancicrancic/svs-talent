import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/calculate")
public class CalculatorServlet extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("com.seavus.hellowebworld.HelloWebWorldServlet.doGet");
        printMessage(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("com.seavus.hellowebworld.HelloWebWorldServlet.doPost");
        printMessage(req, resp);
    }

    private void printMessage(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String entry="";
        int result=0;
        entry = req.getParameter("num1");
        int num1 = Integer.parseInt(entry);

        entry = req.getParameter("num2");
        int num2 = Integer.parseInt(entry);

        entry = req.getParameter("op");

        switch (entry) {
            case "+":  result = num1 + num2;
                break;
            case "-":  result = num1 - num2;
                break;
            case "*":  result = num1 * num2;
                break;

            case "/":  result = num1 / num2;
                break;
        }
        resp.setContentType("text/html");
        resp.getWriter().println("Result is: " + result);
    }
}