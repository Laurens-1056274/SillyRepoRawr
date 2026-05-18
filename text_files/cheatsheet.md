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

# adding styles
normally importing css will not only style what is in that component, but also anything else that gets displayed at that page at that time.
(you can use css modules to scope or styled components)

having multiple css files is basically just an organization thing. for this project or other small projetcs you only need index.css
Here a example of how to do inline styling:
```
const Navbar = () => {
    return ( 
        <nav className='navbar'>
            <h1>My silly little blog</h1>
            <div className='links'>
                <a href = "/">Home</a>
                <a href = "/create" style={{
                    color: "",
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}
                >New blog</a>
            </div>
        </nav>
     );
}
export default Navbar;

```

# click events
beneath an example of how to use a click event ^^
```
// use sfc tab to create a basic start
const Home  = () => {
    // the e displays properties of the event
    const handeClick = (e) => {
        console.log('haiiiii!', e)
    }
    const handeClickAgain = (name) => {
        console.log('haiiiii! ' + name)
    }
    return ( 
        <div className='home'>
            <h2>Homepage wauw ^w^</h2>
            <button onClick={handeClick}>Click me UwU</button>
            <button onClick={( ) => handeClickAgain('cutie~')}>Click me UwU</button>
        </div>
     );
}
export default Home;
```

# using state
when we talk about a state of a component we talk about the data being used in the component at that time (any data our component uses)
We use a hook (use state) to make a reactive value and a way too change the value wenever we want
Exaple of how to use it:
``` 
import { useState } from "react"

const Home  = () => {
    const [name, setName] = useState('SillyCarUmU');
    const [age, setAge] = useState(5)

    const handeClick = () => {
        setName('BoringHuumon');
        setAge(20)
    }
    return ( 
        <div className='home'>
            <h2>Homepage wauw ^w^</h2>
            <p>{name} is {age} years old</p>
            <button onClick={handeClick}>Click me UwU</button>
        </div>
     );
}
export default Home;
```