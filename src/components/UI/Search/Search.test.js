import React from 'react';
import Search from './Search';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

configure({adapter: new Adapter()});

it('renders the search component correctly', function() {
  const wrapper = mount(<Search />);
  const input = wrapper.find('input');
  expect(input.length).toBe(1);
  expect(input.props().placeholder).toEqual('Find...');
});

it('captures the users input and sends it back to the WatchList', function() {
  const callbackMock = jest.fn();
  const wrapper = mount(<Search searchMarkets={callbackMock} />);
  wrapper.find('input').simulate('change', {target: { value: 'GBP/USD' } });
  expect(callbackMock).toHaveBeenCalledWith('GBP/USD');
});
