package com.database;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.WebApplicationException;

import org.apache.commons.codec.binary.Base64;
import org.codehaus.jettison.json.JSONObject;

import com.google.gson.Gson;
import com.model.ActiveTreatment;
import com.model.NotificationIOS;
import com.model.Patients;
import com.model.PatientsCascade;
import com.model.ProviderProvider;
import com.model.Providers;
import com.model.ReminderNotification;
import com.model.RoomId;
import com.model.SavedTemplate;
import com.model.SubTreatment;
import com.model.TreatmentItem;
import com.model.TreatmentItemList;
import com.model.TreatmentItemListRegid;
import com.model.TreatmentItemListScroll;
import com.mysql.jdbc.Statement;
import com.notnoop.apns.APNS;
import com.notnoop.apns.ApnsService;
import com.sun.jersey.api.NotFoundException;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;


public class Project {
	
	public Integer NVL(Integer a){
		if (a==null)
		{
			return 0;
		}
		else
		{
			return a;
		}
	}
	
	//public Integer SendIOSPushNotification(String p_title, String p_body, String p_regid, String p_roomid, String p_chatid){
	public String SendIOSPushNotification(NotificationIOS p_not){
		
//		File file = new File(".");
//		for(String fileNames : file.list()) System.out.println(fileNames);
		
		ApnsService service =
			     APNS.newService()
			     .withCert("Certificates.p12", "Interway1102")
			     .withSandboxDestination()
			     .build();
		
		String payload="{\"aps\":"
				+ "{\"alert\":"
							+ "{\"body\":\""+p_not.getBody()+"\","
							+ "\"from\":\""+p_not.getTittle()+"\","
							+ "\"_id\":\""+p_not.getRoomId()+"\","
							+ "\"namenovo\":\""+p_not.getTittle()+"\","
							+ "\"fromchatid\":\""+p_not.getChatId()+"\","
							+ "\"title\":\""+p_not.getTittle()+"\""
							+ "},"
							+"\"sound\":\"default\","
							+"\"vibrate\":\"true\""							
							+ "},"
					+ "\"message\":\""+p_not.getBody()+"\"}";		
		
		System.out.println("payload "+payload);
		
		String token = p_not.getRegId();
		
		try{
			service.push(token, payload);	
		} catch (Exception e)
		{
			System.out.println("error");
			e.printStackTrace();
		}

		
		return "1";
	}	
	
	public String SendIOSPushNotificationToProvider(NotificationIOS p_not){
		
//		File file = new File(".");
//		for(String fileNames : file.list()) System.out.println(fileNames);
		
		ApnsService service =
			     APNS.newService()
			     .withCert("CertificatesPushProvider.p12", "Interway1102")
			     .withSandboxDestination()
			     .build();
		
		String payload="{\"aps\":"
				+ "{\"alert\":"
							+ "{\"body\":\""+p_not.getBody()+"\","
							+ "\"from\":\""+p_not.getTittle()+"\","
							+ "\"_id\":\""+p_not.getRoomId()+"\","
							+ "\"namenovo\":\""+p_not.getTittle()+"\","
							+ "\"fromchatid\":\""+p_not.getChatId()+"\","
							+ "\"title\":\""+p_not.getTittle()+"\""
							+ "},"
							+"\"sound\":\"default\","
							+"\"vibrate\":\"true\""							
							+ "},"
					+ "\"message\":\""+p_not.getBody()+"\"}";		
		
		System.out.println("payload "+payload);
		
		String token = p_not.getRegId();
		
		try{
			service.push(token, payload);	
		} catch (Exception e)
		{
			System.out.println("error");
			e.printStackTrace();
		}

		
		return "1";
	}	
	
