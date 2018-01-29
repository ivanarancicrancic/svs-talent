package com.model;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

public class VerificationToken {
	
	 private static final int EXPIRATION = 60 * 24;
	 
	    private String token;
	    private int provider_id;
	    private Date expiryDate;
	    Calendar cal = Calendar.getInstance();
	    
	    private Date calculateExpiryDate(int expiryTimeInMinutes) {
	        Calendar cal = Calendar.getInstance();
	        cal.setTime(new Timestamp(cal.getTime().getTime()));
	        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
	        return new Date(cal.getTime().getTime());
	    }
	     
	    public VerificationToken(){}
	    // standard constructors, getters and setters

	    public VerificationToken(String token, int provider_id) {
	    	
			super();
			this.token = token;
			this.provider_id = provider_id;
			
			Date now = new Date();
			Calendar cal = Calendar.getInstance();
			cal.setTime(now);
//			cal.add(Calendar.DAY_OF_YEAR, 1); // <--
			cal.add(Calendar.HOUR_OF_DAY, 1);
			Date tomorrow = cal.getTime();
		    // add one day to the date/calendar
		    
			
		   
		    // now get "tomorrow"
		    this.expiryDate = tomorrow;
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
