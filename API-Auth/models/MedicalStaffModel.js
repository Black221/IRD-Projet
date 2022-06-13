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
    cni: {
        type: String,
        minLength: 13,
        maxLength: 13
    },
    nationality: {
        type: String,
    },
    sex: {
        type: String,
        // enum: {
        //     value: ['M', 'F'],
        //     message: '{VALUE} is not supported'
        // }
    },
    numberMedicalStaff: {
        type: String,
        required: true,
        unique: true
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
        // enum: {
        //     value: ['admin', 'special', 'user'],
        //     message: '{VALUE} is not supported'
        // }
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
    state: {
        type: Boolean,
        default: true
    }
});
module.exports = mongoose.model('MedicalStaff', MedicalStaffSchema)