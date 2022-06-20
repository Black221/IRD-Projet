/**
 * @create function that will be executed when errors occurs about getting a Dataset
 */

module.exports.gettingOneDatasetErrors = (error)=>{
    let listErrors = {datasetId :''};

    if(error.message.include('datasetId'))
        listErrors.datasetId = "Pathologie inexistante , l'identifiant fourni n'est pas valide";

    return listErrors;
};

/**
 * @create function that will be executed when errors occurs about adding a Dataset
 */

module.exports.addingOneDatasetErrors = (error)=>{
    let listErrors = {name: '', createrId :'', description: ''};

    if(error.message.include('createrId'))
        listErrors.createrId = "Echec de l'ajout d'une nouvelle pathologie impossible. Veuillez-vous authentifier D'ABORD SVP";
    if(error.message.include('description'))
        listErrors.description = "Veuillez fournir une description pour la pathologie";
    if(error.message.include('name') && error.message.include('duplicate key error'))
        listErrors.name = "Le nom entre existe déjà . Veuillez fournir un nom différent";
    
    return listErrors;
}

/**
 * @create function that will be executed when errors occurs about updating a Dataset
 */

module.exports.updatingOneDatasetErrors = (error)=>{
    let listErrors = {name: '', updaterId :'', description: '', datasetId: ''};

    if(error.message.include('updaterId'))
        listErrors.updaterId = "Echec lors de la modification de la pathologie . Veuillez-vous authentifier D'ABORD SVP";
    if(error.message.include('datasetId'))
        listErrors.datasetId = "La pathologie que vous souhaitez modifier n'existe pas";    
    if(error.message.include('description'))
        listErrors.description = "Veuillez fournir une description pour la pathologie";
    if(error.message.include('name') && error.message.code === 11000)
        listErrors.name = "Veuillez choisir un nom unique pour la pathologie";
    
    return listErrors;
}

/**
 * @create function that will be executed when errors occurs about deleting a Dataset
 */

module.exports.deletingOneDatasetErrors = (error)=>{
    let listErrors = {datasetId :''};
    
    if(error.message.include('datasetId'))
        listErrors.datasetId = "Suppression Impossible car la pathologie n'existe pas";
    
    return listErrors;
}