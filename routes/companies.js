const express = require('express');
const router = express.Router();


const companiesController = require('../controllers/companies');
const validation = require('../middleware/validate');

router.get('/', companiesController.getAll);
router.get('/:id', companiesController.getSingle);
router.post('/', validation.saveCompany, companiesController.createCompany);
router.put('/:id', validation.saveCompany, companiesController.updateCompany);
router.delete('/:id', companiesController.deleteCompany);

module.exports = router;