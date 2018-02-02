package com.model;

import java.util.Date;

public class SavedTemplate {
	private int savedTreatmentTemplateId;
	private String nameTreatment;
	private int providerDetail;
	private Date created;
	private int createdBy;
	private Date modified;
	private int modifiedBy;
	
	public SavedTemplate(){};
	
	public SavedTemplate(int savedTreatmentTemplateId, String nameTreatment, int providerDetail, Date created, int createdBy,
			Date modified, int modifiedBy) {
		super();
		this.savedTreatmentTemplateId = savedTreatmentTemplateId;
		this.nameTreatment = nameTreatment;
		this.providerDetail = providerDetail;
		this.created = created;
		this.createdBy = createdBy;
		this.modified = modified;
		this.modifiedBy = modifiedBy;
	}
	
	public int getSavedTreatmentTemplateId() {
		return savedTreatmentTemplateId;
	}
	public void setSavedTreatmentTemplateId(int savedTreatmentTemplateId) {
		this.savedTreatmentTemplateId = savedTreatmentTemplateId;
	}
	public String getNameTreatment() {
		return nameTreatment;
	}
	public void setNameTreatment(String nameTreatment) {
		this.nameTreatment = nameTreatment;
	}
	public int getProviderDetail() {
		return providerDetail;
	}
	public void setProviderDetail(int providerDetail) {
		this.providerDetail = providerDetail;
	}
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	public int getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}
	public Date getModified() {
		return modified;
	}
	public void setModified(Date modified) {
		this.modified = modified;
	}
	public int getModifiedBy() {
		return modifiedBy;
	}
	public void setModifiedBy(int modifiedBy) {
		this.modifiedBy = modifiedBy;
	}
}