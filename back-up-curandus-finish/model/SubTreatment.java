package com.model;

public class SubTreatment {

	private Integer subtreatmentid;
	private Integer activetreatmenId;
	private Integer patientId;
	
	public SubTreatment(){}

	public SubTreatment(Integer subtreatmentid, Integer activetreatmenId, Integer patientId) {
		super();
		this.subtreatmentid = subtreatmentid;
		this.activetreatmenId = activetreatmenId;
		this.patientId = patientId;
	}

	public Integer getSubtreatmentid() {
		return subtreatmentid;
	}

	public void setSubtreatmentid(Integer subtreatmentid) {
		this.subtreatmentid = subtreatmentid;
	}

	public Integer getActivetreatmenId() {
		return activetreatmenId;
	}

	public void setActivetreatmenId(Integer activetreatmenId) {
		this.activetreatmenId = activetreatmenId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

}

	
