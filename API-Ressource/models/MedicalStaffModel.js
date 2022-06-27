const { default: mongoose } = require("mongoose");

const MedicalStaffSchema = mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    numberMedicalStaff: {
        type: String,
        unique: true
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
        enum: ['admin', 'doctor', 'user'],
        default: 'doctor'
    },
    state: {
        type: Boolean,
        default: true
    },
    token: {
        type: String,
        default: 'fake token'
    }
})

module.exports = mongoose.model('MedicalStaff', MedicalStaffSchema)