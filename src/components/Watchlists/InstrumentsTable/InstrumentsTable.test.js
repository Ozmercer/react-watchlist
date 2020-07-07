import React, { useState as useStateMock} from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InstrumentsTable from './InstrumentsTable';
import { useSelector } from 'react-redux';
import TableHeaders from './TableHeaders/TableHeaders';
import TableColumns from './TableColumns/TableColumns';

configure({adapter: new Adapter()});

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('Instruments Table', () => {
  const columns = [
    {
      name: 'instrumentName',
      label: 'Market',
      frozen: true,
      hidden: false,
      id: 1,
    },
    {
      name: 'quickTrade',
      label: 'Trade',
      frozen: true,
      hidden: false,
      id: 2,
    },
  ];

  useSelector.mockImplementation(callback => {
    return callback({ watchlist: { columns: columns } });
  });
  let wrapper;
  const setState = jest.fn();

  beforeEach(() => {
    useStateMock.mockImplementation(init => [init, setState]);
    wrapper = shallow(<InstrumentsTable/>);
  });

  it('should render', function() {
    expect(wrapper.find('.InstrumentsTable').length).toEqual(1)
  });

  it('should have a header and body with 2 children each - one frozen and one not', function() {
    const headers = wrapper.find('.thead').shallow().find(TableHeaders);
    const columns = wrapper.find('.tbody').shallow().find(TableColumns);

    expect(headers.length).toEqual(2);
    expect(headers.at(0).shallow().hasClass('frozen')).toEqual(true);
    expect(headers.at(1).shallow().hasClass('frozen')).toEqual(false);

    expect(columns.length).toEqual(2);
    expect(columns.at(0).shallow().hasClass('frozen')).toEqual(true);
    expect(columns.at(1).shallow().hasClass('frozen')).toEqual(false);

  });

  it('should update scroll when scrolling on tbody', function() {
    wrapper.find('.tbody').simulate('scroll', {currentTarget: {scrollLeft: 100}});
    expect(setState).toHaveBeenCalledWith(100);
  });
});
