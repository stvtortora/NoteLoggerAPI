import React from 'react';
import Content from '../components/content/content';
import Search from '../components/content/search';
import ResultsFeed from '../components/content/resultsFeed';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

describe('<Content>', () => {
  let content = shallow(
    <Content />
  )

  it('renders Search', () => {
    expect(content.find(Search).length).toBe(1);
  })

  it('renders ResultsFeed', () => {
    expect(content.find(ResultsFeed).length).toBe(1);
  })
})
