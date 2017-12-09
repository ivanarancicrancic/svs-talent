package wh.waterHeater;

import org.springframework.stereotype.Component;

@Component
public interface PoweredDevice {
    public void enablePower();
    public void disablePower();

}
