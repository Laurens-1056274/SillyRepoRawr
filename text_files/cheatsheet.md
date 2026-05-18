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