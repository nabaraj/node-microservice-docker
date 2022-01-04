const express = require('express');
const axios = require('axios');
var cors = require('cors');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const events = [];
app.post('/events', async (req, res) => {
  const event = req.body;

  console.log("########## ", event)
  // axios.post('http://localhost:4000/events', event);
  // axios.post('http://localhost:4001/events', event);
  // axios.post('http://localhost:4002/events', event);
  events.push(event);
  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });

  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });

  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });

  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });
  // res.send({ status: "OK" });

  res.send({ status: 'OK' });
})

app.get('/events', (req, res) => {
  res.send(events);
})

app.listen(4005, () => {
  console.log('listening on 4005');
});