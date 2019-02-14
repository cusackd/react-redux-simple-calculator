import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCalculation } from '../actions';

class CalcButtonComponent extends Component {
  render() {
    return (
      <button
        className={`calc-input ${this.props.additionalClass}`} 
        onClick={() => this.props.updateCalculation(this.props.value, this.props.calculation, this.props.result)}>
        {this.props.htmlCode ? String.fromCharCode(this.props.htmlCode) : this.props.value}
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCalculation: (inputValue, currentState, currentResult) => dispatch(updateCalculation(inputValue, currentState, currentResult))
});

const mapStateToProps = (state) => ({
  calculation: state.calculation,
  result: state.result
});

export default connect(mapStateToProps, mapDispatchToProps)(CalcButtonComponent);