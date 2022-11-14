/** @format */

import React, { useEffect, useState } from 'react';

export const TodoForm = props => {
  const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
  const [title, setTitle] = useState('');
  const [discription, setDiscription] = useState('');
  const [priority, setPriority] = useState('');
  const [todo, setTodo] = useState([]);
  const [todoId, setTodoId] = useState(Number);

  const postTodoData = async function (title, discription, priority) {
    const url = `${urlEndpoint}/todos/todo-submit`;
    console.log('url :' + url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: discription,
        priority: priority,
      }),
    });
    console.log(response);
    const responseJSON = await response.json();
    console.log(responseJSON);
    return responseJSON;
  };
  return (
    <div className='toDoForm'>
      <>
        <label>Title</label>
        <input
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
          type={'text'}></input>
      </>
      <label>Id</label>
      <label>Discription</label>
      <input
        value={discription}
        style={{ width: 200, height: 200 }}
        onChange={e => {
          setDiscription(e.target.value);
        }}
        type={'text-area'}></input>
      <select
        onChange={e => {
          setPriority(e.target.value);
        }}
        value={priority}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <div>
        <button
          onClick={async () => {
            await postTodoData(title, discription, priority);
          }}>
          Submit Post
        </button>
      </div>
    </div>
  );
};
