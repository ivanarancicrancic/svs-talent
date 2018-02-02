package com.client;

import java.sql.Timestamp;

import com.database.Project;
import com.model.Patients;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import com.webService.JSONService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
@SpringBootApplication
public class AppMain {

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub

		ApplicationContext ctx = SpringApplication.run(AppMain.class, args);
		Patients pp=new Patients();
		pp.setPatientId(999);
		pp.setFirstName("Ivana");
		pp.setLastName("Rancic");
		pp.setStreetAddress("Jani Lukrevski");
         pp.setCity("Skopje");
         pp.setState("sthdfjfkd");
         pp.setZIP("zip");
         pp.setCreatedBy(926);
	    pp.setPhone("071111111");
	    pp.setModifiedBy(0);
	    pp.setDeviceId("756D6930-4457-4150-B835-4C3152634974");
	    pp.setActivationCode(565656);
	    pp.setChatId("40724467");
        pp.setRegId("APA91bFDSNffq4Vz8yZxT61eFBu_iQVqZMiq25muhJvkDMM0OX7Lla5zVTEecKN-YDJvQg7FEsLrNQ0cTq8iG-pdcTvXoLiqB7MFNwKDHQVtbzX6JZ5fEPAfq_cSuzIU4FPu0m80_wfzr");
		pp.setNotificationEnabled(4242);

        ctx.getBean(ProjectManager.class).InsertPatient(pp);
       // ctx.getBean(JSONService.class).insertPatient(pp);

//		boolean flag=false;
//		Project project= new Project();
//		ProjectManager projectManager = new ProjectManager();
//		projectManager.GetActiveContactsByProvider(906);



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


//from here
//		int randomNumber = (int) Math.floor(Math.random() * 1000000);
//	    System.out.println("Vlezeeee i ova e random numberrrr: "+randomNumber);

	    ////////// end



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
