package wh.standardTermometer;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class StandardTermometer {
    public int currentTemperature=-1;

    public int getTemperature() {
        if (currentTemperature == -1) {
            Random rand = new Random();
            int currentTemperature = rand.nextInt(25);
            return currentTemperature;
        }
        else{

            return currentTemperature;
        }
    }
    public void turnOn(){ System.out.println("Standard termometer turned on.");}
    public void turnOff(){ System.out.println("Standard termometer turned off."); }
    public void setCurrentTemperature(int temperature){currentTemperature=temperature;}
}
