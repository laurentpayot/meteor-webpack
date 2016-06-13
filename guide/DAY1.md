# 1. What's the Fuzz About Webpack?

## Do I really need this?

I am a big proponent of simplicity. You should never introduce a new library, a new framework or a new tool just because it does the new cool hyped stuff. Especially if you're adding a new complexity layer because you will more than often trade off way more time than you though and can afford.

> Simplicity is the ultimate sophistication  - Leonard da Vinci

The best way to be productive is to start with a REALLY dumb stack. Something that is so simple that it barelly do what you need and nothing more. You can seriously surprise yourself the amount of work you can save just by removing unnecessary tools and libraries.

Do you really need to setup that auto-scaling with load balancer? Do you really need that Redis cache? Do you even need this module to be using Meteor? Do you really need GraphQL (oops, maybe not? :p).

That dumb stack has to be incredibly easy and fast to setup. And this is the reason why I understand people hate Webpack: it is a really pain in the butt to setup. Do I really need to write a freaking 200 lines configuration file just to setup some defaults that make sense? It looks like a freaking monster that will suck out all my free time and make me miss deadlines. Not so great for an introduction to Webpack uh?

## Meteor Build System to the Rescue!

This is where Meteor build system comes handy. It is already working pretty well, their is no configuration needed and you can use custom build plugins. Everything we actually need to use the goodies of Webpack without the complexity layers that it usually comes with.

What if you had at your disposition all the Webpack goodies to be more productive but had zero configuration needed? What if all you needed to do was adding a few Meteor packages and everything was setup for you? What if you don't even need to know how Webpack configuration are working? What if you had access to all the Webpack goodies that you can't usually have within the Meteor world today?

This is exactly what the Meteor package `webpack:webpack` will do for you!

Before we dive head-first on Webpack, you have to understand why you need it (or not). There is some basic stuff you probably want at the beginning of any project and their is some stuff you should wait until it is mature enough. I'll let you know my own point of view and let you be the judge for your own projects. If you feel like something is wrong, just don't do it! But I can tell you most of the stuff will make you feel more comfortable with Meteor than ever before.

Webpack 2 is also going to bring great optimizations and better code splitting in the future. The release is far from being announced so let's keep our focus on what matters today.

### Hot Reload With No Page Refresh
Hot reload is one of the most useful feature Webpack has. When you make a change in your code, what you usually do is go in your browser and do F5. With Meteor, it just do the page refresh for you. However, this is very slow. What hot reload with Webpack does is it updates your page on the spot with your new code without loosing the state of your components and in real-time. No page refresh at all! It is seriously blazing fast.

Hot reload is usually something hard to setup correctly. The kind of complexity you don't want to go through. But you know what? You have NOTHING to do with Meteor because the Webpack package is doing all the work for you. 

[Someone even tried to replicate this for React component within native Meteor.](https://forums.meteor.com/t/react-hotloading-in-native-meteor-is-ready-i-e-no-webpack/17523) Seriously kudos for making this work. This is still experimental and limited to React components but their is hopes.

Hot reloading with Webpack can do more than that. You can learn how to setup hot reload to work with other stuff than React components. You can use it with any library (it's pretty useful for your Redux store if you have one). You can even get hot reload with Angular 2. The only piece you cannot hot reload is your server-side code. We might find a way to figure this out in Meteor someday (that project is classified for now ;)).

This is going to be covered with much more details on day 2.

### Bundling your CSS With the Code Using It
Writing CSS has been done the same way of ages. We write some massive style.css file with big ass comments so we can find what we need quickly. It was aweful to go through the CSS of another coder and find what you were looking for. One (or a few) massive file. Yuck! 

With Meteor, luckily you can use multiple CSS files and they are all going to be bundled into the same one in production. You could also use SASS or LESS to import files. But you have to be careful to make obvious what CSS files go with what, put the assets they need within the /public folder and hope nothing is missing.

With Webpack, you can import your CSS (or LESS/SASS) file in the files you are using it. That way, all your styles and all assets within your CSS can be in the same folder than your component and they are going to be easier to find. A single /public folder is no fun to anyone. Webpack will take care of doing all the work of bundling it correctly.

This is going to be covered with much more details on day 3.

### Optimize Caching your Assets

While you are importing your CSS files, you can also import your images or any assets. That way, they can be in the same folder instead of being in the /public folder and they can be bundled by Webpack. And there is one big advantage of doing that.

When Webpack gather all the assets it requires for the build, it will generate a name based on a hash of the file. This means two things:

1. If you're using the same file multiple time, it will make sure it is bundled with your app only once.
2. It also means you can cache this file forever! If you change your asset, the hash of the file will be different and the client will re-download the file. But if the file didn't changed, you can optimize the caching by settings it to Forever and you'll be sure your Web App is going to be faster and leaner for your visitors.

This is going to be covered with much more details on day 3.

### Code Splitting

This is one of the greatest feature of Webpack but here is one cavea about it: you shouldn't use this before it is absolutely necessary! 

Code splitting allows you to chunk down your Web App in multiple files and only load them by the client when they actually need them. It is useful in many situations:
- You don't want your regular users to download the big admin panel they should never access
- Your application has some massive applications that slow down the load time by too much

And let me warn you at the same time when you SHOULD NOT use it:
- DO NOT split every page
- DO NOT split every possible user roles or app modules
- DO NOT split multiple things on the same page

My rule of thumb is no code splitting until it is absolutely required outside a single one for the admin panel. You are going to hurt your performance otherwise. Their is an overhead at loading a new script by the client every time it hits a code splitting point.

The good news is someday when you will need more code splitting, it will be super easy to plug it anywhere. It will be there to cover your ass when you'll need backup :).

This is going to be covered with much more details on day 4.

### Optimizing your Code for Production

You will probably some day want to optimize some stuff on your application for production and/or for the client/server only. Webpack has a lot of great optimization done for you, but it also allow you to add your own. I will show you my tips and tricks on what really matters and do a difference.

This is going to be covered with much more details on day 4.

### Testing without loosing your shirt

We all know we should test our code but who really got the time for that right? We all have tight deadlines and most the time, it's the first thing we drop. It's super hard to setup and once you have everything ready to go, you discover that you need to mock half of your code to make them work.

Have you ever felt like you were writing tests for the sake of test but couldn't really relly on them? Or every time you do a change you break your test (not your code actually). This is a constant struggle for beginner unit testers. By using Webpack and some cool librairies, I'll show you how you can do testing without loosing your shirt in the process.

This is going to be covered with much more details on day 5.

## What's next?

Now you understand what Webpack really do for you and what are the trade off of using it. We're ready to get you started! Tomorrow, you are going to learn how to start from scratch a Meteor project with Webpack and what libraries you should use. We will also cover how you can migrate your old projects smoothly. Finally, we'll also cover how you can start a project by using a kickstart project in a matter of minutes.

See ya tomorrow!

- [x] Day 1. What's the Fuzz About Webpack?
- [ ] Day 2. How to Setup your First Project (and Migrate Old Ones)
- [ ] Day 3. Bundling your CSS / Assets the Right Way
- [ ] Day 4. Code Splitting and Optimizing your Code for Production
- [ ] Day 5. Write Unit Tests Without Loosing your Shirt

