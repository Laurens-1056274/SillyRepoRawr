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

# React developer tools
install React developer tools as an extension for your browser for more information when you inspect the page

# Outputting list
example below:
```
import { useState } from "react"

const Home  = () => {
  const [blogs, setBlogs] = useState([
    { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
    { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
    { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
  ]);

    return ( 
        <div className='home'>
            {blogs.map((blog) =>(
                <div className="blog-preview" key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>

                </div>

            ))}
        </div>
     );
}
export default Home;

```
# Props / reusuing components
this gets used to make a piece of code you use multiple times reusable (think of pyton defs/classes)
in this example you will see 2 snippets, snippet one one Home.js, that uses Bloglist.js

Home.js
```
import { useState } from "react"
import BlogList from "./BlogList";

const Home  = () => {
  const [blogs, setBlogs] = useState([
    { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
    { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
    { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
  ]);
    return ( 
        <div className='home'>
            <BlogList blogs={blogs} title="all blogs!"></BlogList>
            // if you only want mario's data
            <BlogList blogs={blogs.filter((blog) => blog.author === 'mario')} title="Mario's blogs!"></BlogList>
        </div>
     );
}
export default Home;

```

Bloglist.js
```
const BlogList = ({blogs, title}) => {
    return ( 
        <div className="blog-list">
            <h2>{title}</h2>
            {blogs.map((blog) =>(
            <div className="blog-preview" key={blog.id}>
                <h2>{blog.title}</h2>
                <p>Written by {blog.author}</p>
            </div>
        ))}
        </div>
    );
}
export default BlogList;

```
# functions as props
This code deletes a blog when the button gets clicked

Home.js
```
import { useState } from "react"
import BlogList from "./BlogList";

const Home  = () => {
  const [blogs, setBlogs] = useState([
    { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
    { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
    { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
  ]);
  // doing it like this makes it so the data doesnt get changed
  const hanleDelete = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);

  }
    return ( 
        <div className='home'>
            <BlogList blogs={blogs} title="all blogs!" hanleDelete={hanleDelete}></BlogList>
        </div>
     );
}
export default Home;
```

Bloglist.js
```
const BlogList = ({blogs, title, hanleDelete}) => {
    return ( 
        <div className="blog-list">
            <h2>{title}</h2>
            {blogs.map((blog) =>(
            <div className="blog-preview" key={blog.id}>
                <h2>{blog.title}</h2>
                <p>Written by {blog.author}</p>
                <button onClick={() => hanleDelete(blog.id)}>delete blog</button>
            </div>
        ))}
        </div>
    );
}
export default BlogList;
```
# UseEffect (the basics)
useffect hook is a way too run code on every render. You need to import on the top of the file just like useState
example:
```
import { useEffect } from "react"
```
This can be used for example fetching data

# useEffect Dependencies
dependency array gets used when you dont want the code to run after EVERY single render. maybe only after certain renders
## If you want to run it everytime:
```
    useEffect(() => {
        // be carefull of not making infinite loops while using this
        console.log('use effect ran')
    });
```
## If you want to run it only after first initial render
```
    useEffect(() => {
        // be carefull of not making infinite loops while using this
        console.log('use effect ran')
    }, []);
    
```
## If you want to run it after value changes
```
    useEffect(() => {
        // be carefull of not making infinite loops while using this
        console.log('use effect ran')
    }, [name]);
```

