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
        enum: {
            value: ['M', 'F'],
            message : '{VALUE} is not supported'
        }
    },
    state: {
        type: Boolean,
        default: true
    }    

})

module.exports = mongoose.model('Patient', PatientSchema)