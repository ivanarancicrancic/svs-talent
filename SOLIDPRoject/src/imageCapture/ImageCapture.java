package imageCapture;

public interface ImageCapture {


    boolean isOpen();
    byte[] getImage(int threshold);
}
