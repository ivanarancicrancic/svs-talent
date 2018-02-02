package com.client;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import com.database.Database;
import com.database.Project;
import com.model.ActiveTreatment;
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
import com.mysql.jdbc.Statement;

public class ProjectManager {
	
	public List<RoomId> GetActiveContactsByProvider(int providerid, String securityToken) throws Exception {
		List<RoomId> t_items = null;
		try {
			    Database database= new Database();
			    Connection connection = database.Get_Connection();
				Project project= new Project();
				t_items=project.GetActiveContactsByProvider(connection, providerid, securityToken);
		
		} catch (Exception e) {
			throw e;
		}
		return t_items;
	}		
	
	public Patients getPatientDataRoomId(int patientId, int providerid, String securityToken) throws Exception {
		Patients t_items = null;
		try {
			    Database database= new Database();
			    Connection connection = database.Get_Connection();
				Project project= new Project();
				t_items=project.getPatientsDataRoomId(connection,patientId,providerid, securityToken);
		
		} catch (Exception e) {
			throw e;
		}
		return t_items;
	}	
	
	public Patients getPatientsDataByChatID(int patientId, String securityToken) throws Exception {
		Patients t_items = null;
		try {
			    Database database= new Database();
			    Connection connection = database.Get_Connection();
				Project project= new Project();
				t_items=project.getPatientsDataByChatID(connection,patientId, securityToken);
		
		} catch (Exception e) {
			throw e;
		}
		return t_items;
	}
	
	public List<ReminderNotification> GetNotificationForReminder(String securityToken) throws Exception {
		List<ReminderNotification> t_items = null;
		try {
			    Database database= new Database();
			    Connection connection = database.Get_Connection();
				Project project= new Project();
				t_items=project.GetNotificationForReminder(connection, securityToken);
		} catch (Exception e) {
			throw e;
		}
		return t_items;
	}		
	
	public List<TreatmentItemListRegid> getTreatmentItemListLoadPatient(int p_patientid, String securityToken) throws Exception {
		List<TreatmentItemListRegid> t_items = null;
		try {
			    Database database= new Database();
			    Connection connection = database.Get_Connection();
				Project project= new Project();
				t_items=project.getTreatmentItemListLoadPatient(connection,p_patientid, securityToken);
		} catch (Exception e) {
			throw e;
		}
		return t_items;
	}	
	
	public Patients InsertPatient(Patients p_patient, String security_token)  throws Exception {
		Patients t_items= new Patients();
		try {
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			t_items=project.InsertPatient(connection, p_patient, security_token);
	
	} catch (Exception e) {
		throw e;		
	}
		return t_items;
	}	
	
	public boolean SendSMS(String To, String Body)  throws Exception {
		boolean flag = false;
		try {
				Project project= new Project();
				flag=project.SendSMS(To, Body);
		
		} catch (Exception e) {
			throw e;
		}
		return flag;
	}
	
	public Providers GetProviderDataByChatId(int p_chatid, String security_token) throws Exception {
		Providers t_items = new Providers();
		try {
			    Database database= new Database();
			    Connection connection = database.Get_Connection();
				Project project= new Project();
				t_items=project.GetProviderDataByChatId(connection, p_chatid, security_token);
		
		} catch (Exception e) {
			throw e;
		}
		return t_items;
	}		

	public Providers CheckProviderActivationKey(String deviceId , String phone , int inputCode, String security_token) throws Exception {
		Providers t_items = new Providers();
		try {
			    Database database= new Database();
			    Connection connection = database.Get_Connection();
				Project project= new Project();
				t_items=project.CheckProviderActivationKey(connection, deviceId , phone , inputCode, security_token);
		
		} catch (Exception e) {
			throw e;
		}
		return t_items;
	}	
	
	public List<SavedTemplate> getSavedTemplate(int providerDetail, String security_token) throws Exception {
		List<SavedTemplate> t_items = null;
		try {
			    Database database= new Database();
			    Connection connection = database.Get_Connection();
				Project project= new Project();
				t_items=project.getSavedTemplate(connection, providerDetail, security_token);
		
		} catch (Exception e) {
			throw e;
		}
		return t_items;
	}	
	
	public List<TreatmentItemListScroll> getTreatmentItemListLoad(int p_activetreatmentid, String security_token) throws Exception {
		List<TreatmentItemListScroll> t_items = null;
		try {
			    Database database= new Database();
			    Connection connection = database.Get_Connection();
				Project project= new Project();
				t_items=project.getTreatmentItemListLoad(connection,p_activetreatmentid, security_token);
		} catch (Exception e) {
			throw e;
		}
		return t_items;
	}	

