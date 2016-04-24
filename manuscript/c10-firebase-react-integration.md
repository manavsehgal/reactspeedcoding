# Firebase React Integration

Firebase is a Platform as a Service offering managed, real-time database, user authentication APIs, and static (front-end) website hosting. We like Firebase as our backend and hosting platform as it is stable, backed by Google, provides well documented APIs, has an easy to learn visual database management toolset, and performant.

For the same price-point Firebase delivers much more than its competitors. As an example, it is hard to find a normal web host offering SSL custom domain hosting for $5/monthly. Firebase offers way more for this price point. It also comes with a generous free plan which is easy to upgrade when you are ready to go production.

As this book progresses we are hosting the demo app at https://reactspeed.firebaseapp.com. Once the book completes and we have sufficient traction, we will migrate to our very own domain at https://reactspeed.com. Fingers crossed!

## Firebase Hosting

Getting started with Firebase hosting is easy. Install their Command Line Interface (CLI) tools. Use a Google account to authenticate.

```
npm install -g firebase-tools
```

Next do ```firebase init``` to setup your deploy directory. In our case this is the ```build``` folder. This creates ```firebase.json``` file in our root with selected configuration.

{title="Firebase deploy terminal output", lang=text}
~~~~~~~
=== Deploying to 'reactspeed'...

i  deploying hosting
i  preparing build directory for upload...
- 6 files uploaded successfully

- Deploy complete!

URL: https://reactspeed.firebaseapp.com
Dashboard: https://reactspeed.firebaseio.com

Visit the URL above or run firebase open
~~~~~~~

Run ```npm run build``` and then ```firebase deploy```. You are done. You can then ```firebase open``` from the terminal to open your new or updated website in your favorite browser. It is that easy.

![Firebase Hosting Panel](images/firebase-hosting.jpg)

## Designing a REST API using Firebase

Providing a REST API is essential for any app that works with data that can be
consumed by other apps. Normally writing an API for an app is an involved process.

Firebase provides visual data management tools that enable you to rapidly design
an API simply using a well designed JSON data schema. The structure of your JSON schema
becomes the API endpoints right out-of-the-box. You can then secure your API with
several authentication schemes, or just keep it available as an open data set.

For ReactSpeed API we want to expose component design workflow to other apps
which can consume this and add more features. One of the use cases may be a
project management app which brings up required workflow steps as a
pre-populated Todo List for its users.

We are effectively codifying or API enabling the entire React Speed Coding book
outline of contents for consuming within third-party apps!

Try ReactSpeed REST API in your console now.

```
curl "https://reactspeed.firebaseio.com/workflow/start/embed.json"
```

What returns is JSON data with steps outlined to complete **Embed to React** component
creation explained within the **Start Component Design** chapter.


I> ## Chapter In Progress
I> We are still writing this chapter. Please watch this space for updates.
I> Plan is to add examples for wiring up our React Speed UI components with Firebase
I> as real-time database, add user authentication, determine security rules,
I> review hosting optimizations, among other actions.
