package com.model;

public class PatientsCascade {

	private Integer patientId;
	private String phone;
	private String firstName;
	private String middleInitial;
	private String lastName;
	//private Set<Providerpatient> providerpatients = new HashSet<Providerpatient>(0);
	private Integer activetreatmenId;
	private Integer subtreatmentid;
	private String ChatId;
	private String RoomId;
	private String DeviceId;
	private String RegId; 	

	public PatientsCascade() {
	}

	public PatientsCascade(Integer patientId, String phone, String firstName, String middleInitial, String lastName,
			Integer activetreatmenId, Integer subtreatmentid, String chatId, String roomId, String deviceId,
			String regId) {
		super();
		this.patientId = patientId;
		this.phone = phone;
		this.firstName = firstName;
		this.middleInitial = middleInitial;
		this.lastName = lastName;
		this.activetreatmenId = activetreatmenId;
		this.subtreatmentid = subtreatmentid;
		ChatId = chatId;
		RoomId = roomId;
		DeviceId = deviceId;
		RegId = regId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
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

	public Integer getActivetreatmenId() {
		return activetreatmenId;
	}

	public void setActivetreatmenId(Integer activetreatmenId) {
		this.activetreatmenId = activetreatmenId;
	}

	public Integer getSubtreatmentid() {
		return subtreatmentid;
	}

	public void setSubtreatmentid(Integer subtreatmentid) {
		this.subtreatmentid = subtreatmentid;
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
	
}