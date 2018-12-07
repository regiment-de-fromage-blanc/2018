import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStateHandlers, withHandlers } from 'recompose';
import { withFirestore } from 'react-redux-firebase';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

const TODO = 'todo';
const DOING = 'doing';
const DONE = 'done';

const enhance = compose(
  withFirestore, // firestoreConnect() can also be used
  withStateHandlers(
    ({}) => ({
      subject: '',
      content: '',
      status: TODO,
      category: '',
      dueDate: ''
    }),
    {
      onSubjectChange: ({ subject }) => e => ({ subject: e.target.value }),
      onContentChange: ({ content }) => e => ({ content: e.target.value }),
      onCategoryChange: ({ category }) => e => ({ category: e.target.value }),
      onDueDateChange: ({ dueDate }) => e => ({ dueDate: e.target.value }),
      resetInput: ({ subject }) => e => ({ subject: e.target.value })
    }
  ),
  withHandlers({
    addTodo: props => () => {
      props.firestore.add('todos', {
        subject: props.subject,
        content: props.content || '',
        status: props.status || TODO,
        category: props.category || '',
        dueDate: props.dueDate
      });
      return false;
    }
  })
);

const NewTodo = ({
  todos,
  addTodo,
  subject,
  content,
  status,
  category,
  dueDate,
  onSubjectChange,
  onContentChange,
  onCategoryChange,
  onDueDateChange,
  resetInput
}) => (
  <form>
    <FormGroup controlId="subject">
      <ControlLabel>Sujet</ControlLabel>
      <FormControl
        type="text"
        value={subject}
        placeholder="Faire la vaiselle..."
        onChange={onSubjectChange}
      />
      <FormControl.Feedback />
    </FormGroup>
    <FormGroup>
      <ControlLabel>Contenu</ControlLabel>
      <FormControl
        type="text"
        value={content}
        placeholder="Faire la vaiselle..."
        onChange={onContentChange}
      />
      <FormControl.Feedback />
    </FormGroup>
    <FormGroup>
      <ControlLabel>Catégorie</ControlLabel>
      <FormControl
        componentClass="select"
        type="select"
        placeholder="select"
        onChange={onCategoryChange}
      >
        <option value="health">Santé</option>
        <option value="picture">Photo</option>
        <option value="power">Énergie</option>
        <option value="weather">Météo</option>
        <option value="gps">GPS</option>
      </FormControl>
      <FormControl.Feedback />
    </FormGroup>
    <FormGroup>
      <ControlLabel>Date Limite</ControlLabel>
      <FormControl
        type="date"
        value={dueDate}
        placeholder="12-07-2018"
        onChange={onDueDateChange}
      />
      <FormControl.Feedback />
    </FormGroup>

    <Button onClick={addTodo}>Submit</Button>
  </form>
);

export default enhance(NewTodo);
