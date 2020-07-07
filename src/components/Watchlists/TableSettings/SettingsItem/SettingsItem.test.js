import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SettingItem from './SettingsItem';

configure({ adapter: new Adapter() });

describe('Settings Item', () => {
  const column = {
    label: 'Market',
    frozen: true,
    hidden: false,
  };
  
  let mockChange;

  let wrapper;
  beforeEach(() => {
    mockChange = jest.fn();
    wrapper = mount(<SettingItem label={column.label} frozen={column.frozen} hidden={column.hidden} changed={mockChange}/>);
  });

  it('should render with correct name, hidden & frozen', function() {
    expect(wrapper.find('.name').text()).toEqual(column.label);
    expect(wrapper.find('.hidden input').prop('checked')).toEqual(column.hidden);
    expect(wrapper.find('.frozen input').prop('checked')).toEqual(column.frozen);
  });

  it('should call changed function with correct data when edited', function() {
    wrapper.find('.hidden input').simulate('change', { target: { checked: !column.hidden } });
    expect(mockChange).toHaveBeenCalledWith({hidden: !column.hidden, frozen: column.frozen})
  });
});
