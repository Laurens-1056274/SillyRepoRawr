# Setup basic project
Follow the following commands to setup a basic project using react

#### Step 0
```
cd ExampleFolder
```
move to a folder you want to create this project in (this is not needed when you do step 1 in VScode)

#### Step 1
```
npx create-react-app rawr
```
rawr in this case is the name of the project, if you do it in VScode directly, the rest of the steps are unnecesary

#### Step 2
```
cd rawr
```
move to the project folder

#### Step 2
```
cd rawr
```

#### Step 3
```
code .
```
enter VScode in current directionary (in this case rawr)

# Project Overwieuw

###  So what do you have now?
This bit here will explain what what is~

#### Node modules
This is where all our project dependencies live, including the react library as well as other package or library we need to install
for the projet later on is gonna live in this folder. You don't really ever need to go inside this folder, just know that it is there.

#### public folder
all the files public to the browser are going to live here, including the index.html file

#### src folder
biggest part of code you write with react is going  inside this source folder (for example our react components are gonna live here)


#### Package.json
list all dependencies of the application (all what the project depends on(which all live in node modules))

# Prievieuw project in browser

Open terminal, run script

```
npm run start
```

if for some reason 'node_modules' is missing, the application will return errors and not run.
To fix this use

```
npm install
```
