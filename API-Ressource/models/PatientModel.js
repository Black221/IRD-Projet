const { default: mongoose } = require("mongoose");

const PatientSchema = mongoose.Schema({
    doctor_id: { // foreign key
        type: String,
        required: true
    },
    metadata_id: { // foreign key
        type: String, 
        required: true 
    },
    path: {
        type: String
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String, 
        required: true
    },
    numberPatient: {
        type: String,
        unique: true
    },
    dateOfBirth: {
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
        countryIndicator: {
            type: String, 
            minLength: 2,
            maxLength: 6
        },
        phonenumber: {
            type : String
        } 
    },
    state: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model('Patient', PatientSchema)