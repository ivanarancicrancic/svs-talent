package com.model;

import java.sql.Time;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class VerificationToken {
	
	 private static final int EXPIRATION = 60 * 24;
	 
	    private String token;
	    private int provider_id;
	    private Date expiryDate;
	   // private int expiryTime;
	    private Time time;
	    Calendar cal = Calendar.getInstance();
	    
	    private Date calculateExpiryDate(int expiryTimeInMinutes) {
	        Calendar cal = Calendar.getInstance();
	        cal.setTime(new Timestamp(cal.getTime().getTime()));
	        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
	        return new Date(cal.getTime().getTime());
	    }
	     
	    public VerificationToken(){}
	    // standard constructors, getters and setters

	    public VerificationToken(String token, int provider_id) throws ParseException {
			super();
			this.token = token;
			this.provider_id = provider_id;
			Date now = new Date();
			Calendar cal = Calendar.getInstance();
			cal.setTime(now);
			cal.add(Calendar.HOUR_OF_DAY, 1);
			//this.expiryTime = cal.get(Calendar.HOUR_OF_DAY);
			DateFormat sdf = new SimpleDateFormat("hh:mm:ss");
		    Date date = sdf.parse(cal.get(Calendar.HOUR_OF_DAY)+":"+cal.get(Calendar.MINUTE)+":"+cal.get(Calendar.SECOND));
		    this.time = new Time(date.getTime());
//		    if(cal.get(Calendar.HOUR_OF_DAY)==00) {
//			cal.add(Calendar.DAY_OF_YEAR, 1); // <--
//		      }
			Date today = cal.getTime();
		    // add one day to the date/calendar
		    // now get "tomorrow"
		    this.expiryDate = today;
		}
//		public int getExpiryTime() {
//			return expiryTime;
//		}
//
//		public void setExpiryTime(int expiryTime) {
//			this.expiryTime = expiryTime;
//		}

	    public Time getTime() {
			return time;
		}

		public void setTime(Time time) {
			this.time = time;
		}

	    public String getToken() {
			return token;
		}

		public void setToken(String token) {
			this.token = token;
		}

		public int getProvider_id() {
			return provider_id;
		}

		public void setProvider_id(int provider_id) {
			this.provider_id = provider_id;
		}

		public Date getExpiryDate() {
			return expiryDate;
		}

		public void setExpiryDate(Date expiryDate) {
			this.expiryDate = expiryDate;
		}

		public static int getExpiration() {
			return EXPIRATION;
		}

}
