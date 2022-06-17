const EcgMetadataModel = require("../models/EcgMetadataModel")
const EcgModel = require("../models/EcgModel")
const MetadataModel = require("../models/MetadataModel")


//Creer un ECG Metadata
// /ecg
module.exports.addOneECGMetadata = async(req, res) => {
    const ecg_id = EcgModel.findById(req.params.ecgId) 
    const creater = await MedicalStaffModel.findById({_id: req.params.createrId})
    if(!creater) return res.status(400).json('Personnel inexistant')

    if (ecg_id) {
        const metadata = MetadataModel({
            created_by: req.params.createrId,
            last_updated_by: req.params.createrId
    
        })
        const newMetadata = await metadata.save()
        const newECGMetadata = EcgMetadataModel({
            ecg_id : req.params.ecgId,
            metadata_id : newMetadata._id,
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
        })
        newECGMetadata.save().then(data => res.status(200).send(data)).catch(err => res.send(500, 'Echec lors de l\'insertion de l\'ecg metadata dans la base de donnée'))
    } else {
        res.status(400).json('ECG inexistant')
    }
     

}

