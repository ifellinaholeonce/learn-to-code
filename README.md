Code Trail
=====================

A puzzle-solving platform aimed at a younger audience. The goal is to offer a fun, engaging platform for children to practice logical problem solving. Code Trail also offers teachers student management tools to help facilitate student learning in the classroom.

### Usage

To get started make sure you also download the server side code.

```
git clone git@github.com:git@github.com:ifellinaholeonce/learn-to-code.git
cd learn-to-code
npm install
npm start
```

In a second terminal download and start the server.

```
git clone git@github.com:ifellinaholeonce/learn-to-code-backend.git
cd learn-to-code-backend
bundle
bin/rails s
```

You are all set! Check it out at `http://localhost:8080`

### Features

Welcome to Code Trail!
!["Screen shot of landing page"](https://github.com/ifellinaholeonce/learn-to-code/blob/master/docs/final-1.png)

Puzzles are solved using a drag-and-drop interface. To solve the puzzle, the student must use the particular sets of options available.
!["Screen shot of drag-and-drop interface"](https://github.com/ifellinaholeonce/learn-to-code/blob/master/docs/final-drag-drop.gif)

Students can see a list of puzzles available, as well as the particular learning goal that each puzzle aims to reinforce.
!["Screen shot of puzzle list"](https://github.com/ifellinaholeonce/learn-to-code/blob/master/docs/final-puzzle-list.png)

Teachers can see how their class is progressing through the various puzzles and identify learning goals that individuals or groups may be struggling to understand.
!["Screen shot of teacher view"](https://github.com/ifellinaholeonce/learn-to-code/blob/master/docs/Screenshot%20from%202018-03-27%2019-41-46.png)

Teachers are also able to replay an individual student's attempt(s) at a each puzzle.
!["Screen shot of replay"](https://github.com/ifellinaholeonce/learn-to-code/blob/master/docs/Screenshot%20from%202018-03-27%2019-42-25.png)

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
