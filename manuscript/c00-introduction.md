# Introduction

Welcome reader. The aim of this book is to get you from concept to coding real world React apps,
as fast as possible.

React ecosystem is constantly evolving and changing at a fast pace. This book
equips you to take the right decisions matching your project requirements with best practices,
optimized workflows, and powerful tooling.

## Prior art

The author would love to take the credit for coining the term "Speed Coding". However, Speed Coding
is based on very strong foundations and popular prior art.

**Speed of Developer Workflow.** Speed Coding follows some of the methods and tools as prescribed by the Lean Startup principles. See [infographic][1] for code faster, measure faster, learn faster.

**Speed of Design.** Speed Coding embraces the **designer-developer** evolution and also bases certain principles
on the [Design Thinking][3] methodology and [Visual Design][7] principles.

**Speed of Technology Decisions.** Speed Coding technology stack is compared with industry best practice guidance including the awesome [ThoughtWorks Technology Radar][4].

## Stakeholder perspectives

In order to fulfill the promise of Speed Coding, we need to start by establishing some baselines.
What are we speeding up? How are we measuring this speed? Why does it matter?

Let us start with the Why. Speed Coding is essential for three stakeholders. The user. The developer.
The sponsor.

As app users we define *speed* mostly as performance and reactivity of the app. We even
define speed as frequency of timely and desired updates to the apps we are using. Most importantly
we define speed by time it takes to get things done.

As developers we define speed in terms of our development workflow. How long does it take to
code, build, test, deploy, debug, and reactor. We also define speed of decision making
relating to our development and technology stack.

As sponsors for an app project we define speed in terms of time to market. How long does it
take to move from **Concept to Code to Cash**. Believe us, you first heard that phrase here, and we truly mean it!

{pagebreak}

## Technology stack

ThoughtWorks is a privately owned, global technology company with 3,600 employees across 12 countries. ThoughtWorks Technology Radar ranks technologies based on Adopt > Trial > Assess > Hold relative ranking.  This is based on their own usage of these technologies across projects for leading enterprises globally. In terms of speed of decision making about your own technology stack, this is one tool that proves very helpful.

React Speed Coding will be addressing following technologies, platforms, techniques, frameworks, and tools.

**ES6 (Adopt).** JavaScript ECMAScript 6 is right at the top of the Radar list of languages and frameworks. We cover important concepts relevant for coding React in ES6.

**React (Adopt).** React is a close second on the Radar. Of course this book is all about React so we are well covered.

**Redux and Flux (Trial).** Redux is a new entrant on the Radar. We are dedicating an entire chapter and a relatively complex app for decent coverage of this important technology in React ecosystem. Flux is an architectural style recommended for React. Redux evolves ideas of Flux, avoiding its complexity, according to the author of Redux.

**React Native (Trial).** Another entry high on the Radar from React ecosystem. We are covering Flexbox which is one of the key technologies in React Native stack. Of course React and Redux make up the mix. We are still deciding based on reader feedback if we need to dedicate a chapter for React Native as well.

**GraphQL (Assess).** Another up and coming technology in React stack. GraphQL is an alternative to REST protocol. Goes hand in hand with Relay, another technology from the Facebook camp. We are considering reader interest in these two.

**Immutable.js (Assess).** Yet another Facebook open source project. Goes well with Redux. We will implement some samples using Immutable.js.

**Recharts (Assess).** Integrates D3 charts and React. We will implement samples using Recharts and possibly other cool charting and visualization libraries.

**Browsersync (Trial).** Browsersync is a great time-saver for multi-devices testing of mobile-web hybrid apps. React Speed Coding implements Browsersync + Webpack + Hot Reloading. So if you make any changes in your JSX, these should update on all devices on saving the changes. While maintaining your current UI state. Isn't this awesome!

**GitUp (Trial).** Graphical tool complementing Git workflow. We are find this tool useful for going back in time and revising commit logs for instance.

