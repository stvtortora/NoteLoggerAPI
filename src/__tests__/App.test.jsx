import React from 'react';
import {App} from '../App.js';
import {HashRouter, Route} from 'react-router-dom';
import Header from '../components/header/header';
import Footer from '../components/footer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

describe('<App>', () => {
  let app = shallow(
    <App />
  )

  it('has a header', () => {
    expect(app.find(Header).length).toBe(1);
  })

  it('has a router', () => {
    expect(app.find(HashRouter).length).toBe(1);
  })

  it('has a footer', () => {
    expect(app.find(Footer).length).toBe(1);
  })
})
