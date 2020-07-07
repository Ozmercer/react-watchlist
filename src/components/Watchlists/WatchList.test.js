import React from 'react';
import WatchList from './WatchList';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { spyOn } from 'jest';

configure({adapter: new Adapter()});
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('watch list tests', ()=> {
  it('renders the watch list', function() {
    const wrapper = shallow(<WatchList />);
    expect(wrapper.find('.WatchList').length).toBe(1);
    expect(wrapper.find('span').text()).toEqual('WatchList 2020');
  });

  it('renders the searchbar', function() {
    const wrapper = shallow(<WatchList />);
    expect(wrapper.find('.SearchBar').length).toBe(1);
  });

  it('returns filtered markets from user input', function() {
    const wrapper = mount(<WatchList />);
    const market = wrapper.find('.marketItem');
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'US Dollar basket' } });
    expect(market.length).toBe(1);
    expect(market.text()).toEqual('US Dollar basket');
  });

  it('renders the 1 click dealing toggle', function() {
    const wrapper = shallow(<WatchList />);
    expect(wrapper.find('.toggle').length).toBe(1);
  });

  it('renders the settings button', function() {
    const wrapper = shallow(<WatchList />);
    expect(wrapper.find('.settings').length).toBe(1);
  });

  it('shows the settings tab', function() {
    jest.mock('react', () => ({
      ...jest.requireActual('react'),
      useState: jest.fn(),
    }));

    const setState = jest.fn();
    const useStateMock = (initState) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const wrapper = shallow(<WatchList />);
    const buttonDiv = wrapper.find('.settings');
    buttonDiv.props().onClick();
    expect(setState).toHaveBeenCalledTimes(1);
  });
});
