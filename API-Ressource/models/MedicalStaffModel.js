const { default: mongoose } = require("mongoose");

const MedicalStaffSchema = mongoose.Schema({
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
        type: String,
    },
    sex: {
        type: String,
        enum: ['M', 'F'],
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    permission: {
        type: String,
        enum: ['admin', 'special', 'user'],
    },
    state: {
        type: Boolean,
        default: true
    }    
})

module.exports = mongoose.model('MedicalStaff', MedicalStaffSchema)