/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('../lib/db.js');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var patientSchema = new Schema({    
    firstName: String,
    lastName: String,                         
    otherNames: String,
    details_id: {type: ObjectId, ref: 'MedicalDetails'},
    dateOfBirth: Date,        
    sex: String,
    patientId: String,
    phone: String,
    parentName: String,
    address: String,
    email: String,
    healthProblems: String,
    healthProblemsDetails: String,
    onMedication: String,
    medicationDetails: String,
    allergys: String,
    allergysDetails: String,
    surgeryHistory: String,
    surgeryHistoryDetails: String,
    hospitalizedLastYear: String,
    HAsthma: String,
    HDrugAddiction: String,
    HEpilepsy: String,
    HHeartDisease: String,
    HMentalIllness: String,
    HTuberculosis: String,
    FHAsthma: String,
    FHDiabetes: String,
    FHEpilepsy: String,
    FHHeartDisease: String,
    FHHighBloodPressure: String,
    FHMentalIllness: String,
    FHTuberculosis: String,
    familyDoctor: String,
    familyDoctorName: String,
    familyDoctorAddress: String,
    familyDoctorPhone: String,
    familyDoctorEmail: String,
    emergencyPersonName: String,
    emergencyPersonAddress: String,
    emergencyPersonPhone: String,
    emergencyPersonEmail: String
},
{ timestamps: { createdAt: Date.now } });

patientSchema.virtual('fullName').get(function () {
  return (this.lastName + ' ' + this.firstName);
});
patientSchema.virtual('age').get(function () {
  //TODO
});

module.exports = mongoose.model("Patient", patientSchema);
