import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TableSettings from './TableSettings';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-beautiful-dnd', () => ({
  DragDropContext: jest.fn(),
  Droppable: jest.fn(),
  Draggable: jest.fn(),
}));

describe('Table Settings', () => {
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
  DragDropContext.mockImplementation(props => <div>{props.children}</div>);
  Droppable.mockImplementation(() => {
    return columns.map((c, i) => <Draggable draggableId={i} index={i}>{c.label}</Draggable>);
  });
  Draggable.mockImplementation(props => <div>{props.children}</div>);
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TableSettings close={jest.fn()}/>);
  });

  it('should renders', function() {
    expect(wrapper.find('.TableSettings').length).toEqual(1);
  });

  it('should contain a title and 3 columns', function() {
    expect(wrapper.find('h3').text()).toEqual('Settings');
    expect(wrapper.find('.name').text()).toEqual('Name');
    expect(wrapper.find('.hidden').text()).toEqual('hidden');
    expect(wrapper.find('.frozen').text()).toEqual('frozen');
  });

  it('should render all columns', function() {
    expect(wrapper.find(Droppable).shallow().length).toEqual(columns.length);
  });

  it('should render an overlay', function() {
    expect(wrapper.find('.overlay').length).toEqual(1);
  });

  it('should call redux on re-order', function() {
    const mockedDispatch = jest.fn();
    useDispatch.mockReturnValue(mockedDispatch);
    wrapper = shallow(<TableSettings close={jest.fn()}/>);
    wrapper.find(DragDropContext).simulate('dragEnd', {
      destination: { index: 1 },
      source: { index: 0 },
      draggableId: columns[0].id,
    });

    expect(mockedDispatch).toHaveBeenCalledWith({columns: [columns[1], columns[0]], type: 'REORDER_COLUMNS'});
  });
});
