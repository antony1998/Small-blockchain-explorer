
import React from 'react';
import { mount } from 'enzyme';
import DoubleLoading from '..';

describe('DoubleLoading', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <DoubleLoading loading>
        <div style={{width: 200}} />
      </DoubleLoading>
    );
    expect(wrapper.find('.double-loading').exists()).toBe(true);
  });

  it('should change loading size', () => {
    const wrapper1 = mount(
      <DoubleLoading loading size="small">
        <div style={{width: 200}} />
      </DoubleLoading>
    );
    expect(wrapper1.find('.double-loading-sm').exists()).toBe(true);

    const wrapper2 = mount(
      <DoubleLoading loading size="large">
        <div style={{width: 200}} />
      </DoubleLoading>
    );
    expect(wrapper2.find('.double-loading-lg').exists()).toBe(true);
  });

  it('should change loading value', () => {
    const wrapper1 = mount(
      <DoubleLoading loading value={['(', ')']}>
        <div style={{width: 200}} />
      </DoubleLoading>
    );
    expect(wrapper1.find('.double-loading').children().at(0).html()).toBe('<span>(</span>');
    expect(wrapper1.find('.double-loading').children().at(1).html()).toBe('<span>)</span>');

    const wrapper2 = mount(
      <DoubleLoading loading value={['(']}>
        <div style={{width: 200}} />
      </DoubleLoading>
    );
    expect(wrapper2.find('.double-loading').children().at(0).html()).toBe('<span>{</span>');
    expect(wrapper2.find('.double-loading').children().at(1).html()).toBe('<span>}</span>');
  });

  it('should change loading color', () => {
    const wrapper = mount(
      <DoubleLoading loading color="red">
        <div style={{width: 200}} />
      </DoubleLoading>
    );
    expect(wrapper.find('.double-loading').prop('style')).toEqual({"color": "red"});
  });
});
  