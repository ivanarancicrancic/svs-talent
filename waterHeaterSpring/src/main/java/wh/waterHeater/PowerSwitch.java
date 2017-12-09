package wh.waterHeater;

import org.springframework.stereotype.Component;

@Component
public class PowerSwitch implements PowerSwitchInterface {
  public PoweredDevice poweredDevice;

 public void controlPowerFor(PoweredDevice poweredDevice){
     this.poweredDevice=poweredDevice;
 }

 public void turnOn(){poweredDevice.enablePower();}

    @Override
    public void turnOff() { poweredDevice.disablePower();

    }
}
