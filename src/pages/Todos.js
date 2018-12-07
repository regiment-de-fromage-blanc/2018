import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
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

const Todos = ({ firestore, todos, deleteTodo }) => (
  <div className="App">
    <div className="App-todos">
      <h4>Todos List</h4>
      <div>
        {!isLoaded(todos)
          ? 'Loading'
          : isEmpty(todos)
          ? 'Todo list is empty'
          : todos.map(todo => (
              <Grid key={todo.id}>
                <Row className="Todo">
                  <Row className="TodoHeader">
                    <Col xs={4} className="TodoCategory">
                      <FontAwesome
                        className="super-crazy-colors"
                        name={TodoIcon(todo.category)}
                        size="2x"
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                      />
                      {console.log(todo)}
                    </Col>
                    <Col xs={8} className="TodoRightHeader">
                      <Row className="TodoSubjectNDate">
                        <Col xs={6} className="TodoSubject">
                          {todo.subject}
                        </Col>
                        <Col xs={2} className="TodoDate">
                          {todo.dueDate
                            ? new Date(
                                todo.dueDate.seconds
                              ).toLocaleDateString()
                            : null}
                        </Col>
                      </Row>
                      <Row className="TodoState">{todo.state}</Row>
                    </Col>
                  </Row>
                  <Row className="Content">
                    <Col xs={10}>{todo.content}</Col>
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
              </Grid>
            ))}
      </div>
      <CreateTodo />
    </div>
  </div>
);

const enhance = compose(
  firestoreConnect([{ collection: 'todos' }]),
  withHandlers({
    deleteTodo: props => todo => {
      props.firestore
        .delete({ collection: 'todos', doc: todo.id })
        .then(data => {
          console.log(data);
        });
    }
  }),
  connect(({ firestore }) => ({
    todos: firestore.ordered.todos
  }))
);

export default enhance(Todos);
