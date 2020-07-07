import React from 'react';
import TableHeaders from './TableHeaders';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { useSelector } from 'react-redux';

configure({adapter: new Adapter()});

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

const columnTitles1 = {
  columnTitles: [{
    name: 'title name',
    label: 'title label',
  }],
  frozen: false,
};

const columnTitles2 = {
  columnTitles: [{
    name: 'title name',
    label: 'title label',
    classes: ['nameOfAClass'],
  }],
  frozen: true,
};

const columnTitles3 = {
  columnTitles: [{
    name: 'quickTrade',
    label: 'title label',
    classes: ['nameOfAClass'],
  }],
  frozen: true,
};

describe('Table headers tests', ()=> {
  it('renders the component correctly', function() {
    const wrapper = mount(<TableHeaders columnTitles={columnTitles1.columnTitles} />);
    expect(wrapper.find('.td').length).toBe(1);
  });

  it('renders a normal column correctly', function() {
    const wrapper = mount(<TableHeaders frozen={columnTitles1.frozen} columnTitles={columnTitles1.columnTitles} />);
    expect(wrapper.find('.td').text()).toEqual('title label');
    expect(wrapper.find('.frozen').length).toBe(0);
    expect(wrapper.find('.scroll').length).toBe(1);
  });

  it('renders a frozen column correctly', function() {
    const wrapper = mount(<TableHeaders frozen={columnTitles2.frozen} columnTitles={columnTitles2.columnTitles} />);
    expect(wrapper.find('.td').text()).toEqual('title label');
    expect(wrapper.find('.frozen').length).toBe(1);
    expect(wrapper.find('.scroll').length).toBe(0);
  });

  it('adds classnames to the title', function() {
    const wrapper = mount(<TableHeaders frozen={columnTitles2.frozen} columnTitles={columnTitles2.columnTitles} />);
    expect(wrapper.find('.nameOfAClass').length).toBe(1);
  });

  it('renders quick trade options correctly', function() {
    const wrapper = mount(<TableHeaders frozen={columnTitles3.frozen} columnTitles={columnTitles3.columnTitles} />);
    const labels = wrapper.find('.actions').text();
    expect(wrapper.find('.trade').length).toBe(1);
    expect(labels).toEqual('SellBuy');
  });

  it('render the size field if 1 click dealing is enabled', function() {
    useSelector.mockImplementation(callback => {
     return callback({watchlist: {is1Click: true}})
    });
    const wrapper = mount(<TableHeaders frozen={columnTitles3.frozen} columnTitles={columnTitles3.columnTitles} />);
    expect(wrapper.find('.size').prop('style')).toHaveProperty('opacity', 1);
  });
});
