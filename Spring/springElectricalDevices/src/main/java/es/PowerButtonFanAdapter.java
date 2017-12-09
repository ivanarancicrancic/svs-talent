package es;

import es.fan.Fan;
import es.powerbutton.PoweredDevice;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.context.annotation.Profile;

@Component
@Profile("adapterfan")
public class PowerButtonFanAdapter implements PoweredDevice {

    private Fan fan;

    public PowerButtonFanAdapter(Fan fan) {
        this.fan = fan;
    }

    @Override
    public void enable() {
        fan.turnOn();
    }

    @Override
    public void disable() {
        fan.turnOff();
    }
}
