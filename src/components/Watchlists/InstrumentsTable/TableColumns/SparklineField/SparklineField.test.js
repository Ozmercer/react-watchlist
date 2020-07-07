import React from 'react';
import SparklineField from './SparklineField';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

configure({adapter: new Adapter()});

const mockProps1 = [
  567,
  488,
];

const mockProps2 = [
  488,
  567,
];

describe('Sparkline test', ()=> {
  it('renders the sparkline component correctly', function() {
    const wrapper = mount(<SparklineField points={mockProps1} />);
    expect(wrapper.find('.SparklineField').length).toBe(1);
  });

  it('renders a sparkline', function () {
    const wrapper = mount(<SparklineField points={mockProps1} />);
    expect(wrapper.find('svg').length).toBe(1);
    const lines = wrapper.find('circle');
    const polyline = wrapper.find('polyline');
    expect(polyline.at(0).props().points).toEqual('2 2 98 18 98 18 2 18 2 2');
    expect(lines.at(0).props().cx).toEqual(2);
    expect(lines.at(0).props().cy).toEqual(2);
    expect(lines.at(1).props().cx).toEqual(98);
    expect(lines.at(1).props().cy).toEqual(18);
  });

  it('renders a red sparkline if the open price is higher than the close price', function() {
    const wrapper = mount(<SparklineField points={mockProps1} />);
    const lines = wrapper.find('circle');
    expect(lines.at(0).prop('style')).toHaveProperty('fill', 'red');
  });

  it('renders a blue sparkline if the open price is lower than the close price', function() {
    const wrapper = mount(<SparklineField points={mockProps2} />);
    const lines = wrapper.find('circle');
    expect(lines.at(0).prop('style')).toHaveProperty('fill', 'blue');
  });
});
