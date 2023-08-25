const router = require('express').Router();
const PatientController = require('./controllers/PatientController');

router.post('/patients', PatientController.create);
router.get('/patients', PatientController.read);

module.exports = router;