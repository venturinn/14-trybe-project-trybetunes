import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <p>Essa página não existe!!!</p>
        <img className="img-not-found" src="https://st2.depositphotos.com/4196725/8330/i/600/depositphotos_83301038-stock-photo-angry-young-man-crazy-pose.jpg" alt="Essa página não existe!" />
      </div>
    );
  }
}

export default NotFound;
