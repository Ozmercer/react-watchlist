import React from 'react';
import CandleStickGraph from './CandleStickGraph';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const mockProps1 = {
  change: -0.3473557692307692,
  close: 543,
  high: 1029,
  low: 399,
  open: 832,
}

const mockProps2 = {
  change: -0.3473557692307692,
  close: 543,
  high: 1029,
  low: 399,
  open: 432,
}

describe('Candle stick test', ()=> {
  it('renders the component correctly', function () {
    const wrapper = mount(<CandleStickGraph candleData={mockProps1} />);
    const container = wrapper.find('.CandleStickGraph-container');
    expect(container.length).toBe(1);
  });

  it('renders the candlestick correctly', function() {
    const wrapper = mount(<CandleStickGraph candleData={mockProps1} />);
    const leftLine = wrapper.find('hr').at(0);
    const realBody = wrapper.find('#rectangle');
    const rightLine = wrapper.find('hr').at(1);
    const priceLabelsContainer = wrapper.find('.CandleStickGraph-container_labels');
    const low = priceLabelsContainer.find('span').at(0).text();
    const high = priceLabelsContainer.find('span').at(1).text();

    expect(leftLine.prop('style')).toHaveProperty('width', 486);
    expect(realBody.length).toBe(1);
    expect(rightLine.prop('style')).toHaveProperty('width', 433);
    expect(priceLabelsContainer.length).toBe(1);
    expect(low).toEqual("399");
    expect(high).toEqual("1029");
  });

  it('displays a red colour if the open price is higher than the close price', function() {
    const wrapper = mount(<CandleStickGraph candleData={mockProps1} />);
    expect(wrapper.find('.down').length).toBe(1);
  });

  it('displays a blue colour if the open price is lower than the close price', function() {
    const wrapper = mount(<CandleStickGraph candleData={mockProps2} />);
    expect(wrapper.find('.up').length).toBe(1);
  });
});
