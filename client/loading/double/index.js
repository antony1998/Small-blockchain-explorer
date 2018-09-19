import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from '../theme';
import createLoading from '../createLoading';
// import './style.less';
const defaultValue = ["{", "}"];

class Loading extends React.Component {
  render() {
    let { value, size, color } = this.props;
    
    const doubleClass = classNames({
      'double-loading': true,
      'double-loading-sm': size === 'small',
      'double-loading-lg': size === 'large',
    });

    if (value.length < 2) {
      value = defaultValue;
    }

    return (
      <div className={doubleClass} style={{color}}>
        <span>{value[0]}</span>
        <span>{value[1]}</span>
      </div>
    );
  }
};

Loading.propTypes = {
  value: PropTypes.array,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  color: 'blue'
  // color: PropTypes.string
};

Loading.defaultProps = {
  value: ["{", "}"],
  size: 'default',
  color: theme[0]
};

export default createLoading(Loading);
