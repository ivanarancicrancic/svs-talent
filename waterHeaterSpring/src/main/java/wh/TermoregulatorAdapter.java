package wh;

import org.springframework.stereotype.Component;
import wh.termoregulator.Termoregulator;
import wh.waterHeater.PoweredDevice;
import wh.waterHeater.ThermoregulatorPoweredDevice;

@Component
public class TermoregulatorAdapter implements ThermoregulatorPoweredDevice{
    Termoregulator t;

    public TermoregulatorAdapter(Termoregulator t){
        this.t = t;
    }

    public void enablePower(){ t.turnOn();}
    public void disablePower(){ t.turnOff();}


   public void setTemperature(int temperature){
        t.setDesiredTemperature(temperature);
   }

    public int getTemperature(){
       return t.getDesiredTemperature();
    }
}
