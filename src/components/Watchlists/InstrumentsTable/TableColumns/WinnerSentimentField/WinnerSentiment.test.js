import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WinnerSentimentField from './WinnerSentimentField';

configure({ adapter: new Adapter });

describe('Winner Sentiment', () => {
  const value = '77';
  let wrapper = mount(<WinnerSentimentField value={value} />);

  it('should show correct value', function() {
    const fieldText = wrapper.find('.text');
    expect(fieldText.text()).toContain(value);
  });

  it('should show correct pie-chart fill', function() {
    const value = 100 - 77;
    const size = 20;
    const strokewidth = 5;
    const halfsize = (size * 0.5);
    const radius = halfsize - (strokewidth * 0.5);
    const circumference = 2 * Math.PI * radius;
    const strokeval = ((value * circumference) / 100);
    const dashval = (strokeval + ' ' + circumference);

    const pieChart = wrapper.find(`.donutchart-indicator`);
    expect(pieChart.props().style.strokeDasharray).toEqual(dashval);
  });
});
