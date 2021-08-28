import React, { useEffect, useState } from "react";

import editsvg from './svg/edit.svg';
import closesvg from './svg/close.svg';

import './App.css';
import './css/bootstrap.css';
import './css/style.css';


function App() {

  const [error, setError] = useState(null);
  
  const [users, setUsers] = useState([]);

  // Nota: O array [] deps vazio significa
  // este useEffect será executado uma vez
  // semelhante ao componentDidMount()
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users")
      .then(res => res.json())
      .then(
        (result) => {
          //alert(result.data[0].name); // Eric Kennedy
          setUsers(result.data);
        },
        // Nota: é importante lidar com errros aqui
        // em vez de um bloco catch() para não receber
        // exceções de erros reais nos componentes.
        (error) => {
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className="container-fluid">
        <div className="row">


        {users.map(user => (

          <>
          <div className="col-md-4 col-6 pt-5" key={user.id}>
            <div className="card parent">
              <img className="card-img-top" src={"http://localhost:8000/profile/" +  user.foto_perfil} alt={user.name} />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <button type="button" className="btn btn-primary btnEditar">
                  <img src={editsvg} />
                </button>
                <button type="button" className="btn btn-danger btnExcluir">
                  <img src={closesvg} />
                </button>
              </div>
            </div>
          </div>
          </>

        ))}


        </div>
      </div>
    );
  }
}

export default App;
