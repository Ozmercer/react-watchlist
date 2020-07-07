import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Toggle from './Toggle';

configure({adapter: new Adapter});

describe('Toggle', () => {
  let wrapper;

  it('should render', function() {
    wrapper = shallow(<Toggle value={true} onChange={jest.fn()}/>);
    expect(wrapper.find('.Toggle').length).toEqual(1);
  });

  it('should show initial state', function() {
    wrapper = shallow(<Toggle value={true} onChange={jest.fn()}/>);
    expect(wrapper.find('input').props().checked).toEqual(true);

    wrapper = shallow(<Toggle value={false} onChange={jest.fn()}/>);
    expect(wrapper.find('input').props().checked).toEqual(false);
  });

  it('should fire onChange prop when changed', function() {
    const changeMock = jest.fn();
    wrapper = shallow(<Toggle value={true} onChange={changeMock}/>);
    wrapper.find('input').simulate('change', {target: {checked: false}});
    expect(changeMock).toHaveBeenCalledWith(false);
  });
});
