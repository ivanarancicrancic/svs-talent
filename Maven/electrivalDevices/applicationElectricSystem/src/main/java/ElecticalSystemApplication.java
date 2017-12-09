public class ElecticalSystemApplication {
    public static void main(String[] args) {

        Lamp lamp = new Lamp();
        PowerButton lampButton = new PowerButton(new PowerButtonLampAdapter(lamp));
        lampButton.click();

        Fan fan = new Fan();
        PowerButton fanButton = new PowerButton(new PowerButtonFanAdapter(fan));
        fanButton.click();
    }

}
