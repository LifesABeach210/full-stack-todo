/** @format */
import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { ToDoCard } from './components/ToDoCard';
import { GlobalLayout } from './layout/GlobalLayout';
import { HomePage } from './pages/HomePage';
import { TodoForm } from './pages/TodoForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NavBar } from './components/NavBar';

function App(props) {
  const { idOfProp } = props;
  const [todos, setTodos] = useState([]);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [filterField, setFilterField] = useState('title');
  const [filterValue, setFilterValue] = useState('');
  const [adminBlogsLoading, setAdminBlogsLoading] = useState(false);
  const [singleTodo, setSingleTodo] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [shouldBeFetched, setFetch] = useState(false);

  const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
  useEffect(() => {
    const fetchData = async () => {
      const url = `${urlEndpoint}/todos/all-todos`;

      const apiResponse = await fetch(url);
      const apiJSON = await apiResponse.json();
      setTodos(apiJSON.message);
      console.log(todos);

      return;
    };
    fetchData();
  }, [shouldBeFetched, setFetch]);
  console.log(todos, shouldBeFetched);

  useEffect(() => {
    const setProps = async () => {
      const response = await { todos };

      console.log(response, 'await response UE');
      return;
    };
    setProps();
  }, [todos]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <GlobalLayout NavBar={NavBar} />,
      children: [
        {
          index: true,
          element: (
            <HomePage
              urlEndPoint={urlEndpoint}
              setFetch={setFetch}
              todos={todos}
            />
          ),
        },
        {
          path: '/todo-form',
          element: (
            <TodoForm
              adminBlogsLoading={adminBlogsLoading}
              setAdminBlogsLoading={setAdminBlogsLoading}
              urlEndPoint={urlEndpoint}
            />
          ),
        },
      ],
    },
  ]);
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
