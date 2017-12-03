package motionDetector;
import java.util.Arrays;
import imageCapture.*;
import alarm.*;

public class MotionDetectorImpl implements Runnable, MotionDetector {
    /**
     * Is detector running?
     */
   static boolean running = false;
   static boolean cameraIsOpen = false;

    /**
     * Is motion?
     */
   static public boolean motion=false;
    /**
     * Previously captured image.
     */
    //private BufferedImage previousOriginal = null;
    byte[] previousOriginal;
    /**
     * Previously captured image with blur and gray filters applied.
     */
   // private BufferedImage previousFiltered = null;

    /**
     * Default check interval, in milliseconds, set to 500 ms.
     */
    public static int DEFAULT_INTERVAL=500;
    /**
     * Motion check interval (1000 ms by default).
     */
    public static volatile int interval=DEFAULT_INTERVAL;

    /**
     * How long motion is valid (in milliseconds). Default value is 2 seconds.
     */
   // private volatile int inertia = -1;

    /**
     * Timestamp when motion has been observed last time.
     */
    public static volatile long lastMotionTimestamp;

    /**
     * Implementation of motion detection algorithm.
     */
    Thread t;
    AlarmPrintMessage alarmMessage = new AlarmPrintMessage();
    ImageCaptureConsoleInput webcam = new ImageCaptureConsoleInput();
    int threshold=50;


    public MotionDetectorImpl(){

        previousOriginal=null;
        lastMotionTimestamp = 0;
        start();


    }

    public void run(){
        DelayChecker delayCheck= new DelayChecker();
        delayCheck.start();
        running=true;
        cameraIsOpen=true;
        int delay=2*interval;
        while (running && cameraIsOpen) {
            try {
                detect();
                System.out.println("New image entered, motion on the way to be proccessed...");
                //delay = inertia != -1 ? inertia : 2 * interval;
//                if (lastMotionTimestamp + delay < System.currentTimeMillis()) {
//                    System.out.println("There is bigger delay between changes motion became false.");
//                    motion = false;
//                }
                if(isMotion()){ alarmMessage.printMessage("MOTION DETECTED!");}
                Thread.sleep(interval);
            } catch (InterruptedException e) {
                break;
            } catch (Exception e) {
                System.out.println("Motion detector exception:" + e);
            }
        }
        running= false;
    }


    public void start () {
        System.out.println("Preparing to start thread t1(Motion detector for reading and comparing images..)");
        t = new Thread (this);
        t.start ();
        //System.out.println("Thread t1 started.");

    }


    public void stop() {
        if (running==true)running=false;
            cameraIsOpen=false;
           // executor.shutdownNow();
    }


    public void detect() {
        if (!webcam.isOpen()) {
            motion = false;
            return;
        }
       // BufferedImage currentOriginal = webcam.getImage();
        byte[] currentOriginal = webcam.getImage(threshold);
         // System.out.println("getImage finished!");
        if (currentOriginal == null) {
           // System.out.println("There is no current image => No motion!");
            motion = false;
            return;
        }

        if (previousOriginal == null) {
            //System.out.println("This is first image(current image). There is no previous image, but there is motion.");
            motion = true;
            lastMotionTimestamp = System.currentTimeMillis();
            previousOriginal = currentOriginal;
            //System.out.println("The first image became previous. On the way to read second image...");
            return;
            // notifyMotionListeners(currentOriginal);
        }
       // final BufferedImage currentFiltered = algorithm.filter(currentOriginal);

        //System.out.println("Checking change between prevoius and current image.");
        boolean equalImages = Arrays.equals(previousOriginal, currentOriginal);
        //System.out.println("Images are equal? True or false?: " + equalImages);
        if (!equalImages) {
            motion = true;
            lastMotionTimestamp = System.currentTimeMillis();
           // notifyMotionListeners(currentOriginal);
        }
        else{

            motion = false;
        }

        previousOriginal = currentOriginal;
        //System.out.println("Current image became previous.");

       // previousFiltered = currentFiltered;
    }
//    boolean bufferedImagesEqual(byte[] img1, byte[] img2) {
//        //if (img1.getWidth() == img2.getWidth() && img1.getHeight() == img2.getHeight()) {
//        if (img1.length() == img2.length()) {
//            for (int x = 0; x < img1.length(); x++) {
//               // for (int y = 0; y < img1.getHeight(); y++) {
//                    //if (img1.getRGB(x, y) != img2.getRGB(x, y))
//                  if (img1[x] != img2[x])
//                        return false;
//               //  }
//            }
//        } else {
//            return false;
//        }
//        return true;
//    }
    /**
     * @return Motion check interval in milliseconds
     */
//    public int getInterval() {
//        return interval;
//    }
    /**
     * Motion check interval in milliseconds. After motion is detected, it's valid for time which is
     * equal to value of 2 * interval.
     *
     * @param interval the new motion check interval (ms)
     * @see #DEFAULT_INTERVAL
     */
//    public void setInterval(int interval) {
//
//        if (interval < 100) {
//            throw new IllegalArgumentException("Motion check interval cannot be less than 100 ms");
//        }
//
//        this.interval = interval;
//    }
//
//    public void setThreshold(int threshold) {
//        this.threshold=threshold;
//    }
    /**
     * Get attached webcam object.
     *
     * @return Attached webcam
     */
//    public ImageCaptureConsoleInput getWebcam() {
//        return webcam;
//    }

    public boolean isMotion() {
        if (!running) {
            System.out.println("Motion cannot be detected when detector is not running!");
        }
        return motion;
    }

}




