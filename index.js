const express = require('express');
const app = express();

const parkings = require('./parkings.json');

// app.get('/parkings', (req, res) => {
//     res.send("Liste des parkings");
// });

app.get('/parkings', (req, res) => {
    res.status(200).json(parkings);
});

app.get('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const parking  = parkings.find(parking => parking.id === id);
    res.status(200).json(parking);
})

app.listen(8080, () => {console.log('Server listening.')});