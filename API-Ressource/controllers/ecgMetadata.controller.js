const EcgMetadataModel = require("../models/EcgMetadataModel")
const EcgModel = require("../models/EcgModel")
const MetadataModel = require("../models/MetadataModel")
const AssistantModel = require("../models/AssistantModel")
const PatientModel = require("../models/PatientModel")
const MedicalStaffModel = require("../models/MedicalStaffModel")

//Ajouter un ECG Metadata

module.exports.addOneECGMetadata = async(req, res) => {
    const ecg_id = await EcgModel.findById({ _id: req.params.ecgId })
    if (!ecg_id) return res.status(400).json('ECG inexistant')
    if (ecg_id.state == false) return res.status(400).json({ message: 'ECG inactif' })

    const patient = await PatientModel.findOne({ _id: ecg_id.patient_id })
    if (!patient) return res.status(404).json({ message: 'Patient inexistant !' })
    if (patient.state == false) return res.status(400).json({ message: 'Patient inactif' })

    const creater = await MedicalStaffModel.findOne({ _id: req.params.createrId })
    const creater2 = await AssistantModel.findOne({ _id: req.params.createrId })
    if (creater) {
        if (creater.permission != 'admin' && creater._id != patient.doctor_id) return res.status(400).json({ message: 'Personnel non autorisé !' })
        if (creater.state == false) return res.status(400).json({ message: 'Personnel medical inactif' })
    } else {
        if (creater2) {
            if (creater2.doctor_id != patient.doctor_id) {
                return res.status(400).json({ message: 'Personnel non autorisé !' })
            }
        } else
            return res.status(400).json({ message: 'Personnel inexistant !' })

        if (creater2.state == false) return res.status(400).json({ message: 'Personnel medical inactif' })
    }

    try {
        const metadata = MetadataModel({
            created_by: req.params.createrId,
            last_updated_by: req.params.createrId
        })
        const newMetadata = await metadata.save()
        const newECGMetadata = EcgMetadataModel({
            ecg_id: req.params.ecgId,
            metadata_id: newMetadata._id,
            recording: req.body.recording,
            patient: req.body.patient
        })
        const ecgMetadata = await newECGMetadata.save()
        res.status(200).send({ ecgMetadata: ecgMetadata, metadata: newMetadata })
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
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