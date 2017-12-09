package es;

import es.fan.Fan;
import es.lamp.Lamp;
import es.powerbutton.PowerButton;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
public class ElecticalSystemApplication {

    public static void main(String[] args) {



        ApplicationContext ctx = SpringApplication.run(ElecticalSystemApplication.class, args);
        ctx.getBean(PowerButton.class).click();


//        Lamp lamp = new Lamp();
//        PowerButton lampButton = new PowerButton(new PowerButtonLampAdapter(lamp));
//        lampButton.click();
//
//        Fan fan = new Fan();
//        PowerButton fanButton = new PowerButton(new PowerButtonFanAdapter(fan));
//        fanButton.click();
    }

}

