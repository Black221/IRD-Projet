const { default: mongoose } = require("mongoose");

const DatasetSchema = mongoose.Schema({
    metadata_id: { // foreign key
        type: String
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    path: {
        type: String
    },
    dir: {
        type: String
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('Dataset', DatasetSchema)