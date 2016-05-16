import React, { Component } from 'react';
import { Link, render } from 'react-router';

export default class NotFound extends Component {

  render() {
    return (
      <div id="not-found">
          <h1>Whoops...</h1>
          <p>Sorry, we could not find the page you requested.
             Were you looking for one of these: </p>

          <Link to={`/`}>Go Home</Link>
      </div>
    );
  }
}


