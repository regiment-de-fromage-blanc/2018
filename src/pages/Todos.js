import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import '../App.css';
import CreateTodo from '../components/todos/CreateTodo';
import { Row, Grid, Col } from 'react-bootstrap';

const Todos = ({ firestore, todos }) => (
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
                      {todo.category}
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
                  <Row className="Content">{todo.content}</Row>
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
  connect(({ firestore }) => ({
    todos: firestore.ordered.todos
  }))
);

export default enhance(Todos);
