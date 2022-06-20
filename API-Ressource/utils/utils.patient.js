/**
 * @description - This following function manage errors when getting a patient by Id
 * @param {error} error
 * @returns {listErrors} listErrors
 */

module.exports.gettingOnePatientByIdErrors = (error)=>{
    let listErrors = {patientId :''};

    if(error.message.include('patientId'))
        listErrors.patientId = "L'identifiant du patient est invalide .";

    return listErrors;
}

/**
 * @description - This following function manage errors when adding a patient
 * @param {error} error
 * @returns {listErrors} listErrors
 */

module.exports.addingOnePatientErrors = (error)=>{
    let listErrors = {createrId :''};

    if(error.message.include('createrId'))
        listErrors.createrId = "Impossible d'ajouter un nouveau patient. Authentication Requise !";

    return listErrors;
}

/**
 * @description - This following function manage errors when updating a patient
 * @param {error} error
 * @returns {listErrors} listErrors
 */

module.exports.updatingOnePatientErrors = (error)=>{
    let listErrors = {patientId :'', updaterId :''};

    if(error.message.include('patientId'))
        listErrors.patientId = "Impossible de mettre a jour un patient. Identifiant du patient  !";
    if(error.message.include('updaterId'))
        listErrors.updaterId = "Mise a jour non effectuee. Identifiant invalide !";

    return listErrors;
}

/**
 * @description - This following function manage errors when deleting a patient
 * @param {error} error
 * @returns {listErrors} listErrors
 */

module.exports.deletingOnePatientErrors = (error)=>{
    let listErrors = {patientId :''};

    if(error.message.include('patientId'))
        listErrors.patientId = "Identifiant du patient invalide !";
    
    return listErrors;
}

/**
 * @description - This following function manage errors when updating a doctor
 * @param {error} error
 * @returns {listErrors} listErrors
 */

module.exports.updatingOneDoctorErrors = (error)=>{
    let listErrors = {doctorId :'', updaterId :''};

    if(error.message.include('doctorId'))
        listErrors.doctorId = "L'identifiant du medecin est invalide .";
    if(error.message.include('updaterId'))
        listErrors.updaterId = "Authentification requise pour mettre a jour le compte d'un medecin !";

    return listErrors;
}