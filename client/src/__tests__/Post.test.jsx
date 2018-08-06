import React from 'react';
import {Post} from '../components/content/post';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

describe('<Post>', () => {
  let props = {
    data: {
      "author": 'Author',
      "title": "Post",
      "thumbnail": null,
      "selftext": "Some text"
    }
  }

  let post = shallow(
    <Post {...props}/>
  )

  it('displays a thumbanil image', () => {
    expect(post.find('img').length).toBe(1);
  })

  it('displays the post name in an h2', () => {
    expect(post.find('h2')
      .render()
      .text())
      .toEqual(props.data.title);
  })

  it('displays the author name', () => {
    expect(post.find('.post-author')
      .render()
      .text())
      .toEqual(`${props.data.author}`);
  })

  it('displays post text', () => {
    expect(post.find('.post-text')
      .render()
      .text())
      .toEqual(props.data.selftext);
  })
})
