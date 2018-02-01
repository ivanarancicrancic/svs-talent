package com.webService;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.client.ProjectManager;
import com.google.gson.Gson;
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
import com.model.VerificationToken;


@Path("/api")
public class JSONService {

//	@GET
//	@Path("/get")
//	@Produces(MediaType.APPLICATION_JSON)
//	public Track getTrackInJSON() {
//
//		Track track = new Track();
//		track.setTitle("Enter Sandman");
//		track.setSinger("Metallica");
//
//		return track;
//	}
//
//	@POST
//	@Path("/post")
//	@Consumes(MediaType.APPLICATION_JSON)
//	public Response createTrackInJSON(Track track) {
//
//		String result = "Track saved : " + track;
//		return Response.status(201).entity(result).build();
//	}
	
	   @GET
	   @Path("/activecontacts/providerId={providerId}&&securityToken={securityToken}")
	   @Produces("application/json")
	   public String GetActiveContactsByProvider(@PathParam("providerId") Integer providerId, @PathParam("securityToken") String securityToken) throws Exception 
		{
		    
			 System.out.println("init");
			List<RoomId> t_items = null;
			String t_tems_str  = null;
			
			try{
				ProjectManager projectManager= new ProjectManager();
				System.out.println("providerId: "+providerId);
				 
				 VerificationToken verificationToken = projectManager.getVerificationToken(providerId);
				    if (verificationToken == null) {
				        String message = "User must have token!";
				        return message;
				    }
				     
				    int provider_id = verificationToken.getProvider_id();
				    Calendar cal = Calendar.getInstance();
				    if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
				        String messageValue = "token expired!";
				        return messageValue;
				    } 
				
				
				t_items = projectManager.GetActiveContactsByProvider(providerId, securityToken);
				//StringBuffer sb = new StringBuffer();
				Gson gson = new Gson();
				System.out.println(gson.toJson(t_items));
				t_tems_str = gson.toJson(t_items);

//				if (t_items.isEmpty()){
//					 throw new WebApplicationException(404);
//				}
//				else
//				{
					return t_tems_str;
				//}
			}
			catch(Exception e)
			{
				e.printStackTrace();
				throw e;
			}		
		}	
	
		@GET
		@Path("/notificationsforreminder/securityToken={securityToken}")
		@Produces("application/json")
	   public List<ReminderNotification> GetNotificationForReminder(@PathParam("securityToken") String securityToken) throws Exception 
		{
			//System.out.println("1s");
			List<ReminderNotification> t_items = null;
			String t_tems_str  = null;
			try 
			{
				ProjectManager projectManager = new ProjectManager();
				t_items = projectManager.GetNotificationForReminder(securityToken);
				//StringBuffer sb = new StringBuffer();
				Gson gson = new Gson();
				System.out.println(gson.toJson(t_items));
				t_tems_str = gson.toJson(t_items);
				
				return t_items;

			} catch (Exception e)
			{
				System.out.println("error");
				e.printStackTrace();
				throw e;
			}
		}		   
	
	@GET
	@Path("/treatmentitemlist/patientid={patientid}&&securityToken={securityToken}")
	@Produces("application/json")
   public List<TreatmentItemListRegid> getTreatmentItemListLoadPatient(@PathParam("patientid")int patientid, @PathParam("securityToken") String securityToken) throws Exception 
	{
		//System.out.println("1s");
		List<TreatmentItemListRegid> t_items = null;
		String t_tems_str  = null;
		try 
		{
			ProjectManager projectManager= new ProjectManager();
			t_items = projectManager.getTreatmentItemListLoadPatient(patientid, securityToken);
			//StringBuffer sb = new StringBuffer();
			Gson gson = new Gson();
			System.out.println(gson.toJson(t_items));
			t_tems_str = gson.toJson(t_items);
			
			return t_items;

		} catch (Exception e)
		{
			System.out.println("error");
			e.printStackTrace();
			throw e;
		}
		
	}	
	
	 @POST
	 @Path("/insertpatient")
	 @Consumes({MediaType.APPLICATION_JSON })
	 @Produces("application/json")
	 public String insertPatient(Patients p_patient,  String securityToken) {
		 System.out.println("init");
		 Patients p_pat=new Patients();
		String t_tems_str = null;
		try 
		{
			ProjectManager projectManager= new ProjectManager();
			System.out.println("init");
			p_pat = projectManager.InsertPatient(p_patient, securityToken);
			System.out.println("post init");
			//System.out.println("flag: "+flag);
			Gson gson = new Gson();
			System.out.println(gson.toJson(p_pat));
			t_tems_str = gson.toJson(p_pat);

		} catch (Exception e)
		{
			System.out.println("error");
			e.printStackTrace();
		}
		return t_tems_str;
	}		
	
	@GET
	@Path("/sendsms/to={phoneto}&body={body}&securityToken={securityToken}")
	@Produces("application/json")
	public String SendSMS(@PathParam("phoneto") String phoneto, @PathParam("body") String body, @PathParam("securityToken") String securityToken) throws Exception  {	
		ProjectManager projectManager= new ProjectManager();
		boolean flag = false;
		String ret_str = null;
		try {
			flag = projectManager.SendSMS(phoneto, body);
			Gson gson = new Gson();
			System.out.println(gson.toJson(flag));
			ret_str = gson.toJson(flag);
			return ret_str;
		} 
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}	
	}	
	
	@GET
	@Path("/getsavedtreatmenttemplatebyprovider/{ProviderDetail}&&{securityToken}")
	@Produces("application/json")
   public String getSavedTemplate(@PathParam("ProviderDetail")int ProviderDetail, @PathParam("securityToken") String securityToken)
	{
		List<SavedTemplate> t_items = null;
		String t_tems_str  = null;
		try 
		{
			ProjectManager projectManager= new ProjectManager();
			t_items = projectManager.getSavedTemplate(ProviderDetail, securityToken);
			Gson gson = new Gson();
			System.out.println(gson.toJson(t_items));
			t_tems_str = gson.toJson(t_items);

		} catch (Exception e)
		{
			System.out.println("error");
		}
		return t_tems_str;
	}	
	
	@GET
	@Path("/treatmentitemlis/activetreatmentid={activetreatmentid}&&securityToken={securityToken}")
	@Produces("application/json")
   public List<TreatmentItemListScroll> getTreatmentItemListLoad(@PathParam("activetreatmentid")int activetreatmentid, @PathParam("securityToken") String securityToken) throws Exception 
	{
		//System.out.println("1s");
		List<TreatmentItemListScroll> t_items = null;
		String t_tems_str  = null;
		try 
		{
			ProjectManager projectManager= new ProjectManager();
			t_items = projectManager.getTreatmentItemListLoad(activetreatmentid, securityToken);
			//StringBuffer sb = new StringBuffer();
			Gson gson = new Gson();
			System.out.println(gson.toJson(t_items));
			t_tems_str = gson.toJson(t_items);
			
			return t_items;

		} catch (Exception e)
		{
			System.out.println("error");
			e.printStackTrace();
			throw e;
		}
		
	}
	
	
	@GET
	@Path("/treatmentitemlistscrollpatient/treatmentitemlistid={treatmentitemlistid}&updown={updown}&range={range}&securityToken={securityToken}")
	@Produces("application/json")
   public List<TreatmentItemListRegid> getTreatmentItemListScrollPatient(@PathParam("treatmentitemlistid")int treatmentitemlistid, 
		   @PathParam("updown")String updown, @PathParam("range")int range,  @PathParam("securityToken") String securityToken) throws Exception
	{
		//System.out.println("1s");
		List<TreatmentItemListRegid> t_items = null;
		String t_tems_str  = null;
		try 
		{
			ProjectManager projectManager= new ProjectManager();
			t_items = projectManager.getTreatmentItemListScrollPatient(treatmentitemlistid, updown, range, securityToken);
			//StringBuffer sb = new StringBuffer();
			Gson gson = new Gson();
			System.out.println(gson.toJson(t_items));
			t_tems_str = gson.toJson(t_items);
			
			return t_items;

		} catch (Exception e)
		{
			System.out.println("error");
			e.printStackTrace();
			throw e;
		}
		
	}	
	
	@GET
	@Path("/treatmentitemlistscroll/treatmentitemlistid={treatmentitemlistid}&updown={updown}&range={range}&securityToken={securityToken}")
	@Produces("application/json")
   public List<TreatmentItemListRegid> getTreatmentItemListScroll(@PathParam("treatmentitemlistid")int treatmentitemlistid, 
		   @PathParam("updown")String updown, @PathParam("range")int range, @PathParam("securityToken") String securityToken) throws Exception
	{
		//System.out.println("1s");
		List<TreatmentItemListRegid> t_items = null;
		String t_tems_str  = null;
		try 
		{
			ProjectManager projectManager= new ProjectManager();
			t_items = projectManager.getTreatmentItemListScroll(treatmentitemlistid, updown, range, securityToken);
			//StringBuffer sb = new StringBuffer();
			Gson gson = new Gson();
			System.out.println(gson.toJson(t_items));
			t_tems_str = gson.toJson(t_items);
			
			return t_items;

		} catch (Exception e)
		{
			System.out.println("error");
			e.printStackTrace();
			throw e;
		}
		
	}	
	
	@POST
	@Path("/updatesavedtreatment/savedtreatmentid={savedtreatmentid}")
	@Consumes(MediaType.APPLICATION_JSON)
	public String UpdateSavedTreatment(@PathParam("savedtreatmentid")int savedtreatmentid,List<TreatmentItem> t_items, String securityToken) {
		
		ProjectManager projectManager= new ProjectManager();
		boolean flag=false;
		String t_tems_str = null;
		try {
			flag = projectManager.UpdateSavedTreatment(t_items, savedtreatmentid, securityToken);
			Gson gson = new Gson();
			System.out.println(gson.toJson(flag));
			t_tems_str = gson.toJson(flag);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return t_tems_str;
	}	
	
	@POST
	@Path("/UpdateActiveSubTreatment/subtreatmentid={p_subtreatmentid}")
	@Consumes(MediaType.APPLICATION_JSON)
	public String InsertActiveSubTreatment(@PathParam("p_subtreatmentid") Integer p_subtreatmentid,List<TreatmentItem> t_items, String securityToken) {
		
		ProjectManager projectManager= new ProjectManager();
		SubTreatment flag=new SubTreatment();
		String t_tems_str = null;
		try {
			flag = projectManager.UpdateActiveSubTreatment(t_items,p_subtreatmentid, securityToken);
			Gson gson = new Gson();
			System.out.println(gson.toJson(flag));
			t_tems_str = gson.toJson(flag);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return t_tems_str;
	}	
	
//	+ "/providerid={providerid}&"
//	+ "nametreatment={nametreatment : (.+)?}")
	@POST
	@Path("/insertsavedtreatment")
	@Consumes(MediaType.APPLICATION_JSON)
	public String CheckNameSavedTreatment(@QueryParam("providerid") Integer providerid, @QueryParam("nametreatment") String nametreatment,
			List<TreatmentItem> t_items, String securityToken) {	
		ProjectManager projectManager= new ProjectManager();
		int flag;
		String t_tems_str = null;
		try {
			flag = projectManager.CheckNameSavedTreatment( providerid, nametreatment, t_items, securityToken);
			Gson gson = new Gson();
			System.out.println(gson.toJson(flag));
			t_tems_str = gson.toJson(flag);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return t_tems_str;
	}		
	
	@POST
	@Path("/InsertSavedTreatment/&providerid={providerid}&"
			+ "nametreatment={nametreatment : (.+)?}")
	@Consumes(MediaType.APPLICATION_JSON)
	public String InsertSavedTreatment(@PathParam("providerid") Integer providerid, @PathParam("nametreatment") String nametreatment,
			List<TreatmentItem> t_items, String securityToken) {	
		ProjectManager projectManager= new ProjectManager();
		boolean flag=false;
		String t_tems_str = null;
		try {
			flag = projectManager.InsertSavedTreatment( providerid, nametreatment, t_items, securityToken);
			Gson gson = new Gson();
			System.out.println(gson.toJson(flag));
			t_tems_str = gson.toJson(flag);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return t_tems_str;
	}		
	
	@POST
	@Path("/InsertActiveSubTreatment/activetreatmentid={activetreatmentid}&providerid={providerid}&patientid={patientid}&"
			+ "nametreatment={nametreatment}&namesubtreatment={namesubtreatment}")
	@Consumes(MediaType.APPLICATION_JSON)
	public String InsertActiveSubTreatment(@PathParam("activetreatmentid") Integer activetreatmentid,
			@PathParam("providerid") Integer providerid, @PathParam("patientid") Integer patientid, 
			@PathParam("nametreatment") String nametreatment, @PathParam("namesubtreatment") String namesubtreatment,
			List<TreatmentItem> t_items, String securityToken) {
		
		ProjectManager projectManager= new ProjectManager();
		SubTreatment ret_sub_t=new SubTreatment();
		int flag=0;
		String t_tems_str = null;
		try {
			ret_sub_t = projectManager.InsertActiveSubTreatment(activetreatmentid, providerid, patientid, 
					nametreatment, namesubtreatment,t_items, securityToken);
			Gson gson = new Gson();
			System.out.println(gson.toJson(ret_sub_t));
			t_tems_str = gson.toJson(ret_sub_t);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return t_tems_str;
	}	
	
	@POST
	@Path("/insert")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Providers createPro(Providers track) {

		Providers p_prov=null;
		ProjectManager projectManager= new ProjectManager();
		try {
			p_prov = projectManager.InsertProvider(track);
			return p_prov;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return p_prov;
	}
	
	 @POST
	 @Path("/insertprovider")
	 @Consumes({MediaType.APPLICATION_JSON })
	 @Produces("application/json")
	 public String insertProvider(Providers p_provider) {
		 System.out.println("init");
		 Providers p_prov=new Providers();
		String t_tems_str = null;
		try 
		{
			ProjectManager projectManager= new ProjectManager();
			System.out.println("init");
			p_prov = projectManager.InsertProvider(p_provider);
			System.out.println("post init");
			//System.out.println("flag: "+flag);
			Gson gson = new Gson();
			System.out.println(gson.toJson(p_prov));
			t_tems_str = gson.toJson(p_prov);

		} catch (Exception e)
		{
			System.out.println("error");
			e.printStackTrace();
		}
		return t_tems_str;
	}	
	 
	   @GET
	   @Path("/treatment/roomid={roomid}&&securityToken={securityToken}")
	   @Produces("application/json")
	   public String getTreatmentByRoomId(@PathParam("roomid") String roomid, @PathParam("securityToken") String securityToken) throws Exception 
		{
			 System.out.println("init");
		    PatientsCascade t_items = new PatientsCascade();;
			String t_tems_str  = null;
			
			try{
				ProjectManager projectManager= new ProjectManager();
				t_items = projectManager.getTreatmentByRoomId(roomid, securityToken);
				//StringBuffer sb = new StringBuffer();
				Gson gson = new Gson();
				System.out.println(gson.toJson(t_items));
				t_tems_str = gson.toJson(t_items);

//				if (t_items.isEmpty()){
//					 throw new WebApplicationException(404);
//				}
//				else
//				{
					return t_tems_str;
				//}
			}
			catch(Exception e)
			{
				e.printStackTrace();
				throw e;
			}		
		}	 
	 
	
	
   @GET
   @Path("/patients/providerId={providerId}&&securityToken={securityToken}")
   @Produces("application/json")
   public String getPatientsAllCascade(@PathParam("providerId") Integer providerId, @PathParam("securityToken") String securityToken) throws Exception 
	{
		 System.out.println("init");
		List<PatientsCascade> t_items = null;
		String t_tems_str  = null;
		
		try{
			ProjectManager projectManager= new ProjectManager();
			t_items = projectManager.getPatientsByProvider(providerId, securityToken);
			//StringBuffer sb = new StringBuffer();
			Gson gson = new Gson();
			System.out.println(gson.toJson(t_items));
			t_tems_str = gson.toJson(t_items);

//			if (t_items.isEmpty()){
//				 throw new WebApplicationException(404);
//			}
//			else
//			{
				return t_tems_str;
			//}
		}
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}		
	}
	
	@POST
	@Path("/addcontactpatient/providerId={providerID}&phone={phone}&firstName={firstName}"
			+ "&lastName={lastName}&chatid={chatid}&roomid={roomid}")	
	@Produces("application/json")
   public String AddContactPatient(@PathParam("providerID")int providerID, @PathParam("phone")String phone,
			@PathParam("firstName")String firstName, @PathParam("lastName")String lastName,
			@PathParam("chatid")String chatid, @PathParam("roomid")String roomid, String securityToken)
	{
		boolean flag=false;
		String t_tems_str = null;
		try 
		{
			ProjectManager projectManager= new ProjectManager();
			flag = projectManager.AddContactPatient(providerID, phone, firstName, lastName, chatid, roomid, securityToken);
			//System.out.println("flag: "+flag);
			Gson gson = new Gson();
			System.out.println(gson.toJson(flag));
			t_tems_str = gson.toJson(flag);

		} catch (Exception e)
		{
			System.out.println("error");
			e.printStackTrace();
		}
		return t_tems_str;
	}		
	
	@POST
	@Path("/addcontactdoctor/providerId={providerID}&phone={phone}&firstName={firstName}"
			+ "&lastName={lastName}&chatid={chatid}&roomid={roomid}")	
	@Produces("application/json")
   public String AddContactDoctor(@PathParam("providerID")int providerID, @PathParam("phone")String phone,
			@PathParam("firstName")String firstName, @PathParam("lastName")String lastName,
			@PathParam("chatid")String chatid, @PathParam("roomid")String roomid, String securityToken)
	{
		boolean flag=false;
		List<Providers> t_items = null;
		String t_tems_str = null;
		try 
		{
			ProjectManager projectManager= new ProjectManager();
			flag = projectManager.AddContactDoctor(providerID, phone, firstName, lastName, chatid, roomid, securityToken);
			//t_items = projectManager.AddContactDoctor(providerID, phone, firstName, lastName);
			//StringBuffer sb = new StringBuffer();
			Gson gson = new Gson();
			System.out.println(gson.toJson(flag));
			t_tems_str = gson.toJson(flag);

		} 
		
		catch (Exception e)
		{
			System.out.println("error");
		}
		return t_tems_str;
	}	

	@GET
	@Path("/gettreatmentitemssbytreatment/treatmentId={treatmentID}&typetreatment={tt}&securityToken={securityToken}")
	@Produces("application/json")
   public List<TreatmentItem> getTreatmentItemsByTreatment(@PathParam("treatmentID")int treatmentID, @PathParam("tt")String tt, @PathParam("securityToken")String securityToken)
	{
		//System.out.println("1s");
		List<TreatmentItem> t_items = null;
		String t_tems_str  = null;
		try 
		{
			ProjectManager projectManager= new ProjectManager();
			t_items = projectManager.getTreatmentItemsByTreatment(treatmentID, tt, securityToken);
			//StringBuffer sb = new StringBuffer();
			Gson gson = new Gson();
			System.out.println(gson.toJson(t_items));
			t_tems_str = gson.toJson(t_items);
			return t_items;
		} 
		
		catch (Exception e)
		{
			System.out.println("error");
			return null;
		}
		
	}
	
	@GET
	@Path("/getPatientsDataRoomId/patientId={patientId}&providerid={providerid}&securityToken={securityToken}")
	@Produces("application/json")
   public Patients getPatientDataRoomId(@PathParam("patientId")int patientId, @PathParam("providerid")int providerid, @PathParam("securityToken")String securityToken) throws Exception 
	{
		//System.out.println("1s");
		Patients t_items = null;
		String t_tems_str  = null;
		try 
		{
			ProjectManager projectManager= new ProjectManager();
			t_items = projectManager.getPatientDataRoomId(patientId, providerid, securityToken);
			Gson gson = new Gson();
			System.out.println(gson.toJson(t_items));
			t_tems_str = gson.toJson(t_items);
			return t_items;
		} 
		
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}		
	}	
	
	@GET
	@Path("/getPatientsDataByChatId/chatid={p_chatid}&securityToken={securityToken}")
	@Produces("application/json")
   public Patients getPatientsDataByChatID(@PathParam("p_chatid")int p_chatid, @PathParam("securityToken")String securityToken) throws Exception 
	{
		System.out.println("vlezeeeeeeee vo getPatientsDataByChatID");
		Patients t_items = null;
		String t_tems_str  = null;
		try 
		{
			ProjectManager projectManager= new ProjectManager();
			t_items = projectManager.getPatientsDataByChatID(p_chatid, securityToken);
			Gson gson = new Gson();
			System.out.println(gson.toJson(t_items));
			t_tems_str = gson.toJson(t_items);
			return t_items;
		} 
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}		
	}	
	
	@GET
	@Path("/getPatientsData/patientId={patientId}&securityToken={securityToken}")
	@Produces("application/json")
   public Patients getPatientData(@PathParam("patientId")int patientId, @PathParam("securityToken")String securityToken) throws Exception 
	{
		System.out.println("vlezeeeeeeee vo getPatientsData");
		//System.out.println("1s");
		Patients t_items = null;
		String t_tems_str  = null;
		try 
		{
			ProjectManager projectManager= new ProjectManager();
			t_items = projectManager.getPatientData(patientId, securityToken);
			Gson gson = new Gson();
			System.out.println(gson.toJson(t_items));
			t_tems_str = gson.toJson(t_items);
			return t_items;
		} 
		
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}		
	}
	
	
	@POST
	@Path("/updatetreatmenitemlist/TreatmentItemListId={TreatmentItemListId}")
	@Produces("application/json")
	@Consumes(MediaType.APPLICATION_JSON)
	public String updatetreatmenitemlist(@PathParam("TreatmentItemListId")int TreatmentItemListId,TreatmentItemList t_items, String securityToken) {
		
		ProjectManager projectManager= new ProjectManager();
		TreatmentItemList flag;
		String t_tems_str = null;
		try {
			flag = projectManager.updatetreatmenitemlist(t_items, TreatmentItemListId, securityToken);
			Gson gson = new Gson();
			System.out.println(gson.toJson(flag));
			t_tems_str = gson.toJson(flag);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return t_tems_str;
	}
	

	@GET
	@Path("/getprovidersdatabyprovider/ProviderProviderId={ProviderProviderId}&&securityToken={securityToken}")
	@Produces("application/json")
   public String getprovidersdatabyprovider(@PathParam("ProviderProviderId")int ProviderProviderId, @PathParam("securityToken")String securityToken)
	{
		List<ProviderProvider> t_items = null;
		String t_tems_str  = null;
		try 
		{
			ProjectManager projectManager= new ProjectManager();
			t_items = projectManager.getprovidersdatabyprovider(ProviderProviderId, securityToken);
			Gson gson = new Gson();
			System.out.println(gson.toJson(t_items));
			t_tems_str = gson.toJson(t_items);

		} catch (Exception e)
		{
			System.out.println("error");
		}
		return t_tems_str;
	}	
	
	

	@POST
	@Path("/EndTreatment/ActiveTreatmentId={ActiveTreatmentId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces("application/json")
	public String EndTreatment(@PathParam("ActiveTreatmentId") Integer ActiveTreatmentId, String securityToken) throws Exception  {	
		ProjectManager projectManager= new ProjectManager();
		boolean flag = false;
		String t_tems_str = null;
		try {
			flag = projectManager.EndTreatment( ActiveTreatmentId, securityToken);
			Gson gson = new Gson();
			System.out.println(gson.toJson(flag));
			t_tems_str = gson.toJson(flag);
			return t_tems_str;
		} 
		
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}	
		
	}	

	@GET
	@Path("/GetProviderDataByChatId/chatid={p_chat_id}&securityToken={securityToken}") 
    @Produces("application/json") 
    public Providers GetProviderDataByChatId(@PathParam("p_chat_id")int p_chat_id, @PathParam("securityToken")String securityToken) throws Exception 
	{
		ProjectManager projectManager= new ProjectManager();
		Providers provider = new Providers();
		String t_tems_str = null;
		try {
			provider = projectManager.GetProviderDataByChatId(p_chat_id, securityToken);
//			Gson gson = new Gson();
//			System.out.println(gson.toJson(t_items));
//			t_tems_str = gson.toJson(t_items);
			return provider;
		}
			catch(Exception e)
			{
				e.printStackTrace();
				throw e;
			}
	}	
	
	@GET
	@Path("/CheckProviderActivationKey/{deviceId}&&{phone}&&{ActivationCode}&&{securityToken}") 
    @Produces("application/json") 
    public Providers CheckProviderActivationKey(@PathParam("deviceId")String deviceId,@PathParam("phone")String phone ,@PathParam("ActivationCode")int ActivationCode, @PathParam("securityToken")String securityToken)throws Exception 
	{
		ProjectManager projectManager= new ProjectManager();
		Providers provider = new Providers();
		String t_tems_str = null;
		try {
			provider = projectManager.CheckProviderActivationKey(deviceId, phone, ActivationCode, securityToken);
//			Gson gson = new Gson();
//			System.out.println(gson.toJson(t_items));
//			t_tems_str = gson.toJson(t_items);
			return provider;
		}
			catch(Exception e)
			{
				e.printStackTrace();
				throw e;
			}
	}
	
	@GET
	@Path("/DeleteSavedTemplate/{savedtreatmentdetail}&&{savedtreatmenttemplateid}&&{securityToken}") 
    @Produces("application/json") 
    public SavedTemplate DeleteSavedTemplate(@PathParam("savedtreatmentdetail")int savedtreatmentdetail,@PathParam("savedtreatmenttemplateid")int savedtreatmenttemplateid, @PathParam("securityToken")String securityToken)throws Exception 
	{
		ProjectManager projectManager= new ProjectManager();
		SavedTemplate provider = new SavedTemplate();
		String t_tems_str = null;
		try {
			provider = projectManager.DeleteSavedTemplate(savedtreatmentdetail, savedtreatmenttemplateid, securityToken);

			return provider;
		}
			catch(Exception e)
			{
				e.printStackTrace();
				throw e;
			}
	}
	
	
	@POST
	@Path("/inserttreatmentitemimage") 
	@Consumes(MediaType.APPLICATION_JSON) //byte[] imageCode, TreatmentItem t_item
	@Produces("application/json") 
	public String InsertBase64Image(	TreatmentItem tmp, String securityToken){ 
	ProjectManager projectManager= new ProjectManager(); 
	String t_item =""; 
		//System.out.println("OVA KREIRAN"); 
		try { 
			t_item = projectManager.InsertBase64Image(tmp, securityToken); 
			Gson gson = new Gson(); 
			//System.out.println("OVA KREIRAN OBJEKT:" + gson.toJson(t_item)); 
		} catch (Exception e){ 
			// TODO Auto-generated catch block 
			e.printStackTrace(); 
		} 
		return t_item; 
	}
	
	@GET
	@Path("/deleteProviderProvider/{ProviderDetail1}&&{ProviderDetail2}&&securityToken={securityToken}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces("application/json")
	public String deleteProviderProvider(@PathParam("ProviderDetail1") Integer ProviderDetail1,@PathParam("ProviderDetail2") Integer ProviderDetail2, @PathParam("securityToken")String securityToken) throws Exception  {	
		ProjectManager projectManager= new ProjectManager();
	
		boolean flag = false;
		String t_tems_str = null;
		try {
			flag = projectManager.deleteProviderProvider( ProviderDetail1, ProviderDetail2, securityToken);
			Gson gson = new Gson();
			System.out.println(gson.toJson(flag));
			t_tems_str = gson.toJson(flag);
			return t_tems_str;
		} 
		
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}	
		
	}
	
	
	@GET
	@Path("/deleteProviderPatient/{ProviderDetail}&&{PatientDetail}&&securityToken={securityToken}")
	@Consumes(MediaType.APPLICATION_JSON)
	public String deleteProviderPatient(@PathParam("ProviderDetail") Integer ProviderDetail,@PathParam("PatientDetail") Integer PatientDetail, @PathParam("securityToken")String securityToken) throws Exception  {	
		ProjectManager projectManager= new ProjectManager();
		System.out.println("jkadfahskjdhasjkdnas");
		boolean flag = false;
		String t_tems_str = null;
		try {
			flag = projectManager.deleteProviderPatient( ProviderDetail, PatientDetail, securityToken);
			Gson gson = new Gson();
			System.out.println(gson.toJson(flag));
			t_tems_str = gson.toJson(flag);
			return t_tems_str;
		} 
		
		catch(Exception e)
		{
			e.printStackTrace();
			System.out.println(e);
			throw e;
		}	
		
	}
	
	
	 @POST
	 @Path("/updateProviderImageUrl/{providerId}&&{imageUrl}&&{name}&&{lastname}")
	 @Consumes(MediaType.APPLICATION_JSON)
	 public String updateProviderImageUrl(@PathParam("providerId") Integer providerId,@PathParam("imageUrl") String imageUrl, @PathParam("name") String name, @PathParam("lastname") String lastname, String securityToken) throws Exception { 
	  ProjectManager projectManager= new ProjectManager();
	  boolean flag=false;
	  String t_tems_str = null;
	  
		try {
			
			flag = projectManager.updateProviderImageUrl( providerId, imageUrl, name, lastname, securityToken);
			Gson gson = new Gson();
			System.out.println(gson.toJson(flag));
			t_tems_str = gson.toJson(flag);	
			return t_tems_str;
		} 
		
		catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}	
			
	    
	   
	 }	
}