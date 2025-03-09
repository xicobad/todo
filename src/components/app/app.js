import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './app.css';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Water'),
      this.createTodoItem('Run 1km'),
      this.createTodoItem('Have a lunch'),
      this.createTodoItem('Make awesome app'),
      // { id: "1", label: "Drink Coffee", important: false, done: true },
      // { id: "2", label: "Make awesome app", important: false, done: false },
      // { id: "3", label: "Have a lunch", important: false, done: false },
    ],
    term: '',
    filter: 'all',
  };

  initialTodoData = [...this.state.todoData];

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
      createdAt: new Date(),
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      // [a, b, c, d, e]
      // [a, b,    d, e]
      // [before, after]
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArray = [...before, ...after];

      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    if (text === '') {
      alert('Вы не написали название таски');
    } else {
      this.setState(({ todoData }) => {
        const newArray = [...todoData].concat(newItem);

        return {
          todoData: newArray,
        };
      });
      console.log(`Added ${text}`);
    }
  };

  // toggleDone = (id) => {
  //   this.setState(({ todoData }) => {
  //     const newArray = todoData.map((item) =>
  //       item.id === id ? { ...item, done: !item.done } : item
  //     );
  //     return { todoData: newArray };
  //   });
  // };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => ({
        todoData: this.toggleProperty(todoData, id, 'important'),
      }));
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
        todoData: this.toggleProperty(todoData, id, 'done'),
      }));
  };

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  // toggleAll = () => {
  //   this.setState(({ todoData }) => ({
  //     todoData: this.initialTodoData,
  //   }));
  // };

  // toggleActive = () => {
  //   this.setState(({ todoData }) => {
  //     return {
  //       todoData: todoData.filter((task) => !task.done),
  //     };
  //   });
  // };

  // toggleDone = () => {
  //   this.setState(({ todoData }) => {
  //     return {
  //       todoData: todoData.filter((task) => task.done),
  //     };
  //   });
  // };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
  }

  deleteDoneTasks = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((item) => !item.done),
    }));
  };

  render() {
    const { todoData, term, filter } = this.state;
    const visibileItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done === true).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        {new Date().toString()}
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
            // toggleAll={this.toggleAll}
            // toggleDone={this.toggleDone}
            // toggleActive={this.toggleActive}
          />
        </div>
        <TodoList
          todos={visibileItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm
          // если input пустой, не сохранять task
          onItemAdded={this.addItem}
          deleteDoneTasks={this.deleteDoneTasks}
        />
      </div>
    );
  }
}

App.defaultProps = {
  maxId: 100,
};

// описание свойств компонента
App.propTypes = {
  maxId: PropTypes.number,
  todoData: PropTypes.func.isRequired,
};
