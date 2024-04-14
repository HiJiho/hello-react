import { Component } from 'react';

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  };

  myRef = null; // ref를 설정할 부분

  //! 마운트 시 호출되는 메서드들 시작 ==============================
  // 컴포넌트 생성자 메서드
  constructor(props) {
    super(props);
    console.log('constructor');
  }

  // props로 받아 온 값을 state에 동기화시키는 용도로 사용, 컴포넌트가 마운트될 때와 업데이트될 때 호출됨
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps');
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  // render() 호출

  // 컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행
  componentDidMount() {
    console.log('componentDidMount');
  }
  //! 마운트 시 호출되는 메서드들 끝 ==============================

  //! 언마운트 시 호출되는 메서드 시작 ==============================
  // 컴포넌트를 DOM에서 제거할 때 실행
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  //! 언마운트 시 호출되는 메서드 끝 ==============================

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  //! 업데이트 시 호출되는 메서드들 시작 ==============================
  // getDerivedStateFromProps 호출

  // props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정
  // true면 render 호출, false면 업데이트 과정 중지
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    // 숫자의 마지막 자리가 4면 리렌더링하지 않음
    return nextState.number % 10 !== 4;
  }

  // render 호출

  // render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출
  // 주로 업데이트하기 직전의 값을 참고할 일이 있을 때 활용됨
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  // 리렌더링을 완료한 후 실행(업데이트가 끝난 직후)
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState);
    if (snapshot) {
      console.log('업데이트되기 직전 색상: ', snapshot);
    }
  }
  //! 업데이트 시 호출되는 메서드들 끝 ==============================

  render() {
    console.log('render');

    const style = {
      color: this.props.color,
    };

    return (
      <div>
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSample;
