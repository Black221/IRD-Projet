const express = require('express');
const routerAntecedent = express.Router();
const antecedentController  = require('../controllers/antecedent.controller');

/**
 * routes for antecedent
 */
routerAntecedent.get('/getAll', antecedentController.getAllAntecedent);
routerAntecedent.post('/postOne', antecedentController.addOneAntecedent);
routerAntecedent.put('/updateOne/:updaterId/:antecedentId', antecedentController.updateOneAntecedent);
routerAntecedent.delete('/deleteOne/:deleterId/:antecedentId', antecedentController.deleteOneAntecedent);

module.exports = routerAntecedent;