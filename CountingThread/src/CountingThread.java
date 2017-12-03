public class CountingThread implements  Runnable {
    int final_value;

    public CountingThread(int final_value) {
        this.final_value = final_value;
    }

    public void run() {
        int i = 0;
        while (i < final_value) {
            System.out.println(i);
            i++;
        }
        System.out.println("Thread ended.");
        return;

    }


    public static void main(String[] args) {

        System.out.println("Thread will count until i reach value: " + args[0]);
        CountingThread ct = new CountingThread(Integer.parseInt(args[0]));
        Thread t = new Thread(ct);
        t.start();
        try {
            t.join(20000); // main thread waits 20sec for t to finish(or for second thread's method run to finish)
        }catch (InterruptedException e){System.out.println(e.getMessage());}
    }
}
