/**
 * @description  The following function manage errors when getting a medicalStaff by id.
 * @param {error} error
 * @returns {listErrors} listErrors
 */

module.exports.gettingOneMedicalStaffByIdErrors = (error)=>{
    let listErrors = {medicalStaffId :''};

    if(error.message.include('medicalStaffId'))
        listErrors.medicalStaffId = "L'identifiant du personnel est invalide .";

    return listErrors;
}

/**
 * @description  The following function manage errors when updating a medicalStaff.
 * @param {error} error
 * @returns {listErrors} listErrors
 */

module.exports.updatingMedicalStaffErrors = (error)=>{
    let listErrors = {medicalStaffId :'', updaterId :''};

    if(error.message.include('medicalStaffId'))
        listErrors.medicalStaffId = "Impossible de mettre a jour un personnel. Authentication Requise !";
    if(error.message.include('updaterId'))
        listErrors.updaterId = "Mise a jour non effectuee. Identifiant invalide !";

    return listErrors;
}    

/**
 * @description  The following function manage errors when deleting a medicalStaff.   
 * @param {error} error
 * @returns {listErrors} listErrors
 */

module.exports.deletingMedicalStaffErrors = (error)=>{
    let listErrors = {medicalStaffId :''};

    if(error.message.include('medicalStaffId'))
        listErrors.medicalStaffId = "Impossible de supprimer un personnel. Authentication Requise !";

    return listErrors;
}