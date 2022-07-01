const { default: mongoose } = require("mongoose");

const ExamSchema = mongoose.Schema({
    metadata_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Metadata"
    },
    patient_id: { // foreign key
        type: String,
        required: true
    },
    name: { // Radio1_nomPatient
        type: String
    },
    filename: { //nom_idExam_idPatient
        type: String,
        unique: true
    },
    filepath: {
        type: String,
        unique: true
    },
    state: {
        type: Boolean,
        default: true
    }
})


module.exports = mongoose.model('Exam', ExamSchema)