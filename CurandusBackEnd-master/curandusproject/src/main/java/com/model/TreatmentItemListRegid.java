package com.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

public class TreatmentItemListRegid {
	private Integer treatmentItemListId;
	private Integer treatmentitem;
	private String label;
	private Date timeScheduled;
	private Date timeDone;
	private Date timeRemove;
	private String status;
	private String renderingInfo;
	private String responseInfo;
	private Date created;
	private Integer createdBy;
	private Date modified;
	private Integer modifiedBy;
	private Integer subtreatmentid;
	private Integer activetreatmentid;
	private Integer providerid;
	private String providername;
	private String providerChatId;
	private String roomId;
	private String RegId;
	private Integer NotificationEnabled;
	
	
	public TreatmentItemListRegid() {
		super();
		// TODO Auto-generated constructor stub
	}


	public TreatmentItemListRegid(Integer treatmentItemListId, Integer treatmentitem, String label, Date timeScheduled,
			Date timeDone, Date timeRemove, String status, String renderingInfo, String responseInfo, Date created,
			Integer createdBy, Date modified, Integer modifiedBy, Integer subtreatmentid, Integer activetreatmentid,
			Integer providerid, String providername, String providerChatId, String roomId, String regId,
			Integer notificationEnabled) {
		super();
		this.treatmentItemListId = treatmentItemListId;
		this.treatmentitem = treatmentitem;
		this.label = label;
		this.timeScheduled = timeScheduled;
		this.timeDone = timeDone;
		this.timeRemove = timeRemove;
		this.status = status;
		this.renderingInfo = renderingInfo;
		this.responseInfo = responseInfo;
		this.created = created;
		this.createdBy = createdBy;
		this.modified = modified;
		this.modifiedBy = modifiedBy;
		this.subtreatmentid = subtreatmentid;
		this.activetreatmentid = activetreatmentid;
		this.providerid = providerid;
		this.providername = providername;
		this.providerChatId = providerChatId;
		this.roomId = roomId;
		RegId = regId;
		NotificationEnabled = notificationEnabled;
	}


	public Integer getTreatmentItemListId() {
		return treatmentItemListId;
	}


	public void setTreatmentItemListId(Integer treatmentItemListId) {
		this.treatmentItemListId = treatmentItemListId;
	}


	public Integer getTreatmentitem() {
		return treatmentitem;
	}


	public void setTreatmentitem(Integer treatmentitem) {
		this.treatmentitem = treatmentitem;
	}


	public String getLabel() {
		return label;
	}


	public void setLabel(String label) {
		this.label = label;
	}


	public Date getTimeScheduled() {
		return timeScheduled;
	}


	public void setTimeScheduled(Date timeScheduled) {
		this.timeScheduled = timeScheduled;
	}


	public Date getTimeDone() {
		return timeDone;
	}


	public void setTimeDone(Date timeDone) {
		this.timeDone = timeDone;
	}


	public Date getTimeRemove() {
		return timeRemove;
	}


	public void setTimeRemove(Date timeRemove) {
		this.timeRemove = timeRemove;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getRenderingInfo() {
		return renderingInfo;
	}


	public void setRenderingInfo(String renderingInfo) {
		this.renderingInfo = renderingInfo;
	}


	public String getResponseInfo() {
		return responseInfo;
	}


	public void setResponseInfo(String responseInfo) {
		this.responseInfo = responseInfo;
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


	public Integer getSubtreatmentid() {
		return subtreatmentid;
	}


	public void setSubtreatmentid(Integer subtreatmentid) {
		this.subtreatmentid = subtreatmentid;
	}


	public Integer getActivetreatmentid() {
		return activetreatmentid;
	}


	public void setActivetreatmentid(Integer activetreatmentid) {
		this.activetreatmentid = activetreatmentid;
	}


	public Integer getProviderid() {
		return providerid;
	}


	public void setProviderid(Integer providerid) {
		this.providerid = providerid;
	}


	public String getProvidername() {
		return providername;
	}


	public void setProvidername(String providername) {
		this.providername = providername;
	}


	public String getProviderChatId() {
		return providerChatId;
	}


	public void setProviderChatId(String providerChatId) {
		this.providerChatId = providerChatId;
	}


	public String getRoomId() {
		return roomId;
	}


	public void setRoomId(String roomId) {
		this.roomId = roomId;
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
