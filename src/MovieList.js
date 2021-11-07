import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DisplayMovie } from "./DisplayMovie";
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import "./style.css"


export function MovieList() {
  let style = {paddingLeft : "20px"}
  const [moviesList, setMoviesList] = useState([]);
  useEffect(()=>{
    fetch('https://6188ad38d0821900178d748d.mockapi.io/movies')
    .then(data => data.json())
    .then(movies => setMoviesList(movies))
  }, [])
  return (
    <div>
      <li style = {style} type = "none">
        <Link to = "/AddMovie">Add Movie</Link>
      </li>
      <div className="movie-list">
        {moviesList.map((e) => (
          <DisplayMovie key={e.id}
            className="main-content"
            name={e.name}
            img={e.poster}
            rating={e.rating}
            summary={e.summary}
            id = {e.id} />
        ))}
      </div>
    </div>
  );

}

export function AddMovie() {
  const [moviesList, setMoviesList] = useState([]);
  const [name, setName] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");
  const [summary, setSummary] = useState("");
  let data = { name, poster, rating, summary }; // when key n value's variable name are same example {name : name, poster: poster} then it can be written as {name, poster}}
  const history = useHistory();
  useEffect(()=>{
    fetch('https://6188ad38d0821900178d748d.mockapi.io/movies')
    .then(data => data.json())
    .then(movies => setMoviesList(movies))
  }, [])

  let setMovie = () => {
    
      fetch('https://6188ad38d0821900178d748d.mockapi.io/movies', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
      }
      }).then(data => data.json())
      .then(dataJson => {if(dataJson.ok) {
        history.push("/Movies")
      }});
   


    setMoviesList([...moviesList, data]);
    setName("");
    setPoster("");
    setRating("");
    setSummary("");
  };
  return(
    <div>
      <div className="inputCollection">
        <TextField value={name} id="outlined-basic" label="name" variant="outlined" onChange={(event) => setName(event.target.value)} />
        <TextField value={poster} id="outlined-basic" label="img" variant="outlined" onChange={(event) => setPoster(event.target.value)} />
        <TextField value={rating} id="outlined-basic" label="rating" variant="outlined" onChange={(event) => setRating(event.target.value)} />
        <TextField value={summary} id="outlined-basic" label="summary" variant="outlined" onChange={(event) => setSummary(event.target.value)} />
        <Button variant="contained" onClick={setMovie}>Add Movies</Button>
      </div>
    </div>

  );
}
  
