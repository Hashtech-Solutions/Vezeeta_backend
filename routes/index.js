import express from 'express';
import doctor from './api/doctorAuth.js';
import user from './api/patientAuth.js';
import specialization from './api/specialization.js';

const router = express.Router();

router.get('/xx', (req, res) => {
    res.send('Hello World from router!');
});

router.use('/doctor', doctor);
router.use('/user', user);
router.use('/', specialization);

export default router;