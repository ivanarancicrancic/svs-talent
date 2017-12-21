package libraryJpa.repository;

import libraryJpa.model.Book;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
@Repository
public class BookRepository1Impl implements BookRepository1 {

    // JDBC URL, username and password of MySQL server
    private static final String url = "jdbc:mysql://localhost:3306/library?useSSL=false&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
    private static final String user = "root";
    private static final String password = "password";
    // JDBC variables for opening and managing connection
    private static Connection con;
    private static Statement stmt;
    private static PreparedStatement ps;
    private static ResultSet rs;

   // @Autowired
 //  private JdbcTemplate jdbcTemplate;


    @Override
    public List<Book> getBooks(){
        String query = "SELECT * FROM library.book";
        System.out.println("Listing all books..");
        List<Book> list = new ArrayList<>();
        try {
            con = DriverManager.getConnection(url, user, password);
            stmt = con.createStatement();
            rs = stmt.executeQuery(query);


            while (rs.next()) {
                int i = rs.getInt("id");
                String str = rs.getString("title");
                String str1 = rs.getString("description");

                //Assuming you have a user object
                Book book = new Book();
                book.setId(i);
                book.setName(str);
                book.setDescription(str1);
                list.add(book);
            }

        } catch (SQLException sqlEx) {
            sqlEx.printStackTrace();
        } finally { //close connection ,stmt and resultset here
            try
            { con.close();
            } catch(SQLException se)
            { /*can't do anything */ }
            try { stmt.close(); }
            catch(SQLException se) { /*can't do anything */ }
            try { rs.close(); }
            catch(SQLException se) { /*can't do anything */ }
        }
        return list;
    }


    @Override
    public Book getBook(Long id){
        String query =  "SELECT * FROM library.book WHERE id="+id ;
        Book book1 = new Book();
        try {
            con = DriverManager.getConnection(url, user, password);
            stmt = con.createStatement();
            rs = stmt.executeQuery(query);
            if(rs.next()){
                int i = rs.getInt("id");
                String str = rs.getString("title");
                String str1 = rs.getString("description");
                //Assuming you have a user object
                book1.setId(i);
                book1.setName(str);
                book1.setDescription(str1);

            }
        } catch (SQLException sqlEx) {
            sqlEx.printStackTrace();
        } finally { //close connection ,stmt and resultset here
            try
            { con.close();
            } catch(SQLException se)
            { /*can't do anything */ }
            try { stmt.close(); }
            catch(SQLException se) { /*can't do anything */ }
            try { rs.close(); }
            catch(SQLException se) { /*can't do anything */ }

        }
        return book1;
    }

    @Override
    public Book createBook(Book book){

        String query = "INSERT INTO library.book (title, description)" + " VALUES ('"+ book.getName() +"','" + book.getDescription()+"');";
        System.out.println("Inserting book..");
        try {

            con = DriverManager.getConnection(url, user, password);
            ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            ps.executeUpdate();

            rs = ps.getGeneratedKeys();
            int generatedKey = 0;
            if (rs.next()) {
                generatedKey = rs.getInt(1);
            }
            System.out.println("Inserted record's ID: " + generatedKey);
            book.setId(generatedKey);

            } catch (SQLException sqlEx) {
            sqlEx.printStackTrace();
        } finally { //close connection ,stmt and resultset here
            try
            { con.close();
            } catch(SQLException se)
            { /*can't do anything */ }
            try { ps.close(); }
            catch(SQLException se) { /*can't do anything */ }
            try { rs.close(); }
            catch(SQLException se) { /*can't do anything */ }

        }
        return book;
    }

    @Override
    public Book updateBook(Long id, Book book){

        String query =  "UPDATE library.book SET title = '"+book.getName() + "', description = '"+book.getDescription()+"' WHERE id="+id ;
        String query1 =  "SELECT * FROM library.book WHERE id="+id ;
        Book book1 = new Book();
        try {
            con = DriverManager.getConnection(url, user, password);
            stmt = con.createStatement();
            stmt.executeUpdate(query);
            rs = stmt.executeQuery(query1);


            if(rs.next()){
                int i = rs.getInt("id");
                String str = rs.getString("title");
                String str1 = rs.getString("description");
                //Assuming you have a user object
                book1.setId(i);
                book1.setName(str);
                book1.setDescription(str1);

            }

            } catch (SQLException sqlEx) {
            sqlEx.printStackTrace();
        } finally { //close connection ,stmt and resultset here
            try
            { con.close();
            } catch(SQLException se)
            { /*can't do anything */ }
            try { stmt.close(); }
            catch(SQLException se) { /*can't do anything */ }
            try { rs.close(); }
            catch(SQLException se) { /*can't do anything */ }

        }

        return book1;
    }

    @Override
    public Book deleteBook(Long id){
        String query1 =  "SELECT * FROM library.book WHERE id="+id ;
        String query =  "DELETE FROM library.book WHERE id="+id ;
        Book book1= new Book();
        try {
            con = DriverManager.getConnection(url, user, password);
            stmt = con.createStatement();
            rs = stmt.executeQuery(query);
            stmt.executeUpdate(query);
            if(rs.next()){
                int i = rs.getInt("id");
                String str = rs.getString("title");
                String str1 = rs.getString("description");
                //Assuming you have a user object
                book1.setId(i);
                book1.setName(str);
                book1.setDescription(str1);

            }

        } catch (SQLException sqlEx) {
            sqlEx.printStackTrace();
        } finally { //close connection ,stmt and resultset here
            try
            { con.close();
            } catch(SQLException se)
            { /*can't do anything */ }
            try { stmt.close(); }
            catch(SQLException se) { /*can't do anything */ }
            try { rs.close(); }
            catch(SQLException se) { /*can't do anything */ }
            }
            return book1;
    }

}
