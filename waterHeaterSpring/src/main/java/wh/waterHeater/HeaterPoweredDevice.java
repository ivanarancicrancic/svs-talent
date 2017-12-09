package wh.waterHeater;

import org.springframework.stereotype.Component;

@Component
public interface HeaterPoweredDevice extends PoweredDevice {
    public boolean isTurnedOn();
    public void startHeating(int currentTemperature, int desiredTemperature);
    public void stopHeating();
    public void enablePower();
    public void disablePower();
}
