import React, { useState } from 'react'

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!content) return;
    try {
      let response = await fetch(`http://posts.com/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          content
        })
      })
      let data = await response.json();
      setContent('')
      console.log(data);
    }
    catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-floating mb-3">
          <input
            value={content}
            placeholder="add comment"
            onChange={e => setContent(e.target.value)}
            className="form-control glass" type="text" />
          <label htmlFor="">New Comment</label>
        </div>
        <button className="btn gradient-custom shadow">Submit</button>
      </form>
    </div>
  )
}
