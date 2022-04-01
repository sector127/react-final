import { useReducer } from 'react';
import { AddTask } from './AddTask';
import { TaskList } from './TaskList';

const ACTION_TASK_CREATED = 'ACTION_TASK_CREATED';
const ACTION_TASK_UPDATED = 'ACTION_TASK_UPDATED';
const ACTION_TASK_REMOVED = 'ACTION_TASK_REMOVED';

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TASK_REMOVED:
      return state.filter((t) => t.id !== action.payload.taskId);

    case ACTION_TASK_CREATED:
      return [...state, action.payload.task];

    case ACTION_TASK_UPDATED:
      return state;

    default:
      throw Error('Unknown action:', action.type);
  }
}

const initialState = [
  { id: 0, text: 'My plan 1', done: false },
  { id: 1, text: 'My plan 2', done: true },
];

export const Task = () => {
  const [tasks, dispatch] = useReducer(reducer, initialState);

  const onTaskRemove = (taskId) => {
    console.log('__TASK_ID__', taskId);
    dispatch({
      type: ACTION_TASK_REMOVED,
      payload: {
        taskId,
      },
    });
  };
  const onTaskUpdate = (updatedTask) => {
    dispatch({
      type: ACTION_TASK_UPDATED,
      payload: {
        task: updatedTask,
      },
    });
  };

  const onTaskCreate = (newTask) => {
    dispatch({
      type: ACTION_TASK_CREATED,
      payload: {
        task: {
          ...newTask,
          id: tasks.length,
        },
      },
    });
  };

  return (
    <div className="row">
      <h2>My Plans</h2>
      <h4>Task Manager</h4>
      <hr />
      <AddTask onTaskCreate={onTaskCreate} />
      <TaskList tasks={tasks} onTaskRemove={onTaskRemove} onTaskUpdate={onTaskUpdate} />
    </div>
  );
};
