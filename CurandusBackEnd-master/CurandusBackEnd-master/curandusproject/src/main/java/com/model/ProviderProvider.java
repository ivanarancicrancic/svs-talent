package com.model;

import java.util.Date; 

public class ProviderProvider {

	private Integer ProviderProviderId;
	private Integer ProviderDetail1;
	private Integer ProviderDetail2l;
	private String FirstName;
	private String LastName;
	private Date Created;
	private Integer CreatedBy;
	private Date Modified;
	private Integer ModifiedBy;
	private String ChatId;
	private String RoomId;
	private Integer status;
	private String ProfileUrl;
	
	public  ProviderProvider() {}

	public ProviderProvider(Integer providerProviderId, Integer providerDetail1, Integer providerDetail2l,
			String firstName, String lastName, Date created, Integer createdBy, Date modified, Integer modifiedBy,
			String chatId, String roomId, Integer status, String profileUrl) {
		super();
		ProviderProviderId = providerProviderId;
		ProviderDetail1 = providerDetail1;
		ProviderDetail2l = providerDetail2l;
		FirstName = firstName;
		LastName = lastName;
		Created = created;
		CreatedBy = createdBy;
		Modified = modified;
		ModifiedBy = modifiedBy;
		ChatId = chatId;
		RoomId = roomId;
		this.status = status;
		ProfileUrl = profileUrl;
	}

	public Integer getProviderProviderId() {
		return ProviderProviderId;
	}

	public void setProviderProviderId(Integer providerProviderId) {
		ProviderProviderId = providerProviderId;
	}

	public Integer getProviderDetail1() {
		return ProviderDetail1;
	}

	public void setProviderDetail1(Integer providerDetail1) {
		ProviderDetail1 = providerDetail1;
	}

	public Integer getProviderDetail2l() {
		return ProviderDetail2l;
	}

	public void setProviderDetail2l(Integer providerDetail2l) {
		ProviderDetail2l = providerDetail2l;
	}

	public String getFirstName() {
		return FirstName;
	}

	public void setFirstName(String firstName) {
		FirstName = firstName;
	}

	public String getLastName() {
		return LastName;
	}

	public void setLastName(String lastName) {
		LastName = lastName;
	}

	public Date getCreated() {
		return Created;
	}

	public void setCreated(Date created) {
		Created = created;
	}

	public Integer getCreatedBy() {
		return CreatedBy;
	}

	public void setCreatedBy(Integer createdBy) {
		CreatedBy = createdBy;
	}

	public Date getModified() {
		return Modified;
	}

	public void setModified(Date modified) {
		Modified = modified;
	}

	public Integer getModifiedBy() {
		return ModifiedBy;
	}

	public void setModifiedBy(Integer modifiedBy) {
		ModifiedBy = modifiedBy;
	}

	public String getChatId() {
		return ChatId;
	}

	public void setChatId(String chatId) {
		ChatId = chatId;
	}

	public String getRoomId() {
		return RoomId;
	}

	public void setRoomId(String roomId) {
		RoomId = roomId;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getProfileUrl() {
		return ProfileUrl;
	}

	public void setProfileUrl(String profileUrl) {
		ProfileUrl = profileUrl;
	}
	
}
