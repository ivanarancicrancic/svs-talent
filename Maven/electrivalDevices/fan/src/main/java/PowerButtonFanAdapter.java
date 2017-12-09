public class PowerButtonFanAdapter implements PoweredDevice {

    private Fan fan;

    public PowerButtonFanAdapter(Fan fan) {
        this.fan = fan;
    }

    public void enable() {
        fan.turnOn();
    }

    public void disable() {
        fan.turnOff();
    }
}