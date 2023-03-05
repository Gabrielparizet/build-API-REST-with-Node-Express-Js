const express = require('express');
const app = express();

const parkings = require('./parkings.json');
const reservations = require('./reservations.json');

// app.get('/parkings', (req, res) => {
//     res.send("Liste des parkings");
// });

// Middleware
app.use(express.json());

// GET/parkings
app.get('/parkings', (req, res) => {
    res.status(200).json(parkings);
});

// GET/parkings/:id
app.get('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const parking  = parkings.find(parking => parking.id === id);
    res.status(200).json(parking);
});

// POST/parkings
app.post('/parkings', (req, res) => {
    parkings.push(req.body);
    res.status(200).json(parkings);
});

// PUT/parkings/:id
app.put('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let parking = parkings.find(parking => parking.id === id);
    parking.name = req.body.name;
    parking.city = req.body.city;
    parking.type = req.body.type;
    res.status(200).json(parkings);
});

// DELETE/parkings
app.delete('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let parking = parkings.find(parking => parking.id === id);
    parkings.splice(parkings.indexOf(parking), 1);
    res.status(200).json(parkings);
});



// Reservations

// GET/parkings/:id/reservations
app.get('/parkings/:id/reservations', (req, res) => {
    const id = parseInt(req.params.id);
    const reservation = reservations.find(reservation => reservation.parkingId === id);
    res.status(200).json(reservation);
});

// GET/parkings/:id/reservations/:idReservations
app.get('/parkings/:id/reservations/:idReservations', (req, res) => {
    const id = parseInt(req.params.id);
    const idReservations = parseInt(req.params.idReservations);
    const reservation = reservations.find(reservation => reservation.parkingId === id && reservation.id === idReservations);
    res.status(200).json(reservation);
});

// POST/parkings/:id/reservations
app.post('/parkings/:id/reservations', (req, res) => {
    const id = parseInt(req.params.id);
    let reservation = reservations.find(reservation => reservation.parkingId === id);
    reservations.push(req.body);
    res.status(200).json(reservation);
});

// PUT/parking/:id/reservations/:idReservation
app.put('/parking/:id/reservations/:idReservation', (req, res) => {
    const id = parseInt(req.params.id);
    const idReservation = parseInt(req.params.idReservation);
    let reservation = reservations.find(reservation => reservation.parkingId === id && reservation.id === idReservation);
    reservation.parking = req.body.parking;
    reservation.city = req.body.city;
    reservation.clientName = req.body.clientName;
    reservation.vehicle = req.body.vehicle;
    reservation.licensePlate = req.body.licensePlate;
    reservation.checkin = req.body.checkin;
    reservation.checkout = req.body.checkout;
    res.status(200).json(reservation);
});


app.listen(8080, () => {console.log('Server listening.')});