	public List<ReminderNotification> GetNotificationForReminder(Connection connection) throws Exception
	{
		List<ReminderNotification> t_items = new ArrayList<ReminderNotification>();
		PreparedStatement ps=null;
			try
			{

			    ps = connection.prepareStatement("CALL SENDINGNOTIFICATIONS()");
				ResultSet rs = ps.executeQuery();
				
				System.out.println(rs);
				while(rs.next())
				{	
					ReminderNotification p_eden = new ReminderNotification(
										rs.getInt(1),
										rs.getInt(2),
										rs.getString(3),
										rs.getTimestamp(4),
										rs.getTimestamp(5),
										rs.getTimestamp(6),
										rs.getString(7),
										rs.getString(8),
										rs.getString(9),
										rs.getDate(10),
										rs.getInt(11),
										rs.getDate(12),
										rs.getInt(13),
										rs.getInt(14),
										rs.getInt(15),
										rs.getInt(16),
										rs.getString(17),
										rs.getString(18),
										rs.getString(19),
										rs.getString(20),
										rs.getInt(21),
										rs.getString(22),
										rs.getInt(23)
										);
					t_items.add(p_eden);
				}
				
				if (t_items.isEmpty()){
					 throw new WebApplicationException(404);
				}
				else
				{
					return t_items;
				}
			}
				catch(Exception e)
				{
					e.printStackTrace();
					throw e;
				}
			finally {
				ps.close();
				connection.close();
				}
	}	
	
	
	public List<TreatmentItemListRegid> getTreatmentItemListLoadPatient(Connection connection, int p_patientid) throws Exception
	{
		List<TreatmentItemListRegid> t_items = new ArrayList<TreatmentItemListRegid>();
		PreparedStatement ps=null;
			try
			{

			    ps = connection.prepareStatement("CALL TREATMENTITEMLISTLOADPATIENTPOM(?)");
				ps.setInt(1, p_patientid);
				ResultSet rs = ps.executeQuery();
				
				System.out.println(rs);
				while(rs.next())
				{	
					TreatmentItemListRegid p_eden = new TreatmentItemListRegid(
										rs.getInt(1),
										rs.getInt(2),
										rs.getString(3),
										rs.getTimestamp(4),
										rs.getTimestamp(5),
										rs.getTimestamp(6),
										rs.getString(7),
										rs.getString(8),
										rs.getString(9),
										rs.getDate(10),
										rs.getInt(11),
										rs.getDate(12),
										rs.getInt(13),
										rs.getInt(14),
										rs.getInt(15),
										rs.getInt(16),
										rs.getString(17),
										rs.getString(18),
										rs.getString(19),
										rs.getString(20),
										rs.getInt(21)
										);
					t_items.add(p_eden);
				}
				
				if (t_items.isEmpty()){
					 throw new WebApplicationException(404);
				}
				else
				{
					return t_items;
				}
			}
				catch(Exception e)
				{
					e.printStackTrace();
					throw e;
				}
			finally {
				ps.close();
				connection.close();
				}
	}	
	
	
	public Patients InsertPatient(Connection connection, Patients p_patient) throws Exception
	 {
	  PreparedStatement ps=null;
	  Providers result=new Providers();
	  
	  System.out.println("phone "+p_patient.getPhone());	
	  try
	  {
	      ps =connection.prepareStatement("call InsertPatient(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
	      ps.setString(1,p_patient.getPhone());
	      ps.setString(2,p_patient.getFirstName());
	      ps.setString(3,p_patient.getMiddleInitial());
	      ps.setString(4,p_patient.getLastName());
	      ps.setString(5,p_patient.getStreetAddress());
	      ps.setString(6,p_patient.getCity());
	      ps.setString(7,p_patient.getState());
	      ps.setString(8,p_patient.getZIP());
	      ps.setString(9,p_patient.getChronicDiseases());
	      ps.setString(10,p_patient.getAllergies());
	      ps.setString(11,p_patient.getMedicationsThatRecieves());
	      ps.setString(12,p_patient.getProfileImageUrl());
	      ps.setString(13,p_patient.getAdditionalInnfo());
	      ps.setInt(14,NVL(p_patient.getActivationCode()));
	      ps.setDate(15,(Date) p_patient.getCreated());
	      ps.setInt(16,NVL(p_patient.getCreatedBy()));
	      ps.setDate(17,(Date)p_patient.getModified());
	      ps.setInt(18,NVL(p_patient.getModifiedBy()));
	      ps.setString(19,p_patient.getChatId());
	      ps.setString(20,p_patient.getDeviceId());
	      ps.setString(21,p_patient.getRegId());
	      ps.setInt(22,p_patient.getNotificationEnabled());
	   //ps.executeUpdate();
	   
	            //prest.executeUpdate(query, PreparedStatement.RETURN_GENERATED_KEYS); Throws an error
	            //prest.executeQuery(); Throws an error   
	   ResultSet rs = ps.executeQuery();
	   
	   if (rs.next()){
		   p_patient.setPatientId(rs.getInt(1));
	   }
	   return p_patient;
	  }
	  catch(Exception e)
	  {
	   e.printStackTrace();
	   throw e;
	  }

	  finally {
	    ps.close();
	        connection.close();
	  }
	 }	
	
	public boolean SendSMS(String To, String Body) {
		
        boolean flag=false;
		try {
			 Twilio.init("AC3cdf4cf57d4c7d9b1e99fe5b5317af5c", "fb8e434eff426f4807559adfe04b9542");

	    Message message = Message.creator(new PhoneNumber(To),
	        new PhoneNumber("+15043157825"), 
	        Body).create();
	   
	    flag=true;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}
	finally {
			return flag;
		}
	}
	
//	public boolean SendSMS()  throws Exception{
//		
//		TwilioRestClient client = new TwilioRestClient("YOUR_TWILIO_ACCOUNT_SID", "YOUR_TWILIO_AUTH_TOKEN");
//		 
//        Account account = client.getAccount();
// 
//        SmsFactory factory = account.getSmsFactory();
// 
//        HashMap<String, String> message = new HashMap<>();
// 
//        message.put("To", "YOUR_PHONE_NUMBER");
//        message.put("From", "YOUR_TWILIO_PHONE_NUMBER");
//        message.put("Body", "Ahoy from Twilio!");
// 
//        factory.create(message);		
//		
//		return true;
//	}
	
	
	public List<SavedTemplate> getSavedTemplate(Connection connection, int ProviderDetail) throws Exception
	{
		List<SavedTemplate> t_items = new ArrayList<SavedTemplate>();
		PreparedStatement ps=null;
			try
			{
				ps = connection.prepareStatement("CALL GetSavedTreatmentTemplateByProviderId(?)");
				ps.setInt(1,ProviderDetail);
				ResultSet rs = ps.executeQuery();
				while(rs.next())
				{
					SavedTemplate p_eden = new SavedTemplate(
										rs.getInt(1),   
										rs.getString(2), 
										rs.getInt(3),   
										rs.getDate(4),  
										rs.getInt(5),   
										rs.getDate(6),  
										rs.getInt(7)    
										);
					t_items.add(p_eden);
				}
				
				if (t_items.isEmpty()){
					 throw new WebApplicationException(404);
				}
				else
				{
					return t_items;
				}
			}
				catch(Exception e)
				{
					e.printStackTrace();
					throw e;
				}
			finally {
				ps.close();
				connection.close();
				}
	}	
	
	public List<TreatmentItemListScroll> getTreatmentItemListLoad(Connection connection, int p_activetreatmentid) throws Exception
	{
		List<TreatmentItemListScroll> t_items = new ArrayList<TreatmentItemListScroll>();
		PreparedStatement ps=null;
			try
			{

			    ps = connection.prepareStatement("CALL TreatmentItemListLoad(?)");
				ps.setInt(1, p_activetreatmentid);
				ResultSet rs = ps.executeQuery();
				
				System.out.println(rs);
				while(rs.next())
				{	
					TreatmentItemListScroll p_eden = new TreatmentItemListScroll(
										rs.getInt(1),
										rs.getInt(2),
										rs.getString(3),
										rs.getTimestamp(4),
										rs.getTimestamp(5),
										rs.getTimestamp(6),
										rs.getString(7),
										rs.getString(8),
										rs.getString(9),
										rs.getDate(10),
										rs.getInt(11),
										rs.getDate(12),
										rs.getInt(13),
										rs.getInt(14),
										rs.getInt(15),
										rs.getInt(16),
										rs.getString(17),
										rs.getString(18),
										rs.getString(19)
										);
					t_items.add(p_eden);
				}
				
				if (t_items.isEmpty()){
					 throw new WebApplicationException(404);
				}
				else
				{
					return t_items;
				}
			}
				catch(Exception e)
				{
					e.printStackTrace();
					throw e;
				}
			finally {
				ps.close();
				connection.close();
				}
	}	
	
	public List<TreatmentItemListRegid> getTreatmentItemListScroll(Connection connection, int TreatmentItemListID, String T_UP_DOWN, int range) throws Exception
	{
		List<TreatmentItemListRegid> t_items = new ArrayList<TreatmentItemListRegid>();
		PreparedStatement ps=null;
			try
			{
			    ps = connection.prepareStatement("CALL ScrollTreatmentItemList_1(?, ?, ?)");
				ps.setInt(1, TreatmentItemListID);
				ps.setString(2,T_UP_DOWN);
				ps.setInt(3, range);
				ResultSet rs = ps.executeQuery();
				
				System.out.println(rs);
				while(rs.next())
				{	
					TreatmentItemListRegid p_eden = new TreatmentItemListRegid(
										rs.getInt(1),
										rs.getInt(2),
										rs.getString(3),
										rs.getTimestamp(4),
										rs.getTimestamp(5),
										rs.getTimestamp(6),
										rs.getString(7),
										rs.getString(8),
										rs.getString(9),
										rs.getDate(10),
										rs.getInt(11),
										rs.getDate(12),
										rs.getInt(13),
										rs.getInt(14),
										rs.getInt(15),
										rs.getInt(16),
										rs.getString(17),
										rs.getString(18),
										rs.getString(19),
										rs.getString(20),
										rs.getInt(21)
										);
					t_items.add(p_eden);
				}
				
				if (t_items.isEmpty()){
					 throw new WebApplicationException(404);
				}
				else
				{
					return t_items;
				}
			}
				catch(Exception e)
				{
					e.printStackTrace();
					throw e;
				}
			finally {
				ps.close();
				connection.close();
				}
	}
	
	public List<TreatmentItemListRegid> getTreatmentItemListScrollPatient(Connection connection, int TreatmentItemListID, String T_UP_DOWN, int range) throws Exception
	{
		List<TreatmentItemListRegid> t_items = new ArrayList<TreatmentItemListRegid>();
		PreparedStatement ps=null;
			try
			{
			    ps = connection.prepareStatement("CALL ScrollTreatmentItemListPatient(?, ?, ?)");
				ps.setInt(1, TreatmentItemListID);
				ps.setString(2,T_UP_DOWN);
				ps.setInt(3, range);
				ResultSet rs = ps.executeQuery();
				
				System.out.println(rs);
				while(rs.next())
				{	
					TreatmentItemListRegid p_eden = new TreatmentItemListRegid(
										rs.getInt(1),
										rs.getInt(2),
										rs.getString(3),
										rs.getTimestamp(4),
										rs.getTimestamp(5),
										rs.getTimestamp(6),
										rs.getString(7),
										rs.getString(8),
										rs.getString(9),
										rs.getDate(10),
										rs.getInt(11),
										rs.getDate(12),
										rs.getInt(13),
										rs.getInt(14),
										rs.getInt(15),
										rs.getInt(16),
										rs.getString(17),
										rs.getString(18),
										rs.getString(19),
										rs.getString(20),
										rs.getInt(21)
										);
					t_items.add(p_eden);
				}
				
				if (t_items.isEmpty()){
					 throw new WebApplicationException(404);
				}
				else
				{
					return t_items;
				}
			}
				catch(Exception e)
				{
					e.printStackTrace();
					throw e;
				}
			finally {
				ps.close();
				connection.close();
				}
	}
	
	
	public boolean UpdateSavedTreatment(Connection connection, List<TreatmentItem> t_items, int p_savedtreatmentid) throws Exception
	{	
		PreparedStatement pss=null;
		PreparedStatement ps=null;
		System.out.println("start");
		List<String> listaDelete=new ArrayList<String>();
		String listadeleteobicna="0";
		
		List<TreatmentItem> sendTItems=new ArrayList<TreatmentItem>();
		String render="";
		String pateka="";
		String pateka_send="";
		String Ime_fajl="";
		String comment="";
		boolean flag_insert=true;
				Gson gson = new Gson();
			try{
				connection.setAutoCommit(false);
				for(TreatmentItem tt:t_items)
				{
					listadeleteobicna=listadeleteobicna+","+NVL(tt.getTreatmentItemId()).toString();
					//listaDelete.add(tt.getTreatmentItemId().toString());
				}
				
				ps = connection.prepareStatement("call DeleteSavedTreatmentItems(?,?)",Statement.RETURN_GENERATED_KEYS);
				ps.setString(1, listadeleteobicna); 
				ps.setInt(2, NVL(p_savedtreatmentid)); 
				System.out.println(listadeleteobicna); 
				ps.executeQuery(); 
				
				for (TreatmentItem t_item : t_items ){
					flag_insert=true; 
					if (t_item.getName().equalsIgnoreCase("7")){
						   String image="" ; 
						   Ime_fajl=""; 
						   comment=""; 
						   JSONObject json; 
						   Date d = new Date(System.currentTimeMillis()+5*60*1000); 
						   System.out.println("Ova e format na datum "+System.currentTimeMillis()+5*60*1000); 
						   try  
						   {
							  render=""; 
						      json = new JSONObject(t_item.getRenderingInfo()); 
						      flag_insert=json.getBoolean("comparisionflag"); 
							  if (flag_insert==true) {
							      image = json.getString("comparisionbase64"); 
							      comment = json.getString("comparisionquestion"); 
							      pateka=json.getString("pateka"); 
							     								  
								   int randomNumber = (int) Math.floor(Math.random() * 1000000); 
								   Timestamp timestamp = new Timestamp(System.currentTimeMillis()); 
								   Ime_fajl=randomNumber+timestamp.toString().replace(":", "").replace("-", "").replace(".", "").replace(" ", "");								  
							      Base64 decoder = new Base64(); 
							      byte[] imgBytes = Base64.decodeBase64(image);         
//							      FileOutputStream osf = new FileOutputStream(new File("\\\\192.168.1.110\\curandusImages\\"+Ime_fajl+".jpg"));
							      FileOutputStream osf = new FileOutputStream(new File("\\\\69.87.218.82\\curandusImages\\"+Ime_fajl+".jpg"));							      
							      osf.write(imgBytes); 
							      osf.close();  
//							      if (pateka.equalsIgnoreCase("http://89.205.28.221/curandusImages/")){
//							    	  pateka_send="\"http:"+"/"+"/"+"89.205.28.221"+"/"+"curandusImages"+"/"+Ime_fajl+".jpg"+"\""; 
//							      } 
//							      else 
//							      { 
//							    	 pateka_send="\"http:"+"/"+"/"+"192.168.1.110"+":"+"8080"+"/"+"curandusImages"+"/"+Ime_fajl+".jpg"+"\"";  
//							      }
							      pateka_send="\"http:"+"/"+"/"+"104.245.33.167"+":"+"8080"+"/"+"curandusImages"+"/"+Ime_fajl+".jpg"+"\""; 
							      System.out.println("pateka send: "+pateka_send); 
							      render="{comparisionurl:"+pateka_send+",comparisionflag:false, comparisionquestion:"+comment+"}"; 
							      System.out.println("RENDER: "+render); 
							      
							      json = new JSONObject(render); 
							      System.out.println("json: "+json); 
							      
							      t_item.setRenderingInfo(json.toString()); 
							   }
						   }
						   catch(Exception e)
						   {
						    e.printStackTrace();
						    throw e;
						   }
					}
					sendTItems.add(t_item);
				}
				
				pss =connection.prepareStatement("call InsertUpdateSavedTreatmentItem(?,?,?,?,?,?,?,?,?,?)",Statement.RETURN_GENERATED_KEYS);
				for(TreatmentItem tt:sendTItems)
				{
					//lista.add(tt.getTreatmentItemId());
					pss.setInt(1,NVL(tt.getTreatmentItemId()));
					pss.setInt(2, NVL(p_savedtreatmentid));
					pss.setString(3, tt.getName());
					pss.setString(4, tt.getRepeatT());
					pss.setString(5, tt.getTypeT());
					pss.setString(6, tt.getDuration());
					pss.setString(7, gson.toJson(tt.getRenderingInfo()));
					pss.setString(8, tt.getDaytime());
					pss.setString(9, tt.getStarttime());
					pss.setString(10, tt.getIntervaldaytime());
					
					pss.addBatch();
				}
				pss.executeBatch();
				//pss.executeQuery();
			
				connection.commit(); 
				return true;
		}
		catch(Exception e)
		{
			connection.rollback();
			e.printStackTrace();
			throw e;
		}

		finally {
				pss.close();
				ps.close();
				connection.close();
		}
	}	
	
	public SubTreatment UpdateActiveSubTreatment(Connection connection, List<TreatmentItem> t_items, int p_subtreatmentid) throws Exception
	{	
		PreparedStatement pss=null;
		PreparedStatement ps=null;
		PreparedStatement pss1=null;
		
		System.out.println("start");
		String listadeleteobicna="0";
		List<TreatmentItem> sendTItems=new ArrayList<TreatmentItem>();
		String render="";
		String pateka="";
		String pateka_send="";
		boolean flag_insert=true;
		String Ime_fajl="";
		String comment="";
				
		
		SubTreatment ret_sub=new SubTreatment();
		
				Gson gson = new Gson();
			try{
				connection.setAutoCommit(false);
				for(TreatmentItem tt:t_items)
				{
					listadeleteobicna=listadeleteobicna+","+NVL(tt.getTreatmentItemId()).toString();
					//listaDelete.add(tt.getTreatmentItemId().toString());
				}
				
				ps =connection.prepareStatement("call RemoveTreatmentItem(?,?)",Statement.RETURN_GENERATED_KEYS);
				ps.setString(1, listadeleteobicna);
				ps.setInt(2, NVL(p_subtreatmentid));
				ps.executeQuery();	
				
				for (TreatmentItem t_item : t_items ){
					flag_insert=true;
					if (t_item.getName().equalsIgnoreCase("7")){
						   String image="" ;
						   Ime_fajl="";
						   comment="";
						   JSONObject json;
						   Date d = new Date(System.currentTimeMillis()+5*60*1000);
						   System.out.println("Ova e format na datum "+System.currentTimeMillis()+5*60*1000);
						   try 
						   {
							  render="";
						      json = new JSONObject(t_item.getRenderingInfo()); 

						      flag_insert=json.getBoolean("comparisionflag"); 
							  if (flag_insert==true) {
							      image = json.getString("comparisionbase64"); 
							      comment = json.getString("comparisionquestion");
							      pateka=json.getString("pateka"); 								  
								   int randomNumber = (int) Math.floor(Math.random() * 1000000);
								   Timestamp timestamp = new Timestamp(System.currentTimeMillis());
								   Ime_fajl=randomNumber+timestamp.toString().replace(":", "").replace("-", "").replace(".", "").replace(" ", "");								  
							      Base64 decoder = new Base64(); 
							      byte[] imgBytes = Base64.decodeBase64(image);         
							      //FileOutputStream osf = new FileOutputStream(new File("\\\\192.168.1.110\\curandusImages\\"+Ime_fajl+".jpg"));
							      FileOutputStream osf = new FileOutputStream(new File("\\\\69.87.218.82\\curandusImages\\"+Ime_fajl+".jpg"));							      							     
							      osf.write(imgBytes); 
							      osf.close();  
//							      if (pateka.equalsIgnoreCase("http://89.205.28.221/curandusImages/")){
//							    	  pateka_send="\"http:"+"/"+"/"+"89.205.28.221"+"/"+"curandusImages"+"/"+Ime_fajl+".jpg"+"\"";
//							      }
//							      else
//							      {
//							    	 pateka_send="\"http:"+"/"+"/"+"192.168.1.110"+":"+"8080"+"/"+"curandusImages"+"/"+Ime_fajl+".jpg"+"\"" ;
//							      }
							      pateka_send="\"http:"+"/"+"/"+"104.245.33.167"+":"+"8080"+"/"+"curandusImages"+"/"+Ime_fajl+".jpg"+"\""; 
							      System.out.println("pateka send: "+pateka_send);
							      render="{comparisionurl:"+pateka_send+",comparisionflag:false, comparisionquestion:"+comment+"}";
							      System.out.println("RENDER: "+render);
							      //render="{comparisionurl:"+randomNumber+".jpg,comparisionflag:false}";
							      json = new JSONObject(render);
							      System.out.println("json: "+json);
							      
							      t_item.setRenderingInfo(json.toString());
							   }
						   }
						   catch(Exception e)
						   {
						    e.printStackTrace();
						    throw e;
						   }
					}
					sendTItems.add(t_item);
				}
				pss =connection.prepareStatement("call InsertUpdateTreatmentItem(?,?,?,?,?,?,?,?,?,?)",Statement.RETURN_GENERATED_KEYS);
				for(TreatmentItem tt:sendTItems)
				{
					System.out.println("ID "+NVL(tt.getTreatmentItemId()));
					pss.setInt(1,NVL(tt.getTreatmentItemId()));
					pss.setInt(2, NVL(p_subtreatmentid));
					pss.setString(3, tt.getName());
					pss.setString(4, tt.getRepeatT());
					pss.setString(5, tt.getTypeT());
					pss.setString(6, tt.getDuration());
					pss.setString(7, gson.toJson(tt.getRenderingInfo()));
					pss.setString(8, tt.getDaytime());
					pss.setString(9, tt.getStarttime());		
					pss.setString(10, tt.getIntervaldaytime());
					
					pss.addBatch();
				}
				pss.executeBatch();
				//pss.executeQuery();
				pss1 =connection.prepareStatement("call GetIds(?)",Statement.RETURN_GENERATED_KEYS);
				pss1.setInt(1, p_subtreatmentid);
				
				ResultSet rs1 = pss1.executeQuery();
				while(rs1.next())
				{
					ret_sub.setSubtreatmentid(rs1.getInt(1));
					ret_sub.setActivetreatmenId(rs1.getInt(2));
					ret_sub.setPatientId(rs1.getInt(3));
				}				
				
				
				connection.commit(); 
				return ret_sub;
		}
		catch(Exception e)
		{
			connection.rollback();
			e.printStackTrace();
			throw e;
		}

		finally {
				pss.close();
				connection.close();
		}
	}	
	
	public int CheckNameSavedTreatment(Connection connection, int ProviderID, String NameTreatment, List<TreatmentItem> t_items) throws Exception
	{	
		PreparedStatement ps=null;
		PreparedStatement pss=null;
		
		int flag=0;
		int p_savedTreatmentID;	
		List<TreatmentItem> sendTItems=new ArrayList<TreatmentItem>();
		String render="";
		String pateka="";
		String pateka_send="";
		boolean flag_insert=true;
		String Ime_fajl="";
		String comment="";
		
		try
		{
		    ps =connection.prepareStatement("call CHECK_NAME_SAVE_TREATMENT(?,?)", Statement.RETURN_GENERATED_KEYS);
		    ps.setInt(1,ProviderID);
		    ps.setString(2,NameTreatment);
	
			ResultSet rs = ps.executeQuery();
			
			if (rs.next()){
				if (rs.getInt(1)==0){
					flag=0;
					connection.setAutoCommit(false);
				    ps =connection.prepareStatement("call InsertSavedTreatment(?,?)", Statement.RETURN_GENERATED_KEYS);
				    ps.setInt(1,ProviderID);
				    ps.setString(2,NameTreatment);
				    
				    Gson gson = new Gson();
			
					ResultSet rss = ps.executeQuery();
					
					if (rss.next()){
						p_savedTreatmentID=rss.getInt(1);
						
						for (TreatmentItem t_item : t_items ){
							flag_insert=true;
							if (t_item.getName().equalsIgnoreCase("7")){
								   String image="" ;
								   Ime_fajl="";
								   comment="";
								   JSONObject json;
								   Date d = new Date(System.currentTimeMillis()+5*60*1000);
								   System.out.println("Ova e format na datum "+System.currentTimeMillis()+5*60*1000);
								   try 
								   {
									  render="";
								      json = new JSONObject(t_item.getRenderingInfo()); 

								      flag_insert=json.getBoolean("comparisionflag"); 
									  if (flag_insert==true) {
									      image = json.getString("comparisionbase64"); 
									      comment = json.getString("comparisionquestion");
									      pateka=json.getString("pateka"); 										  
										   int randomNumber = (int) Math.floor(Math.random() * 1000000);
										   Timestamp timestamp = new Timestamp(System.currentTimeMillis());
										   Ime_fajl=ProviderID+randomNumber+timestamp.toString().replace(":", "").replace("-", "").replace(".", "").replace(" ", "");								  
									      Base64 decoder = new Base64(); 
									      byte[] imgBytes = Base64.decodeBase64(image);         
									      //FileOutputStream osf = new FileOutputStream(new File("\\\\192.168.1.110\\curandusImages\\"+Ime_fajl+".jpg"));
									      FileOutputStream osf = new FileOutputStream(new File("\\\\69.87.218.82\\curandusImages\\"+Ime_fajl+".jpg"));
									      osf.write(imgBytes); 
									      osf.close();  
//									      if (pateka.equalsIgnoreCase("http://89.205.28.221/curandusImages/")){
//									    	  pateka_send="\"http:"+"/"+"/"+"89.205.28.221"+"/"+"curandusImages"+"/"+Ime_fajl+".jpg"+"\"";
//									      }
//									      else
//									      {
//									    	 pateka_send="\"http:"+"/"+"/"+"192.168.1.110"+":"+"8080"+"/"+"curandusImages"+"/"+Ime_fajl+".jpg"+"\"" ;
//									      }
									      pateka_send="\"http:"+"/"+"/"+"104.245.33.167"+":"+"8080"+"/"+"curandusImages"+"/"+Ime_fajl+".jpg"+"\""; 
									      System.out.println("pateka send: "+pateka_send);
									      render="{comparisionurl:"+pateka_send+",comparisionflag:false, comparisionquestion:"+comment+"}";
									      System.out.println("RENDER: "+render);
									      //render="{comparisionurl:"+randomNumber+".jpg,comparisionflag:false}";
									      json = new JSONObject(render);
									      System.out.println("json: "+json);
									      
									      t_item.setRenderingInfo(json.toString());
									   }
								   }
								   catch(Exception e)
								   {
								    e.printStackTrace();
								    throw e;
								   }
							}
							sendTItems.add(t_item);
						}
						
						pss =connection.prepareStatement("call InsertUpdateSavedTreatmentItem(?,?,?,?,?,?,?,?,?,?)",Statement.RETURN_GENERATED_KEYS);
						for(TreatmentItem tt:sendTItems)
						{
							pss.setInt(1, 0);
							pss.setInt(2, p_savedTreatmentID);
							pss.setString(3, tt.getName());
							pss.setString(4, tt.getRepeatT());
							pss.setString(5, tt.getTypeT());
							pss.setString(6, tt.getDuration());
							pss.setString(7, gson.toJson(tt.getRenderingInfo()));
							pss.setString(8, tt.getDaytime());
							pss.setString(9, tt.getStarttime());
							pss.setString(10, tt.getIntervaldaytime());
							
							pss.addBatch();
						}
						pss.executeBatch();
						//pss.executeQuery();
						connection.commit(); 
					}
				}
				else
				{
					flag=rs.getInt(1);
				}
			}
			return flag;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}
		finally {
				ps.close();
				connection.close();
		}
	}	
	
	public boolean InsertSavedTreatment(Connection connection, int ProviderID, 
			String NameTreatment, List<TreatmentItem> t_items) throws Exception
	{	
		PreparedStatement ps=null;
		PreparedStatement pss=null;
		int p_savedTreatmentID;	
		try
		{
		    ps =connection.prepareStatement("call InsertSavedTreatment(?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
		    ps.setInt(1,ProviderID);
		    ps.setString(2,NameTreatment);
	
			ResultSet rs = ps.executeQuery();
			
			if (rs.next()){
				p_savedTreatmentID=rs.getInt(1);
				Gson gson = new Gson();
				connection.setAutoCommit(false);
				pss =connection.prepareStatement("call InsertSavedTreatmentItem(?,?,?,?,?,?,?,?,?)",Statement.RETURN_GENERATED_KEYS);
				for(TreatmentItem tt:t_items)
				{
					pss.setInt(1, p_savedTreatmentID);
					pss.setString(2, tt.getName());
					pss.setString(3, tt.getRepeatT());
					pss.setString(4, tt.getTypeT());
					pss.setString(5, tt.getDuration());
					pss.setString(6, gson.toJson(tt.getRenderingInfo()));
					pss.setString(8, tt.getDaytime());
					pss.setString(9, tt.getStarttime());	
					pss.setString(10, tt.getIntervaldaytime());
					
					pss.addBatch();
				}
				pss.executeBatch();
				//pss.executeQuery();
				connection.commit(); 
			}
			return true;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}
		finally {
				ps.close();
				pss.close();
				connection.close();
		}
	}	
	
	public SubTreatment InsertActiveSubTreatment(Connection connection, int activeTreatmentID , 
			int ProviderID, int PatientID, String NameTreatment, String SubNameTreatment, 
			List<TreatmentItem> t_items) throws Exception
	{	
		PreparedStatement ps=null;
		PreparedStatement pss=null;
		SubTreatment ret_sub_t=new SubTreatment();
		int p_subTreatmentID;
		int ret_active_treatment=0;
		List<TreatmentItem> sendTItems=new ArrayList<TreatmentItem>();
		String render="";
		String pateka="";
		String pateka_send="";
		boolean flag_insert=true;
		String Ime_fajl="";
		String comment="";		
	
		try
		{
			connection.setAutoCommit(false);
		    ps =connection.prepareStatement("call InsertActiveSubTreatment(?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
		    ps.setInt(1,activeTreatmentID);
		    ps.setInt(2,ProviderID);
		    ps.setInt(3,PatientID);
		    ps.setString(4,NameTreatment);
		    ps.setString(5,SubNameTreatment);
	
			ResultSet rs = ps.executeQuery();
			
			if (rs.next()){
				p_subTreatmentID=rs.getInt(1);
				ret_sub_t.setSubtreatmentid(rs.getInt(1));
				
				ret_active_treatment=rs.getInt(2);
				ret_sub_t.setActivetreatmenId(rs.getInt(2));
				
				ret_sub_t.setPatientId(PatientID);

				Gson gson = new Gson();
				for (TreatmentItem t_item : t_items ){
					flag_insert=true;
					if (t_item.getName().equalsIgnoreCase("7")){
						   String image="" ;
						   Ime_fajl="";
						   comment="";
						   JSONObject json;
						   Date d = new Date(System.currentTimeMillis()+5*60*1000);
						   System.out.println("Ova e format na datum "+System.currentTimeMillis()+5*60*1000);
						   try 
						   {
							  render="";
						      json = new JSONObject(t_item.getRenderingInfo()); 

						      flag_insert=json.getBoolean("comparisionflag"); 
							  if (flag_insert==true) {
							      image = json.getString("comparisionbase64"); 
							      comment = json.getString("comparisionquestion");
							      pateka=json.getString("pateka"); 								  
								   int randomNumber = (int) Math.floor(Math.random() * 1000000);
								   Timestamp timestamp = new Timestamp(System.currentTimeMillis());
								   Ime_fajl=ProviderID+randomNumber+timestamp.toString().replace(":", "").replace("-", "").replace(".", "").replace(" ", "");								  
							      Base64 decoder = new Base64(); 
							      byte[] imgBytes = Base64.decodeBase64(image);         
							      //FileOutputStream osf = new FileOutputStream(new File("\\\\192.168.1.110\\curandusImages\\"+Ime_fajl+".jpg"));
							      FileOutputStream osf = new FileOutputStream(new File("\\\\69.87.218.82\\curandusImages\\"+Ime_fajl+".jpg"));							      
							      osf.write(imgBytes); 
							      osf.close();  
//							      if (pateka.equalsIgnoreCase("http://89.205.28.221/curandusImages/")){
//							    	  pateka_send="\"http:"+"/"+"/"+"89.205.28.221"+"/"+"curandusImages"+"/"+Ime_fajl+".jpg"+"\"";
//							      }
//							      else
//							      {
//							    	 pateka_send="\"http:"+"/"+"/"+"192.168.1.110"+":"+"8080"+"/"+"curandusImages"+"/"+Ime_fajl+".jpg"+"\"" ;
//							      }
							      pateka_send="\"http:"+"/"+"/"+"104.245.33.167"+":"+"8080"+"/"+"curandusImages"+"/"+Ime_fajl+".jpg"+"\""; 
							      
							      System.out.println("pateka send: "+pateka_send);
							      render="{comparisionurl:"+pateka_send+",comparisionflag:false, comparisionquestion:"+comment+"}";
							      System.out.println("RENDER: "+render);
							      //render="{comparisionurl:"+randomNumber+".jpg,comparisionflag:false}";
							      json = new JSONObject(render);
							      System.out.println("json: "+json);
							      
							      t_item.setRenderingInfo(json.toString());
							   }
						   }
						   catch(Exception e)
						   {
						    e.printStackTrace();
						    throw e;
						   }
					}
					sendTItems.add(t_item);
				}
				
				connection.setAutoCommit(false);
				pss =connection.prepareStatement("call InsertUpdateTreatmentItem(?,?,?,?,?,?,?,?,?,?)",Statement.RETURN_GENERATED_KEYS);
				for(TreatmentItem tt:sendTItems)
				{
					pss.setInt(1,0);
					pss.setInt(2, p_subTreatmentID);
					pss.setString(3, tt.getName());
					pss.setString(4, tt.getRepeatT());
					pss.setString(5, tt.getTypeT());
					pss.setString(6, tt.getDuration());
					pss.setString(7, gson.toJson(tt.getRenderingInfo()));
					pss.setString(8, tt.getDaytime());
					pss.setString(9, tt.getStarttime());
					pss.setString(10, tt.getIntervaldaytime());
					
					pss.addBatch();
				}
				pss.executeBatch();
				//pss.executeQuery();
			}
			connection.commit(); 
			
			return ret_sub_t;
		}
		catch(Exception e)
		{
			connection.rollback();
			e.printStackTrace();
			throw e;
		}

		finally {
				ps.close();
				pss.close();
				connection.close();
		}
	}
	
	
	public Providers GetProviderDataByChatId(Connection connection, int p_chatid) throws Exception
	 {
	  PreparedStatement ps=null;
	  Providers p_eden=new Providers();
	  
	  Providers proverka=new Providers();
	  try
	  {
	      ps =connection.prepareStatement("call GetProviderDataByChatId(?)", Statement.RETURN_GENERATED_KEYS);
	      ps.setInt(1,p_chatid);

	      	ResultSet rs = ps.executeQuery();
	   
		while(rs.next())
		{
			 			p_eden = new Providers(
								rs.getInt(1),
								rs.getString(2),
								rs.getString(3),
								rs.getString(4),
								rs.getString(5),
								rs.getString(6),
								rs.getString(7),
								rs.getString(8),
								rs.getString(9),
								rs.getString(10),
								rs.getString(11),
								rs.getInt(12),
								rs.getDate(13),
								rs.getInt(14),
								rs.getDate(15),
								rs.getInt(16),
								rs.getString(17),
								rs.getInt(18),
								rs.getString(19),
								rs.getString(20),
								rs.getString(21),	
								rs.getInt(22)
								);
		}
		
		if (p_eden.equals(proverka)){
			 throw new WebApplicationException(404);
		}
		else
		{
			return p_eden;
		}
	  	}  
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}
	finally{
			ps.close();
	        connection.close();
		}
	 }
	
	
	public Providers InsertProvider(Connection connection, Providers p_provider) throws Exception
	 {
	  PreparedStatement ps=null;
	  Providers result=new Providers();
	  try
	  {
	      ps =connection.prepareStatement("call InsertProvider(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
	      ps.setString(1,p_provider.getFirstName());
	      ps.setString(2,p_provider.getTypeProvider());
	      ps.setString(3,p_provider.getMiddleInitial());
	      ps.setString(4,p_provider.getLastName());
	      ps.setString(5,p_provider.getStreetAdress());
	      ps.setString(6,p_provider.getCity());
	      ps.setString(7,p_provider.getState());
	      ps.setString(8,p_provider.getZip());
	      ps.setString(9,p_provider.getPhone());
	      ps.setString(10,p_provider.getAlternatePhone());
	      ps.setInt(11,NVL(p_provider.getStatus()));
	      ps.setDate(12,(Date) p_provider.getCreated());
	      ps.setInt(13,NVL(p_provider.getCreatedBy()));
	      ps.setDate(14,(Date)p_provider.getModified());
	      ps.setInt(15,NVL(p_provider.getModifiedBy()));      
	      ps.setString(16,p_provider.getDeviceId());
	      ps.setInt(17,NVL(p_provider.getActivationCode()));
	      ps.setString(18,p_provider.getChatId());
	      ps.setString(19,p_provider.getProfileImageUrl());
	      ps.setString(20,p_provider.getRegId());
	      ps.setInt(21,p_provider.getNotificationEnabled());
	   //ps.executeUpdate();
	   
	            //prest.executeUpdate(query, PreparedStatement.RETURN_GENERATED_KEYS); Throws an error
	            //prest.executeQuery(); Throws an error   
	   ResultSet rs = ps.executeQuery();
	   
	   if (rs.next()){
	    p_provider.setProviderId(rs.getInt(1));
	   }
	   return p_provider;
	  }
	  catch(Exception e)
	  {
	   e.printStackTrace();
	   throw e;
	  }

	  finally {
	    ps.close();
	        connection.close();
	  }
	 }
	public PatientsCascade getTreatmentByRoomId(Connection connection, String p_roomid) throws Exception
	{
		PatientsCascade p_eden = new PatientsCascade();
		PatientsCascade proverka = new PatientsCascade();
		PreparedStatement ps=null;
			try
			{
				//String uname = request.getParameter("uname");
				//PreparedStatement ps = connection.prepareStatement("SELECT SavedTreatmentItemId, SavedTreatmentDetail, Name, TypeT, RepeatT, Duration, RenderingInfo, Created, CreatedBy, Modified, ModifiedBy FROM savedtreatmentitem WHERE savedtreatmentdetail=?");
			    ps = connection.prepareStatement("CALL getTreatmentByRoomId(?)");
				ps.setString(1,p_roomid);
				ResultSet rs = ps.executeQuery();
				while(rs.next())
				{
					//TreatmentItem p_eden = new TreatmentItem();
					
					 p_eden = new PatientsCascade(
										rs.getInt(1),
										rs.getString(2),
										rs.getString(3),
										rs.getString(4),
										rs.getString(5),
										rs.getInt(6),
										rs.getInt(7),
										rs.getString(8),
										rs.getString(9),
										rs.getString(10),
										rs.getString(11)
										);
				}
				
				if (p_eden.equals(proverka)){
					 throw new WebApplicationException(404);
				}
				else
				{
					return p_eden;
				}
			}  
				catch(Exception e)
				{
					e.printStackTrace();
					throw e;
				}
			finally{
					ps.close();
			        connection.close();
			}
	}	
	
	public List<RoomId> GetActiveContactsByProvider(Connection connection, int PatientID) throws Exception
	{
		List<RoomId> t_items = new ArrayList<RoomId>();
		PreparedStatement ps=null;
			try
			{
				//String uname = request.getParameter("uname");
				//PreparedStatement ps = connection.prepareStatement("SELECT SavedTreatmentItemId, SavedTreatmentDetail, Name, TypeT, RepeatT, Duration, RenderingInfo, Created, CreatedBy, Modified, ModifiedBy FROM savedtreatmentitem WHERE savedtreatmentdetail=?");
			    ps = connection.prepareStatement("CALL GetActiveContactsByProvider(?)");
				ps.setInt(1,PatientID);
				ResultSet rs = ps.executeQuery();
				while(rs.next())
				{
					//TreatmentItem p_eden = new TreatmentItem();
					
					RoomId p_eden = new RoomId(
										rs.getString(1)
										);
					t_items.add(p_eden);
				}
				
				if (t_items.isEmpty()){
					 throw new WebApplicationException(404);
				}
				else
				{
					return t_items;
				}
			}  
				catch(Exception e)
				{
					e.printStackTrace();
					throw e;
				}
			finally{
					ps.close();
			        connection.close();
			}
	}	

	public List<PatientsCascade> getPatientsByProvider(Connection connection, int PatientID) throws Exception
	{
		List<PatientsCascade> t_items = new ArrayList<PatientsCascade>();
		PreparedStatement ps=null;
			try
			{
				//String uname = request.getParameter("uname");
				//PreparedStatement ps = connection.prepareStatement("SELECT SavedTreatmentItemId, SavedTreatmentDetail, Name, TypeT, RepeatT, Duration, RenderingInfo, Created, CreatedBy, Modified, ModifiedBy FROM savedtreatmentitem WHERE savedtreatmentdetail=?");
			    ps = connection.prepareStatement("CALL GetPatientsByProvider(?)");
				ps.setInt(1,PatientID);
				ResultSet rs = ps.executeQuery();
				while(rs.next())
				{
					//TreatmentItem p_eden = new TreatmentItem();
					
					PatientsCascade p_eden = new PatientsCascade(
										rs.getInt(1),
										rs.getString(2),
										rs.getString(3),
										rs.getString(4),
										rs.getString(5),
										rs.getInt(6),
										rs.getInt(7),
										rs.getString(8),
										rs.getString(9),
										rs.getString(10),
										rs.getString(11)
										);
					t_items.add(p_eden);
				}
				
				if (t_items.isEmpty()){
					 throw new WebApplicationException(404);
				}
				else
				{
					return t_items;
				}
			}  
				catch(Exception e)
				{
					e.printStackTrace();
					throw e;
				}
			finally{
					ps.close();
			        connection.close();
			}
	}	
	
	public boolean AddContactPatient(Connection connection, Integer providerid, String telephoneNumber, 
			String firstName, String lastName,  String ChatId, String RoomId) throws Exception
	{
		PreparedStatement ps=null;
		try
		{
		    ps =connection.prepareStatement("call AddPatientContact(?,?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
		    ps.setInt(1,providerid);
		    ps.setString(2,telephoneNumber);
			ps.setString(3,firstName);
			ps.setString(4,lastName);	
			ps.setString(5,ChatId);	
			ps.setString(6,RoomId);	
			//ps.setString(4,"0");
			ps.executeUpdate();
			
            //prest.executeUpdate(query, PreparedStatement.RETURN_GENERATED_KEYS); Throws an error
            //prest.executeQuery(); Throws an error			
			ResultSet rs = ps.executeQuery();
			
			if (rs.next()){
				System.out.println("Result");
			}
			return true;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}

		finally {
				ps.close();
		      connection.close();
		}
	}	
	
	
	public boolean AddContactDoctor(Connection connection, Integer providerid, String telephoneNumber, 
			String firstName, String lastName, String ChatId, String RoomId) throws Exception
	{
		PreparedStatement ps=null;
		try
		{
			System.out.println("Prvo");
		    ps =connection.prepareStatement("call AddProviderContact(?,?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
		    ps.setInt(1,providerid);
		    ps.setString(2,telephoneNumber);
			ps.setString(3,firstName);
			ps.setString(4,lastName);
			ps.setString(5,ChatId);
			ps.setString(6,RoomId);
			//ps.setString(4,"0");
			ps.executeUpdate();
			
            //prest.executeUpdate(query, PreparedStatement.RETURN_GENERATED_KEYS); Throws an error
            //prest.executeQuery(); Throws an error			
			ResultSet rs = ps.executeQuery();
			
			if (rs.next()){
				System.out.println("Result");
			}
			return true;
		}
		catch(Exception e)
		{
			throw e;
		}

		finally {
				ps.close();
		      connection.close();
		}
	}	
	

	
	public List<TreatmentItem> getTreatmentItemsByTreatment(Connection connection, int TreatmentID, String TT) throws Exception
	{
		List<TreatmentItem> t_items = new ArrayList<TreatmentItem>();
		PreparedStatement ps=null;
			try
			{
				System.out.println("Try");
				//String uname = request.getParameter("uname");
				//PreparedStatement ps = connection.prepareStatement("SELECT SavedTreatmentItemId, SavedTreatmentDetail, Name, TypeT, RepeatT, Duration, RenderingInfo, Created, CreatedBy, Modified, ModifiedBy FROM savedtreatmentitem WHERE savedtreatmentdetail=?");
			    ps = connection.prepareStatement("CALL getTreatmentItemsByTreatment(?, ?)");
				ps.setString(1, TT);
				ps.setInt(2,TreatmentID);
				ResultSet rs = ps.executeQuery();
				
				System.out.println(rs);
				//System.out.println(rs.getInt(1));
				
				System.out.println("Finish");
				while(rs.next())
				{
					System.out.println("rs.next");
					//TreatmentItem p_eden = new TreatmentItem();
					
					TreatmentItem p_eden = new TreatmentItem(
										rs.getInt(1),
										rs.getInt(2),
										rs.getString(3),
										rs.getString(4),
										rs.getString(5),
										rs.getString(6),
										rs.getString(7),
										rs.getString(8),
										rs.getDate(9),
										rs.getInt(10),
										rs.getDate(11),
										rs.getInt(12),
										rs.getString(13),
										rs.getString(14),
										rs.getString(15)
										);
			

					t_items.add(p_eden);
				}
				
				if (t_items.isEmpty()){
					 throw new WebApplicationException(404);
				}
				else
				{
					return t_items;
				}
			}
				catch(Exception e)
				{
					e.printStackTrace();
					throw e;
				}
			finally {
				ps.close();
				connection.close();
				}
	}
	
	
	public Patients getPatientsData(Connection connection , int patientId) throws Exception
	{
		Patients t_items = new Patients();
		PreparedStatement ps=null;
			try
			{
				//String uname = request.getParameter("uname");
				//PreparedStatement ps = connection.prepareStatement("SELECT SavedTreatmentItemId, SavedTreatmentDetail, Name, TypeT, RepeatT, Duration, RenderingInfo, Created, CreatedBy, Modified, ModifiedBy FROM savedtreatmentitem WHERE savedtreatmentdetail=?");
			    ps = connection.prepareStatement("CALL getPatientData(?)");
				ps.setInt(1,patientId);
				ResultSet rs = ps.executeQuery();
				while(rs.next())
				{
					//TreatmentItem p_eden = new TreatmentItem();
					
					Patients p_eden = new Patients(
										rs.getInt(1),
										rs.getString(2),
										rs.getString(3),
										rs.getString(4),
										rs.getString(5),
										rs.getString(6),
										rs.getString(7),
										rs.getString(8),
										rs.getString(9),
										rs.getString(10),
										rs.getString(11),
										rs.getString(12),
										rs.getString(13),
										rs.getString(14),
										rs.getInt(15),
										rs.getDate(16),
										rs.getInt(17),
										rs.getDate(18),
										rs.getInt(19),
										rs.getString(20),
										rs.getString(21),
										rs.getString(22),
										rs.getInt(23)
										);
					t_items = p_eden;
				}
				
				if (t_items.getPatientId() == 0){
					 throw new NotFoundException();
				}
				else
				{
					return t_items;
				}
			}  
				catch(Exception  e)
				{
					e.printStackTrace();
					throw e;
				}
			finally{
					ps.close();
			        connection.close();
			}
	}
	
	public Patients getPatientsDataByChatID(Connection connection , int p_chatid) throws Exception
	{
		Patients t_items = new Patients();
		PreparedStatement ps=null;
			try
			{
				//String uname = request.getParameter("uname");
				//PreparedStatement ps = connection.prepareStatement("SELECT SavedTreatmentItemId, SavedTreatmentDetail, Name, TypeT, RepeatT, Duration, RenderingInfo, Created, CreatedBy, Modified, ModifiedBy FROM savedtreatmentitem WHERE savedtreatmentdetail=?");
			    ps = connection.prepareStatement("CALL getPatientDatabyChatId(?)");
				ps.setInt(1,p_chatid);
				ResultSet rs = ps.executeQuery();
				while(rs.next())
				{
					//TreatmentItem p_eden = new TreatmentItem();
					
					Patients p_eden = new Patients(
										rs.getInt(1),
										rs.getString(2),
										rs.getString(3),
										rs.getString(4),
										rs.getString(5),
										rs.getString(6),
										rs.getString(7),
										rs.getString(8),
										rs.getString(9),
										rs.getString(10),
										rs.getString(11),
										rs.getString(12),
										rs.getString(13),
										rs.getString(14),
										rs.getInt(15),
										rs.getDate(16),
										rs.getInt(17),
										rs.getDate(18),
										rs.getInt(19),
										rs.getString(20),
										rs.getString(21),
										rs.getString(22),
										rs.getInt(23)
										);
					t_items = p_eden;
				}
				
				if (t_items.getPatientId() == 0){
					 throw new NotFoundException();
				}
				else
				{
					return t_items;
				}
			}  
				catch(Exception  e)
				{
					e.printStackTrace();
					throw e;
				}
			finally{
					ps.close();
			        connection.close();
			}
	}
	
	
	public Patients getPatientsDataRoomId(Connection connection , int patientId, int providerId) throws Exception
	{
		Patients t_items = new Patients();
		PreparedStatement ps=null;
			try
			{
				//String uname = request.getParameter("uname");
				//PreparedStatement ps = connection.prepareStatement("SELECT SavedTreatmentItemId, SavedTreatmentDetail, Name, TypeT, RepeatT, Duration, RenderingInfo, Created, CreatedBy, Modified, ModifiedBy FROM savedtreatmentitem WHERE savedtreatmentdetail=?");
			    ps = connection.prepareStatement("CALL getPatientDataRoomId(?,?)");
				ps.setInt(1,patientId);
				ps.setInt(2,providerId);
				ResultSet rs = ps.executeQuery();
				while(rs.next())
				{
					//TreatmentItem p_eden = new TreatmentItem();
					
					Patients p_eden = new Patients(
										rs.getInt(1),
										rs.getString(2),
										rs.getString(3),
										rs.getString(4),
										rs.getString(5),
										rs.getString(6),
										rs.getString(7),
										rs.getString(8),
										rs.getString(9),
										rs.getString(10),
										rs.getString(11),
										rs.getString(12),
										rs.getString(13),
										rs.getString(14),
										rs.getInt(15),
										rs.getDate(16),
										rs.getInt(17),
										rs.getDate(18),
										rs.getInt(19),
										rs.getString(20),
										rs.getString(21),
										rs.getString(22),
										rs.getInt(23)
										);
					t_items = p_eden;
				}
				
				if (t_items.getPatientId() == 0){
					 throw new NotFoundException();
				}
				else
				{
					return t_items;
				}
			}  
				catch(Exception  e)
				{
					e.printStackTrace();
					throw e;
				}
			finally{
					ps.close();
			        connection.close();
			}
	}	
	
	
	
	public TreatmentItemList updatetreatmenitemlist(Connection connection, TreatmentItemList t_items, int TreatmentItemListId) throws Exception
	{	
		connection.setAutoCommit(false);
		PreparedStatement pss=null;
		System.out.println("start");
				Gson gson = new Gson();
			try{
				pss =connection.prepareStatement("call updateTreatmentItemList(?,?,?,?,?,?,?,?,?,?,?,?,?)",Statement.RETURN_GENERATED_KEYS); 
				pss.setInt(1,NVL(t_items.getTreatmentItemListId())); 
				pss.setInt(2,NVL(t_items.getTreatmentitem())); 
				pss.setString(3,t_items.getLabel()); 
				pss.setDate(4, (Date)t_items.getTimeScheduled());
				pss.setDate(5, (Date)t_items.getTimeDone()); 
				pss.setDate(6,(Date) t_items.getTimeRemove()); 
				pss.setString(7,t_items.getStatus()); 
				pss.setString(8,t_items.getRenderingInfo()); 
				pss.setString(9,t_items.getResponseInfo()); 
				pss.setDate(10,(Date) t_items.getCreated()); 
				pss.setInt(11,t_items.getCreatedBy()); 
				pss.setDate(12,(Date) t_items.getModified()); 
				pss.setInt(13,t_items.getModifiedBy()); 				
				
				System.out.println("Tuka rezultat"+pss.toString()); 
				ResultSet rs = pss.executeQuery(); 
				System.out.println("Tuka rezultat"+pss.toString()); 
				while(rs.next())
				{	
					TreatmentItemList p_eden = new TreatmentItemList(
										rs.getInt(1), 
										rs.getInt(2), 
										rs.getString(3),
										rs.getTimestamp(4),
										rs.getTimestamp(5),
										rs.getTimestamp(6),
										rs.getString(7),
										rs.getString(8),
										rs.getString(9),
										rs.getDate(10),
										rs.getInt(11),
										rs.getDate(12),
										rs.getInt(13)
																			
										);
					t_items=p_eden;
				}
				
				//pss.executeQuery();
			
				connection.commit(); 
				return t_items;
		}
		catch(Exception e)
		{
			connection.rollback();
			e.printStackTrace();
			throw e;
		}

		finally {
				pss.close();
				connection.close();
		}
	}
	
	
	
	public List<ProviderProvider> getprovidersdatabyprovider(Connection connection, int ProviderDetail) throws Exception
	{
		List<ProviderProvider> t_items = new ArrayList<ProviderProvider>();
		PreparedStatement ps=null;
			try
			{
				ps = connection.prepareStatement("CALL getprovidersdatabyprovider(?)");
				ps.setInt(1,ProviderDetail);
				ResultSet rs = ps.executeQuery();
				
				while(rs.next())
				{
					ProviderProvider p_eden = new ProviderProvider(
							rs.getInt(1),
							rs.getInt(2),
							rs.getInt(3),
							rs.getString(4),
							rs.getString(5),
							rs.getDate(6),
							rs.getInt(7),
							rs.getDate(8),
							rs.getInt(9),
							rs.getString(10),
							rs.getString(11),
							rs.getInt(12),
							rs.getString(13)
							);
					t_items.add(p_eden);
				}
				
				if (t_items.isEmpty()){
					 throw new WebApplicationException(404);
				}
				else
				{
					return t_items;
				}
			}
				catch(Exception e)
				{
					e.printStackTrace();
					throw e;
				}
			finally {
				ps.close();
				connection.close();
				}
	}	
	

	
	public boolean EndTreatment(Connection connection, int ActiveTreatmentId) throws Exception
	{	
		PreparedStatement ps=null;
		int p_ActiveTreatmentId;
		boolean flag=false;
		try
		{
			ps = connection.prepareCall("call EndTreatment(?)");
			ps.setInt(1,ActiveTreatmentId);
		   

			ResultSet rs = ps.executeQuery();
			if (rs.next()){
				flag=(rs.getBoolean(1));
			}	
			
			if (flag==false){
				 throw new WebApplicationException(404);
			}
			else  
			{
			return flag;
			}
			}
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}
		finally {
			connection.close();
		}
	}	
	
	
	///// tuka api activation
	 public Providers CheckProviderActivationKey(Connection connection, String deviceId , String phone , int inputCode) throws Exception
	 {
	  PreparedStatement ps=null;
	  Providers result=new Providers();
	  try
	  {
	      ps =connection.prepareStatement("call CheckProviderActivationKey(?,?,?)", Statement.RETURN_GENERATED_KEYS);
	      ps.setString(1,deviceId);
	      ps.setString(2,phone);
	      ps.setInt(3, inputCode);
	       
	   ResultSet rs = ps.executeQuery();
	   
	   if (rs.next()){
	    result.setProviderId(rs.getInt(1));
	    result.setFirstName(rs.getString(2));
	    result.setTypeProvider(rs.getString(3));
	    result.setMiddleInitial(rs.getString(4));
	    result.setLastName(rs.getString(5));
	    result.setStreetAdress(rs.getString(6));
	    result.setCity(rs.getString(7));
	    result.setState(rs.getString(8));
	    result.setZip(rs.getString(9));
	    result.setPhone(rs.getString(10));
	    result.setAlternatePhone(rs.getString(11));
	    result.setStatus(rs.getInt(12));
	    result.setCreated(rs.getDate(13));
	    result.setCreatedBy(rs.getInt(14));
	    result.setModified(rs.getDate(15));
	    result.setModifiedBy(rs.getInt(16));
	    result.setDeviceId(rs.getString(17));
	    result.setActivationCode(rs.getInt(18));
	    result.setChatId(rs.getString(19));
	    result.setProfileImageUrl(rs.getString(20));
	    result.setRegId(rs.getString(21));
	    result.setNotificationEnabled(rs.getInt(22));
	   }
	   return result;
	  }
	  catch(Exception e)
	  {
	   e.printStackTrace();
	   throw e;
	  }

	  finally {
	    ps.close();
	        connection.close();
	  }
	 }
	
	public SavedTemplate DeleteSavedTemplate(Connection connection, int savedtreatmentdetail,int savedtreatmenttemplateid) throws Exception
	{
		SavedTemplate p_eden = new SavedTemplate();
		PreparedStatement ps=null;
		ps = connection.prepareStatement("CALL DeleteSavedTemplate(?,?)");
		try
		{
			ps.setInt(1,savedtreatmentdetail);
			ps.setInt(2,savedtreatmenttemplateid);
			ResultSet rs = ps.executeQuery();
			while(rs.next())
			{
				p_eden = new SavedTemplate(
									rs.getInt(1),   
									rs.getString(2), 
									rs.getInt(3),   
									rs.getDate(4),  
									rs.getInt(5),   
									rs.getDate(6),  
									rs.getInt(7)    
									);
				
			}
			
			if (p_eden == null){
				 throw new WebApplicationException(404);
			}
			else
			{
				return p_eden;
			}
		}
			catch(Exception e)
			{
				e.printStackTrace();
				throw e;
			}
		finally {
			ps.close();
			connection.close();
			}
	}
	
	/// Insert base64 image and save locally
	 public String InsertBase64Image(Connection connection, TreatmentItem t_item) throws Exception
	  { 
	   System.out.println("Vlezeeee");
	   PreparedStatement ps=null; 
	   TreatmentItem p_eden=new TreatmentItem();
	   int p_savedTreatmentID; 
	   String image="" ;
	   JSONObject json;
	   String Ime_fajl="";
	   
	   int randomNumber = (int) Math.floor(Math.random() * 100); 
	   Timestamp timestamp = new Timestamp(System.currentTimeMillis()); 
	   Ime_fajl=randomNumber+ (timestamp.toString().replace(":", "").replace("-", "").replace(".", "").replace(" ", "")).substring(1, 12);	
	   
	   System.out.println("Vlezeeee i ova e random number: "+Ime_fajl);
	   
	   Date d = new Date(System.currentTimeMillis()+5*60*1000);
	   
	   try 
	   {

	      image = t_item.getRenderingInfo(); 
	      Gson gson = new Gson(); 
	      json = new JSONObject(t_item.getRenderingInfo()); 
	      image = json.getString("base64"); 
	         Base64 decoder = new Base64(); 
	      byte[] imgBytes = Base64.decodeBase64(image);         
	      FileOutputStream osf = new FileOutputStream(new File("\\\\69.87.218.82\\curandusImages\\"+Ime_fajl+".jpg"));
	      osf.write(imgBytes); 
	      osf.close(); 
	      //System.out.println("OVA e slikata vo bajti: "+imgBytes); 
	           
	        

	     return Ime_fajl; 
	   }
	   catch(Exception e)
	   {
	    e.printStackTrace();
	    throw e;
	   }
	  }	
	
	
	
	public boolean deleteProviderProvider(Connection connection, int ProviderDetail1, int ProviderDetail2) throws Exception
	{	
		PreparedStatement ps=null;
		int p_ProviderDetail1;
		int p_ProviderDetail2;
		boolean flag=false;
		try
		{
			ps = connection.prepareCall("call deleteProviderProvider(?,?)");
			ps.setInt(1,ProviderDetail1);
			ps.setInt(2,ProviderDetail2);
		   

			ResultSet rs = ps.executeQuery();
			if (rs.next()){
				flag=(rs.getBoolean(1));
			}	
			
			if (flag==false){
				 throw new WebApplicationException(404);
			}
			else  
			{
			return flag;
			}
			}
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}
		finally {
			connection.close();
		}
	}
	
	
	public boolean deleteProviderPatient(Connection connection, int ProviderDetail, int PatientDetail) throws Exception
	{	
		PreparedStatement ps=null;
		int p_ProviderDetail;
		int p_PatientDetail;
		boolean flag=false;
		try
		{
			ps = connection.prepareCall("call deleteProviderPatient(?,?)");
			ps.setInt(1,ProviderDetail);
			ps.setInt(2,PatientDetail);
		   

			ResultSet rs = ps.executeQuery();
			if (rs.next()){
				flag=(rs.getBoolean(1));
			}	
			
			if (flag==false){
				 throw new WebApplicationException(404);
			}
			else  
			{
			return flag;
			}
			}
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}
		finally {
			connection.close();
		}
	}
	
//	public String updateProviderImageUrl(Connection connection, int providerId, String imageUrl ) throws Exception
//	 { 
//		connection.setAutoCommit(false);
//	  	PreparedStatement pss = null;
//	  	System.out.println("start");
//	    Gson gson = new Gson();
//	    
//	    String flag = "false";
//	  try{
//	    pss = connection.prepareStatement("call UpdateProvider(?,?)",Statement.RETURN_GENERATED_KEYS); 
//	    pss.setInt(1,providerId); 
//	    pss.setString(2,imageUrl); 
//	    
//	    ResultSet rs = pss.executeQuery(); 
//	    System.out.println("Tuka rezultat"+pss.toString()); 
//	    connection.commit(); 
//	    flag = "true";
//	    
//	    return flag;
//	  }
//	  catch(Exception e)
//	  {
//		  flag = "false";
//		  e.printStackTrace();
//		  throw e;
//	  }
//
//	  finally {
//		  pss.close();
//		  connection.close();
//	  }  
//	}	
	
	public boolean updateProviderImageUrl(Connection connection, int providerId, String imageUrl, String name, String lastname) throws Exception
	{	
		PreparedStatement ps=null;
		int p_ActiveTreatmentId;
		boolean flag=false;
		try
		{
		    ps = connection.prepareStatement("call UpdateProvider(?,?,?,?)",Statement.RETURN_GENERATED_KEYS); 
		    ps.setInt(1,providerId); 
		    ps.setString(2,imageUrl); 
		    ps.setString(3,name);
		    ps.setString(4,lastname);	   

			ResultSet rs = ps.executeQuery();
			System.out.println("ova e rezultatot: "+rs);
			flag = true;
			//return flag;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}
		finally {
			connection.close();
			return flag;
		}
	}	
	
	
}