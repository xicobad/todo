import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

function TodoList({
 todos, onDeleted, onToggleImportant, onToggleDone,
}) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li className="list-group-item " key={id}>
        <TodoListItem
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return <ul className="list-group todo-list">{elements}</ul>;
}

export default TodoList;
