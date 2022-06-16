const { default: mongoose } = require("mongoose");

const MetadataSchema = mongoose.Schema(
    {
        created_by: {
            type: String
        },
        last_updated_by: {
            type: String
        },
        etat: {
            type: Boolean,
            default: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('Metadata', MetadataSchema)