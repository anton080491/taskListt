import React, { FC } from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TodoList from './components/todoList';
import TodoPageItem from './components/pages/todoPageItem';
import AppHeader from './components/appHeader';
import AddTodo from './components/addTodo';
import PopUp from "./components/PopUp/PopUp";

import { Todo } from './components/types/types';

declare var confirm: (question: string) => boolean

const App: FC = () => {

  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, todo: true, doing: false, done: false, name: "To wash a car", description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat." },
    { id: 2, todo: true, doing: false, done: false, name: "Prepare food", description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat." },
    { id: 3, todo: true, doing: false, done: false, name: "Go to the shop ", description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat." }
  ]);

  const [maxId, setMaxId] = useState<number>(4);

  const [showModal, setShowModal] = useState<boolean>(false)

  //Add LocalStorage 

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
    setTodos(saved);
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])


  const AddNewTodo = (name: string, deadLineData: string, deadLineTime: string, description: string) => {
    setMaxId(prev => prev++)
    const newTodo: Todo = { id: maxId, todo: true, doing: false, done: false, name: name };
    if (deadLineData) {
      newTodo.deadLineData = deadLineData;
    }
    if (deadLineTime) {
      newTodo.deadLineTime = deadLineTime;
    }
    if (description) {
      newTodo.description = description;
    }
    setTodos(prev => [newTodo, ...prev]);
    console.log(newTodo);
  }

  const RemoveTodo = (id: number) => {
    const shoudRemove = confirm('Are you sure you want to delete the task?')
    if (shoudRemove) {
      setTodos(prev => prev.filter(todo => todo.id !== id))
    }
  }

  const ChangeTodoStatus = (id: number) => {
    const index = todos.findIndex(elem => elem.id === id);
    const old = todos[index];
    const newItem = { ...old, todo: !old.todo, done: false, doing: false };
    const newArr = [...todos.slice(0, index), newItem, ...todos.slice(index + 1)];
    setTodos(newArr);
  }

  const ChangeDoingStatus = (id: number) => {
    const index = todos.findIndex(elem => elem.id === id);
    const old = todos[index];
    const newItem = { ...old, doing: !old.doing, done: false, todo: false };
    const newArr = [...todos.slice(0, index), newItem, ...todos.slice(index + 1)];
    setTodos(newArr);
  }

  const ChangeDoneStatus = (id: number) => {
    const index = todos.findIndex(elem => elem.id === id);
    const old = todos[index];
    const newItem = { ...old, done: !old.done, todo: false, doing: false };
    const newArr = [...todos.slice(0, index), newItem, ...todos.slice(index + 1)];
    setTodos(newArr);
  }


  return (
    <BrowserRouter>
      <React.Fragment>
        <AppHeader
          allTasks={todos.length}
          Todo={todos.filter((item) => item.todo).length}
          Doing={todos.filter((item) => item.doing).length}
          Done={todos.filter((item) => item.done).length}
        />
        <AddTodo
          addNewTodo={AddNewTodo} />

        <Switch>
          <Route path='/' exact>
            <TodoList
              todos={todos}
              onRemove={RemoveTodo}
              changeTodo={ChangeTodoStatus}
              changeDoing={ChangeDoingStatus}
              changeDone={ChangeDoneStatus}
              changeShowingModal={() => setShowModal(true)}
            />
          </Route>

          <Route path='/:id'
            render={({ match }) => <TodoPageItem
              todo={todos.find(item => item.id === (+match.params.id))}
              changeTodo={ChangeTodoStatus}
              changeDoing={ChangeDoingStatus}
              changeDone={ChangeDoneStatus}
              changeShowingModal={() => setShowModal(true)}
            />} />
        </Switch>
        <PopUp
          todos={todos}
          show={showModal}
          changeShowingModal={() => setShowModal(false)}
        />
      </React.Fragment>
    </BrowserRouter>
  )
}

export default App;


