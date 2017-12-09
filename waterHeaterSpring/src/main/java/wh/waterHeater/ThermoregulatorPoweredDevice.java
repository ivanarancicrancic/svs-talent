package wh.waterHeater;

import org.springframework.stereotype.Component;

@Component
public interface ThermoregulatorPoweredDevice extends PoweredDevice {
    public void setTemperature(int temperature);
    public int getTemperature();
}