	public List<TreatmentItemListRegid> getTreatmentItemListScroll(int TreatmentItemListID, 
			String T_UP_DOWN, int range, String securityToken) throws Exception {
		List<TreatmentItemListRegid> t_items = null;
		try {
			    Database database= new Database();
			    Connection connection = database.Get_Connection();
				Project project= new Project();
				t_items=project.getTreatmentItemListScroll(connection,TreatmentItemListID,T_UP_DOWN, range, securityToken);
		} catch (Exception e) {
			throw e;
		}
		return t_items;
	}
	
	public List<TreatmentItemListRegid> getTreatmentItemListScrollPatient(int TreatmentItemListID, 
			String T_UP_DOWN, int range, String securityToken) throws Exception {
		List<TreatmentItemListRegid> t_items = null;
		try {
			    Database database= new Database();
			    Connection connection = database.Get_Connection();
				Project project= new Project();
				t_items=project.getTreatmentItemListScrollPatient(connection,TreatmentItemListID,T_UP_DOWN, range, securityToken);
		} catch (Exception e) {
			throw e;
		}
		return t_items;
	}	
	
public boolean UpdateSavedTreatment(List<TreatmentItem> t_items, int p_savedtreatmentid, String security_token) throws Exception
{		
		boolean flag;
		try{
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			flag=project.UpdateSavedTreatment(connection, t_items, p_savedtreatmentid, security_token);
		} 
		
		catch (Exception e) {
			throw e;		
		}
			return flag;
}	
	public SubTreatment UpdateActiveSubTreatment(List<TreatmentItem> t_items, int p_subtreatmentid, String securityToken) throws Exception
{		
		SubTreatment flag=new SubTreatment();;
		try{
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			flag=project.UpdateActiveSubTreatment(connection, t_items,p_subtreatmentid, securityToken);
		} 
		
		catch (Exception e) {
			throw e;		
		}
			return flag;
}	
	
	public int CheckNameSavedTreatment(int ProviderID, 
			String NameTreatment, List<TreatmentItem> t_items, String security_token) throws Exception
	{
		int flag;
		try{
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			flag=project.CheckNameSavedTreatment(connection, ProviderID, NameTreatment, t_items, security_token);
		}
		catch (Exception e) {
			throw e;		
		}
		
		return flag;
	}	
	
	public boolean InsertSavedTreatment(int ProviderID, 
			String NameTreatment, List<TreatmentItem> t_items, String security_token) throws Exception
	{
		boolean flag;
		try{
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			flag=project.InsertSavedTreatment(connection, ProviderID, NameTreatment, t_items, security_token);
		}
		catch (Exception e) {
			throw e;		
		}
		
		return flag;
	}
	
	public SubTreatment InsertActiveSubTreatment(int activeTreatmentID , 
			int ProviderID, int PatientID, String NameTreatment, String SubNameTreatment, 
			List<TreatmentItem> t_items, String security_token) throws Exception
{		
		int flag=0;
		SubTreatment ret_sub_t=new SubTreatment();
		try{
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			ret_sub_t=project.InsertActiveSubTreatment(connection, activeTreatmentID, ProviderID, PatientID, NameTreatment, SubNameTreatment, t_items, security_token);
		} 
		
		catch (Exception e) {
			throw e;		
		}
			return ret_sub_t;
}
	

	public Providers InsertProvider(Providers p_provider) throws Exception {
		Providers t_items= new Providers();
		try {
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			t_items=project.InsertProvider(connection, p_provider);
	
	} catch (Exception e) {
		throw e;		
	}
		return t_items;
	}
	
	public VerificationToken getVerificationToken(int providerId) throws Exception{
		VerificationToken token= new VerificationToken();
		try {
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			token=project.GetVerificationToken(connection, providerId);
	
	} catch (Exception e) {
		throw e;		
	}
		return token;
		
	}
	
	public PatientsCascade getTreatmentByRoomId(String p_roomid, String securityToken) throws Exception {
		PatientsCascade t_items= new PatientsCascade();
		try {
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			t_items=project.getTreatmentByRoomId(connection, p_roomid, securityToken);// (connection, p_roomid);
	
	} catch (Exception e) {
		throw e;		
	}
		return t_items;
	}	
	
	public List<PatientsCascade> getPatientsByProvider(int PatientID, String securityToken) throws Exception {
		List<PatientsCascade> t_items= null;
		try {
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			t_items=project.getPatientsByProvider(connection, PatientID, securityToken);
	
	} catch (Exception e) {
		throw e;		
	}
		return t_items;
	}
	
	public boolean AddContactPatient(Integer providerid, String telephoneNumber, String firstName, 
			String lastName, String ChatId, String RoomId, String security_token) throws Exception {
		boolean flag;
		try {
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			flag=project.AddContactPatient(connection, providerid, telephoneNumber, firstName, lastName, ChatId, RoomId, security_token);
	
	} catch (Exception e) {
		throw e;
	}
	return flag;
	}	
	
