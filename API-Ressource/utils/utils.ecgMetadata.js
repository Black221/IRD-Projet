/**
 * @description - The following function manage errors when adding one ecgMetadata.
 * @param {error}
 */

module.exports.addingOneEcgMetadataErrors = (error)=>{
    let listErrors = {creater:'', ecg_id:''};

    if(error.message.include('creater'))
        listErrors.creater = "Echec de l'ajout des metadonnees medicales . Identifiant de l'utilisateur est invalide . ";
    if(error.message.include('ecg_id'))
        listErrors.ecg_id= "L'identifiant de l'ecg est invalide ."
    
    return listErrors;    
}