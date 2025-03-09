import React, { Component } from "react";

import "./item-add-form.css";

export default class ItemAddForm extends Component {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: "",
    });
  };

  render() {
    const { deleteDoneTasks } = this.props;
    return (
      <div>
        <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
          <input
            className="form-control"
            type="text"
            onChange={this.onLabelChange}
            placeholder="What need to be done"
            value={this.state.label}
          />

          <button
            className="btn btn-outline-secondary"
            // onClick={() => this.props.onItemAdded("Im new task")}
          >
            Add Item
          </button>
        </form>

        <button
          className="btn btn-outline-secondary"
          onClick={() => deleteDoneTasks()}
        >
          Delete done tasks
        </button>
      </div>
    );
  }
}

