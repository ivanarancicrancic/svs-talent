package com.model;

import java.sql.Date;

public class Patients {

	private int PatientId ;
	private String Phone ;
	private String FirstName ; 
	private String MiddleInitial ;
	private String LastName ;
	private String StreetAddress ; 
	private String City ; 
	private String State ;
	private String ZIP ;
	private String ChronicDiseases ;
	private String Allergies ;
	private String MedicationsThatRecieves;
	private String ProfileImageUrl ; 
	private String AdditionalInnfo; 
	private int ActivationCode ;
	private Date Created ;
	private int CreatedBy ;
	private Date Modified ;
	private int ModifiedBy;
	private String ChatId; 
	private String DeviceId;
	private String RegId; 
	private Integer NotificationEnabled; 
	
	public Patients(){}

	public Patients(int patientId, String phone, String firstName, String middleInitial, String lastName,
			String streetAddress, String city, String state, String zIP, String chronicDiseases, String allergies,
			String medicationsThatRecieves, String profileImageUrl, String additionalInnfo, int activationCode,
			Date created, int createdBy, Date modified, int modifiedBy, String chatId, String deviceId, String regId,
			Integer notificationEnabled) {
		super();
		PatientId = patientId;
		Phone = phone;
		FirstName = firstName;
		MiddleInitial = middleInitial;
		LastName = lastName;
		StreetAddress = streetAddress;
		City = city;
		State = state;
		ZIP = zIP;
		ChronicDiseases = chronicDiseases;
		Allergies = allergies;
		MedicationsThatRecieves = medicationsThatRecieves;
		ProfileImageUrl = profileImageUrl;
		AdditionalInnfo = additionalInnfo;
		ActivationCode = activationCode;
		Created = created;
		CreatedBy = createdBy;
		Modified = modified;
		ModifiedBy = modifiedBy;
		ChatId = chatId;
		DeviceId = deviceId;
		RegId = regId;
		NotificationEnabled = notificationEnabled;
	}

	public int getPatientId() {
		return PatientId;
	}

	public void setPatientId(int patientId) {
		PatientId = patientId;
	}

	public String getPhone() {
		return Phone;
	}

	public void setPhone(String phone) {
		Phone = phone;
	}

	public String getFirstName() {
		return FirstName;
	}

	public void setFirstName(String firstName) {
		FirstName = firstName;
	}

	public String getMiddleInitial() {
		return MiddleInitial;
	}

	public void setMiddleInitial(String middleInitial) {
		MiddleInitial = middleInitial;
	}

	public String getLastName() {
		return LastName;
	}

	public void setLastName(String lastName) {
		LastName = lastName;
	}

	public String getStreetAddress() {
		return StreetAddress;
	}

	public void setStreetAddress(String streetAddress) {
		StreetAddress = streetAddress;
	}

	public String getCity() {
		return City;
	}

	public void setCity(String city) {
		City = city;
	}

	public String getState() {
		return State;
	}

	public void setState(String state) {
		State = state;
	}

	public String getZIP() {
		return ZIP;
	}

	public void setZIP(String zIP) {
		ZIP = zIP;
	}

	public String getChronicDiseases() {
		return ChronicDiseases;
	}

	public void setChronicDiseases(String chronicDiseases) {
		ChronicDiseases = chronicDiseases;
	}

	public String getAllergies() {
		return Allergies;
	}

	public void setAllergies(String allergies) {
		Allergies = allergies;
	}

	public String getMedicationsThatRecieves() {
		return MedicationsThatRecieves;
	}

	public void setMedicationsThatRecieves(String medicationsThatRecieves) {
		MedicationsThatRecieves = medicationsThatRecieves;
	}

	public String getProfileImageUrl() {
		return ProfileImageUrl;
	}

	public void setProfileImageUrl(String profileImageUrl) {
		ProfileImageUrl = profileImageUrl;
	}

	public String getAdditionalInnfo() {
		return AdditionalInnfo;
	}

	public void setAdditionalInnfo(String additionalInnfo) {
		AdditionalInnfo = additionalInnfo;
	}

	public int getActivationCode() {
		return ActivationCode;
	}

	public void setActivationCode(int activationCode) {
		ActivationCode = activationCode;
	}

	public Date getCreated() {
		return Created;
	}

	public void setCreated(Date created) {
		Created = created;
	}

	public int getCreatedBy() {
		return CreatedBy;
	}

	public void setCreatedBy(int createdBy) {
		CreatedBy = createdBy;
	}

	public Date getModified() {
		return Modified;
	}

	public void setModified(Date modified) {
		Modified = modified;
	}

	public int getModifiedBy() {
		return ModifiedBy;
	}

	public void setModifiedBy(int modifiedBy) {
		ModifiedBy = modifiedBy;
	}

	public String getChatId() {
		return ChatId;
	}

	public void setChatId(String chatId) {
		ChatId = chatId;
	}

	public String getDeviceId() {
		return DeviceId;
	}

	public void setDeviceId(String deviceId) {
		DeviceId = deviceId;
	}

	public String getRegId() {
		return RegId;
	}

	public void setRegId(String regId) {
		RegId = regId;
	}

	public Integer getNotificationEnabled() {
		return NotificationEnabled;
	}

	public void setNotificationEnabled(Integer notificationEnabled) {
		NotificationEnabled = notificationEnabled;
	}

}