	public boolean AddContactDoctor(Integer providerid, String telephoneNumber, String firstName, 
			String lastName, String ChatId, String RoomId, String security_token) throws Exception {
		boolean flag;
		try {
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			flag=project.AddContactDoctor(connection, providerid, telephoneNumber, firstName, lastName,ChatId, RoomId, security_token);
	
	} catch (Exception e) {
		throw e;
	}
	return flag;
	}
	
	public List<TreatmentItem> getTreatmentItemsByTreatment(int TreatmentID, String TT, String security_token) throws Exception {
		List<TreatmentItem> t_items = null;
		try {
			    Database database= new Database();
			    Connection connection = database.Get_Connection();
				Project project= new Project();
				t_items=project.getTreatmentItemsByTreatment(connection, TreatmentID, TT, security_token);
		
		} catch (Exception e) {
			throw e;
		}
		return t_items;
	}	
	
	public Patients getPatientData(int patientId, String security_token) throws Exception {
		Patients t_items = null;
		try {
			    Database database= new Database();
			    Connection connection = database.Get_Connection();
				Project project= new Project();
				t_items=project.getPatientsData(connection,patientId, security_token);
		
		} catch (Exception e) {
			throw e;
		}
		return t_items;
	}
	
	
	public TreatmentItemList updatetreatmenitemlist(TreatmentItemList t_items, int TreatmentItemListId, String security_token) throws Exception
	{		
		TreatmentItemList flag;
			try{
			    Database database= new Database();
			    Connection connection = database.Get_Connection();
				Project project= new Project();
				flag=project.updatetreatmenitemlist(connection, t_items, TreatmentItemListId, security_token);
			} 
			
			catch (Exception e) {
				throw e;		
			}
				return flag;
	}
	
	
	
	public List<ProviderProvider> getprovidersdatabyprovider(int ProviderProviderId, String securityToken) throws Exception {
		List<ProviderProvider> t_items = null;
		try {
			    Database database= new Database();
			    Connection connection = database.Get_Connection();
				Project project= new Project();
				t_items=project.getprovidersdatabyprovider(connection, ProviderProviderId, securityToken);
		
		} catch (Exception e) {
			throw e;
		}
		return t_items;
	}
	
	

    public SavedTemplate DeleteSavedTemplate(@PathParam("savedtreatmentdetail")int savedtreatmentdetail,@PathParam("savedtreatmenttemplateid")int savedtreatmenttemplateid, String security_token)throws Exception 
	{
    	SavedTemplate t_items= new SavedTemplate();
		try {
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			t_items=project.DeleteSavedTemplate(connection, savedtreatmentdetail,savedtreatmenttemplateid, security_token);
	
	} catch (Exception e) {
		throw e;		
	}
		return t_items;
	}


	
	public boolean EndTreatment(int ActiveTreatmentId, String security_token) throws Exception
	{
		boolean flag;
		try{
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			flag=project.EndTreatment(connection, ActiveTreatmentId, security_token);
		}
		catch (Exception e) {
			throw e;		
		}
		
		return flag;
	}
	
	public boolean deleteProviderProvider( int ProviderDetail1, int ProviderDetail2, String security_token) throws Exception
	{
		boolean flag;
		try{
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			flag=project.deleteProviderProvider(connection, ProviderDetail1, ProviderDetail2, security_token);
		}
		catch (Exception e) {
			throw e;		
		}
		
		return flag;
	}
	
	public boolean deleteProviderPatient( int ProviderDetail, int PatientDetail, String security_token) throws Exception
	{
		boolean flag;
		try{
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			flag=project.deleteProviderPatient(connection, ProviderDetail, PatientDetail, security_token);
		}
		catch (Exception e) {
			throw e;		
		}
		
		return flag;
	}
	
	
	public String InsertBase64Image(TreatmentItem t_item, String security_token) throws Exception
	{	
		String ret_sub_t;
		try{
			//System.out.println("OVA E SUBTREATMENT VO PR MEN ITEM: "+t_item.getSubtreatmentid());
	    	//System.out.println("OVA E VO PR MEN  IME: "+ t_item.getName());
		    Database database= new Database();
		    Connection connection = database.Get_Connection();
			Project project= new Project();
			ret_sub_t = project.InsertBase64Image( connection, t_item, security_token);
			return ret_sub_t;
		} 
		
		catch (Exception e) {
			throw e;		
		}
	}
	
	public boolean updateProviderImageUrl(int providerId, String imageUrl, String name, String lastname, String security_token) throws Exception
	 { 
		
	  try{
	      Database database= new Database();
	      Connection connection = database.Get_Connection();
	      Project project= new Project();
	      return project.updateProviderImageUrl( connection, providerId, imageUrl, name, lastname, security_token);
	      
	  } 
	  
	  catch (Exception e) {
	   throw e;  
	  }
	  
	 }	

}	