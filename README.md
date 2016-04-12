# React Speed Coding Book and Companion Code

Companion code and manuscript of React Speed Coding book is available here.

Chapter and section level branches are available if you want to "code along" as you
read the book.

You can clone a specific branch like so.

```
git clone -b <branch-name> --single-branch --depth=1 https://github.com/manavsehgal/reactspeedcoding.git
```

Replace ```<branch-name>``` with actual branch name from the repo.
For example ```c01-init``` for first chapter's init code.
This will clone the code and along with relevant chapter content for the book.
The ```--depth=1``` flag ensures that only the latest commit is cloned.

```
- reactspeedcoding
-- manuscript
--- code
```

Now cd to the code directory and install dependencies using ```npm install``` command.
Run sample app using ```npm start``` command.
