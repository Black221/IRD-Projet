const { default: mongoose } = require("mongoose");

const EcgSchema = mongoose.Schema({
    metadata_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Metadata"
    },
    patient_id: { // foreign key
        type: String,
        required: true
    },
    name: { // ECG1_nomPatient
        type: String
    },
    filename: { //ECG_idECG_idPatient
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