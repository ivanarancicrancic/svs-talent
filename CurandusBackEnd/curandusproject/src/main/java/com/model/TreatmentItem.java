package com.model;

import java.util.Date;

public class TreatmentItem {
	
	private Integer treatmentItemId;
	private Integer subtreatmentid;
	private String name;
	private String typeT;
	private String repeatT;
	private String duration;
	private String renderingInfo;
	private String status;
	private Date created;
	private Integer createdBy;
	private Date modified;
	private Integer modifiedBy;
	private String daytime;
	private String starttime;
	private String intervaldaytime;
	
	public TreatmentItem() {
	}

	public TreatmentItem(Integer treatmentItemId, Integer subtreatmentid, String name, String typeT, String repeatT,
			String duration, String renderingInfo, String status, Date created, Integer createdBy, Date modified,
			Integer modifiedBy, String daytime, String starttime, String intervaldaytime) {
		super();
		this.treatmentItemId = treatmentItemId;
		this.subtreatmentid = subtreatmentid;
		this.name = name;
		this.typeT = typeT;
		this.repeatT = repeatT;
		this.duration = duration;
		this.renderingInfo = renderingInfo;
		this.status = status;
		this.created = created;
		this.createdBy = createdBy;
		this.modified = modified;
		this.modifiedBy = modifiedBy;
		this.daytime = daytime;
		this.starttime = starttime;
		this.intervaldaytime = intervaldaytime;
	}

	public Integer getTreatmentItemId() {
		return treatmentItemId;
	}

	public void setTreatmentItemId(Integer treatmentItemId) {
		this.treatmentItemId = treatmentItemId;
	}

	public Integer getSubtreatmentid() {
		return subtreatmentid;
	}

	public void setSubtreatmentid(Integer subtreatmentid) {
		this.subtreatmentid = subtreatmentid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTypeT() {
		return typeT;
	}

	public void setTypeT(String typeT) {
		this.typeT = typeT;
	}

	public String getRepeatT() {
		return repeatT;
	}

	public void setRepeatT(String repeatT) {
		this.repeatT = repeatT;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getRenderingInfo() {
		return renderingInfo;
	}

	public void setRenderingInfo(String renderingInfo) {
		this.renderingInfo = renderingInfo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
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

	public String getDaytime() {
		return daytime;
	}

	public void setDaytime(String daytime) {
		this.daytime = daytime;
	}

	public String getStarttime() {
		return starttime;
	}

	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}

	public String getIntervaldaytime() {
		return intervaldaytime;
	}

	public void setIntervaldaytime(String intervaldaytime) {
		this.intervaldaytime = intervaldaytime;
	}

}
