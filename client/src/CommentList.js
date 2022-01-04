import React, { useState, useEffect } from 'react';

const CommentList = ({ comments = [] }) => {
  // const [comments, setComment] = useState([]);
  // const getCommentLists = async () => {
  //   try {
  //     let response = await fetch(`http://localhost:4001/posts/${postId}/comments`);
  //     let data = await response.json();
  //     setComment(data);
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  // }

  // useEffect(() => {
  //   getCommentLists();
  // }, []);

  const renderedComments = comments.map(comment => {
    let content;

    if (comment.status === 'approved') {
      content = comment.content;
    }

    if (comment.status === 'pending') {
      content = 'This comment is waiting for moderation';
    }

    if (comment.status === 'rejected') {
      content = "This comment is being rejected.";
    }
    return <li key={comment.id}>{content}</li>
  });

  return (<ul>{renderedComments}</ul>)
}

export default CommentList;
