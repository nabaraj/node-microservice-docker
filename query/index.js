const express = require('express');
var cors = require('cors');
var axios = require('axios');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = {
      id, title, comments: []
    }
    console.log("@@@ postcreated ", posts);
  }
  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
    console.log("@@@ CommentCreated ", posts);
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find(comment => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;

    console.log("@@@ CommentUpdated ", posts);
  }
}

app.get("/posts", (req, res) => {
  res.send(posts);
})

app.post('/events', (req, res) => {
  let { type, data } = req.body;


  res.send({});
})

app.listen(4002, async () => {
  console.log("Listening on 4002");
  try {
    const res = await axios.get("http://event-bus-srv:4005/events");

    for (let event of res.data) {
      console.log("Processing event:", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log("##### error from query" + error.message);
  }
});