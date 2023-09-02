const router = require("express").Router();
const PatientController = require("./controllers/PatientController");
const ProfessionalController = require("./controllers/ProfessionalController");
const ProcedureController = require("./controllers/ProcedureController");
const ProfessionalAttends = require("./controllers/ProfessionalAttendsController");
const SolicitationType = require("./controllers/SolicitationType");
const SolicitationController = require('./controllers/SolicitationController');

router.post("/patients", PatientController.create);
router.get("/patients", PatientController.read);
router.get("/patients/:id", PatientController.getById);

router.get("/professionals", ProfessionalController.read);
router.get("/professionals/procedures/:id", ProfessionalController.getProfessionalProcedures);

router.get("/procedures", ProcedureController.read);

router.get("/professional/attends", ProfessionalAttends.read);

router.get("/solicitation/type", SolicitationType.read);

router.get('/solicitation', SolicitationController.read)

router.post('/solicitation', SolicitationController.create)

module.exports = router;
