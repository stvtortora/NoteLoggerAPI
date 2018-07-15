import React from 'react';
import Search from '../components/content/search';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';

configure({ adapter: new Adapter() });

// describe('<Search>', () => {
//   let search = shallow(
//     <Search />
//   )
//
//   it('has an input field', () => {
//     expect(search.find('input').length).toBe(1);
//   })
//
//   it('has a submit button', () => {
//     expect(search.find('button').length).toBe(1);
//   })
// })
