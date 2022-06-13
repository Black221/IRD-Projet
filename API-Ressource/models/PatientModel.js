const { default: mongoose } = require("mongoose");

const PatientSchema = mongoose.Schema({
    // doctor_id: { // foreign key
    //     type: String,
    //     required: true
    // },
    // Apres avoir coder API_auth
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    numberPatient: {
        type: String,
        unique: true,
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    CNI: {
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
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    phone: {
        type: String,
        required: true

    },
    state: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model('Patient', PatientSchema)