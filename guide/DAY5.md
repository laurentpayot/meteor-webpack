# Day 5. Write Unit Tests Without Losing your Shirt

## Why You Most Likely Hate Unit Tests

I've spent a lot of frustrating hours trying to unit test my code. I though it was a complete waste of time. I though it might be nice for small librairies but it would be a nightmare to do in any decent sized application. Without thinking about how much time you can lose trying to write those. It feels nice to have the computer test your own code but you feel like you're just wasting your time.

And you know what? You might be right. This is especially true when you are working with a huge code-base that was already engineer in a non-testable way. When you need to mock half the code to be able to run your unit test, it is a good sign this is not a good design to write unit tests.

If you don't want to lose your shirt while testing, you need to think it through. Let me start this with the single most important tip to make sure you can easily test your Meteor code. Then, I'll show you how you can do it with Meteor and Webpack. You'll be surprised how simple it is and nothing specific to Webpack.

## Split your code by Smart and Dumb Components

A dumb component is a simple piece of code that do one thing and one thing only very well. It don't know much about the rest of your application and only do exactly what you ask him to do. It doesn't communicate with your server or your client. It doesn't have any side effect. Nothing fancy. You want as much piece of code as possible to be dumb because they are easy to unit test.

In the other hard, smart components are connecting things together. They are grabbing the values from the server. They are sending actions to the server. They are doing things that might be harder to emulate in a unit test environement. Instead of writing unit tests, you probably want to write integration tests for them. You can find more about that on other tutorials about Meteor.

When you work that way, you'll find that testing your code will no longer be hard to do. It becomes as easy as a small library to test because your core logic is encapsulated well outside of the fetching / hard-to-mock logic.


## Let's Write Some Tests!

We are going to end with a simple yet powerful example. We are going to use Mocha for the testing library, Chai for the asserts and Enzyme to test React components.


```sh
meteor add practicalmeteor:mocha
meteor add practicalmeteor:chai
```

The fastest way to test React component is by doing shallow rendering. It allows you to render your component and test it without rendering the children components and even attach it to the DOM. You can simply run it on the server and it is going to be blazing fast.

```sh
meteor npm install --save-dev react-addons-test-utils enzyme
```

```javascript
// src/HelloApp/client/__tests__/Hello.tests.jsx
import { chai } from 'meteor/practicalmeteor:chai';
import { shallow } from 'enzyme';
import Hello from '../Hello';

describe('Hello', function() {
  it('should start with Hello', function() {
    const wrapper = shallow(<Hello name="Bob" />);
    chai.assert.equal(wrapper.text().indexOf('Hello'), 0);
  });

  it('should display the name', function() {
    const wrapper = shallow(<Hello name="Bob" />);
    chai.assert.above(wrapper.text().indexOf('Bob'), -1);
  });
});
```

## The Meteor Testing Manual

If you would like to learn more about how to unit test in Meteor, it is a big subject to cover. I highly encourage you to read [The Meteor Testing Manual](https://www.meteortesting.com/). 

# It's the end!

I hoped you've enjoyed those tutorials. If you would like to comment or have question, you can always reach me at [benoit@thereactivestack.com](mailto:benoit@thereactivestack.com).

Hope you the best!
