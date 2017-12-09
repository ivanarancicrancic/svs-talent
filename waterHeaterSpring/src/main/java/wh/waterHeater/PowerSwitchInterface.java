package wh.waterHeater;

import org.springframework.stereotype.Component;

@Component
public interface PowerSwitchInterface{
    public void controlPowerFor(PoweredDevice poweredDevice);
    public void turnOn();
    public void turnOff();

}
