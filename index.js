const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));

app.listen(3000, () => {
   console.log("Listening on port 3000");
});