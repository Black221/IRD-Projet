const { default: mongoose } = require("mongoose");

const ExamTypeSchema = mongoose.Schema({
    examType: {
        type: String,
        unique: true

    },
    state: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model('ExamType', ExamTypeSchema)