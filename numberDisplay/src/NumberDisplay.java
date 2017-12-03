public class NumberDisplay {


public static void main(String[] args) {

    String display = "";
    for (int i = 0; i < args.length; i++) {
        switch (args[i]) {
            case "zero":
                display += 0;
                break;
            case "one":
                display += 1;
                break;
            case "two":
                display += 2;
                break;
            case "tree":
                display += 3;
                break;
            case "four":
                display += 4;
                break;
            case "five":
                display += 5;
                break;
            case "six":
                display += 6;
                break;
            case "seven":
                display += 7;
                break;
            case "eight":
                display += 8;
                break;
            case "nine":
                display += 9;
                break;
        }
    }
    System.out.println(display);
}
}
