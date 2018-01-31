package com.model;

import java.util.Date;

public class Providers {

 private Integer providerId;
 private String firstName;
 private String typeProvider;
 private String middleInitial;
 private String lastName;
 private String streetAdress;
 private String city;
 private String state;
 private String zip;
 private String phone;
 private String alternatePhone;
 private Integer status;
 private Date created;
 private Integer createdBy;
 private Date modified;
 private Integer modifiedBy;
 private String deviceId;
 private Integer activationCode;
 private String chatId;
 private String ProfileImageUrl;
 private String RegId; 
 private Integer NotificationEnabled; 
// private String token; 
 
// public String getToken() {
//	return token;
//}
//
//public void setToken(String token) {
//	this.token = token;
//}

//public boolean isEnabled() {
//	return enabled;
//}
//
//public void setEnabled(boolean enabled) {
//	this.enabled = enabled;
//}

//private boolean enabled;
 
 public Providers() {
  super();
  // TODO Auto-generated constructor stub
 }

public Providers(Integer providerId, String firstName, String typeProvider, String middleInitial, String lastName,
		String streetAdress, String city, String state, String zip, String phone, String alternatePhone, Integer status,
		Date created, Integer createdBy, Date modified, Integer modifiedBy, String deviceId, Integer activationCode,
		String chatId, String profileImageUrl, String regId, Integer notificationEnabled) {
	super();
	//this.enabled=false;
	this.providerId = providerId;
	this.firstName = firstName;
	this.typeProvider = typeProvider;
	this.middleInitial = middleInitial;
	this.lastName = lastName;
	this.streetAdress = streetAdress;
	this.city = city;
	this.state = state;
	this.zip = zip;
	this.phone = phone;
	this.alternatePhone = alternatePhone;
	this.status = status;
	this.created = created;
	this.createdBy = createdBy;
	this.modified = modified;
	this.modifiedBy = modifiedBy;
	this.deviceId = deviceId;
	this.activationCode = activationCode;
	this.chatId = chatId;
	ProfileImageUrl = profileImageUrl;
	RegId = regId;
	NotificationEnabled = notificationEnabled;
}

public Integer getProviderId() {
	return providerId;
}

public void setProviderId(Integer providerId) {
	this.providerId = providerId;
}

public String getFirstName() {
	return firstName;
}

public void setFirstName(String firstName) {
	this.firstName = firstName;
}

public String getTypeProvider() {
	return typeProvider;
}

public void setTypeProvider(String typeProvider) {
	this.typeProvider = typeProvider;
}

public String getMiddleInitial() {
	return middleInitial;
}

public void setMiddleInitial(String middleInitial) {
	this.middleInitial = middleInitial;
}

public String getLastName() {
	return lastName;
}

public void setLastName(String lastName) {
	this.lastName = lastName;
}

public String getStreetAdress() {
	return streetAdress;
}

public void setStreetAdress(String streetAdress) {
	this.streetAdress = streetAdress;
}

public String getCity() {
	return city;
}

public void setCity(String city) {
	this.city = city;
}

public String getState() {
	return state;
}

public void setState(String state) {
	this.state = state;
}

public String getZip() {
	return zip;
}

public void setZip(String zip) {
	this.zip = zip;
}

public String getPhone() {
	return phone;
}

public void setPhone(String phone) {
	this.phone = phone;
}

public String getAlternatePhone() {
	return alternatePhone;
}

public void setAlternatePhone(String alternatePhone) {
	this.alternatePhone = alternatePhone;
}

public Integer getStatus() {
	return status;
}

public void setStatus(Integer status) {
	this.status = status;
}

public Date getCreated() {
	return created;
}

public void setCreated(Date created) {
	this.created = created;
}

public Integer getCreatedBy() {
	return createdBy;
}

public void setCreatedBy(Integer createdBy) {
	this.createdBy = createdBy;
}

public Date getModified() {
	return modified;
}

public void setModified(Date modified) {
	this.modified = modified;
}

public Integer getModifiedBy() {
	return modifiedBy;
}

public void setModifiedBy(Integer modifiedBy) {
	this.modifiedBy = modifiedBy;
}

public String getDeviceId() {
	return deviceId;
}

public void setDeviceId(String deviceId) {
	this.deviceId = deviceId;
}

public Integer getActivationCode() {
	return activationCode;
}

public void setActivationCode(Integer activationCode) {
	this.activationCode = activationCode;
}

public String getChatId() {
	return chatId;
}

public void setChatId(String chatId) {
	this.chatId = chatId;
}

public String getProfileImageUrl() {
	return ProfileImageUrl;
}

public void setProfileImageUrl(String profileImageUrl) {
	ProfileImageUrl = profileImageUrl;
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