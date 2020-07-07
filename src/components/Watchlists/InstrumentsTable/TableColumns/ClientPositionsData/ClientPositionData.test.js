import React from 'react';
import ClientPositionData from './ClientPositionData';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

configure({adapter: new Adapter()});

const mockPositionDataProps1 = [
  5, //number of positions
  300, //P/L
];

const mockPositionDataProps2 = [
  5, //number of positions
  -300, //P/L
];

const mockPositionDataProps3 = [
  0, //number of positions
  -300, //P/L
];

it('renders the component correctly', function() {
  const wrapper = mount(<ClientPositionData positionsData={mockPositionDataProps1} />);
  expect(wrapper.find('.ClientPostionDataContainer').length).toBe(1);
});

it('renders user position data correctly', function() {
  const wrapper = mount(<ClientPositionData positionsData={mockPositionDataProps1} />);
  expect(wrapper.find('.numberOfPositionsIndicator').text()).toEqual('+5');
});

it('renders a positive P/L value correctly', function() {
  const wrapper = shallow(<ClientPositionData positionsData={mockPositionDataProps1} />);
  const span = wrapper.find('span');
  expect(span.at(1).hasClass('profit')).toEqual(true);
  expect(span.at(1).hasClass('loss')).toEqual(false);
  expect(span.at(1).text()).toEqual('+£300');
});

it('renders a negative P/L value correctly', function() {
  const wrapper = shallow(<ClientPositionData positionsData={mockPositionDataProps2} />);
  const span = wrapper.find('span');
  expect(span.at(1).hasClass('loss')).toEqual(true);
  expect(span.at(1).hasClass('profit')).toEqual(false);
  expect(span.at(1).text()).toEqual('-£300');
});

it('displays a no positions message if the client has no positions in a current market', function() {
  const wrapper = mount(<ClientPositionData positionsData={mockPositionDataProps3} />);
  const span = wrapper.find('span');
  expect(wrapper.find('.noPositions').length).toBe(1);
  expect(span.text()).toEqual('No positions');
});
