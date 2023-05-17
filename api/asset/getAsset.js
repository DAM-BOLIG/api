const {Router} = require('express');
const db = require('./database/databaseConnect.js');

const router = Router();

router.get('/', (req, res) => {
    res.json({ route: 'createAssets'});
})