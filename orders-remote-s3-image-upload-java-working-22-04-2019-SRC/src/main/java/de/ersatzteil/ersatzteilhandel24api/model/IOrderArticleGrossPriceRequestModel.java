package de.ersatzteil.ersatzteilhandel24api.model;

public class IOrderArticleGrossPriceRequestModel {

    String orArId;
    String grossPrice;

    public IOrderArticleGrossPriceRequestModel(){}

    public IOrderArticleGrossPriceRequestModel(String orArId, String grossPrice) {
        this.orArId = orArId;
        this.grossPrice = grossPrice;
    }

    public String getOrArId() {
        return orArId;
    }

    public void setOrArId(String orArId) {
        this.orArId = orArId;
    }

    public String getGrossPrice() {
        return grossPrice;
    }

    public void setGrossPrice(String grossPrice) {
        this.grossPrice = grossPrice;
    }
}
