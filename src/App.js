import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  console.log(repositories);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositorio novo ${Date.now()}`,
      url: "https://github.com/Rocketseat/umbriel",
	    techs: ["Node", "ReactJS", "Express", "TypeScript"]
    })

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepository = repositories.filter(
      repository => repository.id !== id
    )

    setRepositories(newRepository);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li> 
          ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;