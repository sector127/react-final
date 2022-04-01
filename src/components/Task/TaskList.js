import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from '../../atoms';
import { AddTask } from './AddTask';

export const TaskList = ({ tasks, onTaskRemove, onTaskUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [text, setText] = useState('');
  return (
    <div className="row">
      <ul className="list-group p-2">
        {tasks.map((task) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={task.id}
            >
              <div className="col-4 d-flex align-items-center">
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={({ target }) => {
                    onTaskUpdate({
                      ...task,
                      done: target.checked,
                    });
                  }}
                />
                <span className="col-12 ms-2">
                  {!isEditing ? (
                    task.text
                  ) : (
                    <input
                      className="form-control"
                      placeholder="Update Task"
                      value={text}
                      onChange={({ target }) => {
                        setText(target.value);
                      }}
                    />
                  )}
                </span>
              </div>
              <div className="btn-group">
                <Button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    onTaskUpdate({
                      ...task,
                      text,
                      done: false,
                    });
                    console.log(task);
                    setText('');
                    setIsEditing(!isEditing);
                  }}
                >
                  {isEditing ? 'Update' : 'Edit'}
                </Button>
                <Button className="btn btn-outline-danger" onClick={() => onTaskRemove(task.id)}>
                  Remove
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
  onTaskRemove: PropTypes.func.isRequired,
};
