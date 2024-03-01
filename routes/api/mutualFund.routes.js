const bodyParser = require('body-parser');
const mutualFundControllerAPI = require('../../controllers/api/mutualFund.api.controller');
const { verifyToken } = require('../../middleware/verifyToken');

const jsonParser = bodyParser.json();
const router = require('express').Router();

router.get('/', mutualFundControllerAPI.getAllMutualFund);
router.post('/buy', jsonParser, mutualFundControllerAPI.buying);
router.post('/sell', jsonParser, mutualFundControllerAPI.selling);
router.put('/switching', jsonParser, mutualFundControllerAPI.switching);

module.exports = router;
