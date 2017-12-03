package motionDetector;

public class DelayChecker implements  Runnable {

Thread t;
    public void run(){

        while(MotionDetectorImpl.running) {
           // int delay = 2 * MotionDetectorImpl.interval;
            int delay = 5000;
            if (MotionDetectorImpl.lastMotionTimestamp + delay < System.currentTimeMillis()) {
                System.out.println("There is bigger delay between two last different images, motion became false. Please enter new image to trigger motion.");
                MotionDetectorImpl.motion = false;
            }
            try {
                Thread.currentThread().sleep(5000);
            } catch(InterruptedException e){System.out.println(e.getMessage());}
        }
    }

    public void start () {
        System.out.println("Preparing to start thread t2(For checking delay between images)");
        t = new Thread (this);
        t.start ();
        //System.out.println("t2 started...");

    }
}
