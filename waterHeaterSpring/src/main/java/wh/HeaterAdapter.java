package wh;

import org.springframework.stereotype.Component;
import wh.heater.HeaterDevice;
import wh.termoregulator.Termoregulator;
import wh.waterHeater.HeaterPoweredDevice;
import wh.waterHeater.PoweredDevice;

@Component
public class HeaterAdapter implements HeaterPoweredDevice{
     HeaterDevice heater;
     boolean turnedOn=false;


 public HeaterAdapter(HeaterDevice heater){
     this.heater=heater;

 }

    public void enablePower(){

         heater.turnOn();
    }
    public void disablePower(){
         heater.turnOff();
    }

    public void startHeating(int currentTemperature, int desiredTemperature){
        turnedOn=true;
        heater.startHeating(currentTemperature,desiredTemperature);
    }

    public void stopHeating(){ turnedOn=false;
        heater.stopHeating();}

    public boolean isTurnedOn(){
       return turnedOn;

    }

}
