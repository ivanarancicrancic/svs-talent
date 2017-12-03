import java.util.Scanner;

public class ControlClock {

    public static void main(String[] args){

        ClockThread ct = new ClockThread();
        ct.start();
        Scanner s = new Scanner(System.in);
        while(true) {
            String entry = s.nextLine();
            switch (entry) {
                case "s":
                    ct.stop();
                    break;
                case "p":
                    ct.pause();
                    break;
                case "r":
                    ct.resume();
                    break;

                case "start":
                    ct.start();
                    break;

            }
        }
    }
}
