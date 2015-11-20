const React = require('react');


class TodoItem extends React.Component {
  render() {
    const { index, title, onDestroy, src, link, id } = this.props;
    console.log(id);
    return (
      <li>
        <div>
          <img src={link}/>
          <label>{src}: {title}</label>
          <button className="myButton" onClick={(event) => onDestroy(index)}>X</button>
        </div>
      </li>
    );
  }
}



module.exports = TodoItem;
