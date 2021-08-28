import editsvg from './svg/edit.svg';
import closesvg from './svg/close.svg';

import './App.css';
import './css/bootstrap.css';
import './css/style.css';

import { BrowserRouter, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="container-fluid">
      <div className="row">



      <div className="col-md-4 col-6 pt-5" id="82">
        <div className="card parent">
          <img className="card-img-top" src="http://localhost:8000/profile/6b4fc82df8aaac3514ce51fdc46e123c.jpg" alt="Wellmmer" />
          <div className="card-body">
            <h5 className="card-title">Wellmmer</h5>
            <p className="card-text">wellmmer@wedclub.com.br</p>
            <button type="button" className="btn btn-primary btnEditar">
              <img src={editsvg} />
            </button>
            <button type="button" className="btn btn-danger btnExcluir">
              <img src={closesvg} />
            </button>
          </div>
        </div>
      </div>



      </div>
    </div>
  );
}

export default App;
