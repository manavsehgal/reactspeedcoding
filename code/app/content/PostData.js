const PostData = [
  {
    id: 1,
    title: `ReactSpeed book is Reddit top trending
    for Reactjs`,
    summary: `It is a proud moment for us to be listed as top trending
    news on Reddit Reactjs.`,
    image: '/img/reddit-trending.jpg',
    content: {
      start: `Reddit is one of the most respected news sources for developers.
      React subreddit is frequented by more that 10,000 developers voting on
      their favorite React news and trends. Recently ReactSpeed book enjoyed
      trending as top voted news in React for a day! We are so proud and excited.`,

      middle: `We enjoy following Reddit news and users' reactions.
      This gives us valuable insights on what is trending in React community.
      It also guides us on what to write in our React Speed Coding book.`,

      end: `As learning from the Reddit community we are enhancing
      focus on Redux related content, adding visualiation APIs to our
      component todo list, and improving our Angular 2 v React section.`
    }
  },
  {
    id: 2,
    title: `New Roadmap App For ReactSpeed
    Readers`,
    summary: `Roadmap app helps our readers vote on ReactSpeed features,
    components, and book content.`,
    image: '/img/roadmap.jpg',
    content: {
      start: `To help understand how to wire multiple components in React,
      let us create a relatively complex app to manage the the roadmap for ReactSpeed
      book and companion code. We want to list upcoming and recent content and code features.
      Users should have the capability to Like features they want to see first.`,

      middle: `Our roadmap app will require a component to render the individual feature.
      It will also require a component to manage a list of feature components. We would
      also add a search box. A filter component will list features by categories
      like components, styles, chapters, sections, and strategies.`,

      end: `You will note that various components within this app will interact with each
      other (blue dashed lines in the wireframe). Changing filters will interact
      with search, reducing the scope of
      what can be searched. Search will interact with features, showing only features
      that match the text entered in search. Number of likes will interact with order of features.
      Our app will also maintain several UI states. Some candidate states could be,
      active filter, order of features, search text, and last Like clicked.`
    }
  }
];

export default PostData;
