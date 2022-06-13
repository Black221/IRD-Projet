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
    recording:{
        started_at:{
            type: Date
        },
        ended_at: {
            type: Date
        }
    },
    patient:{ 
        age:{
            type: Number
        },
        height:{
            type: String
        },
        weight:{
            type: String
        },
        sex: {
            type: String,
            enum: ['M', 'F']
        }
    }
})

module.exports = mongoose.model('EcgMetadata', EcgMetadataSchema)