### code used for userEffect dependancies
```
import { useState, useEffect } from "react"
import BlogList from "./BlogList";

const Home  = () => {
  const [blogs, setBlogs] = useState([
    { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
    { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
    { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
  ]);

  const [name, setName] = useState('Mario')

  const hanleDelete = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs)};

    useEffect(() => {
        // be carefull of not making infinite loops while using this
        console.log('use effect ran')
        console.log(name)
    }, [name]);

    return ( 
        <div className='home'>
            <BlogList blogs={blogs} title="all blogs!" hanleDelete={hanleDelete}></BlogList>
            <button onClick={() => setName('Luigi')}>change name inside button</button>
            <p>{name}</p>
        </div>
     );
}
export default Home;
```
# Using Json server
create data folder containing db.json in the root folder, then run the follwoing commands in the terminal
(I have rawr because it is that file, oopies >///<)
```
npx json-server --watch rawr/data/db.json --port 8000
```
some of the endpoints the json server will provide you with:

    /blogs          GET         Fetch all blogs
    /blogs/{id}     GET         Fetch a single blog
    /blogs          POST        Add a new blog
    /blogs          DELETE      Delete a blog

# Fetching data with useEffect
here a example of fetching data using useEffect (to run this dont forget to use the command )
```
import { useEffect, useState } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/blogs')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setBlogs(data);
      })
  }, [])

  return (
    <div className="home">
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
}
 
export default Home;
```
# Condintial laoding message
it is nice do display a message while your data is getting fetched, so the user knows that something is loading

The lines ```const [isPending, setIsPending] = useState(true);```, ```setIsPending(false)``` and
```{isPending && <div>Loading...</div>}``` are the important lines, beneath the whole code

```
import { useEffect, useState } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState(null)
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/blogs')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setBlogs(data);
        setIsPending(false)
      })
  }, [])

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="all blogs!" />}
    </div>
  );
}
 
export default Home;
```
# Handling fetch errors
the code beneath will display a error message if there is a error, and make the loading dissapear:
```
import { useEffect, useState } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState(null)
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/blogs')
      .then(res => {

        if (!res.ok) {
          throw Error('could not fetch data for that resource QwQ')
        };
        return res.json();
      })
      .then(data => {
        setBlogs(data);
        setIsPending(false);
        setError(null);
      })
      .catch(err => {
        setIsPending(false);
        setError(err.message);
      })
  }, [])

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="all blogs!" />}
    </div>
  );
}
 
export default Home;
```
# Making custom hooks
this is the way too save code you are gonna re-use in different files (for example error handlings)
custum hooks need to start with 'use' for example:
```
const useFetch = () => {}
```

beneath here there will be 2 snippets of code, snippet one will be the code i will re-use
code 2 will be the file i import the re-usable code

code 1
```
import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(url)
        .then(res => {

            if (!res.ok) {
            throw Error('could not fetch data for that resource QwQ')
            };
            return res.json();
        })
        .then(data => {
            setData(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message);
        })
    }, [url])
    return {data, isPending, error}
}
export default useFetch;
```

code 2
```
import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const {data: blogs, isPending, error} = useFetch('http://localhost:8000/blogs')
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="woomy ^w^" />}
    </div>
  );
}
 
export default Home;

```
# The React router
to use this we need to installreact router package using:
@5 means version 5 (the version the tutorial uses)
```
npm install react-router-dom@5
```
here is a basic App.js with a route that when you go to "/" displays Home.js
```
import Navbar from './Navbar';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {

  return (
    <Router>
    <div className="App">
      <Navbar></Navbar>
      <div className="content">
        <Switch>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;

```
# Exact Match Routes
If you want the route to check if it is exactly how it is written, use ```exact path``` instead of ```path```
example of code using a exact route
```
  <div className="content">
    <Switch>
      <Route exact path="/">
        <Home></Home>
      </Route>

      <Route exact path="/create">
        <Create></Create>
      </Route>
    </Switch>
  </div>
```
## IMPORTANT!!!
this code still makes request to the server, we have to use special react router links if we don't want that

# Router links
Beneath a example of how to use router links
```
import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className='navbar'>
            <h1>My silly little blog</h1>
            <div className='links'>
                <Link to = "/">Home</Link>
                <Link to = "/create">New blog</Link>
            </div>
        </nav>
     );
}
export default Navbar;
```
This code is in Navbar.js. before router links it used <a> instead of <Link>
now the code doesnt make a request to the server

# useEffect cleanup
you want the useFetch to stop running when you quickly swap to a different page. to do this we use a combination of a abort controller and a useEffect hook
```
    import { useState, useEffect } from "react";

    const useFetch = (url) => {
        const [data, setData] = useState(null);
        const [isPending, setIsPending] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const abortCont = new AbortController();

            fetch(url, {signal: abortCont.signal})
            .then(res => {
                if (!res.ok) {
                throw Error('could not fetch data for that resource QwQ')
                };
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            })
            return () => abortCont.abort();
        }, [url])
        return {data, isPending, error}
    }
    export default useFetch;
```
# Route parameters
a route parameter is the changable part in the route. it's like a variable in a route
the route in App.js will ook something like this:  (after the : is a name you can give it, in this case i called it id)
```
  <Route exact path="/blogs/:id">
    <Create></Create>
  </Route>
```
BlogDetails (extra info over said blog) looks like this:
```
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const BlogDetails = () => {
    const {id} = useParams();
    return ( 
        <div className="blog-details">
            <h2>Blog Details - {id}</h2>
        </div>
     );
}
export default BlogDetails;
```
To make the BlogList acces BlogDetails.js by using a link. code looks like this (BlogList.js)
```
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const BlogList = ({blogs, title}) => {
    return ( 
        <div className="blog-list">
            <h2>{title}</h2>
            {blogs.map((blog) =>(
            <div className="blog-preview" key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                </Link>
            </div>
        ))}
        </div>
    );
}
export default BlogList;
```
# Reusing custom hooks
Here a example where i re-use the useFetch
```
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);

  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;
```
# Controlled input forms
this is the way to save the user data in a state (for example to save their username when they put it in a textfield)
(this one does not submit anything yet, this only tracks)
```
import { useState } from "react";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    return ( 
        <div className="create">
            <h2>Add a new Block</h2>
            <form>
                <label>Blog Title:</label>
                <input 
                    type='text'
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></input>

                <label>Blog Body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>

                <label>Blog Author</label>
                <select 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value='Mario'>mario</option>
                    <option value='Yoshi'>yoshi</option>
                </select>
                <button>Add block</button>
                <p>{title}</p>
                <p>{body}</p>
                <p>{author}</p>
            </form>
        </div>
     );
}
export default Create;
```

# Submitting a form
there are multiple ways to do this, you can either attach a click event to the submit button, or
react to the submit event
the only thing that changes is this (this however does not post the data anyware)
```
  const handeSubmit = (e) => {
      e.preventDefault();
      const blog = {title, body, author};
      console.log(blog);
  };
  return ( 
      <div className="create">
          <h2>Add a new Block</h2>
          <form onSubmit={handeSubmit}>
```

# Making a POST request
this is a example of posting data. The content data in this case is JSON
```
import { useState } from "react";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIsPending] = useState(false);

    const handeSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author};
        setIsPending(true);
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() =>{
            console.log('new blog added');
            setIsPending(false);
        })
    };
    return ( 
        <div className="create">
            <h2>Add a new Block</h2>
            <form onSubmit={handeSubmit}>
                <label>Blog Title:</label>
                <input 
                    type='text'
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></input>

                <label>Blog Body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>

                <label>Blog Author</label>
                <select 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value='Mario'>mario</option>
                    <option value='Yoshi'>yoshi</option>
                </select>
                { !isPending && <button>Add blog</button>}
                { isPending && <button disabled>Add blog....</button>}
                <p>{title}</p>
                <p>{body}</p>
                <p>{author}</p>
            </form>
        </div>
     );
}
export default Create;
```