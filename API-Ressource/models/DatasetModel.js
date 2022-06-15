const { default: mongoose } = require("mongoose");

const DatasetSchema = mongoose.Schema({
    metadata_id: { // foreign key
        type: String, 
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('Dataset', DatasetSchema)


// const UserSchema = mongoose.Schema({
    
// })

// module.exports = mongoose.model('User', UserSchema)