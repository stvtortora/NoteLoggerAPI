import React from 'react';
import {ResultsFeed} from '../components/content/resultsFeed';
import Post from '../components/content/post';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });


describe('<ResultsFeed>', () => {
  let props;
  let mountedResultsFeed;

  const resultsFeed = () => {
    if (!mountedResultsFeed) {
      mountedResultsFeed = shallow(
        <ResultsFeed {...props} />
      );
    }
    return mountedResultsFeed;
  }

  beforeEach(() => {
    props = {
      searchResults: [],
      favorites: {},
      user: {},
      startIdx: 0,
      endIdx: 3
    };

    mountedResultsFeed = undefined;
  })

  describe('when fed search results', () => {
    beforeEach(() => {
      props.searchResults = [
        {
          "author": 'Author1',
          "title": "Post1",
          "thumbnail": null,
          "selftext": "Some text",
          "otherProp": "A property"
        },
        {
          "author": 'Author2',
          "title": "Post2",
          "thumbnail": null,
          "selftext": "Some text",
          "otherProp": "A property"
        },
        {
          "author": 'Author3',
          "title": "Post3",
          "thumbnail": null,
          "selftext": "Some text",
          "otherProp": "A property"
        },
        {
          "author": 'Author4',
          "title": "Post4",
          "thumbnail": null,
          "selftext": "Some text",
          "otherProp": "A property"
        }
      ]
    });

    it("displays at most three posts", () => {
      expect(resultsFeed().find(Post).length).toBe(3);
    })

    it("displays a next arrow with the first three posts", () => {
      expect(resultsFeed().find('.next').length).toBe(1);
    })
  })

  describe('when not fed searchResults', () => {
    it('renders nothing', () => {
      expect(resultsFeed().children().length).toBe(0);
    })
  })
})
