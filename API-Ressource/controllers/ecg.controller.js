const DatasetModel = require('../models/DatasetModel');
const EcgMetadataModel = require('../models/EcgMetadataModel');
const EcgModel = require('../models/EcgModel');
const MetadataModel = require('../models/MetadataModel');
const PatientModel = require('../models/PatientModel');
const fs = require('fs');
const replace = require('replace');
require('dotenv').config({ path: './.env' });

const validId = require('mongoose').Types.ObjectId;

/**
 * @description - This controller is used to list all ecg .
 */
module.exports.getAllEcg = async(req, res) => {
    try {
        const allEcg = await EcgModel.find();
        res.status(200).json({ecgs: allEcg});
    } catch (error) {
        res.status(500).json({message: error});
    }
}

// datasetId
module.exports.getEcgByDataset = async(req, res) => {
    const dataset = await DatasetModel.findById({_id: req.params.datasetId})
    if(!dataset) return res.status(400).json('Pathologie inexistante')
    try {
        const allEcgByDataset = await EcgModel.find({dataset_id: req.params.datasetId});
        res.status(200).json({ecgs: allEcgByDataset});
    } catch (error) {
        res.status(500).json({message: error});
    }
}


module.exports.getEcgByPatient = async(req, res) => {
    const patient = await PatientModel.findById({_id: req.params.patientId})
    if(!patient) return res.status(400).json('Patient(e) inexistant(e)')

    try {
        const allEcgByPatient = await EcgModel.find({patient_id: req.params.patientId});
        res.status(200).json({ecgs: allEcgByPatient});
    } catch (error) {
        res.status(500).json({message: error});
    }
}



    /**
     * @description - This controller is used to get ecg by id.
     * @param {string} ecgId - The id of ecg.
     * check if id is valid before doing anything else.
     */
