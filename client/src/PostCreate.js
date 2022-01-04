import React, { useState } from 'react'

export default function PostCreate({ }) {
  const [title, setTitle] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch('http://posts.com/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title
        })
      });
      if (!response) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // let data = await response.json();
      if (response) { setTitle('') }
      console.log(response);
    }
    catch (e) {
      console.log(e);

    }
  }
  return (
    <div className="py-2">
      <form onSubmit={onSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control glass"
            id="titleField"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="add post title"
          />
          <label htmlFor="titleField" className="form-label">Title</label>
        </div>
        <button className="btn gradient-custom shadow">Submit</button>
      </form>
    </div>
  )
}
