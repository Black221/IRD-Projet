/**
 * @description - The following function manage errors when getting one ecg by EcgId.
 * @param {error} -- error object that contains the error message.
 */

module.exports.gettingOneEcgByIdErrors = (error)=>{
    let listErrors = {ecgId :''};

    if(error.message.include('ecgId'))
        listErrors.ecgId = "Ecg inexistant , l'identifiant fourni n'est pas valide";

    return listErrors;
}

/**
 * @description - The following function manage errors when getting one ecg by datasetId.
 * @param {error} 
 */

module.exports.gettingOneEcgByDatasetIdErrors = (error)=>{
    let listErrors = {datasetId :''};

    if(error.message.include('datasetId'))
        listErrors.datasetId = "L'identifiant de la pathologie invalide .";

    return listErrors;
} 

/**
 * @description - The following function manage errors when getting one ecg by patientId.
 * @param {error}
 */

module.exports.gettingOneEcgByPatientIdErrors = (error)=>{
    let listErrors = {patientId :''};

    if(error.message.include('patientId'))
        listErrors.patientId = "L'identifiant du patient est invalide .";

    return listErrors;
}

/**
 * @description- The following function manage errors when adding one ecg.
 * @param {error}
 */

module.exports.addingOneEcgErrors = (error)=>{

    let listErrors = {createrId :'', patient_id:'', dataset_id : '', filename:''};

    if(error.message.include('createrId'))
        listErrors.createrId = "Impossible d'ajouter un nouvel ecg. Authentication Requise !";
    if(error.message.include('filename'))    
        listErrors.filename = "Veuillez selectionner un fichier avec un nom unique"
    if(error.message.include('patient_id'))
        listErrors.patient_id = "Impossible d'ajouter un nouvel ecg. Patient inexistant !";
    if(error.message.include('dataset_id'))
        listErrors.dataset_id = "Ajout non effectue, Veuillez verifier l'identifiant de la pathologie";  
        
    return listErrors;    
}

/**
 * @description - The following function manage errors when updating one ecg.
 * @param {error}
 */

module.exports.updatingOneEcgErrors = (error)=>{
    
    let listErrors = {updaterId :'', patient_id:'', dataset_id : '', filename:''};

    if(error.message.include('updaterId'))
        listErrors.updaterId = "Mise a jour non effective. Authentication Requise !";
    if(error.message.include('patient_id'))
        listErrors.patient_id = "Impossible de mettre a jour l' ecg. Patient inexistant !";
    if(error.message.include('dataset_id'))
        listErrors.dataset_id = "Mise a jour non effectuee, Veuillez verifier l'identifiant de la pathologie";
    if(error.message.include('filename') && error.message.code() === 11000)  
        listErrors.filename = "Veuillez selectionner un fichier avec un nom unique"

    return listErrors;    
}

/**
 * @description - The following function manage errors when deleting one ecg.
 * @param {error}
 */

module.exports.deletingOneEcgErrors = (error)=>{
    let listErrors = {ecgId :''};

    if(error.message.include('ecgId'))
        listErrors.ecgId = "Suppression non effectuee, Veuillez verifier l'identifiant de l'ecg";

    return listErrors;    
}