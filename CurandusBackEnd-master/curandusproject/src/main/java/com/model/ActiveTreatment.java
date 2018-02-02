package com.model;

import java.util.Date;

public class ActiveTreatment {

	
	private Integer ActiveTreatmentId;
	private String NameTreatment;
	private Integer PatientDetail;
	private Integer ProviderDetail; 
	private Date TimeStart; 
	private Date EndTime;
	private Integer Created; 
	private Date CreatedBy; 
	private Integer Modified;
	private Date ModifiedBy;
	
	public  ActiveTreatment() {}

	public ActiveTreatment(Integer activeTreatmentId, String nameTreatment, Integer patientDetail,
			Integer providerDetail, Date timeStart, Date endTime, Integer created, Date createdBy, Integer modified,
			Date modifiedBy) {
		super();
		ActiveTreatmentId = activeTreatmentId;
		NameTreatment = nameTreatment;
		PatientDetail = patientDetail;
		ProviderDetail = providerDetail;
		TimeStart = timeStart;
		EndTime = endTime;
		Created = created;
		CreatedBy = createdBy;
		Modified = modified;
		ModifiedBy = modifiedBy;
	}

	public Integer getActiveTreatmentId() {
		return ActiveTreatmentId;
	}

	public void setActiveTreatmentId(Integer activeTreatmentId) {
		ActiveTreatmentId = activeTreatmentId;
	}

	public String getNameTreatment() {
		return NameTreatment;
	}

	public void setNameTreatment(String nameTreatment) {
		NameTreatment = nameTreatment;
	}

	public Integer getPatientDetail() {
		return PatientDetail;
	}

	public void setPatientDetail(Integer patientDetail) {
		PatientDetail = patientDetail;
	}

	public Integer getProviderDetail() {
		return ProviderDetail;
	}

	public void setProviderDetail(Integer providerDetail) {
		ProviderDetail = providerDetail;
	}

	public Date getTimeStart() {
		return TimeStart;
	}

	public void setTimeStart(Date timeStart) {
		TimeStart = timeStart;
	}

	public Date getEndTime() {
		return EndTime;
	}

	public void setEndTime(Date endTime) {
		EndTime = endTime;
	}

	public Integer getCreated() {
		return Created;
	}

	public void setCreated(Integer created) {
		Created = created;
	}

	public Date getCreatedBy() {
		return CreatedBy;
	}

	public void setCreatedBy(Date createdBy) {
		CreatedBy = createdBy;
	}

	public Integer getModified() {
		return Modified;
	}

	public void setModified(Integer modified) {
		Modified = modified;
	}

	public Date getModifiedBy() {
		return ModifiedBy;
	}

	public void setModifiedBy(Date modifiedBy) {
		ModifiedBy = modifiedBy;
	}
	
	
	
	
}
