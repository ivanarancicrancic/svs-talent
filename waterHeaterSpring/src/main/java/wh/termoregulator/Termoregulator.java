package wh.termoregulator;

import org.springframework.stereotype.Component;

@Component
public class Termoregulator {
      private int desiredTemperature;

    public void setDesiredTemperature(int temperature){
        desiredTemperature =temperature;
    }

    public int getDesiredTemperature(){
        return desiredTemperature;
    }

    public void turnOn(){ System.out.println("Termoregulator turned on.");}
    public void turnOff(){ System.out.println("Termoregulator turned off."); }
}
