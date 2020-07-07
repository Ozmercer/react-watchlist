import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RsiField from './RSIField';

configure({adapter: new Adapter()});

describe('RSI Field', () => {
  it('should show RSI value', function() {
    const wrapper = mount(<RsiField rsi="value"/>);
    const field = wrapper.find('.RSIField');
    expect(field.text()).toEqual('value');
  });
});
