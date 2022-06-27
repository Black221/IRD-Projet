const { default: mongoose } = require("mongoose");

const MetadataSchema = mongoose.Schema({
    created_by: {
        type: String,
        required: true
    },
    last_updated_by: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Metadata', MetadataSchema)