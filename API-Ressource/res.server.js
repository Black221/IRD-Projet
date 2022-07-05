/**
 * INCLUDES MODULES AND SETS UP SERVER
 */

require('dotenv').config({ path: './config/.env' })
require('./config/db.config')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const appRes = express()
const fileUpload = require('express-fileupload')

const EcgModel = require("./models/EcgModel")
const MetadataModel = require("./models/MetadataModel")

const routeForEcg = require('./routes/route.ecg')
const routeForPatient = require('./routes/route.patient')
const routeForMedicalStaff = require('./routes/route.medicalStaff')
const routeForAntecedent = require('./routes/route.antecedent')
const routeForSymptom = require('./routes/route.symptom')
const routeForExamType = require('./routes/route.examType')
const routeForExam = require('./routes/route.exam')
const routeForRestore = require("./routes/route.restore")

/**
 * middlewares
 */
appRes.use(bodyParser.json())
appRes.use(cors())

appRes.use(fileUpload({ createParentPath: true }))
appRes.use('/ecg', routeForEcg)
appRes.use('/patient', routeForPatient)
appRes.use('/medicalStaff', routeForMedicalStaff)
appRes.use('/antecedent', routeForAntecedent)
appRes.use('/symptom', routeForSymptom)
appRes.use('/examType', routeForExamType)
appRes.use('/exam', routeForExam)
appRes.use('/restore', routeForRestore)

appRes.get('/metadata/get/specific/:id', async(req, res) => {
    try {
        const oneMetadata = await MetadataModel.findById({ _id: req.params.id })
        res.status(200).send({ metadata: oneMetadata })

    } catch (error) {
        res.status(500).send({ message: error })

    }
})

appRes.post('/ecg/file/:id', async(req, res) => {
    try {
        const ecg = await EcgModel.findById({ _id: req.params.id })
        if (!ecg) return res.status(404).json({ message: 'ECG inexistant !' })
        if (ecg.state == false) return res.status(404).json({ message: "ECG inactif" })

        if (req.files) {
            let ecgFile = req.files.ecgFile
            await ecgFile.mv(ecg.filepath)
            console.log("reussi")
        } else {
            res.status(400)
            console.log("echec pas de file")

        }
    } catch (error) {
        res.status(500).send({ message: error })
        console.log(error)
    }
})

/*
 *listening on port given in .env file
 */

appRes.listen(process.env.PORT_RES, () => {
    console.log(`Server is running on port ${process.env.PORT_RES}`)
})