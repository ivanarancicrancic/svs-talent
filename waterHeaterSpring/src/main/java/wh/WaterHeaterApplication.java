package wh;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import wh.waterHeater.WaterHeater;

@SpringBootApplication
public class WaterHeaterApplication {

    public static void main(String[] args) {

        ApplicationContext ctx = SpringApplication.run(WaterHeaterApplication.class, args);
        ctx.getBean(WaterHeater.class).getPowerSwitch();


//        Lamp lamp = new Lamp();
//        PowerButton lampButton = new PowerButton(new PowerButtonLampAdapter(lamp));
//        lampButton.click();
//
//        Fan fan = new Fan();
//        PowerButton fanButton = new PowerButton(new PowerButtonFanAdapter(fan));
//        fanButton.click();
    }
}
