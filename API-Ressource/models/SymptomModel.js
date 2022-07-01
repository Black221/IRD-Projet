const { default: mongoose } = require("mongoose");

const SymptomSchema = mongoose.Schema({
    symptom: {
        type: String,
        unique: true
    },
    state: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model('Symptom', SymptomSchema)