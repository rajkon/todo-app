import React, { useState, useEffect } from 'react';

import Navbar from './components/navbar'
import TodoList from './components/todolist'
import TodoInput from './components/TodoInput'

import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './redux';

// import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";


const App = () => {

  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );

  // initialize our state
  let initState = {
    data: [],
    id: 0,
    name: null,
    genre: null,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };
  const [state, setState] = useState(initState);
  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  useEffect(() => {
    async function getDataFromDb() {
      await fetch('http://localhost:8080/getData')
        .then((data) => data.json())
        .then((res) => setState({ data: res.data }));
    };

    getDataFromDb().then((err) => console.log('err getData:' + err));
  }, []);

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base


  // our delete method that uses our backend api
  // to remove existing database information
  const deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    state.data.forEach((dat) => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:8080/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  const updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    state.data.forEach((dat) => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:8080/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };
  const { data } = state;
  return (
    <Provider store={store}>
      <div>
        <div>
          {/* <Navbar /> */}
          <TodoInput/>
          <TodoList />
          {/* <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul> */}
        </div>

        <div>
          <ul>
            {(data === null) | data === undefined | data === '' ?
              'NO DB ENTRIES YET'
              : data.map((dat) => (
                <li style={{ padding: '10px' }} key={data.message}>
                  <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                  <span style={{ color: 'gray' }}> data: </span>
                  {dat.message}
                </li>
              ))}
          </ul>
          <div style={{ padding: '10px' }}>
            <input
              type="text"
              onChange={(e) => setState({ message: e.target.value })}
              placeholder="add something in the database"
              style={{ width: '200px' }}
            />
            <button>
            {/* <button onClick={() => putDataToDB(state.message)}> */}
              ADD
          </button>
          </div>
          <div style={{ padding: '10px' }}>
            <input
              type="text"
              style={{ width: '200px' }}
              onChange={(e) => setState({ idToDelete: e.target.value })}
              placeholder="put id of item to delete here"
            />
            <button onClick={() => deleteFromDB(state.idToDelete)}>
              DELETE
      </button>
          </div>
          <div style={{ padding: '10px' }}>
            <input
              type="text"
              style={{ width: '200px' }}
              onChange={(e) => setState({ idToUpdate: e.target.value })}
              placeholder="id of item to update here"
            />
            <input
              type="text"
              style={{ width: '200px' }}
              onChange={(e) => setState({ updateToApply: e.target.value })}
              placeholder="put new value of the item here"
            />
            <button
              onClick={() =>
                updateDB(state.idToUpdate, state.updateToApply)
              }
            >
              UPDATE
      </button>
          </div>
        </div>
      </div>
    </Provider>);
}

export default App








