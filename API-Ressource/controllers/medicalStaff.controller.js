const MedicalStaffModel = require('../models/MedicalStaffModel')
    /**
     * @description get all medicalstaff
     * @param {*} req 
     * @param {*} res 
     * @param {*} getterId
     * @returns medicalStaffData
     */
module.exports.getAllMedicalStaff = async(req, res) => {
    try {
        const getter = await MedicalStaffModel.findById({ _id: req.params.getterId })
        if (!getter) return res.status(400).json({ message: 'Personnel inexistant' })
        if (getter.permission != "admin") return res.status(400).json('Personnel non autorisé')

        const medicalStaffData = await MedicalStaffModel.find({ state: true })
        if (medicalStaffData.length == 0) return res.status(404).json({ message: 'Aucun personnel medical !' })
        res.status(200).json({ medicalStaff: medicalStaffData })

    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)

    }
}

/**
 * @description Get one medicalstaff by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} medicalStaffId
 * @param {*} getterId
 * @returns medicalStaffData
 */
module.exports.getOneMedicalStaff = async(req, res) => {
    const present = await MedicalStaffModel.findOne({ _id: req.params.getterId })
    if (!present) return res.status(400).send('Personnel inexistant')
    if (present.permission != 'admin') return res.status(400).send('Permission non accordée')
    if (present.state == false) return res.status(400).json({ message: 'Personnel medical inactif' })

    try {
        const medicalStaffData = await MedicalStaffModel.findById({ _id: req.params.medicalStaffId });
        if (!medicalStaffData) return res.status(400).json('Personnel medical inexistant')
        if (medicalStaffData.state == false) return res.status(400).json({ message: 'Personnel inactif' })
        res.status(200).json({ medicalStaff: medicalStaffData });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
}

/**
 * @description Add a new medicalstaff
 * @param {*} req 
 * @param {*} res 
 * @param {*} posterId
 * @returns medicalStaffData
 */
module.exports.AddOneMedicalStaff = async(req, res) => {
    try {
        const present = await MedicalStaffModel.findOne({ _id: req.params.createrId })
        if (!present) return res.status(400).send('Personnel inexistant')
        if (present.permission != 'admin') return res.status(400).send('Permission non accordée')
        if (present.state == false) return res.status(400).json({ message: 'Personnel medical inactif' })

        const newMedicalStaff = new MedicalStaffModel({
            firstname: req.body.firstname.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
            lastname: req.body.lastname.toUpperCase(),
            birthday: req.body.dateOfBirth,
            cni: req.body.cni,
            nationality: req.body.nationality,
            sex: req.body.sex,
            address: req.body.address,
            phone: req.body.phone,
            login: req.body.login,
            password: req.body.password,
            profession: req.body.profession,
            permission: req.body.permission
        });
        const medicalStaffData = await newMedicalStaff.save();

        res.status(200).json({ medicalStaff: medicalStaffData });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
}

/**
 * @description Update a medicalstaff
 * @param {*} req 
 * @param {*} res 
 * @param {*} medicalStaffId
 * @param {*} updaterId
 * @returns 
 */
module.exports.updateMedicalStaff = async(req, res) => {

    const present = await MedicalStaffModel.findOne({ _id: req.params.updaterId })
    if (!present) return res.status(400).send('Personnel inexistant')
    if (present.permission != 'admin' || present.permission != 'doctor') return res.status(400).send('Permission non accordée')
    if (present.state == false) return res.status(400).json({ message: 'Personnel medical inactif' })

    try {
        const medicalStaff = await MedicalStaffModel.findById({ _id: req.params.medicalStaffId });
        if (!medicalStaff) return res.status(400).json('Personnel medical inexistant')
        if (medicalStaff.state == false) return res.status(400).json({ message: 'Personnel inactif' })

        const medicalStaffData = await MedicalStaffModel.findByIdAndUpdate({ _id: req.params.medicalStaffId }, {
            $set: {
                firstname: req.body.firstname.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                lastname: req.body.lastname,
                birthday: req.body.birthday,
                cni: req.body.cni,
                nationality: req.body.nationality,
                sex: req.body.sex,
                address: req.body.address,
                phone: req.body.phone,
                login: req.body.login,
                password: req.body.password,
                profession: req.body.profession,
                permission: req.body.permission
            }
        });
        res.status(200).json({ medicalStaff: medicalStaffData });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
}

/**
 * @description Delete a medicalstaff
 * @param {*} req
 * @param {*} res
 * @param {*} medicalStaffId
 * @param {*} deleterId
 * @returns 
 */

module.exports.deleteMedicalStaff = async(req, res) => {
    const present = await MedicalStaffModel.findOne({ _id: req.params.deleterId })
    if (!present) return res.status(400).send('Personnel inexistant')
    if (present.permission != 'admin') return res.status(400).send('Permission non accordée')
    if (present.state == false) return res.status(400).json({ message: 'Personnel medical inactif' })

    try {
        const medicalStaff = await MedicalStaffModel.findById({ _id: req.params.medicalStaffId });
        if (!medicalStaff) return res.status(400).json('Personnel medical inexistant')
        if (medicalStaff.state == false) return res.status(400).json({ message: 'Personnel inactif' })

        await MedicalStaffModel.findByIdAndUpdate({ _id: req.params.medicalStaffId }, { $set: { state: false } });


        res.status(200).json("Archivage du personnel medical " + medicalStaff.firstname + " " + medicalStaff.lastname + " avec succès !")

    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
    }
}