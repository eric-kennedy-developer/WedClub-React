
import React, { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';

import editsvg from './svg/edit.svg';
import closesvg from './svg/close.svg';

import './App.css';
import './css/bootstrap.css';
import './css/style.css';

function App() {

  const [error, setError] = useState(null);
  
  const [users, setUsers] = useState([]);

  const [exibirModal, setExibirModal] = useState(null);

  const [titleModal, setTitleModal] = useState();
  const [btnSubmit, setBtnSubmit] = useState();

  const [actionForm, setActionForm] = useState();
  const [methodForm, setMethodForm] = useState(null);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const ModalEditarUsuario = (user) => {
    LimparCampos();
    setTitleModal("Editar");
    setBtnSubmit("Editar");
    setActionForm("http://127.0.0.1:8000/api/user/" + user.id);
    setMethodForm("PUT");
    setName(user.name);
    setEmail(user.email);
    abrirModal();
  };

  const ModalCadastrarUsuario = () => {
    LimparCampos();
    abrirModal();
  };

  const LimparCampos = () => {
    setActionForm("http://127.0.0.1:8000/api/user");
    setMethodForm("POST");
    setTitleModal("Cadastrar");
    setBtnSubmit("Cadastrar");
    setFotoPerfil(null);
    setName(null);
    setEmail(null);
    setPassword(null);
  };

  const handleFotoPerfil = (event) => {
    setFotoPerfil(event.target.files.item(0));
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const fecharModal = () => setExibirModal(false);
  const abrirModal = () => setExibirModal(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    var data = new FormData();
    data.append('foto_perfil', fotoPerfil);
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);

    if(methodForm == "PUT")
    {
      data.append('_method', "PUT");
    }
    
    const Options = {
      method: "POST",
      body: data
    };
    
    fetch(actionForm, Options)
      .then(res => res.json())
      .then(
        (result) => {
          if(result.data && result.data.id)
          {
            alert("Usuário salvo com sucesso");
            document.location.reload(true);
          }
          else{
            alert(JSON.stringify(result, null, 4));
          }
        },
        (error) => {
          alert("Error: " + error);
        }
      );
  }

  const ExcluirUsuario = (id) => {
    
    var data = new FormData();
    data.append('id', id);
    
    const Options = {
      method: 'DELETE',
      body: data
    };

    
    fetch("http://127.0.0.1:8000/api/user/" + id, Options)
      .then(res => res.json())
      .then(
        (result) => {
          if(result.msg)
          {
            alert("Registro excluído com sucesso");
            document.location.reload(true);
          }
          else{
            alert(JSON.stringify(result, null, 4));
          }
        },
        (error) => {
          alert("Error: " + error);
        }
      );
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users")
      .then(res => res.json())
      .then(
        (result) => {
          setUsers(result.data);
        },
        (error) => {
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
      
      

      <Modal show={exibirModal} onHide={fecharModal}>
        <form method="POST" action={actionForm} enctype="multipart/form-data" onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{titleModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <div className="form-group">
            <label className="col-form-label">Foto de Perfil:</label>
            <input type="file" className="form-control" id="foto_perfil" name="foto_perfil" onChange={handleFotoPerfil}  required />
          </div>
          <div className="form-group">
            <label className="col-form-label">Nome:</label>
            <input type="text" className="form-control" id="name" name="name" value={name} onChange={handleName} required />
          </div>
          <div className="form-group">
            <label className="col-form-label">Email:</label>
            <input type="email" className="form-control" id="email" name="email" value={email} onChange={handleEmail} required />
          </div>
          <div className="form-group">
            <label className="col-form-label">Senha:</label>
            <input type="password" className="form-control" id="password" name="password" value={password} onChange={handlePassword} required />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModal}>
            Fechar
          </Button>
          <Button variant="primary" type="submit">
            {btnSubmit}
          </Button>
        </Modal.Footer>
        </form>
      </Modal>

      <div className="container-fluid">
      
        

        <div className="row pt-5 text-center">
          <div className="col-12">
            <h1>Usuários</h1>
          </div>
          <div className="col-12">
            <Button variant="primary" onClick={ModalCadastrarUsuario}>
              Cadastrar
            </Button>
          </div>
        </div>

        <div className="row pb-5">


        {users.map(user => (
          
          <>
          <div className="col-md-4 col-6 pt-5" key={user.id}>
            <div className="card parent">
              <img className="card-img-top" src={"http://localhost:8000/profile/" +  user.foto_perfil} alt={user.name} />
              <div className="card-body">
                {user.name == "Eric Kennedy" ? <div className='Recem_Contratado'>Recém-contratado</div> : ""}
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <button type="button" className="btn btn-primary btnEditar" onClick={() => {ModalEditarUsuario(user);}}>
                  <img src={editsvg} />
                </button>
                <button type="button" className="btn btn-danger btnExcluir" onClick={()=>{ExcluirUsuario(user.id)}}>
                  <img src={closesvg} />
                </button>
              </div>
            </div>
          </div>
          </>

        ))}


        </div>
      </div>
      </>
    );
  }
}

export default App;
