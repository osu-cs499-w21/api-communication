import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';

const userId = 1234;

function Post() {
  const [ title, setTitle ] = useState("");
  const [ body, setBody ] = useState("");

  async function sendPost() {
    if (body && title && userId) {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          /*
              JSON.stringify({
                title: title,
                body: body,
                userId: userId
              })
           */
          body: JSON.stringify({ title, body, userId }),
          headers: { 'Content-Type': 'application/json' }
        }
      );
      const responseBody = await response.json();
      console.log("== Response:", responseBody);
    } else {
      alert("Please fill out all the fields!");
    }
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      sendPost();
    }}>
      <div>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}

export default Post;
