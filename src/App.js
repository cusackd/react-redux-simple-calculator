import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCalculation, clearCalculation } from './actions';

class CalculatorComponent extends Component {

  componentDidMount() {
    // Force scroll on the display
    // I do this on mount in case reducer is already populated
    this._forceScrollOnDisplay();
  }
  
  componentDidUpdate() {
    // Force scroll on the display
    // this function gets called on component update
    this._forceScrollOnDisplay();
  }

  _replaceChars(value) {
    value = value.join("");
    value = value.replace(/\//g, '<span class="operatorStyle">÷</span>');
    value = value.replace(/\*/g, '<span class="operatorStyle">×</span>');
    value = value.replace(/\+/g, '<span class="operatorStyle">+</span>');
    value = value.replace(/-/g, '<span class="operatorStyle">-</span>');
    return value;
  }

  _forceScrollOnDisplay() {
    // Force scroll on div, put a value in here
    // instead of calculating the offset
    // This keeps the latest numbers in display
    this.refs.calculationDisplay.scrollLeft = 10000;
    this.refs.resultDisplay.scrollLeft = 10000;
  }

  _buttonAddValue(value, htmlCode, additionalClass) {
    // Create the button for the operator and integers
    // Reduce the amount of repition on the render function
    return (
      <button
        className={`calc-input ${additionalClass}`} 
        onClick={() => this.props.updateCalculation(value, this.props.calculation, this.props.result)}>
        {htmlCode ? String.fromCharCode(htmlCode) : value}
      </button>
    );
  }

  render() {
    return (
        <div className='calculator'>
          <div className='calculator-results'>
            <div ref='calculationDisplay' className='calculationDisplay' dangerouslySetInnerHTML={{ __html: this.props.calculation.length ? this._replaceChars(this.props.calculation) : 0 }} />
            <div ref='resultDisplay' className='resultDisplay'>{this.props.result}</div>
          </div>
          
          <button className='clear' onClick={() => this.props.clearCalculation()}>Clear</button>
          <div className='calculator-inputs-row'>
            {this._buttonAddValue(7)}          
            {this._buttonAddValue(8)}
            {this._buttonAddValue(9)}
            {this._buttonAddValue('/', 47, 'operator')}
          </div>
          
          <div className='calculator-inputs-row'>
            {this._buttonAddValue(4)}          
            {this._buttonAddValue(5)}
            {this._buttonAddValue(6)}
            {this._buttonAddValue('*', 215, 'operator')}
          </div>
          <div className='calculator-inputs-row'>
            {this._buttonAddValue(1)}          
            {this._buttonAddValue(2)}
            {this._buttonAddValue(3)}
            {this._buttonAddValue('-', 8722, 'operator')}
          </div>
          <div className='calculator-inputs-row'>
            {this._buttonAddValue(0, null, 'zero')}
            {this._buttonAddValue('+', 43, 'operator')}
          </div>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCalculation: (inputValue, currentState, currentResult) => dispatch(updateCalculation(inputValue, currentState, currentResult)),
  clearCalculation: () => dispatch(clearCalculation())
});

const mapStateToProps = (state) => ({
  calculation: state.calculation,
  result: state.result
});

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorComponent);
