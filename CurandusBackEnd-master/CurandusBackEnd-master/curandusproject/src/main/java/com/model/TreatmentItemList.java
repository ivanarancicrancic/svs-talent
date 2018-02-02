package com.model;

import java.util.Date;

//import java.sql.*;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

public class TreatmentItemList {

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
	
	public TreatmentItemList(){};
	
	public TreatmentItemList(Integer treatmentItemListId, Integer treatmentitem, String label, Date timeScheduled,
			Date timeDone, Date timeRemove, String status, String renderingInfo, String responseInfo, Date created,
			Integer createdBy, Date modified, Integer modifiedBy) {
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


}


