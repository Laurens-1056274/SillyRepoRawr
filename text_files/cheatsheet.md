# React components and templates
components are the building blocks of an React application. a typical webpage build with react
might be made up of several components (each component is a selfcontained section of content) such as
    Navbar, article, sidebar etc
components contain templates and logic for that piece of content (javascript logic for example)

example of how the logic works.
App.js has jsx code what is basically hte html code (but a bit different)
index.js assigns the 'html' of app.js to what has the id called root

If the user is using an older version of react (for example version 16)
they need to have on top of the App.js file:
    ```import React from 'react'```

on the end off the App.js file you need (in this case the function is called App) to import it into index.js
```
export default App;
```

# Dynamic values in templates
only thing to note is that you can not use booleans and objects as variables in template
Example of code using both

```
import './App.css';

function App() {
  const title = 'mrrp mrow nyaa!';
  const sillycounter = 9000;
  const link = 'https://github.com/';
  
  return (
    <div className="App">
      <div className="content">
        <h1>{title}</h1>
        <p>acted silly: {sillycounter}</p>

        <p>{10}</p>
        <p>{'haiiii'}</p>
        <p>{[1,2,3,4,5]}</p>
        <p>{Math.random() * 10}</p>

        <a href={link}>github link</a>
      </div>
    </div>
  );
}

export default App;

```
# Multiple components
(tip install Simple React Snippets (vscode extension))
Root components is on top of the tree and will be the first thing that gets rendered
let's say App.js is the root component, if you have a navbar, the navbar needs to get nested in App.js
Here a image to show you a example
![alt text](<Screenshot 2026-05-18 162705.png>)
type sfc and then press tap in for example Navbar.js to instantly create a basic stateless functional component