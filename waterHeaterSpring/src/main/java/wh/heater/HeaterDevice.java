package wh.heater;

import org.springframework.stereotype.Component;

@Component
public class HeaterDevice {
    public void startHeating(int currentTemp, int desiredTemp){
        System.out.println("HeaterDevice start heating. Starting with current temperture: "+currentTemp);
        for(int i=currentTemp; i<desiredTemp; i++){
            System.out.println("Water temperture raised to: "+i);
        }
    }

    public void stopHeating(){
        System.out.println("HeaterDevice stop heating. Temperture reached maximum value: 60");
    }

    public void turnOn(){
        System.out.println("HeaterDevice turned on.");
    }

    public void turnOff(){
        System.out.println("HeaterDevice turned off.");
    }


}
