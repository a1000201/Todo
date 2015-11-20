const React = require('react');
const { render } = require('react-dom');
const TodoApp = require('./TodoApp');
require('./todo.css');

function renderReact(user){
  render(<TodoApp user={user} />, document.getElementById('root'));
}

window.renderReact = renderReact;
