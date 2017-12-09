package wh;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import wh.advancedTermometer.AdvancedTermometer;
import wh.waterHeater.PoweredDevice;
import wh.waterHeater.TermometerPoweredDevice;

@Component
@Profile("adapterAdvancedTermometer")
public class AdvancedTermometerAdapter implements TermometerPoweredDevice{
    AdvancedTermometer termometer;

public AdvancedTermometerAdapter(AdvancedTermometer termometer){
    this.termometer=termometer;
}
    public void enablePower(){ termometer.turnOn();}
    public void disablePower(){ termometer.turnOff();}

    public int getTemperature(){
        return termometer.getTemperature();
    }

    public void setCurrentTemperature(int temperature){termometer.setCurrentTemperature(temperature);}

}
