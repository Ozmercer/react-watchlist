import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuickTradeField from './QuickTradeField';
import { useSelector } from 'react-redux';

configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Quick Trade Field', () => {
  let wrapper;
  beforeEach(() => {
    useSelector.mockImplementation(callback => {
      return callback({watchlist: {is1Click: true}})
    });
    wrapper = mount(<QuickTradeField instrument={instrument} />);
  });

  afterEach(() => {
    useSelector.mockClear();
    wrapper = null;
  });

  const instrument = {
    bid: '88725.0',
    ask: '86275.0',
  };

  it('should show correct prices', function() {
    wrapper = mount(<QuickTradeField instrument={instrument}/>);
    expect(wrapper.find('.sell').text()).toEqual(instrument.ask);
    expect(wrapper.find('.buy').text()).toEqual(instrument.bid);
  });

  it('should hide size field change view of buy/sell when 1click is off', function() {
    useSelector.mockImplementation( callback => {
      return callback({watchlist: {is1Click: false}})
    });
    wrapper = mount(<QuickTradeField instrument={instrument} />);
    expect(wrapper.find('input.size')).toHaveLength(0);
    expect(wrapper.find('.buttons.view')).toHaveLength(1);
  });

  it('should disable buy/sell btns when input is 0', function() {
    expect(wrapper.find('.sell').props().disabled).toEqual(true);
    expect(wrapper.find('.buy').props().disabled).toEqual(true);

    wrapper.find('input').simulate('change', {target: {value: 1}});

    expect(wrapper.find('.sell').props().disabled).toEqual(false);
    expect(wrapper.find('.buy').props().disabled).toEqual(false);
  });

  it('should transform price view correctly', function() {
    const price = instrument.ask;
    const head = price.slice(0, price.length - 4);
    const bold = price.slice(price.length - 4, price.length - 2);
    const tail = price.slice(price.length - 2);

    expect(wrapper.find('.sell span *').at(0).text()).toEqual(head);
    expect(wrapper.find('.sell span *').at(1).text()).toEqual(bold);
    expect(wrapper.find('.sell span *').at(2).text()).toEqual(tail);
  });

  it('should show popup after clicking button', function() {
    const size = 1.5;
    expect(wrapper.find('.popup').length).toEqual(0);

    wrapper.find('input').simulate('change', {target: {value: size}});
    wrapper.find('.sell').simulate('click');

    const popup = wrapper.find('.popup');
    expect(popup.length).toEqual(1);
    expect(popup.text()).toEqual(`Sell ${size} @ ${instrument.ask}`);

  });
});
