const { default: mongoose } = require("mongoose");

const EcgMetadataSchema = mongoose.Schema({
    ecg_id: { // foreign key
        type: String,
        required: true
    },
    metadata_id: { // foreign key
        type: String,
        required: true
    },
    recording: {
        date: {
            type: Date,
            default: Date.now
        },
        started_at: {
            type: Date
        },
        ended_at: {
            type: Date
        }
    },
    patient: {
        age: {
            type: Number
        },
        height: {
            type: String
        },
        weight: {
            type: String
        }
    },
    state: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('EcgMetadata', EcgMetadataSchema)