package wh.waterHeater;

import org.springframework.stereotype.Component;

@Component
public interface TermometerPoweredDevice extends PoweredDevice{
    public int getTemperature();
    public void setCurrentTemperature(int temperature);
}

