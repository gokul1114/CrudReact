import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


export default function EditMovies() {
    let {id}= useParams();
    console.log(id)
    let history = useHistory();
    const[movie, setMovie] = useState({});
    // let setMovie = () => {
    //     setMoviesList(moviesList);
    //     // history.push("/Movies");
    
    //   };
    useEffect(()=>{
      fetch('https://6188ad38d0821900178d748d.mockapi.io/movies/'+id)
      .then(data => data.json())
      .then(movie => {
        console.log(movie)
        setMovie(movie)})

    }, [])
    
    let updateData = () => {
      fetch('https://6188ad38d0821900178d748d.mockapi.io/movies/'+id,
      {
      method : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
      })
      .then(data => data.json())
      .then(movies => history.push("/Movies"))
    }
    console.log(movie.name)
    const [name, setName] = useState(movie.name);
    const [poster, setPoster] = useState(movie.poster);
    const [rating, setRating] = useState(movie.rating);
    const [summary, setSummary] = useState(movie.summary); 
    // let moviesListCopy = moviesLis
     let data = { name, poster, rating, summary };
    // setMoviesList(moviesListCopy);
  return (
<div>
      <div className="inputCollection">
        {console.log(data)}
        <TextField value={name} id="outlined-basic" label="name" variant="outlined" onChange={(event) => setName(event.target.value)} />
        <TextField value={poster} id="outlined-basic" label="img" variant="outlined" onChange={(event) => setPoster(event.target.value)} />
        <TextField value={rating} id="outlined-basic" label="rating" variant="outlined" onChange={(event) => setRating(event.target.value)} />
        <TextField value={summary} id="outlined-basic" label="summary" variant="outlined" onChange={(event) => setSummary(event.target.value)} />
        <Button variant="contained" onClick = {updateData}>Done</Button> 
  </div>
</div>
  );
}
