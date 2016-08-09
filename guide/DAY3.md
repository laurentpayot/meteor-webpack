# Day 3. Bundling your CSS / Assets the Right Way

One of the strength of Webpack is the way it bundles assets. It is very simple and effective. Very few line of codes to get it working because it does most of what you would have written with Grunt or Gulp. Luckily, Meteor is also having a great build system for assets. We are going to leverage both to get a simple but more structured way of doing things.

## Bundle CSS / SASS / LESS

If you would like to take advantage of all the great goodies Webpack give you with the CSS, you have to use `.import.css` files. It allows you to bundle CSS and all the required assets within the CSS anywhere you want. Then, Webpack will figure out what you need and bundle it with your app. 

You can also keep using regular `.css` files with Meteor and the /public folder. This is perfectly fine is you're having a small application. The bigger it gets, the more you will want to structure a little bit more your assets near what's using it and Webpack allows you to do that.

You can also use PostCSS, SASS and LESS by adding the proper package to your project:
```sh
meteor add webpack:postcss
meteor add webpack:sass
meteor add webpack:less
```

You can go look up the documentation on Atmosphere to learn more about them.

You can then import your CSS files within the React / Angular components that are using it. Let's modify our app from last day:

```css
// /src/HelloApp/Hello.import.css
.helloMessage {
  color: red;
}

.helloName {
  color: blue;
}
```

```javascript
// /src/HelloApp/Hello.jsx
import React, { Component, PropTypes } from 'react';
import './Hello.import.css';

export default class Hello extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  }

  render() {
    const { name } = this.props;

    return (
      <h1 className="helloMessage">
        Hello <span className="helloName">{name}</span>
      </h1>
    );
  }
}
```

## Local CSS

Local CSS is an awesome feature of Webpack. However, keep in mind that it might make you lose more time than win if you're not careful with it. You might not even need it but it's a great goodie to have to make sure you never have class name collisions.

When you define a class as local CSS, the name will be exported with a hash within it and will be unique to the file. This means if you have style1.css and style2.css with the same class name, they are not going to be the same. This is because they are going to be renamed by Webpack. Here is how it works:

```css
// /src/HelloApp/Hello.import.css
:local(.message) {
  color: red;
}

:local(.name) {
  color: blue;
}
```

```javascript
// /src/HelloApp/Hello.jsx
import React, { Component, PropTypes } from 'react';
import style from './Hello.import.css';

export default class Hello extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  }

  render() {
    const { name } = this.props;

    return (
      <h1 className={style.message}>
        Hello <span className={style.name}>{name}</span>
      </h1>
    );
  }
}
```

To use local CSS, all you need is importing the file and use the object to set class names just like in the example.

Then if you inspect your code, you'll see some weird class names like `Hello-import__message__30Jwi` in development mode (it includes the filename + real name to make debugging easier) and only `30Jwi` in production. You might want to read [this great article that talks about the end of global CSS](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284).

You can enable local CSS by default in your webpack.json but I don't recommend doing so. It becomes harder to write CSS in some cases because you can't share local CSS class names with other CSS files unless they are global CSS. 

## Bundle images and assets
You can not only import CSS files. You can also import images and assets (fonts, JSON, ...). This means instead of having all your images within the /public folder, you can have the image in the same folder than your code using it. Then, you use it as an image that way:

```javascript
import React, { Component } from 'react'; 
import testImage from './testImage.png';

export default class ExampleImage extends Component {
  render() {
    return <img src={testImage} alt="Test image" />;
  }
}
```

By doing so, Webpack will take care of bundling your image with your code. It will also be renamed with a hash. If the file change, the filename will also change. This means you can cache those assets forever! A pretty nice optimization.

## What's next?

Code splitting is next!!! This means chunking your applications on multiple files you client can load only when needed. This is a really a great topic to talk about within a Meteor application because there is no other way than using Webpack to do this at the moment. Make sure to not miss it because you'll love this.

See ya tomorrow!

- [x] Day 1. What's the Fuzz About Webpack?
- [x] Day 2. How to Setup your First Project (and Migrate Old Ones)
- [x] Day 3. Bundling your CSS / Assets the Right Way
- [ ] Day 4. Code Splitting and Optimizing your Code for Production
- [ ] Day 5. Write Unit Tests Without Losing your Shirt
