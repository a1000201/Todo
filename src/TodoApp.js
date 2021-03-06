const React = require('react');
const TodoItem = require('./TodoItem');
const Rebase = require('re-base');
const base = Rebase.createClass('https://sizzling-torch-7286.firebaseio.com/');

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      todos: []
    };
  }

  componentDidMount() {
    this.ref = base.syncState(`todos`, {
      context: this,
      state: 'todos',
      asArray: true
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  
  newTodoChange(event) {
    this.setState({ newTodo: event.target.value });
  }

  
  keyDown(event) {
    const inputValue = event.target.value;
    if (event.keyCode == 13 && inputValue !== '') {
      const { todos, newTodo } = this.state;
      const {user} = this.props;
      this.setState({
        newTodo: '',
        todos: todos.concat({ title: newTodo, users: user })
      });
    }
  }

  todoDestory(i) {
    let { todos } = this.state;
    todos.splice(i, 1);
    this.setState({
      todos: todos
    });
  }

  renderTodoItem(item, i) {
    console.log(item.users.picture.data.url);
    return (
      <TodoItem
        src={item.users.name}
        link={item.users.picture.data.url}
        id={item.users.id}
        key={i}
        index={i}
        title={item.title}
        onDestroy={this.todoDestory.bind(this)}
      />
    );
  }
  
  
   
  

  render() {
    const { newTodo, todos } = this.state;
    const { user} = this.props;
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <div className="head"><span>Messeges</span></div>
          </header>
          <section className="main">
            <ul className="todo-list">{todos.map(this.renderTodoItem, this)}</ul>
          </section>  
          <input
              className="new-todo"
              placeholder="Messages"
              autofocus
              value={newTodo}
              onChange={this.newTodoChange.bind(this)}
              onKeyDown={this.keyDown.bind(this)}
            />
        </section>
      </div>
    );
  }
}

module.exports = TodoApp;
