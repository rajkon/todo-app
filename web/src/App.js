import React, { useState, useEffect } from 'react';

import Navbar from './components/navbar'
import TodoList from './components/todolist'
import axios from 'axios';





const App = () => {

  //const [data, setData] = useState({ hits: [] });
  const [hasUserLoginError, setUserLoginErrors] = useState(true);
  const [user, setUser] = useState({});


  useEffect(() => {
    async function fetchData(err, resp) {
      const result = await axios.get(
        'http://localhost:8080/user'
      );
      setUser(result.data);
      setUserLoginErrors(false);
      console.log(JSON.stringify(result.data));
    }
    fetchData().catch(err => {
      setUserLoginErrors(true);
    });
  }, []);



  // useEffect( async () => {
  //     const result = await axios(
  //       'https://hn.algolia.com/api/v1/search?query=redux'
  //     );
  //     console.log(result.data);
  //     setUser(result.data);

  // async function fetchData() {
  //   await axios.get('http://localhost:8080/user')
  //     .then((err, response) => {
  //       console.log('response as it is: ' + response);
  //       console.log('result from api : ' + JSON.stringify(response));
  //       setUser(response);
  //       setUserLoginErrors(false);
  //     })
  //     .catch(err => {
  //       setUserLoginErrors(err);
  //       console.log('err obj : ' + err);

  //       console.log('err : ' + JSON.stringify(err));
  //     });
  // };
  // fetchData();
  // }, []);


  return (
    <div>
      <h6>Hi !!! {user.name? (<p> {user.name} </p>) : (<p></p>)}</h6>
      {hasUserLoginError ? (<p> Please login with correct username and password</p>) : (<p> logged in</p>)}
      <Navbar />
      <TodoList />
      {/* <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default App