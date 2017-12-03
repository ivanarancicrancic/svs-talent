package motionDetector;

public interface MotionDetector {


    void start();
    void stop();
    void detect();
    boolean isMotion();

}
