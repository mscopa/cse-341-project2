const express = require('express');
const router = express.Router();


const participantsController = require('../controllers/participants');
const validation = require('../middleware/validate');

router.get('/', participantsController.getAll);
router.get('/:id', participantsController.getSingle);
router.post('/', validation.saveParticipant, participantsController.createParticipant);
router.put('/:id', validation.saveParticipant, participantsController.updateParticipant);
router.delete('/:id', participantsController.deleteParticipant);

module.exports = router;