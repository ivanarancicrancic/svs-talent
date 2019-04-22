package de.ersatzteil.ersatzteilhandel24api.model;

public class IOrderArticleNetPriceRequestModel {

    String orArId;
    String netPrice;

    public IOrderArticleNetPriceRequestModel(){}

    public IOrderArticleNetPriceRequestModel(String orArId, String netPrice) {
        this.orArId = orArId;
        this.netPrice = netPrice;
    }

    public String getOrArId() {
        return orArId;
    }

    public void setOrArId(String orArId) {
        this.orArId = orArId;
    }

    public String getNetPrice() {
        return netPrice;
    }

    public void setNetPrice(String netPrice) {
        this.netPrice = netPrice;
    }
}
