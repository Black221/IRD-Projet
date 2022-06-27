const { default: mongoose } = require("mongoose");
const AssistantSchema = mongoose.Schema({

    doctor_id: { // FOREIGN KEY
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
    numberAssistant: {
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
    state: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Assistant', AssistantSchema)