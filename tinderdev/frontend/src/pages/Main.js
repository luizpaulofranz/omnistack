import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api'

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

import './Main.css';

// props passed by react-router-dom
export default function Main({ match }) {

  const [ users, setUsers ] = useState([]);

  // another react hook to use life-cycle methods
  // first param is the function that we want to execute
  // second is WHEN to execute the first param, is an array, and always that variables in array are changed, the first method is executed again
  // if second param is an empty array, it will be executed only once, like componentDidMount =D
  useEffect(() => {
    // this is the recomended way to handle async funcs
    async function loadUsers() {
      // mounting our API request
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id
        }
      });
      // and here we use the state hook
      setUsers(response.data);
    }

    loadUsers();
  }, [match.params.id]); // always when the passed ID change, we will execute the above function again

  async function handleLike(id) {
    // in post requests, second argument is the body, the third is header, which is what we need =D
    await api.post(`/devs/${id}/likes`, null, {
      headers: {
        user: match.params.id
      }
    });

    setUsers( users.filter( user => user._id !== id) )
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: {
        user: match.params.id
      }
    });
    setUsers( users.filter( user => user._id !== id) )
  }

  if ( users.length <= 0 ) {
    return (
      <div className="main-container">
        <Link to="/"><img src={logo} alt="Tindev" /></Link>
        <div className="empty">Acabou! :(</div>
      </div>
    )
  }

  return (
    <div className="main-container">
      <Link to="/"><img src={logo} alt="Tindev" /></Link>
      <ul>
        { users.map( user => (
          <li key={user._id}>
            <img src={user.avatar} alt={user.name} />
            <footer>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
            </footer>
            <div className="buttons">
              <button type="button" onClick={ () => handleDislike(user._id)}>
                <img src={dislike} alt="Disike" />
              </button>
              <button type="button" onClick={ () => handleLike(user._id)}>
                <img src={like} alt="Like" />
              </button>
            </div>
          </li>
        ) ) }
      </ul>
    </div>
  );
}
