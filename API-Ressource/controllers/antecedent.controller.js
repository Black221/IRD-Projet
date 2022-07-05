const AntecedentModel = require('../models/AntecedentModel')
const MedicalStaffModel = require('../models/MedicalStaffModel')
const PatientModel = require('../models/PatientModel')

module.exports.getAllAntecedent = async(req, res) => {
    try {
        const allAntecedents = await AntecedentModel.find({ state: true })
        if (allAntecedents.length == 0) return res.status(404).json({ message: 'Aucun antécédent !' })
        res.status(200).json({ antecedents: allAntecedents })

    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}
module.exports.addOneAntecedent = async(req, res) => {
    try {
        if (await AntecedentModel.findOne({ antecedent: req.body.antecedent.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) })) {
            return res.status(400).json({ message: 'Antécédent déjà existant !' })
        }
        const newAntecedent = new AntecedentModel({
            antecedent: req.body.antecedent.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
        })

        const antecedentData = await newAntecedent.save()
        res.status(200).json({ antecedent: antecedentData })
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}

module.exports.updateOneAntecedent = async(req, res) => {
    const antecedent = await AntecedentModel.findById({ _id: req.params.antecedentId })
    if (!antecedent) return res.status(404).json({ message: "Antécédent inexistant !" })
    if (antecedent.state == false) return res.status(400).json({ message: "Antécédent inactif !" })

    const updater = await MedicalStaffModel.findById({ _id: req.params.updaterId })
    if (!updater) return res.status(404).json({ message: "Personnel inexistant !" })
    if (updater.permission != 'admin') return res.status(400).json({ message: "Personnel non autorisé !" })

    try {
        if (await AntecedentModel.findOne({ antecedent: req.body.antecedent.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) })) {
            return res.status(400).json({ message: 'Antécédent dejà existant !' })
        }

        const antecedentData = await AntecedentModel.findByIdAndUpdate({ _id: req.params.antecedentId }, {
            $set: {
                antecedent: req.body.antecedent.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
            }
        })
        res.status(200).json({ antecedent: antecedentData })

    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}

module.exports.deleteOneAntecedent = async(req, res) => {
    const antecedent = await AntecedentModel.findById({ _id: req.params.antecedentId })
    if (!antecedent) return res.status(404).json({ message: "Antécédent inexistant !" })
    if (antecedent.state == false) return res.status(400).json({ message: "Antécédent inactif !" })

    const deleter = await MedicalStaffModel.findById({ _id: req.params.deleterId })
    if (!deleter) return res.status(404).json({ message: "Personnel inexistant !" })
    if (deleter.permission != 'admin') return res.status(400).json({ message: "Personnel non autorisé !" })

    try {
        await AntecedentModel.findByIdAndDelete({ _id: req.params.antecedentId })
        res.status(200).json("Suppression de l'antécédent " + antecedent.antecedent + " avec succès !")
        // On delete cascade
        //const patients = await PatientModel.find({antecedent.personnal : req.params.antecedentId})
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}