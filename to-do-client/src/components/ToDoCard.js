/** @format */

import React from 'react';
import { useState } from 'react';

export const ToDoCard = props => {
  const {
    post,
    adminBlogsLoading,
    setAdminBlogsLoading,
    setFetch,
    urlEndPoint,
  } = props;

  const [idOfProp, setIdOfProps] = useState(post.id);
  console.log(idOfProp);
  const handleSetTodoComplete = async userData => {
    const url = `${urlEndPoint}/todos/todo-update`;
    setFetch(true);
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        isComplete: post.isComplete,
        idOfProp,
      }),
    });
    setFetch(false);
  };
  const handleSetTodoDelete = async userData => {
    const url = `${urlEndPoint}/todos/todo-delete`;
    setFetch(false);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        isComplete: post.isComplete,
        idOfProp,
      }),
    });
    setFetch(true);
  };
  console.log(post, 'IsComplete');
  return (
    <div
      id='todocard'
      key={post._Id}>
      ToDoCard
      <h2>{post.title}</h2>
      <p>{'ID:' + ' ' + post.id}</p>
      <p>{'Description:' + ' ' + post.description}</p>
      <p>{'Priority:' + ' ' + post.priority}</p>
      <p>isComplete: {post.isComplete ? 'Complete' : 'Incomplete'}</p>
      <p>{post.creationDate}</p>
      <p>{post.lastModified}</p>
      <p>{post.completedDate}</p>
      <div>
        <button
          onClick={() => {
            handleSetTodoDelete(idOfProp);
          }}>
          Post to delete
        </button>
        <button
          onClick={async () => {
            await setIdOfProps(post.id);
            await handleSetTodoComplete(post.id);
          }}>
          post to edit to complete
        </button>
      </div>
    </div>
  );
};
