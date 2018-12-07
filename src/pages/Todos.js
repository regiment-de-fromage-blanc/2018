import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import '../App.css';
import CreateTodo from '../components/todos/CreateTodo';
import { Row, Grid, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const TodoIcon = category => {
  let icon;
  switch (category) {
    case 'health':
      icon = 'heart';
      break;
    case 'picture':
      icon = 'ad';
      break;
    case 'power':
      icon = 'bolt';
      break;
    case 'weather':
      icon = 'cloud';
      break;
    case 'gps':
      icon = 'globe';
      break;
    default:
      break;
  }

  return icon;
};

const Todo = ({ todo, deleteTodo }) => {
  const { id, subject, content, category, dueDate, state } = todo;
  return (
    <Row key={id} className="Todo">
      <Row className="TodoHeader">
        <Col xs={4} className="TodoCategory">
          <FontAwesome
            className="super-crazy-colors"
            name={TodoIcon(category)}
            size="2x"
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
          />
        </Col>
        <Col xs={8} className="TodoRightHeader">
          <Row className="TodoSubjectNDate">
            <Col xs={6} className="TodoSubject">
              {subject}
            </Col>
            <Col xs={2} className="TodoDate">
              {dueDate}
            </Col>
          </Row>
          <Row className="TodoState">{state}</Row>
        </Col>
      </Row>
      <Row className="Content">
        <Col xs={10}>{content}</Col>
        <Col xs={2}>
          <button onClick={() => deleteTodo(todo)}>
            <FontAwesome
              className="super-crazy-colors"
              name="trash"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </button>
        </Col>
      </Row>
    </Row>
  );
};

const TodosLoaded = props => {
  const { todos } = props;
  return (
    <Grid>
      {todos.map(todo => (
        <Todo {...props} todo={todo} />
      ))}
    </Grid>
  );
};

const Todos = props => {
  const { todos } = props;
  return (
    <div className="container">
      <h4>Todos List</h4>
      <div>{!isLoaded(todos) ? 'Loading' : <TodosLoaded {...props} />}</div>
      <CreateTodo />
    </div>
  );
};

const enhance = compose(
  firestoreConnect([{ collection: 'todos' }]),
  withHandlers({
    deleteTodo: props => todo => {
      props.firestore.delete({ collection: 'todos', doc: todo.id });
    }
  }),
  connect(({ firestore }) => ({
    todos: firestore.ordered.todos
  }))
);

export default enhance(Todos);
