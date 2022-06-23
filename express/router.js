
const express = require('express');
const router = express.Router();
const { validate, ValidationError } = require('express-validation');
const validation = require('./validation');

const productSearch = require('./endpoints');

router.post('/product-search', productSearch.search);
router.get('/products', validate(validation.products), productSearch.find);
router.get('/', (req, res)=> res.status(200).json({ hello: 'world' }));

router.use((err, req, res, next)=>{
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json(err);
  } else {
    res.send(err);
  }
});

module.exports = router;
