const express = require('express');
const { randomBytes } = require('crypto');
const axios = require('axios');
var cors = require('cors')
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const posts = {};

app.get('/posts', (req, res) => {
  // console.log('getCall');
  res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  // console.log("req body ", req);
  const { title } = req.body;
  console.log("##### ", title);
  // posts[id] = {
  //   id, title
  // };
  // res.status(201).send(posts[id]);

  posts[id] = {
    id,
    title
  }
  // http://localhost:4000/events
  // try {
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title
    }
  });

  res.status(201).send(posts[id]);
  // } catch (e) {
  // console.log(e);
  // res.sendStatus(500).send(e);
  // }
});

app.post('/events', (req, res) => {

  console.log("##### Received event: " + req.body.type);
  res.send({});
})
app.listen(4000, () => {
  console.log('Updated image');
  console.log('Listening on 4000');
})