/** @format */

import React from 'react';
import { ToDoCard } from '../components/ToDoCard';
export const HomePage = props => {
  const { todos, idOfProps, setFetch, urlEndPoint } = props;
  return (
    <div>
      {todos.map(post => {
        return (
          <div>
            <ToDoCard
              urlEndPoint={urlEndPoint}
              setFetch={props.setFetch}
              post={post}
            />
          </div>
        );
      })}
    </div>
  );
};
