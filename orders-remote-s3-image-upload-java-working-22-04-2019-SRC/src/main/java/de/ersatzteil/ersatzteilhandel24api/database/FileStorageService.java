package de.ersatzteil.ersatzteilhandel24api.database;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Iterator;

public class FileStorageService {


    public static String GetFileExtension(String name) {
        int lastIndexOf = name.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return "";
        }
        return name.substring(lastIndexOf);
    }

    public static BufferedImage fillTransparentPixels(BufferedImage image, Color fillColor) {
        int w = image.getWidth();
        int h = image.getHeight();
        BufferedImage image2 = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = image2.createGraphics();
        g.setColor(fillColor);
        g.fillRect(0,0,w,h);
        g.drawRenderedImage(image, null);
        g.dispose();
        return image2;
    }

    public File compressFile(File file, int interation) throws IOException, Exception {

        BufferedImage image = ImageIO.read(file);
        if(image == null) {
            throw new Exception();
        }

        if(image.getColorModel().getTransparency() != Transparency.OPAQUE) {
            image = fillTransparentPixels(image, Color.WHITE);
        }

        File compressedTempFile = File.createTempFile("tmp-", ".jpg");
        OutputStream os = new FileOutputStream(compressedTempFile);

        Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("jpg");
        ImageWriter writer = writers.next();

        ImageOutputStream ios = ImageIO.createImageOutputStream(os);
        writer.setOutput(ios);

        ImageWriteParam param = writer.getDefaultWriteParam();

        param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
        param.setCompressionQuality( (10 - interation) / 10);  // Change the quality value you prefer

        IIOImage newImage = new IIOImage(image, null, null);
        writer.write(null, newImage, param);

        file.delete();

        return compressedTempFile;
    }



}
