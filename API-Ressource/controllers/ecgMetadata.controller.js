const EcgMetadataModel = require("../models/EcgMetadataModel")
const EcgModel = require("../models/EcgModel")
const MetadataModel = require("../models/MetadataModel")
const AssistantModel = require("../models/AssistantModel")
const PatientModel = require("../models/PatientModel")

//Ajouter un ECG Metadata

module.exports.addOneECGMetadata = async(req, res) => {
    const patient = await PatientModel.findOne({ _id: req.body.patientId })
    if (!patient) return res.status(404).json({ message: 'Patient inexistant !' })

    const creater = await MedicalStaffModel.findOne({ _id: req.params.createrId })
    const creater2 = await AssistantModel.findOne({ _id: req.params.createrId })
    if (creater) {
        if (creater.permission != 'admin' && creater._id != patient.doctor_id) return res.status(400).json({ message: 'Personnel non autorisé !' })
    } else {
        if (creater2.doctor_id != patient.doctor_id) {
            return res.status(400).json({ message: 'Personnel non autorisé !' })
        } else
            return res.status(400).json({ message: 'Personnel inexistant !' })
    }

    try {
        const ecg_id = EcgModel.findById({ _id: req.params.ecgId })
        if (ecg_id) {
            const newECGMetadata = EcgMetadataModel({
                ecg_id: req.params.ecgId,
                metadata_id: newMetadata._id,
                recording: req.body.recording,
                patient: req.body.patient
            })
            const metadata = MetadataModel({
                created_by: req.params.createrId,
                last_updated_by: req.params.createrId
            })
            const ecgMetadata = await newECGMetadata.save()
            const newMetadata = await metadata.save()
            res.status(200).send({ ecgMetadata: ecgMetadata, metadata: newMetadata })
        } else {
            res.status(400).json('ECG inexistant')
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.calculAge = async(req, res) => {
    try {
        const ecg = await EcgModel.findOne({ _id: req.params.ecgId })
        if (!ecg) return res.status(400).json({ message: '' })
        const patient = await PatientModel.findOne({ _id: ecg.patient_id })
        if (!patient) return res.status(400).json({ message: '' })
        const birthday = new Date(patient.birthday)
        const ecgMetadata = await EcgMetadataModel.findOne({ ecg_id: req.params.ecgId })
        if (!ecgMetadata) return res.status(400).json({ message: '' })
        const recording = new Date(ecgMetadata.recording.date)
        const age = Math.floor((recording - birthday) / (1000 * 60 * 60 * 24 * 365))
        res.status(200).json({ age: age })
    } catch (error) {
        res.status(500).json(error)
    }
}