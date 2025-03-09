import React, { Component } from "react";
import "./todo-list-item.css";

export default class TodoListItem extends Component {
  static defaultProps = {
    label: "Task",
    createdAt: new Date(),
  };
  //2 метод
  // constructor() {
  //   super();
  //   this.onLabelClick = () => {
  //     console.log(`Done: ${this.props.label}`);
  //   };
  // }

  //? 3 метод

  onLabelClick = () => {
    this.setState(({ done }) => {
      return {
        done: !done,
      };
    });
    console.log(`Done: ${this.props.label}`);
  };

  onMarkImportant = () => {
    this.setState(({ important }) => {
      return {
        important: !important,
      };
    });

    //--- test ---
    if (this.state.important === false) {
      this.setState({
        done: false,
      });
    }
  };

  render() {
    const {
      label,
      onDeleted,
      onToggleImportant,
      onToggleDone,
      done,
      important,
      createdAt,
    } = this.props;

    let classNames = "todo-list-item";
    if (done) {
      classNames += " done";
    }

    if (important) {
      classNames += " important";
    }

    return (
      <span className={classNames}>
        <span
          className="todo-list-item-label"
          onClick={onToggleDone} //this.onLabelClick.bind(this) и убрать конструктор
        >
          {label}
        </span>
        <button
          type="button"
          className="btn btn-outline-success btn-sm float-end"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation" />
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-end"
          onClick={onDeleted}
        >
          <i className="fa fa-trash-o" />
        </button>
        <br />
        <span className="todo-list-item-time">
          Time created: {createdAt.toLocaleTimeString()}
        </span>
      </span>
    );
  }
}

//props.label
// const TodoListItemFunc = ({ label, important = false }) => {
//   const spanStyle = {
//     color: important ? "tomato" : "black",
//     fontWeight: important ? "bold" : "",
//   };

//   return (
//     <span className="todo-list-item">
//       <span className="todo-list-item-label" style={spanStyle}>
//         {label}
//       </span>

//       <button
//         type="button"
//         className="btn btn-outline-success btn-sm float-end"
//       >
//         <i className="fa fa-exclamation" />
//       </button>

//       <button type="button" className="btn btn-outline-danger btn-sm float-end">
//         <i className="fa fa-trash-o" />
//       </button>
//     </span>
//   );
// };
