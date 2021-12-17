import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';

function App() {
  const [tags, setTags] = useState([])
  const [inputTag, setInputTag] = useState("")

  useEffect(() => {
    getTags()
  }, [])

  function getTags() {
    axios.get(process.env.API_URL + "/tags")
    .then(res => {
      setTags(res.data)
    })
  }

  function deleteTag(id) {
    console.log(`Tag ${id} supprimé!`);

    axios.delete(process.env.API_URL+ "/tags" + id)
    .then(res => {
      console.log(res)
      getTags();
    });
  }

  function addTag(event) {
    event.preventDefault();
    console.log("Formulaire soumis");

    let newTag = {name: inputTag};
    axios.post(process.env.API_URL + "/tags", newTag)
    .then(res => {
      console.log(res);
      getTags();
    })
  }

  function handleInputTag(event) {
    setInputTag(event.target.value)
  }

  return (
    <div className="App">
      <h1>Mes tags de la mort!</h1>

      <form onSubmit={addTag}>
        <input type="text" value={inputTag} onChange={handleInputTag} />
        <button type="submit">OK</button>
      </form>

      <ul>
        {tags.map(tag => (
          <li key={tag.id}>
            {tag.name}
            <button onClick={() => deleteTag(tag.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
