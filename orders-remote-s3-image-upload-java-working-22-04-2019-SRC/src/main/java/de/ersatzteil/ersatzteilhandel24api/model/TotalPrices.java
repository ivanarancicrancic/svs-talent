package de.ersatzteil.ersatzteilhandel24api.model;

public class TotalPrices {

    int netPrice = 0;
    int grossPrice = 0;
    int netPriceWD = 0;
    int grossPriceWD = 0;

    public TotalPrices(){}

    public TotalPrices(int netPrice, int grossPrice, int netPriceWD, int grossPriceWD) {
        this.netPrice = netPrice;
        this.grossPrice = grossPrice;
        this.netPriceWD = netPriceWD;
        this.grossPriceWD = grossPriceWD;
    }

    public int getNetPrice() {
        return netPrice;
    }

    public void setNetPrice(int netPrice) {
        this.netPrice = netPrice;
    }

    public int getGrossPrice() {
        return grossPrice;
    }

    public void setGrossPrice(int grossPrice) {
        this.grossPrice = grossPrice;
    }

    public int getNetPriceWD() {
        return netPriceWD;
    }

    public void setNetPriceWD(int netPriceWD) {
        this.netPriceWD = netPriceWD;
    }

    public int getGrossPriceWD() {
        return grossPriceWD;
    }

    public void setGrossPriceWD(int grossPriceWD) {
        this.grossPriceWD = grossPriceWD;
    }


}
