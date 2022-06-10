import React, {useState} from 'react';
import {Todo} from './todo.model';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
const App: React.FC = () => {
  const [todos,setTodos] = useState<Todo[]>([])
  const todoAddHandler = (text: string) => {
    console.log("text",text);
    setTodos(prevTodos =>[...prevTodos,{id:Math.random().toString(),text:text}]);
  };
  const todoDeleteHandler = (todoId: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  };
  return (
    <div className="App">
      {/* A component that adds todos */}
      <NewTodo onAddTodo={todoAddHandler}/>
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
};

export default App;
