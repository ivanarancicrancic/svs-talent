import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CheckDigitEntry {
    String value;

    public CheckDigitEntry(String value) throws ExampleException{
        setValue(value);
    }

    public void setValue(String entry) throws ExampleException{
        boolean allowed = true;
        try
        {
            //Pattern pattern = Pattern.compile("\\d+");
            Pattern pattern = Pattern.compile("^[1-9]+$");
            Matcher matcher = pattern.matcher(entry);

            if(!matcher.find()){
                allowed=false;
                throw new ExampleException("Entry value '" + entry + "' not allowed, entry must contain only digits.");
                // System.out.println("Entry value: " + entry + " unallowed, entry must contain only digits.");

            }

            int length = entry.length();
            if(length<5 || length>9)
            {
                if(allowed==false)
                { System.out.println("Also the entry '" + entry + "' must have length between 5 and 9 digits.");
                    //throw new ExampleException("Length must be between 5 and 9 digits.");
                }

                else {
                    System.out.println("Entry value '" + entry + "' not allowed, entry length must be between 5 and 9 digits.");
                    //throw new ExampleException("Length must be between 5 and 9 digits.");
                    allowed=false;
                }

            }

            if(allowed)
            {  System.out.println("Entry value '" + entry + "' allowed.");
               value=entry;
            }
        }
        catch(Exception e)
        {

            //System.out.println(e.toString());
            throw new ExampleException("ERROR SETTING ENTRY '"+entry+"' TO VARIABLE VALUE WITH ERROR MESSAGE: " + e.getMessage());
        }
    }


    public static void main(String[] args){

        try {
            CheckDigitEntry testObject = new CheckDigitEntry("12345");
            testObject.setValue("125");
            CheckDigitEntry testObject1 = new CheckDigitEntry("1345665");
            CheckDigitEntry testObject2 = new CheckDigitEntry("ForbiddenEntry122");
        }catch (ExampleException e){System.out.println(e.getMessage());}
    }


}



