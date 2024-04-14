import { Component } from 'react';
import LifeCycleSample from './LifeCycleSample';

// 랜덤 색상을 생성, 클래스 밖으로 뺀 이유?
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
  state = {
    color: '#000000',
  };

  handleClick = () => {
    this.setState({
      color: getRandomColor(), // {getRandomColor} 가능한가?
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <LifeCycleSample color={this.state.color} />
      </div>
    );
  }
}

export default App;
