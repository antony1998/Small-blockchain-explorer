/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from '../theme';
import createLoading from '../createLoading';


class Loading extends React.Component {
  render() {
    const { size, color, innerColor } = this.props;

    const blockClass = classNames({
      'block-loading': true,
    });
    console.log("block-Loading");
    return (
      
      <div className={blockClass}>
        <div className="before" /> 
        <div className="after" /> 
      </div>
    )
  }
};

Loading.propTypes = {
  color: PropTypes.array,
};

Loading.defaultProps = {
  color: theme,
};

export default createLoading(Loading);
