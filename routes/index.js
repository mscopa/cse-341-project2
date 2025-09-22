const router = require('express').Router();
router.use('/', require('./swagger'));
router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World!')
});
router.use('/participants', require('./participants'));
router.use('/companies', require('./companies'));

module.exports = router;