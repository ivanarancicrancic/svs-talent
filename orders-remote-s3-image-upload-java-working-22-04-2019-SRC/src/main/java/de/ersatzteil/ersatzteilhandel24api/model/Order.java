package de.ersatzteil.ersatzteilhandel24api.model;
import java.util.Date;

public class Order {

    private String order_id ;
    private Date orderDate ;
    private String paymentMethod;
    private String shippingWay;
    private String anrede;
    private String firstName;
    private String lastName;
    private String companyName;
    private String country;
    private String street;
    private String houseNumber;
    private String city;
    private String postcode;
    private String phoneNumber;
    private String email;
    private int latest;
    private String netPrice;
    private String grossPrice;
    private String netPriceWD;
    private String grossPriceWD;
    private String status;
    private String cancelReason;


    public Order(){}

    public Order(String order_id) {
        this.order_id = order_id;
    }

    public Order(String order_id, Date orderDate, String paymentMethod, String shippingWay, String anrede, String firstName, String lastName, String companyName, String country, String street, String houseNumber, String city, String postcode, String phoneNumber, String email, int latest, String netPrice, String grossPrice, String netPriceWD, String grossPriceWD, String status, String cancelReason) {
        this.order_id = order_id;
        this.orderDate = orderDate;
        this.paymentMethod = paymentMethod;
        this.shippingWay = shippingWay;
        this.anrede = anrede;
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.country = country;
        this.street = street;
        this.houseNumber = houseNumber;
        this.city = city;
        this.postcode = postcode;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.latest = latest;
        this.netPrice = netPrice;
        this.grossPrice = grossPrice;
        this.netPriceWD = netPriceWD;
        this.grossPriceWD = grossPriceWD;
        this.status = status;
        this.cancelReason = cancelReason;
    }

    public String getOrder_id() {
        return order_id;
    }

    public void setOrder_id(String order_id) {
        this.order_id = order_id;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getShippingWay() {
        return shippingWay;
    }

    public void setShippingWay(String shippingWay) {
        this.shippingWay = shippingWay;
    }

    public String getAnrede() {
        return anrede;
    }

    public void setAnrede(String anrede) {
        this.anrede = anrede;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getLatest() {
        return latest;
    }

    public void setLatest(int latest) {
        this.latest = latest;
    }

    public String getNetPrice() {
        return netPrice;
    }

    public void setNetPrice(String netPrice) {
        this.netPrice = netPrice;
    }

    public String getGrossPrice() {
        return grossPrice;
    }

    public void setGrossPrice(String grossPrice) {
        this.grossPrice = grossPrice;
    }

    public String getNetPriceWD() {
        return netPriceWD;
    }

    public void setNetPriceWD(String netPriceWD) {
        this.netPriceWD = netPriceWD;
    }

    public String getGrossPriceWD() {
        return grossPriceWD;
    }

    public void setGrossPriceWD(String grossPriceWD) {
        this.grossPriceWD = grossPriceWD;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCancelReason() {
        return cancelReason;
    }

    public void setCancelReason(String cancelReason) {
        this.cancelReason = cancelReason;
    }
}
