import React, { Component } from "react";
import "./item-status-filter.css";

export default class ItemStatusFilter extends Component {
  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Done" },
  ];

  render() {
    // const { toggleAll, toggleActive, toggleDone } = this.props;

    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clasz = isActive ? "btn-info" : "btn-outline-secondary";
      return (
        <button
          type="button"
          className={`btn ${clasz}`}
          key={name}
          onClick={() => onFilterChange(name)}
        >
          {label}
        </button>
      );
    });
    return (
      <div className="btn-group">{buttons}</div>

      // <div className="btn-group">
      //   <button type="button" className="btn btn-info" onClick={toggleAll}>
      //     All
      //   </button>
      //   <button
      //     type="button"
      //     className="btn btn-outline-secondary"
      //     onClick={toggleActive}
      //   >
      //     Active
      //   </button>
      //   <button
      //     type="button"
      //     className="btn btn-outline-secondary"
      //     onClick={toggleDone}
      //   >
      //     Done
      //   </button>
      // </div>
    );
  }
}



// const ItemStatusFilter = () => {
//   return (
//     <div className="btn-group">
//       <button type="button" className="btn btn-info">
//         All
//       </button>
//       <button type="button" className="btn btn-outline-secondary">
//         Activer
//       </button>
//       <button type="button" className="btn btn-outline-secondary">
//         Done
//       </button>
//     </div>
//   );
// };

// export default ItemStatusFilter;
