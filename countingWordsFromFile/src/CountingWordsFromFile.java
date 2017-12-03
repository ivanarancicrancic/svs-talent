import java.io.*;
import java.util.HashMap;

public class CountingWordsFromFile {
 public static void main(String[] args){

     HashMap<String, Integer> hmap = new HashMap<String, Integer>();

     try(
             FileReader fr = new FileReader("source.txt");
     BufferedReader br = new BufferedReader(fr);
     FileWriter fw = new FileWriter("source.txt", true);
     BufferedWriter bw = new BufferedWriter(fw);
     ) {
          String line;
          while((line = br.readLine()) != null){
            String[] words = line.split(" ");
              for(String w:words)
              {
                  if (!hmap.containsKey(w)) {
                          hmap.put(w, 1);
                      } else {
                          hmap.put(w, (Integer) hmap.get(w) + 1);
                      }
                  }

              }
         for (String word : hmap.keySet()){
             System.out.println("Word: '" + word + "', Repeated: " + hmap.get(word) + " times.");
              bw.write("Word: '" + word + "', Repeated: " + hmap.get(word) + " times.");
               bw.newLine();
         }
     }catch(FileNotFoundException e){System.out.println(e.getMessage());}
      catch (IOException e)
      {System.out.println(e.getMessage());}
 }

}
