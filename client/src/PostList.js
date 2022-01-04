import React, { useState, useEffect } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default function PostList({ title }) {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const res = await fetch('http://posts.com/posts');
      const postData = await res.json()
      console.log(postData);
      setPosts(postData);
    }
    catch (e) {
      console.log(e);
    }
  }
  useEffect(function () {
    fetchPosts()
  }, []);

  const renderPosts = Object.values(posts).map(item => (
    <div
      className="card glass"
      style={{ width: '30%', marginBottom: '20px' }}
      key={item.id}
    >
      <div className="card-body">
        <h3>{item.title}</h3>
        <CommentList comments={item.comments} />
        <CommentCreate postId={item.id} />
      </div>
    </div>
  ))

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPosts}
    </div>
  )
}
