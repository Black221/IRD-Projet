const { default: mongoose } = require("mongoose");

const PatientSchema = mongoose.Schema({
    metadata_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Metadata"
    },
    antecedent: {
        personnal: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Antecedent"
        },
        family: {
            type: [String]
        }  
    },
    diagnostic: {
        type: String
    },
    symptom: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Symptom"
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthday: {
        type: Date
    },
    cni: {
        type: String,
        minLength: 13,
        maxLength: 13
    },
    nationality: {
        type: String
    },
    sex: {
        type: String,
        enum: ['M', 'F']
    },
    race: {
        type: String,
        enum: ['Noire', 'Caucasienne', 'Métisse', 'Indienne', 'Asiatique', 'Arabe']
    },
    address: {
        country: {
            type: String,
            default: 'Senegal'
        },
        city: {
            type: String
        },
        address: {
            type: String
        }
    },
    phone: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Patient', PatientSchema)