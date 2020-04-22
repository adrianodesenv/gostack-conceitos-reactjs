import React,{useState, useEffect} from "react";

import "./styles.css";

import api from './services/api';

function App() {

  const [repositories, setRepositories] = useState([]);
  useEffect(() =>{
    api.get("/repositories").then((response) =>{
      setRepositories(response.data);
    })
  },[])
  async function handleAddRepository() {
    const response = await api.post("/repositories",{
      url: "https://github.com/adrianodesenv",
      title: `Desafio ReactJS ${Date.now()}`,
      techs: ["React", "Node.js"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`/repositories/${id}`);
    
    if(response.status === 204){
      const rep = repositories.filter( rep => rep.id !== id) ;
      setRepositories(rep);
    }
    else{
      alert("Houve um erro ao deletar!");
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      
        {repositories.map((rep) => 
          <li key={rep.id}>{rep.title}
          <button onClick={() => handleRemoveRepository(rep.id)}>
            Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
