package de.ersatzteil.ersatzteilhandel24api.database;

import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import de.ersatzteil.ersatzteilhandel24api.model.*;

import javax.ws.rs.HttpMethod;
import javax.ws.rs.WebApplicationException;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

public class Project {

    public List<Order> getOrderList(Connection connection) throws Exception
    {
        List<Order> order_items = new ArrayList<Order>();
        PreparedStatement ps=null;
        try
        {

//            ps = connection.prepareStatement("INSERT INTO `ersatzteilhandel24ddbb`.`orders`\n" +
//                    "            (`orders_id`, `orderDate`, `paymentMethod`, `shippingWay`, `anrede`, `firstName`, `lastName`, `companyName`, `country`, `street`, `houseNumber`, `city`, `postcode`, `phoneNumber`, `email`, `latest`, `netPrice`, `grossPrice`, `netPriceWD`, `grossPriceWD`, `canceled`, `cancelreason`)\n" +
//                    "            VALUES('5383858398958DDD893', '2012-06-18 10:34:09', 'credit card', 'dhl', 'anrede', 'Ivana', 'Rancic', 'app-logik', 'Macedonia', 'Jani Lukrevski', '1', 'Skopje', '1000', '03479373522', 'ivana.rancic@app-logik.de', '1', '1000', '5000', '2000', '3000', 0, '/')");

//            ps.executeUpdate();

            ps = connection.prepareStatement("select * from orders order by orderDate");
            ResultSet rs = ps.executeQuery();

            while(rs.next())
            {

                Boolean statusBoolean = rs.getBoolean(21);
                String status  = "";
                if(statusBoolean == false)
                    status = "active";
                else
                    status = "canceled";
                Date d = rs.getTimestamp(2);
                Order order = new Order(
                        rs.getString(1),
                        d,
                        rs.getString(3),
                        rs.getString(4),
                        rs.getString(5),
                        rs.getString(6),
                        rs.getString(7),
                        rs.getString(8),
                        rs.getString(9),
                        rs.getString(10),
                        rs.getString(11),
                        rs.getString(12),
                        rs.getString(13),
                        rs.getString(14),
                        rs.getString(15),
                        rs.getInt(16),
                        rs.getString(17),
                        rs.getString(18),
                        rs.getString(19),
                        rs.getString(20),
                        status,
                        rs.getString(22)
                );

                order_items.add(order);
            }

            if (order_items==null || order_items.isEmpty()){
                throw new WebApplicationException(404);
            }
            else
            {
                return order_items;
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw e;
        }
        finally {
            ps.close();
            connection.close();
        }
    }


    public TotalPrices recalculateTotalPrices(Connection connection) throws Exception
    {
        TotalPrices totalPrices = new TotalPrices();
        PreparedStatement ps=null;
        try
        {
            ps = connection.prepareStatement("select sum(netPrice) from orders where canceled=0");
            ResultSet rs = ps.executeQuery();
            rs.next();
            String sum = rs.getString(1);
            if(sum==null)
                totalPrices.setNetPrice(0);
            else
                totalPrices.setNetPrice((int)Float.parseFloat(sum));

            ps = connection.prepareStatement("select sum(grossPrice) from orders where canceled=0");
            ResultSet rs1 = ps.executeQuery();
            rs1.next();
            String sum1 = rs1.getString(1);
            if(sum1==null)
                totalPrices.setGrossPrice(0);
            else
                totalPrices.setGrossPrice((int)Float.parseFloat(sum1));

            ps = connection.prepareStatement("select sum(netPriceWD) from orders where canceled=0");
            ResultSet rs2 = ps.executeQuery();
            rs2.next();
            String sum2 = rs2.getString(1);
            if(sum2==null)
                totalPrices.setNetPriceWD(0);
            else
                totalPrices.setNetPriceWD((int)Float.parseFloat(sum2));

            ps = connection.prepareStatement("select sum(grossPriceWD) from orders where canceled=0");
            ResultSet rs3 = ps.executeQuery();
            rs3.next();
            String sum3 = rs3.getString(1);
            if(sum3==null)
                totalPrices.setGrossPriceWD(0);
            else
                totalPrices.setGrossPriceWD((int)Float.parseFloat(sum3));


            if (totalPrices==null){
                totalPrices.setNetPrice(0);
                totalPrices.setGrossPrice(0);
                totalPrices.setNetPriceWD(0);
                totalPrices.setGrossPriceWD(0);
                return totalPrices;
            }
            else
            {
                return totalPrices;
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw e;
        }
        finally {
            ps.close();
            connection.close();
        }
    }



    public TotalPrices recalculateFilteredTotalPrices(Connection connection, Date startDate, Date endDate) throws Exception
    {
        TotalPrices totalPrices = new TotalPrices();
        PreparedStatement ps=null;
        try
        {
            DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
            Date currentDate =startDate;

            Calendar c = Calendar.getInstance();
            c.setTime(currentDate);
            c.add(Calendar.DATE, 1);
            c.set(Calendar.HOUR_OF_DAY, 0);
            c.set(Calendar.MINUTE, 0);
            c.set(Calendar.SECOND, 0);
            Date currentDatePlus3 = c.getTime();
            startDate = currentDatePlus3;

            currentDate = endDate;
            c = Calendar.getInstance();
            c.setTime(currentDate);
            c.add(Calendar.DATE, 1);
            c.set(Calendar.HOUR_OF_DAY, 23);
            c.set(Calendar.MINUTE, 59);
            c.set(Calendar.SECOND, 59);
            endDate = c.getTime();

            ps = connection.prepareStatement("select sum(netPrice) from orders where canceled=0 and orderDate >= ? AND orderDate <= ?");
            java.util.Date uDate = startDate;
            java.sql.Timestamp sDate = new java.sql.Timestamp(startDate.getTime());
            ps.setTimestamp(1, sDate);
            ps.setTimestamp(2, new java.sql.Timestamp(endDate.getTime()));

            ResultSet rs = ps.executeQuery();
            rs.next();
            String sum = rs.getString(1);
             if(sum != null) {
                 totalPrices.setNetPrice((int) Float.parseFloat(sum));
             }
             else{
                 totalPrices.setNetPrice(0);
             }

            ps = connection.prepareStatement("select sum(grossPrice) from orders where canceled=0 and orderDate >= ? AND orderDate <= ?");
            ps.setTimestamp(1, sDate);
            ps.setTimestamp(2, new java.sql.Timestamp(endDate.getTime()));

            ResultSet rs1 = ps.executeQuery();
            rs1.next();
            String sum1 = rs1.getString(1);

            if(sum1 != null) {
                totalPrices.setGrossPrice((int)Float.parseFloat(sum1));
            }
            else{
                totalPrices.setGrossPrice(0);
            }



            ps = connection.prepareStatement("select sum(netPriceWD) from orders where canceled=0 and orderDate >= ? AND orderDate <= ?");
            ps.setTimestamp(1, sDate);
            ps.setTimestamp(2, new java.sql.Timestamp(endDate.getTime()));
            ResultSet rs2 = ps.executeQuery();
            rs2.next();
            String sum2 = rs2.getString(1);

            if(sum2 != null) {
                totalPrices.setNetPriceWD((int)Float.parseFloat(sum2));
            }
            else{
                totalPrices.setNetPriceWD(0);
            }



            ps = connection.prepareStatement("select sum(grossPriceWD) from orders where canceled=0 and orderDate >= ? AND orderDate <= ?");
            ps.setTimestamp(1, sDate);
            ps.setTimestamp(2, new java.sql.Timestamp(endDate.getTime()));
            ResultSet rs3 = ps.executeQuery();
            rs3.next();
            String sum3 = rs3.getString(1);

            if(sum3 != null) {
                totalPrices.setGrossPriceWD((int)Float.parseFloat(sum3));
            }
            else{
                totalPrices.setGrossPriceWD(0);
            }


            if (totalPrices==null){
                totalPrices.setNetPrice(0);
                totalPrices.setGrossPrice(0);
                totalPrices.setNetPriceWD(0);
                totalPrices.setGrossPriceWD(0);
                return totalPrices;
            }
            else
            {
                return totalPrices;
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw e;
        }
        finally {
            ps.close();
            connection.close();
        }
    }


    public List<Order> getFilteredOrders(Connection connection, Date startDate, Date endDate) throws Exception
    {
        List<Order> order_items = new ArrayList<Order>();
        PreparedStatement ps=null;
        try
        {
            DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
            Date currentDate =startDate;
            Calendar c = Calendar.getInstance();
            c.setTime(currentDate);

            c.add(Calendar.DATE, 1);
            c.set(Calendar.HOUR_OF_DAY, 0);
            c.set(Calendar.MINUTE, 0);
            c.set(Calendar.SECOND, 0);

            Date currentDatePlus3 = c.getTime();
            startDate = currentDatePlus3;

             currentDate = endDate;
             c = Calendar.getInstance();
             c.setTime(currentDate);
             c.add(Calendar.DATE, 1);
             c.set(Calendar.HOUR_OF_DAY, 23);
             c.set(Calendar.MINUTE, 59);
             c.set(Calendar.SECOND, 59);
             endDate = c.getTime();

            ps = connection.prepareStatement("select * from orders where orderDate >= ? AND orderDate <= ?");

            java.util.Date uDate = startDate;
            java.sql.Timestamp sDate = new java.sql.Timestamp(startDate.getTime());
            ps.setTimestamp(1, sDate);
            ps.setTimestamp(2, new java.sql.Timestamp(endDate.getTime()));

            ResultSet rs = ps.executeQuery();
            while(rs.next())
            {
                Boolean statusBoolean = rs.getBoolean(21);
                String status  = "";
                if(statusBoolean == false)
                    status = "active";
                else
                    status = "canceled";
                Date d = rs.getTimestamp(2) ;
                Order order = new Order(
                        rs.getString(1),
                        d,
                        rs.getString(3),
                        rs.getString(4),
                        rs.getString(5),
                        rs.getString(6),
                        rs.getString(7),
                        rs.getString(8),
                        rs.getString(9),
                        rs.getString(10),
                        rs.getString(11),
                        rs.getString(12),
                        rs.getString(13),
                        rs.getString(14),
                        rs.getString(15),
                        rs.getInt(16),
                        rs.getString(17),
                        rs.getString(18),
                        rs.getString(19),
                        rs.getString(20),
                        status,
                        rs.getString(22)
                );

                order_items.add(order);
            }

            if (order_items==null || order_items.isEmpty()){
                return  null;
            }
            else
            {

                return order_items;
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw e;
        }
        finally {
            ps.close();
            connection.close();
        }
    }

    public Order getOrderDetails(Connection connection, String order_id) throws Exception
    {
        Order order_item = new Order();
        PreparedStatement ps=null;
        try
        {
            ps = connection.prepareStatement("select * from orders where orders_id = ?");
            ps.setString(1, order_id);

            ResultSet rs = ps.executeQuery();

            while(rs.next()) {
                Boolean statusBoolean = rs.getBoolean(21);
                String status  = "";
                if(statusBoolean)
                    status = "active";
                else
                    status = "canceled";
                Date d = rs.getTimestamp(2);
                Order order = new Order(
                        rs.getString(1),
                        d,
                        rs.getString(3),
                        rs.getString(4),
                        rs.getString(5),
                        rs.getString(6),
                        rs.getString(7),
                        rs.getString(8),
                        rs.getString(9),
                        rs.getString(10),
                        rs.getString(11),
                        rs.getString(12),
                        rs.getString(13),
                        rs.getString(14),
                        rs.getString(15),
                        rs.getInt(16),
                        rs.getString(17),
                        rs.getString(18),
                        rs.getString(19),
                        rs.getString(20),
                        status,
                        rs.getString(22)
                );
                order_item = order;
            }

            if (order_item==null){
                return  null;
            }
            else
            {
                return order_item;
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw e;
        }
        finally {
            ps.close();
            connection.close();
        }
    }

    public List<OrderArticles> getOrderArticlesList(Connection connection, String order_id) throws Exception
    {
        List<OrderArticles> order_articles_items = new ArrayList<>();
        PreparedStatement ps=null;
        try
        {
            ps = connection.prepareStatement("select * from orderarticle where orders_id = ?");
            ps.setString(1, order_id);
            ResultSet rs = ps.executeQuery();

            while(rs.next())
            {
                OrderArticles order_article = new OrderArticles(
                        rs.getString(1),
                        rs.getString(2),
                        rs.getString(3),
                        rs.getString(4),
                        rs.getString(5),
                        rs.getString(6),
                        rs.getString(7),
                        rs.getString(8),
                        rs.getString(9),
                        rs.getString(10),
                        rs.getString(11),
                        rs.getString(12)
                );

//                System.out.println("PictureUrl: " + order_article.getArticlePictureUrl());
                order_articles_items.add(order_article);
            }

            if (order_articles_items==null ){
                throw new WebApplicationException(404);

            }
            else
            {
                return order_articles_items;

            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw e;
        }
        finally {
            ps.close();
            connection.close();
        }
    }

    public void editOrder(Connection connection, Order order_item) throws Exception
    {
        PreparedStatement ps=null;
        try
        {
            ps = connection.prepareStatement(" UPDATE orders SET paymentMethod=?, shippingWay=?, anrede=?, firstName=?, lastName=?, companyName=?, country=?," +
                    " street=?, houseNumber=?, city=?, postcode=?, phoneNumber=?, email=?, netPrice=?, grossPrice=?, netPriceWD=?, grossPriceWD=?" +
                    "WHERE orders_id = ?");
            ps.setString(1, order_item.getPaymentMethod());
            ps.setString(2, order_item.getShippingWay());
            ps.setString(3, order_item.getAnrede());
            ps.setString(4, order_item.getFirstName());
            ps.setString(5, order_item.getLastName());
            ps.setString(6, order_item.getCompanyName());
            ps.setString(7, order_item.getCountry());
            ps.setString(8, order_item.getStreet());
            ps.setString(9, order_item.getHouseNumber());
            ps.setString(10, order_item.getCity());
            ps.setString(11, order_item.getPostcode());
            ps.setString(12, order_item.getPhoneNumber());
            ps.setString(13, order_item.getEmail());
            ps.setString(14, order_item.getNetPrice());
            ps.setString(15, order_item.getGrossPrice());
            ps.setString(16, order_item.getNetPriceWD());
            ps.setString(17, order_item.getGrossPriceWD());
            ps.setString(18, order_item.getOrder_id());
            ps.executeUpdate();
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw e;
        }
        finally {
            ps.close();
            connection.close();
        }
    }


    public void decrementQuantityOrder(Connection connection, IOrderArticleQuantityRequestModel order_article) throws Exception {
        PreparedStatement ps = null;
            try {
                ps = connection.prepareStatement(" UPDATE orderarticle SET  articleQuantity= ? WHERE orderarticle_id = ?");
                ps.setString(1, order_article.getQuantity());
                ps.setString(2, order_article.getOrArId());
                ps.executeUpdate();
            } catch (Exception e) {
                e.printStackTrace();
                throw e;
            } finally {
                ps.close();
                connection.close();
            }
    }


    public void updateNetPriceOrder(Connection connection, IOrderArticleNetPriceRequestModel order_article) throws Exception {
        PreparedStatement ps = null;
        try {
            ps = connection.prepareStatement(" UPDATE orderarticle SET  articleNetPrice= ? WHERE orderarticle_id = ?");
            ps.setString(1, order_article.getNetPrice());
            ps.setString(2, order_article.getOrArId());
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            ps.close();
            connection.close();
        }
    }

    public void updateGrossPriceOrder(Connection connection, IOrderArticleGrossPriceRequestModel order_article) throws Exception {
        PreparedStatement ps = null;
        try {
            ps = connection.prepareStatement(" UPDATE orderarticle SET  articleGrossPrice= ? WHERE orderarticle_id = ?");
            ps.setString(1, order_article.getGrossPrice());
            ps.setString(2, order_article.getOrArId());
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            ps.close();
            connection.close();
        }
    }


    public void deleteArticleFromOrder(Connection connection, String order_article_id) throws Exception {
        PreparedStatement ps = null;
        try {

            ps = connection.prepareStatement(" select * from orderarticle WHERE orderarticle_id = ?");
            ps.setString(1, order_article_id);

            ResultSet rs = ps.executeQuery();
            OrderArticles order_article = new OrderArticles();

            while(rs.next()) {
                 order_article = new OrderArticles(
                        rs.getString(1),
                        rs.getString(2),
                        rs.getString(3),
                        rs.getString(4),
                        rs.getString(5),
                        rs.getString(6),
                        rs.getString(7),
                        rs.getString(8),
                        rs.getString(9),
                        rs.getString(10),
                        rs.getString(11),
                         rs.getString(12)
                );
            }

            ps = connection.prepareStatement(" select * from orders WHERE orders_id = ?");
            ps.setString(1, order_article.getOrders_id());

            ResultSet rs1 = ps.executeQuery();
            Order order = new Order();

            while(rs1.next()) {
                Boolean statusBoolean = rs1.getBoolean(21);
                String status  = "";
                if(statusBoolean)
                    status = "active";
                else
                    status = "canceled";
                Date d = rs1.getTimestamp(2);
                 order = new Order(
                        rs1.getString(1),
                        d,
                        rs1.getString(3),
                        rs1.getString(4),
                        rs1.getString(5),
                        rs1.getString(6),
                        rs1.getString(7),
                        rs1.getString(8),
                        rs1.getString(9),
                        rs1.getString(10),
                        rs1.getString(11),
                        rs1.getString(12),
                        rs1.getString(13),
                        rs1.getString(14),
                        rs1.getString(15),
                        rs1.getInt(16),
                        rs1.getString(17),
                        rs1.getString(18),
                        rs1.getString(19),
                        rs1.getString(20),
                        status,
                        rs1.getString(22)
                );
            }
            System.out.println("Order netPrice: " + order.getNetPrice());
            System.out.println("OrderArticle netprice: " + order_article.getArticleNetPrice());
            System.out.println("OrderArticle quantity: " + order_article.getArticleQuantity());
            int newNetPrice = Integer.parseInt(order.getNetPrice()) - Integer.parseInt(order_article.getArticleNetPrice())*  Integer.parseInt(order_article.getArticleQuantity());
            int newGrossPrice = Integer.parseInt(order.getGrossPrice()) - Integer.parseInt(order_article.getArticleGrossPrice())*  Integer.parseInt(order_article.getArticleQuantity());
            String newNetPriceString = Integer.toString(newNetPrice);
            String newGrossPriceString = Integer.toString(newGrossPrice);

            ps = connection.prepareStatement("update orders set netPrice = ?, grossPrice = ? WHERE orders_id = ?");
            ps.setString(1, newNetPriceString);
            ps.setString(2, newGrossPriceString);
            ps.setString(3, order.getOrder_id());
            ps.executeUpdate();

            ps = connection.prepareStatement(" delete from orderarticle WHERE orderarticle_id = ?");
            ps.setString(1, order_article_id);
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            ps.close();
            connection.close();
        }
    }

    public Order cancelOrder(Connection connection, String order_id, String cancelreason) throws Exception
    {
        Order order = new Order();
        PreparedStatement ps=null;
        try {
            ps = connection.prepareStatement("UPDATE orders SET canceled = true, cancelreason= ? WHERE orders_id = ?");
            ps.setString(1, cancelreason);
            ps.setString(2, order_id);
            ps.executeUpdate();

            return order;
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw e;
        }
        finally {
            ps.close();
            connection.close();
        }
    }

    public void setProductImageUrl(Connection connection, String productId, String key, String url1) throws Exception {
        PreparedStatement ps = null;
        try {
            ps = connection.prepareStatement("UPDATE orderarticle SET articlePictureUrl= ?, imageKey= ? WHERE orderarticle_id = ?");
            ps.setString(1, url1);
            ps.setString(2, key);
            ps.setString(3, productId);
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            ps.close();
            connection.close();
        }


        Order order = new Order();




    }


    public String getUrlInfo(Connection connection, String productId) throws Exception {
        PreparedStatement ps = null;
        try {

            OrderArticles order_article1 = new OrderArticles();
            ps = connection.prepareStatement(" SELECT * from orderarticle WHERE orderarticle_id = ?");
            ps.setString(1, productId);
            ResultSet rs =  ps.executeQuery();

            while(rs.next())
            {
                OrderArticles order_article = new OrderArticles(
                        rs.getString(1),
                        rs.getString(2),
                        rs.getString(3),
                        rs.getString(4),
                        rs.getString(5),
                        rs.getString(6),
                        rs.getString(7),
                        rs.getString(8),
                        rs.getString(9),
                        rs.getString(10),
                        rs.getString(11),
                        rs.getString(12)
                );

                order_article1 = order_article;
            }

            return order_article1.getImageKey();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            ps.close();
            connection.close();
        }


    }

}
