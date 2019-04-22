package de.ersatzteil.ersatzteilhandel24api.model;

public class IOrderArticleQuantityRequestModel {
    String orArId;
    String quantity;

    public IOrderArticleQuantityRequestModel() {
    }

    public IOrderArticleQuantityRequestModel(String orArId, String quantity) {
        this.orArId = orArId;
        this.quantity = quantity;
    }

    public String getOrArId() {
        return orArId;
    }

    public void setOrArId(String orArId) {
        this.orArId = orArId;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
}
