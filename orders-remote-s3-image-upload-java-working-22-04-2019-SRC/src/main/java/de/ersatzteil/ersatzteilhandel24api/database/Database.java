package de.ersatzteil.ersatzteilhandel24api.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Database {
    public Connection Get_Connection() throws Exception
    {
        try
        {
            String connectionURL ="jdbc:mysql://localhost:3306/ersatzteilhandel24ddbb?useUnicode=true&characterEncoding=UTF-8&zeroDateTimeBehavior=CONVERT_TO_NULL&serverTimezone=GMT&useSSL=false";
            Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
            Connection connection = DriverManager.getConnection(connectionURL, "root", "invictus123$%^");
            return connection;
        }
        catch (SQLException e)
        {
            throw e;
        }
        catch (Exception e)
        {
            throw e;
        }
    }

}
