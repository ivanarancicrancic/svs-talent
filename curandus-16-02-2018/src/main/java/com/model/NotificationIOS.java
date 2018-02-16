package com.model;

public class NotificationIOS {
	private String Tittle;
	private String Body;
	private String RegId;
	private String RoomId;
	private String ChatId;
	public NotificationIOS() {
		super();
		// TODO Auto-generated constructor stub
	}
	public NotificationIOS(String tittle, String body, String regId, String roomId, String chatId) {
		super();
		Tittle = tittle;
		Body = body;
		RegId = regId;
		RoomId = roomId;
		ChatId = chatId;
	}
	public String getTittle() {
		return Tittle;
	}
	public void setTittle(String tittle) {
		Tittle = tittle;
	}
	public String getBody() {
		return Body;
	}
	public void setBody(String body) {
		Body = body;
	}
	public String getRegId() {
		return RegId;
	}
	public void setRegId(String regId) {
		RegId = regId;
	}
	public String getRoomId() {
		return RoomId;
	}
	public void setRoomId(String roomId) {
		RoomId = roomId;
	}
	public String getChatId() {
		return ChatId;
	}
	public void setChatId(String chatId) {
		ChatId = chatId;
	}
	
	
	
}
