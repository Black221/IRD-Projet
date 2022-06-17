const { default: mongoose } = require("mongoose");

const EcgSchema = mongoose.Schema({
    dataset_id: { // foreign key
        type: String, 
        required: true
    },
    metadata_id: { // foreign key
        type: String
    },
    patient_id: { // foreign key
        type: String,
        required: true
    },
    // numberEcg: {
    //     type: String,
    //     unique: true,
    // },
    filename: { //idECG_nomPatient
        type: String,
        unique: true
    },
    filepath: {
        type: String,
        unique: true
    },
    state: { 
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Ecg', EcgSchema)