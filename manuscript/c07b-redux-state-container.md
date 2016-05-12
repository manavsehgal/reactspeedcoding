# Redux State Container

Redux definitely deserves a chapter of its own within our React Speed Coding book.

## The Roadmap app

To help understand this important chapter, let us create a relatively complex app
to manage the the roadmap for ReactSpeed book and companion code. We want to list
upcoming and recent content and code features. Users should have the capability
to *Like* features they want to see first.

![Roadmap app wireframe](images/roadmap.jpg)

Our roadmap app will require a component to render the individual feature.
It will also require a component to manage a list of feature components. We would
also add a search box. A filter component will list features by categories
like components, styles, chapters, sections, and strategies.

You will note that various components within this app will interact with each
other (blue dashed lines in the wireframe). Changing filters will interact with search, reducing the scope of
what can be searched. Search will interact with features, showing only features
that match the text entered in search. Number of likes will interact with order of features.

Our app will also maintain several UI states. Some candidate states could be,
active filter, order of features, search text, and last *Like* clicked.


I> ## Chapter In Progress
I> We are still writing this chapter. Please watch this space for updates.
I> Plan is to add working samples to explain how Redux predictable state container
I> makes our app architecture more robust.
