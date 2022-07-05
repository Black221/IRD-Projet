const SymptomModel = require('../models/SymptomModel')
const MedicalStaffModel = require('../models/MedicalStaffModel')

module.exports.getAllSymptom = async(req, res) => {
    try {
        const allSymptoms = await SymptomModel.find({ state: true })
        if (allSymptoms.length == 0) return res.status(404).json({ message: 'Aucun symptôme !' })
        res.status(200).json({ symptoms: allSymptoms })

    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}

module.exports.addOneSymptom = async(req, res) => {
    console.log('fsgbdcnvb')
    try {
        if (await SymptomModel.findOne({ symptom: req.body.symptom.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) })) {
            return res.status(400).json({ message: 'Symptôme déjà existant !' })
        }
        const newSymptom = new SymptomModel({
            symptom: req.body.symptom.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
        })

        const symptomData = await newSymptom.save()
        res.status(200).json({ symptom: symptomData })
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}

module.exports.updateOneSymptom = async(req, res) => {
    const symptom = await SymptomModel.findById({ _id: req.params.symptomId })
    if (!symptom) return res.status(404).json({ message: "Symptôme inexistant !" })
    if (symptom.state == false) return res.status(400).json({ message: "Symptôme inactif !" })

    const updater = await MedicalStaffModel.findById({ _id: req.params.updaterId })
    if (!updater) return res.status(404).json({ message: "Personnel inexistant !" })
    if (updater.permission != 'admin') return res.status(400).json({ message: "Personnel non autorisé !" })

    try {
        if (await SymptomModel.findOne({ symptom: req.body.symptom.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) })) {
            return res.status(400).json({ message: 'Symptôme dejà existant !' })
        }

        const symptomData = await SymptomModel.findByIdAndUpdate({ _id: req.params.symptomId }, {
            $set: {
                symptom: req.body.symptom.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
            }
        })
        res.status(200).json({ symptom: symptomData })

    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}

module.exports.deleteOneSymptom = async(req, res) => {
    const symptom = await SymptomModel.findById({ _id: req.params.symptomId })
    if (!symptom) return res.status(404).json({ message: "Symptôme inexistant !" })
    if (symptom.state == false) return res.status(400).json({ message: "Symptôme inactif !" })

    const deleter = await MedicalStaffModel.findById({ _id: req.params.deleterId })
    if (!deleter) return res.status(404).json({ message: "Personnel inexistant !" })
    if (deleter.permission != 'admin') return res.status(400).json({ message: "Personnel non autorisé !" })

    try {
        await SymptomModel.findByIdAndDelete({ _id: req.params.symptomId })
        res.status(200).json("Suppression du symptôme " + symptom.symptom + " avec succès !")
        //on delete cascade
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}