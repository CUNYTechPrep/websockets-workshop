import React from 'react';
import { sendMessage, subscribeToMessages } from './socketApi';

function Message({ text }) {
  return (
    <li>{text}</li>
  );
}

class App extends React.Component {
  state = {
    msg: '',
    messageList: [],
  }

  componentDidMount() {
    subscribeToMessages((newMsg) => {
      let newMsgList = [...this.state.messageList, newMsg];
      this.setState({ messageList: newMsgList});
    });
  }

  handleSubmit = (e) => {
    sendMessage(this.state.msg);
    this.setState({ msg: '' });
    e.preventDefault()
  }

  msgChanged = (e) => {
    this.setState({ msg: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} className="form-inline">
          <input type="text" className="form-control" value={this.state.msg} onChange={this.msgChanged} />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <ul>
          {this.state.messageList.map((m, i) => <Message text={m} key={i} />)}
        </ul>
      </div>
    );
  }
}

export default App;
