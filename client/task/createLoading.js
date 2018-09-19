import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import './style.css';

export default WrappedComponent => {
  return class extends Component {
    static propTypes = {
      className: PropTypes.string,
      loading: PropTypes.bool,
      blur: PropTypes.bool,
      children: PropTypes.node,
    }

    static defaultProps = {
      loading: false,
      blur: true,
    }

    render() {
      console.log("wrapcomponent");
      const { className, loading, blur, children, ...other } = this.props;
      const lucioClass = classNames({
        'lucio-loading': true,
        [className]: !!className
      });

      const contentClass = classNames({
        'lucio-loading-content': true,
        'lucio-loading-blur': loading && blur,
      });

      const loadingClass = classNames({
        'lucio-loading-element': true,
      });
    
      return (
        <div className={lucioClass}>
          {loading && <div className={loadingClass}><WrappedComponent {...other} /></div>}
          <div className={contentClass}>
            {children}
          </div>
        </div>
      );
    }
  };
};