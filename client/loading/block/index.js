/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from '../theme';
import createLoading from '../createLoading';
// import './style.less';

class Loading extends React.Component {
  render() {
    const { size, color, innerColor } = this.props;

    const blockClass = classNames({
      'block-loading': true,
    });

    return (
        <div className={blockClass} style = {{top: "50%", marginTop : "50px"}}>
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