**Webpack (Trial).** We are implementing your React developer workflow using Webpack. Two chapters are dedicated to get you started with Webpack and production optimize the workflow.

**Serverless Architecture (Assess).** We are implementing serverless architecture using Firebase. Another technology worth evaluating is AWS Lambda, though it may not be in scope of this book.

{pagebreak}

## Measuring speed

So it will be nice to define some baseline measurements of speed and see if we can improve
these as we go through the book.

**Website Performance.** Google PageSpeed defines 25+ criteria for website performance as relative
measures or percentile scores compared with rest of the Web. For example *Enable Gzip Compression* is 88%
as recommended baseline.

As on May 9, 2016 the ReactSpeed.com website is evaluating grade A (93% average) on
PageSpeed score, grade B (82% average) on YSlow score, 2.1s page load time, 834KB total page size, with 26 requests. View [GTMetrix ReactSpeed.com report here][6].

**Load Impact (Radar Trial).** Online load testing tool. We are using this tool to perform concurrent user load tests on ReactSpeed.com website.

As on May 9, 2016 with 20+ custom React components live on ReactSpeed website, we are recording faster than 200ms load time for our website for 25 concurrent users. That translates to handling approximately 2,50,000 monthly visitors. Excellent! [View results snapshot here][5].

**Build and Deploy Time.** How long does it take to run the developer workflow.

As on May 9, 2016 our development server continuously builds and updates our app as we save our working code. Production build takes 5.3s with around 250 hidden modules. We deploy 44 files to Firebase several times during a day.

**Time to Release.** How long does it take to ship new features to production.

Since start of ReactSpeed project we have closed 150 production commits to GitHub over a 30 day period. Our peak is 40 commits during week of April 10.

**Production Payload.** How optimized are our production assets.

As on May 9, 2016 our CSS library is 4.7KB Gzip, 21KB minified with 25+ style modules. App JS bundle is 42KB minified. Vendor JS bundle is 192KB minified. HTML is 3KB.

**Time to fix issues.** How long does it take to fix issues in code. Code issues can be of several types including compliance with coding guidelines and best practices, logical bugs, usability issues, performance issues, among others.

As on May 10, 2016 it took us 6 hours to resolve 300+ issues down to 3 open issues using ESLint integration
with Atom editor and Webpack. The issues ranged from coding best practices to refactoring
requirements as per React coding patterns.

{pagebreak}

## Developer workflow

This is most complex area to measure in a generic manner. Most often developer workflow
baselines are industry and organization driven. We can still establish certain general guidelines on the following lines.

**Continuos production build workflow.**

This can be measured by number of commands or developer actions required to
complete one production ready build. Alternatively how automated is this lifecycle.

**NPM for all the things.**

Can be measured based on number of project dependencies that are updated from NPM or popular managed repositories and CDNs. This is Trial stage at ThoughtWorks Technology Radar.

**Static code analytics.**

This can be measured for number of lint warnings or errors. Complexity analysis of JavaScript code can be included apart from other static code analytics.

A> This chapter will continue to evolve along with rest of the book. So, watch this space for frequent updates.

[1]: http://visual.ly/lean-startup
[3]: http://www.fastcompany.com/919258/design-thinking-what
[4]: https://www.thoughtworks.com/radar
[5]: https://app.loadimpact.com/load-test/39d3b00c-d9fa-4056-8606-7ebe9026e161?charts=type%3D1%3Bsid%3D__li_clients_active%3A1%3B%3Btype%3D1%3Bsid%3D__li_user_load_time%3A1&large-charts=type%3D1%3Bsid%3D__li_clients_active%3A1%3B%3Btype%3D1%3Bsid%3D__li_user_load_time%3A1
[6]: https://gtmetrix.com/reports/reactspeed.com/Mn36KHic
[7]: https://www.academia.edu/11637848/Visual_Design_Principles_An_Empirical_Study_of_Design_Lore
