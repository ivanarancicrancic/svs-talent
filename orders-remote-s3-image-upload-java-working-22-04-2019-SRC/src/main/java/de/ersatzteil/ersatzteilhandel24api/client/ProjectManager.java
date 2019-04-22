package de.ersatzteil.ersatzteilhandel24api.client;

import de.ersatzteil.ersatzteilhandel24api.database.Database;
import de.ersatzteil.ersatzteilhandel24api.database.Project;
import de.ersatzteil.ersatzteilhandel24api.model.*;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ProjectManager {

    public List<Order> getOrderList() throws Exception {
        List<Order> order_items = new ArrayList<>();
        try {
            Database database= new Database();
            Connection connection = database.Get_Connection();
            Project project= new Project();
            order_items=project.getOrderList(connection);

            if(order_items == null){
                Order o = new Order();
                o.setLatest(0);
                order_items.add(o);
            }
        } catch (Exception e) {
            throw e;
        }
        return order_items;
    }

    public TotalPrices recalculateTotalPrices() throws Exception {
        TotalPrices totalPrices = new TotalPrices();
        try {
            Database database= new Database();
            Connection connection = database.Get_Connection();
            Project project= new Project();
            totalPrices = project.recalculateTotalPrices(connection);

            if(totalPrices == null){
                totalPrices.setNetPrice(0);
                totalPrices.setGrossPrice(0);
                totalPrices.setNetPriceWD(0);
                totalPrices.setGrossPriceWD(0);
            }
        } catch (Exception e) {
            throw e;
        }
        return totalPrices;
    }


    public TotalPrices recalculateFilteredTotalPrices(Date startDate, Date endDate) throws Exception {
        TotalPrices totalPrices = new TotalPrices();
        try {
            Database database= new Database();
            Connection connection = database.Get_Connection();
            Project project= new Project();
            totalPrices = project.recalculateFilteredTotalPrices(connection, startDate, endDate);

            if(totalPrices == null){
                totalPrices.setNetPrice(0);
                totalPrices.setGrossPrice(0);
                totalPrices.setNetPriceWD(0);
                totalPrices.setGrossPriceWD(0);
            }
        } catch (Exception e) {
            throw e;
        }
        return totalPrices;
    }

    public List<Order> getFilteredOrders(Date startDate, Date endDate) throws Exception {
        List<Order> order_items = new ArrayList<>();
        try {
            Database database= new Database();
            Connection connection = database.Get_Connection();
            Project project= new Project();
            order_items=project.getFilteredOrders(connection, startDate, endDate);

            if(order_items == null){
                Order o = new Order();
                order_items = new ArrayList<>();
                order_items.add(o);
            }

        } catch (Exception e) {
            throw e;
        }
        return order_items;
    }


    public Order getOrderDetails(String order_id) throws Exception {
        Order order_item = new Order();
        try {
            Database database= new Database();
            Connection connection = database.Get_Connection();
            Project project= new Project();
            order_item = project.getOrderDetails(connection, order_id);
        } catch (Exception e) {
            throw e;
        }
        return order_item;
    }


    public List<OrderArticles> getOrderArticlesList(String order_id) throws Exception{

        List<OrderArticles> order_articles_items = new ArrayList<>();
        try {
            Database database= new Database();
            Connection connection = database.Get_Connection();
            Project project= new Project();
            order_articles_items=project.getOrderArticlesList(connection, order_id);
//            System.out.println("PicUrl: " + order_articles_items.get(0).getArticlePictureUrl());
            if(order_articles_items == null){
                OrderArticles o = new OrderArticles();
                order_articles_items.add(o);
            }

        } catch (Exception e) {
            throw e;
        }
        return order_articles_items;


    }


    public void editOrder(Order order_item) throws Exception{
        try {
            Database database= new Database();
            Connection connection = database.Get_Connection();
            Project project= new Project();
            project.editOrder(connection, order_item);

        } catch (Exception e) {
            throw e;
        }

    }

    public void decrementQuantityOrder(IOrderArticleQuantityRequestModel order_article) throws Exception{

        System.out.println("Decrement called but shouldn't be!");
        try {
            Database database= new Database();
            Connection connection = database.Get_Connection();
            Project project= new Project();
            project.decrementQuantityOrder(connection, order_article);

        } catch (Exception e) {
            throw e;
        }

    }


    public void updateNetPriceOrder(IOrderArticleNetPriceRequestModel order_article) throws Exception{

        try {
            Database database= new Database();
            Connection connection = database.Get_Connection();
            Project project= new Project();
            project.updateNetPriceOrder(connection, order_article);

        } catch (Exception e) {
            throw e;
        }

    }

    public void updateGrossPriceOrder(IOrderArticleGrossPriceRequestModel order_article) throws Exception{

        try {
            Database database= new Database();
            Connection connection = database.Get_Connection();
            Project project= new Project();
            project.updateGrossPriceOrder(connection, order_article);

        } catch (Exception e) {
            throw e;
        }

    }


    public void setProductImageUrl(String orArId, String key, String url) throws Exception{

        try {
            Database database= new Database();
            Connection connection = database.Get_Connection();
            Project project= new Project();
            project.setProductImageUrl(connection, orArId, key, url);

        } catch (Exception e) {
            throw e;
        }

    }


    public String getUrlInfo(String orArId) throws Exception{

        try {
            Database database= new Database();
            Connection connection = database.Get_Connection();
            Project project= new Project();
            return project.getUrlInfo(connection, orArId);

        } catch (Exception e) {
            throw e;
        }

    }

    public void deleteArticleFromOrder(String order_article_id) throws Exception{

        try {
            Database database= new Database();
            Connection connection = database.Get_Connection();
            Project project= new Project();
            project.deleteArticleFromOrder(connection, order_article_id);

        } catch (Exception e) {
            throw e;
        }
    }

    public Order cancelOrder(String order_id, String cancel_reason) throws Exception{

        Order order = new Order();
        try {
            Database database= new Database();
            Connection connection = database.Get_Connection();
            Project project= new Project();
            order = project.cancelOrder(connection, order_id, cancel_reason);
            return order;
        } catch (Exception e) {
            throw e;
        }
    }




}
