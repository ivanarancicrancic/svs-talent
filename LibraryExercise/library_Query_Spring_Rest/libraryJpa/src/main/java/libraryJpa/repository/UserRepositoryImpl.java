package libraryJpa.repository;

import libraryJpa.model.Library_user;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
@Repository
public class UserRepositoryImpl implements UserRepository {

    // JDBC URL, username and password of MySQL server
    private static final String url = "jdbc:mysql://localhost:3306/library?useSSL=false&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
    private static final String user = "root";
    private static final String password = "password";
    // JDBC variables for opening and managing connection
    private static Connection con;
    private static Statement stmt;
    private static ResultSet rs;
    private static PreparedStatement ps;



    @Override
    public List<Library_user> getAllLibAccounts(){
        System.out.println("Before execute query for users..");

        String query = "SELECT * FROM library.lib";
        System.out.println("Listing all Users..");
        List<Library_user> list = new ArrayList<>();
        try {
            con = DriverManager.getConnection(url, user, password);
            stmt = con.createStatement();
            rs = stmt.executeQuery(query);

            while (rs.next()) {
                int i = rs.getInt("id");
                String str = rs.getString("first_name");
                String str1 = rs.getString("surname");
                //Assuming you have a libraryuser object
                Library_user libraryuser = new Library_user();
                libraryuser.setId(i);
                libraryuser.setName(str);
                libraryuser.setSurname(str1);
                list.add(libraryuser);
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
    public Library_user getUser(Long id){
        String query =  "SELECT * FROM library.lib WHERE id="+id ;
        Library_user libraryuser1 = new Library_user();
        try {
            con = DriverManager.getConnection(url, user, password);
            stmt = con.createStatement();
            rs = stmt.executeQuery(query);
            if(rs.next()){
                int i = rs.getInt("id");
                String str = rs.getString("first_name");
                String str1 = rs.getString("surname");
                //Assuming you have a user object
                libraryuser1.setId(i);
                libraryuser1.setName(str);
                libraryuser1.setSurname(str1);
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
        return libraryuser1;
    }

    @Override
    public Library_user createUser(Library_user libraryuser1){
        String query = "INSERT INTO library.lib (first_name, surname)" + " VALUES ('"+ libraryuser1.getName() +"','" + libraryuser1.getSurname()+"');";
        System.out.println("Inserting user..");
        try {
// opening database connection to MySQL server
            con = DriverManager.getConnection(url, user, password);
            ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            ps.executeUpdate();
            rs = ps.getGeneratedKeys();
            int generatedKey = 0;
            if (rs.next()) {
                generatedKey = rs.getInt(1);
            }
            System.out.println("Inserted record's ID: " + generatedKey);
            libraryuser1.setId(generatedKey);


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
        return libraryuser1;
    }

    @Override
    public Library_user updateUser(Long id, Library_user libraryuser1){
        String query =  "UPDATE library.lib SET first_name = '"+ libraryuser1.getName() + "', surname = '"+ libraryuser1.getSurname()+"' WHERE id="+id ;
        String query1 =  "SELECT * FROM library.lib WHERE id="+id ;
        Library_user libraryuser2 = new Library_user();
        try {
            con = DriverManager.getConnection(url, user, password);
            stmt = con.createStatement();
            stmt.executeUpdate(query);
            rs = stmt.executeQuery(query1);

            if(rs.next()){
                int i = rs.getInt("id");
                String str = rs.getString("first_name");
                String str1 = rs.getString("surname");
                //Assuming you have a user object
                libraryuser2.setId(i);
                libraryuser2.setName(str);
                libraryuser2.setSurname(str1);
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
        return libraryuser2;
    }

    @Override
    public Library_user deleteUser(Long id){
        String query1 =  "SELECT * FROM library.lib WHERE id="+id ;
        String query =  "DELETE FROM library.lib WHERE id="+id ;
        Library_user libraryuser1 = new Library_user();
        try {
            con = DriverManager.getConnection(url, user, password);
            stmt = con.createStatement();
            rs = stmt.executeQuery(query);
            stmt.executeUpdate(query);
            if(rs.next()){
                int i = rs.getInt("id");
                String str = rs.getString("first_name");
                String str1 = rs.getString("surname");
                //Assuming you have a user object
                libraryuser1.setId(i);
                libraryuser1.setName(str);
                libraryuser1.setSurname(str1);
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
        return libraryuser1;
    }

}
