import React, { useState, useRef } from 'react';
import { Header, TodoPanel, TodoList } from './components';
import { Dialog } from './components/Dialog/Dialog';
import styles from './App.module.css';

const DEFAULT_TODO_LIST = [
  { id: 1, name: 'Чтение', description: 'Прочесть 10 страниц: «Книга, которой нет».', checked: false },
  { id: 2, name: 'Тренировка', description: 'Провести пару спаррингов.', checked: false },
  {
    id: 3,
    name: 'Dota 2',
    description:'Поднять 100 MMR.',
    checked: true
  }
];

export const App = () => {
  const [todoIdForEdit, setTodoIdForEdit] = React.useState<number | null>(null);
  // @ts-ignore
  const [todos, setTodos] = React.useState(JSON.parse(localStorage.getItem('todos')) || DEFAULT_TODO_LIST);
  localStorage.setItem('todos', JSON.stringify(todos));
  const [dialog, setDialog] = useState({
    message:"",
    isLoading: false
  });
  const idTodoRef = useRef();

  const selectTodoIdForEdit = (id: Todo['id']) => {
    setTodoIdForEdit(id);
  };
  const handleDialog = (message:any, isLoading:any) =>{
    setDialog({
      message,
      isLoading
    })
  };
  
  const deleteTodo = (id:any) => {
      handleDialog("Вы действительно хотите удалить задачу?", true);
      idTodoRef.current = id;
  };

  const confirmationDelete = (choose:any) => {
      if(choose) {
        setTodos(todos.filter((todo:any) => todo.id !== idTodoRef.current));
        handleDialog("", false);
      }else{
        handleDialog("", false);
      }
  };

  const addTodo = ({ name, description }: Omit<Todo, 'id' | 'checked'>) => {
    setTodos([...todos, { id: todos[todos.length - 1].id + 1, description, name, checked: false }]);
  };

  const checkTodo = (id: Todo['id']) => {
    setTodos(
      todos.map((todo:any) => {
        if (todo.id === id) {
          return  { ...todo, checked: !todo.checked };
        }
        return todo;
      })
    );
  };

  const changeTodo = ({ name, description }: Omit<Todo, 'id' | 'checked'>) => {
    setTodos(
      todos.map((todo:any) => {
        if (todo.id === todoIdForEdit) {
          return { ...todo, name, description };
        }
        return todo;
      })
    );
    setTodoIdForEdit(null);
  };
  
  return (
    <div className={styles.app_container}>
      <div className={styles.container}>
        <Header todoCount={todos.length} />
        <TodoPanel mode='add' addTodo={addTodo} />
        <TodoList
          todoIdForEdit={todoIdForEdit}
          todos={todos}
          deleteTodo={deleteTodo}
          checkTodo={checkTodo}
          selectTodoIdForEdit={selectTodoIdForEdit}
          changeTodo={changeTodo}
        />
      </div>
      { dialog.isLoading && <Dialog onDialog={confirmationDelete} message={dialog.message} />}
    </div>
  );
};
