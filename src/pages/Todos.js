import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import '../App.css';
import CreateTodo from '../components/todos/CreateTodo';

const enhance = compose(
  firestoreConnect([{ collection: 'todos' }]),
  connect(({ firestore }) => ({
    todos: firestore.ordered.todos
  }))
);

const Todos = ({ firestore, todos }) => (
  <div className="App">
    <div className="App-todos">
      <h4>Todos List Ta mère</h4>
      <div>
        {!isLoaded(todos)
          ? 'Loading'
          : isEmpty(todos)
          ? 'Todo list is empty'
          : todos.map(todo => <div>{todo.subject}</div>)}
      </div>
      <CreateTodo />
    </div>
  </div>
);

export default enhance(Todos);