module.exports.getOneEcg = async(req, res) => {
        if (!validId.isValid(req.params.ecgId)) return res.status(400).json({message: 'Invalid id'});
        try {
            const oneEcg = await EcgModel.findById({_id: req.params.ecgId});
            const oneEcgMetadata = await EcgMetadataModel.find({ecg_id: oneEcg._id})
            res.status(200).json({ecg: oneEcg, metadata: oneEcgMetadata});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }


    /**
     * @description - This controller permits us to post or create new ecg.
     * @params - createrId      datasetId     patientId
     */
module.exports.addOneEcg = async(req, res) => {
    const creater = await MedicalStaffModel.findById({_id: req.params.createrId})
        if(!creater) return res.status(400).json({message: 'Personnel inexistant'})
        try {
            let ecgFile = req.files.ecgFile
            if (!req.files) {
                res.status(400).send({message: 'No file uploaded'})
            } else {
                const metadataId = await new MetadataModel({
                    created_by: req.params.createrId,
                    last_updated_by: req.params.createrId
                });
                const metadataIdSave = await metadataId.save();
    
                const dataset = await DatasetModel.findOne({name: req.params.datasetId})
                const patient = await PatientModel.findOne({_id: req.params.patientId})
                
                if (dataset && patient) {
                    const ecgId = await new EcgModel({
                        dataset_id: req.params.datasetId, 
                        metadata_id: metadataIdSave._id,
                        patient_id: req.params.patientId,
                        filename: ecgFile.name
                    });
                    const ecgIdSave = await ecgId.save();
                    const filename = ecgId._id +"_"+ patient.firstname.split(" ").join("-") +"-"+ patient.lastname.split(" ").join("-") 
                    const datasetRep = await DatasetModel.findById({_id: dataset._id}).path
                    const patientRep = patient.firstname.split(" ").join("-") +"-"+ patient.lastname.split(" ").join("-") +"_"+ dataset.name.split(" ").join("-") +"_"+ patient._id
                    const dir = datasetRep + process.env.SE + patientRep
                    const filepath = dir + process.env.SE + filename

                    if (!fs.existsSync(dir)){
                        fs.mkdirSync(dir, { recursive: true });
                    }
                    await ecgFile.mv(filepath);
        
                    //const numberEcg = ecgIdSave._id;
                    //console.log(numberEcg)
                    const ecgIdSaveFilepath = await EcgModel.findByIdAndUpdate(
                        {_id: ecgIdSave.id}, 
                        { $set: { 
                            filepath: filepath, 
                            filename: filename
                        } }, 
                        { new: true });
                    res.status(200).json({ecg: ecgIdSaveFilepath, metadata: metadataId});
        
                } else {
                    if (!dataset) {
                        res.status(400).json({message: 'Pathologie inexistante'})
                    }
                    if (!patient) {
                        res.status(400).json({message: 'Patient inexistant'})
                    }
                }    
            }
        } catch (error) {
            res.status(500).json({message: error});
            console.log(error)
        }

    }

    /**
     * @description - This controller permits us to update ecg.
     * @param {string} ecgId - The id of ecg.
     * updaterId/:datasetId/:patientId/:ecgId
     */
module.exports.updateOneEcg = async(req, res) => {
    if (!validId.isValid(req.params.ecgId)) return res.status(400).json({message: 'Invalid id'});
    const updater = await MedicalStaffModel.findById({_id: req.params.updaterId})
    if(!updater) return res.status(400).json({message: 'Personnel inexistant'})

    try {
        const dataset = DatasetModel.find({name: req.params.datasetId})
        const patient = PatientModel.find({_id: req.params.patientId})

        if (dataset && patient_id) {
            let ecgFile = req.files.ecgFile
            const oldFilepath = await EcgModel.findById({_id: req.params.ecgId}).filepath
            const updatedEcg = await EcgModel.findByIdAndUpdate(
                {_id: req.params.ecgId}, 
                { $set: {
                    dataset_id: req.params.datasetId, 
                    patient_id: req.params.patientId,
                    filename: ecgFile.name
            }})

            const filename = updatedEcg._id +"_"+ patient.firstname.split(" ").join("-") +"-"+ patient.lastname.split(" ").join("-")
            const datasetRep = dataset.path 
            const patientRep = patient.firstname.split(" ").join("-") +"-"+ patient.lastname.split(" ").join("-") +"_"+ dataset.name.split(" ").join("-") +"_"+ patient._id  
            const dir = datasetRep + process.env.SE + patientRep
            const filepath = dir + process.env.SE + filename

            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }
            await ecgFile.mv(filepath);
            fs.unlink(oldFilepath, err => {
                console.error(err);
            })
            const updatedEcgFilepath = await EcgModel.findByIdAndUpdate(
                {_id: updatedEcg.id}, 
                { $set: { 
                    filepath: filepath, 
                    filename: filename
                } }, 
                { new: true }
            );



            const updatedEcgMetadata = await EcgMetadataModel.findOneAndUpdate(
                {ecg_id: req.params.ecgId},
                {$set: {
                    recording:{
                        started_at: req.body.started_at,
                        ended_at: req.body.ended_at            
                    },
                    patient:{
                        age: req.body.age,
                        height: req.body.height,
                        weight: req.body.weight,
                        sex: req.body.sex
                    }
                
            }})
            const updatedMetadata = await MetadataModel.findByIdAndUpdate(
                {_id: updatedEcg.metadata_id},
                {
                    $set: {
                        last_updated_by: req.params.updaterId
                    }
                },
                { new: true, upset: true, setDefaultsOnInsert: true }
            )    
            res.status(200).json({updatedEcg, updatedEcgMetadata, updatedMetadata});    
        } else {
            if (!dataset) {
                res.status(404).json('Pathologie inexistante')
            }
            if (!patient) {
                res.status(404).json('Patient inexistant')
            }
        }
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
}


    /**
     * @description - This controller permits us to delete ecg.
     * @param {string} ecgId - The id of ecg.
     */

module.exports.deleteOneEcg = async(req, res) => {
    if (!validId.isValid(req.params.ecgId)) return res.status(400).json({message: 'Invalid id'});
    try {
        const theEcg = await EcgModel.findById({_id: req.params.ecgId})
        const deletedEcg = await EcgModel.findByIdAndDelete({_id: req.params.ecgId});
        const deletedEcgMetadata = await EcgModel.findOneAndDelete({ecg_id: theEcg._id});
        res.status(200).json("Supression de l'ecg " +theEcg.filename+ " avec succès..."); 
    } catch (err) {
        res.status(500).json({message: err});
    }
}