const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('./db/db');

const getProvincesMW = require('./middlewares/Provinces/getProvincesMW');
const getProvinceMW = require('./middlewares/Provinces/getProvinceMW');
const saveProvinceMW = require('./middlewares/Provinces/saveProvinceMW');
const deleteProvinceMW = require('./middlewares/Provinces/deleteProvinceMW');
const updateProvinceMW = require('./middlewares/Provinces/updateProvinceMW');
const removeGovernorsMW = require('./middlewares/Provinces/removeGovernorsMW');
const getGovernorsMW = require('./middlewares/Governors/getGovernorsMW');
const getGovernorMW = require('./middlewares/Governors/getGovernorMW');
const saveGovernorMW = require('./middlewares/Governors/saveGovernorMW');
const deleteGovernorMW = require('./middlewares/Governors/deleteGovernorMW');
const upsertGovernorMW = require('./middlewares/Governors/upsertGovernorMW');
const updateGovernorMW = require('./middlewares/Governors/updateGovernorMW');
const redirectMW = require('./middlewares/redirectMW');
const renderMW = require('./middlewares/renderMW');


const Province = require('./models/Province');
const Governor = require('./models/Governor');


app.use('/public', express.static('public'));

app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// objrepo init

const objRepo = { };

objRepo.Province = Province;
objRepo.Governor = Governor;

// Province pages routing

app.use('/provinces/edit/:id/update',
    upsertGovernorMW(objRepo),
    updateProvinceMW(objRepo),
    redirectMW(objRepo, '/provinces'));

app.use('/provinces/edit/:id',
    getProvinceMW(objRepo),
    renderMW(objRepo, 'edit_province'));

app.get('/provinces/del/:id',
    deleteProvinceMW(objRepo),
    redirectMW(objRepo, '/provinces'));

app.use('/provinces/new/save',
    upsertGovernorMW(objRepo),
    saveProvinceMW(objRepo),
    redirectMW(objRepo, '/provinces'));

app.use('/provinces/new',
    renderMW(objRepo, 'create_province'));

app.use('/provinces',
    getProvincesMW(objRepo),
    renderMW(objRepo, 'provinces'));

// Governor pages routing

app.use('/governors/edit/:id/update',
    updateGovernorMW(objRepo),
    redirectMW(objRepo, '/governors'));

app.use('/governors/edit/:id',
    getGovernorMW(objRepo),
    renderMW(objRepo, 'edit_governor'));

app.get('/governors/del/:id',
    removeGovernorsMW(objRepo),
    deleteGovernorMW(objRepo),
    redirectMW(objRepo, '/governors'));

app.use('/governors/new/save',
    saveGovernorMW(objRepo),
    redirectMW(objRepo, '/governors'));

app.use('/governors/new',
    renderMW(objRepo, 'create_governor'));

app.use('/governors',
    getGovernorsMW(objRepo),
    renderMW(objRepo, 'governors'));

app.use('/',
    redirectMW(objRepo, '/provinces'));
