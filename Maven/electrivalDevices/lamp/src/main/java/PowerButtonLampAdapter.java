public class PowerButtonLampAdapter implements PoweredDevice {

    private Lamp lamp;

    public PowerButtonLampAdapter(Lamp lamp) {
        this.lamp = lamp;
    }


    public void enable() {
        lamp.turnOn();
    }

    public void disable() {
        lamp.turnOff();
    }
}
