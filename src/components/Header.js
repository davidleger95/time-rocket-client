import React from 'react';

import logo from '../logo.svg';

const BASE_URL = 'http://localhost:5000/';
const userId = 135;
const query = `{
  user(id: "${userId}"){
    id
    firstName
    lastName
    title
    email
  }
}`;

const createUrl = (query, base = BASE_URL) => `${BASE_URL}?query=${query}`;

const api = (query, cb) => {
  fetch(createUrl(query))
    .then(res => res.json())
    .then(json => { cb && cb(json); });
};

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = ({ target }) => {
    this.setState({
      isFetchingUser: true,
      user: undefined
    });
    setTimeout(() => api(query, json => {
      this.setState({
        isFetchingUser: false,
        ...json.data
      });
    }), 500);

  }

  render() {
    const { isFetchingUser, user } = this.state;

    return (
      <div>
        <header className="Header">
          <img src={logo} className="logo" alt="logo" />
          <h1>GraphQL App</h1>
        </header>
        <button onClick={this.handleClick}>Fetch User</button>
        <pre style={{ textAlign: 'left'}}>
          {isFetchingUser && 'Fetching...'}
          <br />
          {user && JSON.stringify(user, null, 2)}
        </pre>
      </div>
    );
  }
}
