package com.client;

import java.sql.Timestamp;
import java.util.Calendar;

import com.database.Project;
import com.google.gson.Gson;
import com.model.Patients;
import com.model.Providers;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class AppMain {

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub	
		Calendar cal = Calendar.getInstance();
   	 java.util.Date utilDate1 = cal.getTime();
		 Providers p_provider = new Providers(9, "Ankica", "type", "middle", "Rancic", 
					"st. Vambel", "Skopje", "Macedonia", "1000", "072806125", "07777777", 1, 
					utilDate1, 0, utilDate1, 0, "534", 565656,
					"1234", "t64644", "5366BB", 1);
		 System.out.println("init");
		 Providers p_prov=new Providers();
		 Patients patient = new Patients();
		 patient.setActivationCode(565656);
		 patient.setFirstName("Ana");
		 patient.setLastName("Pelovska");
		String t_tems_str = null;
		try 
		{   
			ProjectManager projectManager= new ProjectManager();
			System.out.println("init");
	
		  //   String token =	projectManager.GenerateSecurityToken().getToken();
		//     System.out.println(token);
			 // projectManager.InsertPatient(patient, "21af3fbe-74b9-45a2-a032-68e4d4e0b7be");            
			//	projectManager.CheckProviderActivationKey("534" , "072806125" , 565656, "85942763-2aec-4a92-9b63-87a6bf9a78c8");
			//	projectManager.getPatientsByProvider(7);
		   	p_prov = projectManager.InsertProvider(p_provider, "21af3fbe-74b9-45a2-a032-68e4d4e0b7bc");
					
//			System.out.println("post init");
//			//System.out.println("flag: "+flag);
//			Gson gson = new Gson();
//			System.out.println(gson.toJson(p_prov));
//			t_tems_str = gson.toJson(p_prov);
		} catch (Exception e)
		{
			System.out.println("error");
			e.printStackTrace();
		}		
		
		
		
		
		
//		boolean flag=false;
//		Project project= new Project();
		
//		boki		
//		  string AccountSid = "AC09897ed28e3ca84c002dc7597151d9b3";
//          string AuthToken = "244af8201cd17bbf3000dcabd8e2b01b";
//          +13478092620
          
	//	Twilio.init("AC5dc88a4ccce105c4e7a0335d3d95b6d8", "eeb9e4447f5ec91bdd60cf479b780633");
		
        //  American Account 	// Twilio.init("AC5dc88a4ccce105c4e7a0335d3d95b6d8", "eeb9e4447f5ec91bdd60cf479b780633");
		//Vanja ("+16692260877"),
        //Twilio.init("AC389ed5b9f9f774b7383cbf88af065f46", "0559b9f3af2fa00c93cd25285deb036b");
		
//	    Message message = Message.creator(new PhoneNumber("+16692260877"),
//	        new PhoneNumber("+12242316531"), 
//	        "Test za sms poraka preku twilio?").create();    
       // Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        //System.out.println(timestamp.toString().replace(":", "").replace("-", "").replace(".", "").replace(" ", ""));
        
//		int randomNumber = (int) Math.floor(Math.random() * 1000000);
//	    System.out.println("Vlezeeee i ova e random numberrrr: "+randomNumber);

	  //  System.out.println(message);	
	    
//          American Account 	// Twilio.init("AC5dc88a4ccce105c4e7a0335d3d95b6d8", "eeb9e4447f5ec91bdd60cf479b780633");
//		Vanja ("+16692260877"),
        //Twilio.init("AC3cdf4cf57d4c7d9b1e99fe5b5317af5c", "fb8e434eff426f4807559adfe04b9542");
		
	//    Message message = Message.creator(new PhoneNumber("+16692260877"),
	  //      new PhoneNumber("+15043157825"), 
	    //    "Test za sms poraka preku twilio?").create();	   
//	    Patients pp=new Patients();
//	    Patients pp1=new Patients();
//	    pp.setPhone("071111111");
//	    
//	    System.out.println("phone app"+pp.getPhone());
//	    ProjectManager projectManager= new ProjectManager();
//	    pp1=projectManager.InsertPatient(pp);
//	    
//	    
//	    System.out.println("ID "+pp1.getPatientId());	

	}

}