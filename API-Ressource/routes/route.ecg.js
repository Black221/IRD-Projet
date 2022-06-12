const express = require('express');
const routerEcg = express.Router();
const ecgController = require('../controllers/ecg.controller');

/**
 * routes for ecg
 */
routerEcg.get('/', ecgController.getAllEcg);
routerEcg.get('/:id', ecgController.getEcgById);
routerEcg.post('/', ecgController.postOneEcg);
routerEcg.put('/:id', ecgController.updateEcg);
routerEcg.delete('/:id', ecgController.deleteEcg);

module.exports = routerEcg;