import React from 'react';
import App from '../App.js';
import Content from '../components/content/content';
import Header from '../components/header';
import Footer from '../components/footer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';

configure({ adapter: new Adapter() });

describe('<App>', () => {
  let app = mount(
    <App />
  )

  it('has a header', () => {
    expect(app.find(Header).length).toBe(1);
  })

  it('has contenent', () => {
    expect(app.find(Content).length).toBe(1);
  })

  it('has a footer', () => {
    expect(app.find(Footer).length).toBe(1);
  })
})
