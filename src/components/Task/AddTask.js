import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Form } from '../../atoms';

export const AddTask = ({ onTaskCreate }) => {
  const [text, setText] = useState('');
  return (
    <div className="row add-task">
      <Form
        className="form row"
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="mb-3 col-md-4">
          <input
            className="form-control"
            placeholder="Add task"
            value={text}
            onChange={({ target }) => {
              setText(target.value);
            }}
          />
        </div>
        <div className="mb-3 col-md-4">
          <Button
            className="btn btn-outline-primary"
            onClick={() => {
              setText('');
              onTaskCreate({
                done: false,
                text,
              });
            }}
          >
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
};

AddTask.propTypes = {
  onTaskCreate: PropTypes.func.isRequired,
};
