package wh.waterHeater;

import org.springframework.stereotype.Component;
import wh.StandardTermometerAdapter;

import java.util.Random;
import java.util.Scanner;

@Component
public class WaterHeater {
    HeaterPoweredDevice heater;
    TermometerPoweredDevice termometer;
    PowerSwitchInterface powerSwitch;
    ThermoregulatorPoweredDevice termoregulator;

    public WaterHeater(TermometerPoweredDevice termometer, HeaterPoweredDevice heater, PowerSwitchInterface powerSwitch, ThermoregulatorPoweredDevice termoregulator){
        this.heater=heater;
        this.termometer=termometer;
        this.powerSwitch=powerSwitch;
        this.termoregulator=termoregulator;
    }

    public void getPowerSwitch() {
        System.out.println("Enter 's' to make the water heater system components powered on:");
        Scanner s = new Scanner(System.in);
        String starter = s.nextLine();
        if (starter.equals("s")) {
            powerSwitch.controlPowerFor(termometer);
            powerSwitch.turnOn();
            powerSwitch.controlPowerFor(heater);
            powerSwitch.turnOn();
            powerSwitch.controlPowerFor(termoregulator);
            powerSwitch.turnOn();
        }
        getThermoregulator();
    }

    public  void getThermoregulator(){
        System.out.println("Enter the desired temperature for the water:");
        Scanner s = new Scanner(System.in);
        int desiredTemperature=  Integer.parseInt(s.nextLine());
        termoregulator.setTemperature(desiredTemperature);
        Random random=new Random();
        while(true){
            int currentTemperature= termometer.getTemperature();
            System.out.println("Current temperature is: " + currentTemperature);
            if(currentTemperature<60){
                heater.startHeating(currentTemperature, termoregulator.getTemperature());
                termometer.setCurrentTemperature(termoregulator.getTemperature());
            }
            if(heater.isTurnedOn()) {
                heater.stopHeating();
            }
            //To make the hetater start heating again, the current temperature is decreased for random value(min random value is 0,
            // max random value is 10)
            termometer.setCurrentTemperature(termoregulator.getTemperature()-random.nextInt(10));
            if(termometer instanceof StandardTermometerAdapter)
            {
                try {
                    Thread.currentThread().sleep(3000);
                }catch(InterruptedException e){System.out.println(e.getMessage());}
            }
            else {
                try {
                    Thread.currentThread().sleep(1000);
                }catch(InterruptedException e){System.out.println(e.getMessage());}
            }
        }
    }


}
