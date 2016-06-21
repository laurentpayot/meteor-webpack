# Day 4. Code Splitting and Optimizing your Code for Production

Code splitting is one of the most useful feature Webpack has. However, you have to be careful to not overuse it. There is an overhead every time your create a new code splitting point. Here is a reminder from day 1:

> Code splitting allows you to chunk down your Web App in multiple files and only load them by the client when they actually need them. It is useful in many situations:
> - You don't want your regular users to download the big admin panel they should never access
> - Your application has some massive applications that slow down the load time by too much
> 
> And let me warn you at the same time when you SHOULD NOT use it:
> - DO NOT split every page
> - DO NOT split every possible user roles or app modules
> - DO NOT split multiple things on the same page
> 
> My rule of thumb is no code splitting until it is absolutely required outside a single one for the admin panel. You are going to hurt your performance otherwise. There is an overhead at loading a new script by the client every time it hits a code splitting point.

## How Does it Work?

When you want your code to be splitted in a different chunk, instead of using a regular `import` or `require`, you will use the `require.ensure` command to define a new splitting point. Once you are within that function, you will have a new `require` function that will make sure anything you call with it will be loaded in a different chunk of code.

This means instead of having all your JavaScript code in a single file, some code will be in a different file that will not be loaded by the client at start. When the user hits the splitting point, Webpack will know there is a missing piece it needs to load. It will handle all the stuff it needs to do to request and load your code splitted chunk but not until it is needed.

This means even though your application is huge and have a lot of parts that the client most likely will not use, it will not load them unless he requests it.

## The Syntax (it's weird I know)

To define a code-splitting point, you need to use `require.ensure`. It will give you a require method that you can use to load new dependencies and they are going to be in your splitted chunk file.

```javascript
require.ensure([], function(require) {
  cb(require('./BigAssApp'));
});
```

In this example, the content of `BigAssApp` will not be within your main bundle. It will be within a different file and Webpack will take care of loading it only when the user needs it.

Note that when Webpack 2 will be released, the API for code splitting will be much better.

## Example with the react-router

Let me show you a full example with an admin section and the react-router with server-rendering. In this example, you are going to have an AdminApp bundled in a code-splitted file. Unless you access the /admin address, you are not going to load this code.

Let's start by adding `react-router` to our project (see day 1 for the initial code).

```sh
meteor add reactrouter:react-router-ssr
meteor npm install --save react-router
```

We are going to load a routes files that will contain all our config.

```javascript
// src/client.jsx
import './client/routes';
```

The routes are also going to be loaded in production mode only. This is mainly because we don't want to restart the whole server everytime we change something. We want our hot reload remember?

```javascript
// src/server.js
if (Meteor.isProduction) {
  require('./client/routes');
}
```

Finally, we are going to load the AdminApp only when the user access /admin. In this case, it is using the `getComponents` because code splitting is async. You can also look at the react-router documentation for more informations about `getComponents`, `getChildRoutes` and `getIndexRoute`.

You might also have noticed the `if (Meteor.isServer)`. This is only because we are doing server-rendering and we don't want code splitting on the server. It would crash because there is no DOM to load the script. Be aware that code-splitting doesn't affect hot reload so you can use it in development as well as in production.

```javascript
// src/client/routes.jsx
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import { IndexRoute, Route } from 'react-router';

import HelloApp from 'HelloApp/client/HelloApp';

const getAdmin = (nextState, cb) => {
  if (Meteor.isServer) {
    cb(null, require('AdminApp/client/AdminApp'));
  } else {
    require.ensure([], function(require) {
      cb(null, require('AdminApp/client/AdminApp'));
    });
  }
};

const routes = (
  <Route path="/">
    <IndexRoute component={HelloApp} />
    <Route path="admin" getComponents={getAdmin} />
  </Route>
);

ReactRouterSSR.Run(routes);
```

And here we have our pretty minimalist admin panel :).

```javascript
// src/AdminApp/client/AdminApp.jsx
import React, { Component } from 'react';

export default class AdminApp extends Component {
  render() {
    return (
      <h1>Admin!</h1>
    );
  }
}
```

## One Last Caveat
Keep in mind that the `require` you are using within `require.ensure` is not the same than the rest. If the file you are trying to split in a different file is imported or required anywhere else in your main chunk, it will be worthless. Make sure you don't make that mistake.

## What's next?

Now you should have a pretty good understanding of how code-splitting is working with Webpack. It is very powerful and sadly misunderstood because of the weird syntax. Go play with it and plug it within a project you are currently working on. You'll see how easy and powerful it is. Make sure you use it only where it is relevant though.

In the next lesson, we are going to learn how to unit test your application. Being able to write great tests is one of the hardest thing to do in programming and once you learn the good practices and how to actually do it without too much complexity, you'll fall in love with testing.

See ya tomorrow!

- [x] Day 1. What's the Fuzz About Webpack?
- [x] Day 2. How to Setup your First Project (and Migrate Old Ones)
- [x] Day 3. Bundling your CSS / Assets the Right Way
- [x] Day 4. Code Splitting and Optimizing your Code for Production
- [ ] Day 5. Write Unit Tests Without Losing your Shirt
