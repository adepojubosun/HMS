/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('../lib/db.js');
var Schema = mongoose.Schema;

var medicalDetailsSchema = new Schema({
    generalAppearance: String,
    weight: Number,
    height: Number,
    bp: Number,
    pulseRate: Number,
    leftVVAG: Number,
    rightVVAG: Number,
    leftVVA: Number,
    rightVVA: Number,
    leftHearing: Number,
    rightHearing: Number,
    CVS: Number,
    respSystem: Number,
    GIT_GUT: String,
    MSS: String,
    CNS: String,
    urinalysisAlb: String,
    glu: String,
    anyOthers: String,
    FBC_PCV: String,
    totalWCC: String,
    diffWCC: String,
    bloodGroup: String,
    genotype: String,
    hbsAg: String,
    hivI_II: String,
    chestX_Ray: String,
    comments: String
},
    {timestamps: {createdAt: Date.now}});

module.exports = mongoose.model("MedicalDetails", medicalDetailsSchema);
