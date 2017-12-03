public class ClockThread implements Runnable{

        public static boolean running = true;
        public static boolean paused = false;
        public Thread t;

        public void run(){

            while(running) {

                    synchronized (this) {
                        if (paused == true) {
                            try {
                                wait();
                            } catch (InterruptedException e) {
                                System.out.println("MyException occured:" + e.getMessage());
                            }

                        }
                        long currentTime = System.currentTimeMillis();
                        System.out.println(currentTime);

                        try {
                            Thread.currentThread().sleep(1000);
                        } catch (InterruptedException e) {
                            System.out.println(e.getMessage());
                        }

                    }
                }
                return;

        }

    public void start () {
        System.out.println("Starting thread t");

            t = new Thread (this);
            running = true;
            t.start ();
        System.out.println("Prepraring thread t to start");
    }


    public void stop(){

            running = false;
        System.out.println("Thread t stopped. Enter start to start again");
        }

        public void pause(){

            paused = true;
            System.out.println("Thread t paused.");


        }

        public void resume(){
            System.out.println("Resuming thread t...");
            synchronized (this) {
                paused = false;
               notifyAll();
            }
        }



    }

