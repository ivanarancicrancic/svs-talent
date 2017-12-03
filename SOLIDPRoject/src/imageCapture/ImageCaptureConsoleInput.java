package imageCapture;

import java.util.Scanner;

public class ImageCaptureConsoleInput implements ImageCapture {
    boolean opened;
    Scanner stdin = new Scanner(System.in);

    public ImageCaptureConsoleInput(){

        opened = true;
    }

    public boolean isOpen() {
        return opened;
    }

    public byte[] getImage(int threshold) {
        byte[] x = new byte[threshold];
        String entry="";
            System.out.println("Please enter new 'image':");
             entry = stdin.nextLine();
             x = entry.getBytes();
    return x;
    }



}