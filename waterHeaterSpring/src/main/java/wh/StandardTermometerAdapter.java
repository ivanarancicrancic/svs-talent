package wh;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import wh.standardTermometer.StandardTermometer;
import wh.waterHeater.PoweredDevice;
import wh.waterHeater.TermometerPoweredDevice;

@Component
@Profile("adapterStandardTermometer")
public class StandardTermometerAdapter implements TermometerPoweredDevice{
    StandardTermometer termometer;

    public StandardTermometerAdapter(StandardTermometer termometer) {
        this.termometer=termometer;
    }

    public void enablePower(){ termometer.turnOn();}
    public void disablePower(){ termometer.turnOff();}

    public int getTemperature(){
        return termometer.getTemperature();
        }
    public void setCurrentTemperature(int temperature){termometer.setCurrentTemperature(temperature);}
}
