const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('./db/db');

const getProvincesMW = require('./middlewares/Provinces/getProvincesMW')
const renderMW = require('./middlewares/renderMW')
const searchProvincesMW = require('./middlewares/Provinces/searchProvincesMW')
const getProvinceMW = require('./middlewares/Provinces/getProvinceMW')
const saveProvinceMW = require('./middlewares/Provinces/saveProvinceMW')
const deleteProvinceMW = require('./middlewares/Provinces/deleteProvinceMW')
const getGovernorsMW = require('./middlewares/Governors/getGovernorsMW')
const searchGovernorsMW = require('./middlewares/Governors/searchGovernorsMW')
const getGovernorMW = require('./middlewares/Governors/getGovernorMW')
const saveGovernorMW = require('./middlewares/Governors/saveGovernorMW')
const deleteGovernorMW = require('./middlewares/Governors/deleteGovernorMW')

const Province = require('./models/Province');
const Governor = require('./models/Governor');


app.use('/public', express.static('public'));

app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

// objrepo init
const objRepo = { };

objRepo.Province = Province;
objRepo.Governor = Governor;
objRepo.ejs = ejs;

// Province pages routing



app.use('/provinces',
    getProvincesMW(objRepo),
    renderMW(objRepo, 'provinces'));

app.use('/provinces/?search=:searchterm',
    searchProvincesMW(objRepo),
    renderMW(objRepo, 'provinces'));

app.use('/provinces/edit/:id',
    getProvinceMW(objRepo),
    saveProvinceMW(objRepo),
    renderMW(objRepo, 'edit_province'));

app.get('/provinces/del/:id',
    getProvinceMW(objRepo),
    deleteProvinceMW(objRepo));

app.use('/provinces/new',
    renderMW(objRepo, 'create_province'));

app.use('/provinces/new/save',
    saveProvinceMW(objRepo));





// Governor pages routing
app.use('/governors',
    getGovernorsMW(objRepo),
    renderMW(objRepo, 'governors'));

app.use('/governors/?search=:searchterm',
    searchGovernorsMW(objRepo),
    renderMW(objRepo, 'governors'));

app.use('/governors/edit/:id',
    getGovernorMW(objRepo),
    saveGovernorMW(objRepo),
    renderMW(objRepo, 'edit_governor'));

app.get('/governors/del/:id',
    getGovernorMW(objRepo),
    deleteGovernorMW(objRepo));

app.use('/governors/new',
    renderMW(objRepo, 'create_governor'));

app.use('/governors/new/save',
    saveGovernorMW(objRepo));

app.use('/',
    getProvincesMW(objRepo),
    renderMW(objRepo, 'provinces'));