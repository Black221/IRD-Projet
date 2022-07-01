const { default: mongoose } = require("mongoose");

const AntecedentSchema = mongoose.Schema({
    antecedent: {
        type: String,
        unique: true
    },
    state: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model('Antecedent', AntecedentSchema)