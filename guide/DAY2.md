# Day 2. How to Setup your First Project (and Migrate Old Ones)

First day has been all about the theory. Now let's get out hand dirty with some coding. If you missed day 1, **you can access it by clicking here**.

## Some Caveats Before We Start

Make sure you are a little bit comfortable with Meteor and React first. You can go through [this excellent tutorial](https://www.meteor.com/tutorials/react/creating-an-app) that will give you the basis you need and you'll be good to go. It is important to have some understanding of how Meteor and React are working before going forward.

## Starting a Project From Scratch

Starting a project from scratch shouldn't be complicated and this is where the Meteor package system comes handy. Let's get started by creating an Hello World application and I'm going to walk you through all the concepts you need to understand. Keep in mind that those steps don't need to be done every single time you're starting a new project. You can always use a kickstarter project with what you need already setuped. We'll talk about that latter.

Let's begin by creating our Meteor project and adding the basis packages. Those are the package you need for a React application with Meteor and Webpack.

```sh
# Create a new Meteor project and remove useless files
meteor create my-webpack-project
cd my-webpack-project
rm -rf server client

# Remove ecmascript package because Webpack cannot coexist with it
# Webpack is going to give you everything you need anyway
meteor remove ecmascript

# Add the Webpack core package + React support for Webpack
meteor add webpack:webpack
meteor add webpack:react
```

## Setup NPM

Now that we have an empty project, we need to set it up so that we can use NPM packages. NPM is an amazing package manager for JavaScript libraries and you are going to love it. Luckily for us, NPM is packaged with Meteor if it is not already installed on your computer. This means we can execute NPM commands by using `meteor npm` instead of the regular `npm`. 

If you have a local version installed, you can use it but you might have some troubles with compiled librairies because your Node.js version is not running on the same version than Meteor. If you have this problem, you can always fix the problem latter so it's totally up to you. We are going to use `meteor npm` in the course only for the sake of comformity.

When you setup NPM for your project, it will create a `package.json` file. This is where your entry points are going to be configured for your application.

```sh
# Make sure your are in the root directory of your project
# Then you can use the default answer to every questions
meteor npm init
```

Now that your `package.json` file is created, open it with a text editor. You need to make sure you have two things:

1. You have `"private": true` configured. This means if you're accidentally trying to publish your own application on NPM, it will not work because it is configured as a private library.
2. Setup your entry points. You should have `"main": "src/server.js"` for the server entry-point and `"browser": "src/client.jsx"` as the client entry-point. Keep in mind that you can easily know if you're on the client or on the server using `Meteor.isClient` or `Meteor.isServer` latter.

## Configure Webpack

The last missing piece to setup the project is the `webpack.json` file. This is where you can tweak any settings you wish you could. You should keep this very short at first and as your project grow, you can tweak this file to tweak things your way.

Create a `webpack.json` file in the main directory with this:

```json
{
  "root": "src",
  "devServer": {
    "host": "localhost"
  }
}
```

The `root` settings is to help you with relative path. Instead of having to look for how many `..` you have to put (example: `import App from '../../../main/App';`), you can assume it is going to start in the `src` folder (example: `import App from 'MainApp/App';`). Much cleaner and if you need to move this file in another folder, the path will still work.

The `devServer.host` settings is going to be handy when you're trying to test your app on another computer than what's running the Meteor server (let's say a mobile or a colleague :)). You'll need to change `localhost` by your local IP address so your app can work correctly while developing. It's always good to have it ready to be used. Let's keep it as is for now.

### Let's write a small app

Now that we have everything ready, let's write a small Hello World app. I'll keep the explainations short because there is nothing specific to Webpack with Meteor here. You can create those files:

```javascript
// src/HelloApp/client/Hello.jsx
import React, { Component, PropTypes } from 'react';

export default class Hello extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  }

  render() {
    const { name } = this.props;

    return (
      <h1>Hello {name}</h1>
    );
  }
}
```

```javascript
// src/HelloApp/client/HelloApp.jsx
import React, { Component } from 'react';
import Hello from './Hello';

export default class HelloApp extends Component {
  render() {
    return <Hello name="Bob" />;
  }
}
```

```javascript
// src/client.jsx
import ReactDOM from 'react-dom';
import HelloApp from 'HelloApp/client/HelloApp';

Meteor.startup(() => {
  ReactDOM.render(
    <HelloApp />,
    document.getElementById('react-app')
  );
});
```

```html
<!-- src/index.html -->
<head>
  <title>Meteor with Webpack rocks!</title>
</head>

<body>
  <div id="react-app"></div>
</body>
```

Now that we have our small application, let's run it!

```sh
# You might have noticed we're missing a lot of NPM dependencies
# The first time you run meteor, it will add them automatically and ask you to run npm install
meteor
meteor npm install
meteor
```

Open [http://localhost:3000](http://localhost:3000) and you should see "Hello Bob".

# Hot reload

Hot reload is a really cool feature that Webpack is giving you for free. It is usually really complicated to setup but thanks to the Meteor build system, we already done all the work for you. Keep your browser open on one side and keep the `HelloApp.jsx` file open on the other side. If you change the name Bob by Mike and save the file, you'll see the browser update the name as soon as you hit save. This is hot reload at it's core!

One of the cool goodies with that is if your application had a state, let's say the left menu is open, it is going to be kept just like before. No need to refresh the page and go through the same steps. Your menu is going to be open even after the hot reload.

## What File Structure Should I Use?

To be honest, you should really stick to something simple that you feel the right way for you. And there is many right ways. However, there is a few things you should know:

 - Your React components and anything you might want to hot reload has to be within a client folder (otherwise the server restart)
 - It is a lot easier to keep your resources near the code using it
 - Split your code in clear independant modules (just like the HelloApp, you can make multiple folders like that)
 - Don't overcomplicate this just because some other people are doing it
 - You're going to mess a few things up and regret it latter... no matter how much time you spend thinking about it now, DO NOT overthink this and focus on continuous improvement instead
 
 If you don't know where to start, just go with the file structure we're using in the examples. You'll feel pretty much at home very quickly.
 
 - src (include all the source code outside the configuration files)
  - src/client.jsx: Entry-point for the client code
  - src/server.js: Entry point for the server code
  - src/XApp: Folder for a specific independant X module (could be anything)
    - src/XApp/client: Client-specific code
    - src/XApp/server: Server-specific code
 
## Configure Babel
If you're a pro of Babel and would like to add babel plugins or settings, you can create a regular `.babelrc` file at the root of your project. Webpack is going to automatically include those settings for you!

## Migration path from old Meteor projects

You might have a great Meteor project already started that could benefit from Webpack. You have to know that the migration path is easy.

1. Make sure everything we've setup in the Get Started guide is there in your project.
2. Make sure anything you want to hot reload is within a client folder.
3. Files will no longer be automatically imported. Make sure to import everything you need within your client and server entry points.

That's pretty much it. It is not much work for a lot of new possibilities!

## Using kickstart projects
If you want to setup your project without going through those steps every time, you can clone a [kickstart project](https://github.com/thereactivestack/kickstart) with what you need.

## What's next?

You got your first project started and it's great! Tomorrow, we're going to talk about one of the most exciting feature of Webpack: Hot Reload Replacement. You already got a taste of it today. Tomorrow, we'll dive deeper.

See ya tomorrow!

- [x] Day 1. What's the Fuzz About Webpack?
- [x] Day 2. How to Setup your First Project (and Migrate Old Ones)
- [ ] Day 3. Bundling your CSS / Assets the Right Way
- [ ] Day 4. Code Splitting and Optimizing your Code for Production
- [ ] Day 5. Write Unit Tests Without Losing your Shirt
