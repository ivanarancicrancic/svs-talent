package de.ersatzteil.ersatzteilhandel24api.model;

public class OrderArticles {

      String orArId;
      String orders_id;
      String articleName;
      String articleDescription;
      String articlePromotion;
      String articleQuantity;
      String articleNetPrice;
      String articleGrossPrice;
      String articleNetPriceWD;
      String articleGrossPriceWD;
      String articlePictureUrl;
      String imageKey;

      public OrderArticles(){}

    public OrderArticles(String orArId, String orders_id, String articleName, String articleDescription, String articlePromotion, String articleQuantity, String articleNetPrice, String articleGrossPrice, String articleNetPriceWD, String articleGrossPriceWD, String articlePictureUrl, String imageKey) {
        this.orArId = orArId;
        this.orders_id = orders_id;
        this.articleName = articleName;
        this.articleDescription = articleDescription;
        this.articlePromotion = articlePromotion;
        this.articleQuantity = articleQuantity;
        this.articleNetPrice = articleNetPrice;
        this.articleGrossPrice = articleGrossPrice;
        this.articleNetPriceWD = articleNetPriceWD;
        this.articleGrossPriceWD = articleGrossPriceWD;
        this.articlePictureUrl = articlePictureUrl;
        this.imageKey = imageKey;
    }

    public String getOrArId() {
        return orArId;
    }

    public void setOrArId(String orArId) {
        this.orArId = orArId;
    }

    public String getOrders_id() {
        return orders_id;
    }

    public void setOrders_id(String orders_id) {
        this.orders_id = orders_id;
    }

    public String getArticleName() {
        return articleName;
    }

    public void setArticleName(String articleName) {
        this.articleName = articleName;
    }

    public String getArticleDescription() {
        return articleDescription;
    }

    public void setArticleDescription(String articleDescription) {
        this.articleDescription = articleDescription;
    }

    public String getArticlePromotion() {
        return articlePromotion;
    }

    public void setArticlePromotion(String articlePromotion) {
        this.articlePromotion = articlePromotion;
    }

    public String getArticleQuantity() {
        return articleQuantity;
    }

    public void setArticleQuantity(String articleQuantity) {
        this.articleQuantity = articleQuantity;
    }

    public String getArticleNetPrice() {
        return articleNetPrice;
    }

    public void setArticleNetPrice(String articleNetPrice) {
        this.articleNetPrice = articleNetPrice;
    }

    public String getArticleGrossPrice() {
        return articleGrossPrice;
    }

    public void setArticleGrossPrice(String articleGrossPrice) {
        this.articleGrossPrice = articleGrossPrice;
    }

    public String getArticleNetPriceWD() {
        return articleNetPriceWD;
    }

    public void setArticleNetPriceWD(String articleNetPriceWD) {
        this.articleNetPriceWD = articleNetPriceWD;
    }

    public String getArticleGrossPriceWD() {
        return articleGrossPriceWD;
    }

    public void setArticleGrossPriceWD(String articleGrossPriceWD) {
        this.articleGrossPriceWD = articleGrossPriceWD;
    }

    public String getArticlePictureUrl() {
        return articlePictureUrl;
    }

    public void setArticlePictureUrl(String articlePictureUrl) {
        this.articlePictureUrl = articlePictureUrl;
    }

    public String getImageKey() {
        return imageKey;
    }

    public void setImageKey(String imageKey) {
        this.imageKey = imageKey;
    }
}
