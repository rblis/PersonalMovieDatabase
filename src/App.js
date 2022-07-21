import './App.css';
import Shelf from './shelf.js'
import axios from 'axios'
import {useEffect, useState} from 'react'

function App() {
    function Movie(name, year, genre, id, pic) {
        this.name = name;
        this.year = year;
        this.genre = genre;
        this.id = id
        this.pic = pic;
    }
    var id = 1;
    // const [movies, setmovies] = useState(
    //     [
    //         new Movie('Dune', 2021, 'Sci-Fy', id++, 'https://m.media-amazon.com/images/I/61f9Y5HG3IL._AC_SL1030_.jpg'),
    //         new Movie('Man of Steel', 2013, 'Action',id++, 'https://m.media-amazon.com/images/M/MV5BMTk5ODk1NDkxMF5BMl5BanBnXkFtZTcwNTA5OTY0OQ@@._V1_FMjpg_UX1000_.jpg'),
    //         new Movie('Lego Movie', 2014, 'Adventure',id++, 'https://m.media-amazon.com/images/M/MV5BMTg4MDk1ODExN15BMl5BanBnXkFtZTgwNzIyNjg3MDE@._V1_.jpg'),
    //         new Movie('The Pianist', 2002, 'War', id++, 'https://m.media-amazon.com/images/M/MV5BOWRiZDIxZjktMTA1NC00MDQ2LWEzMjUtMTliZmY3NjQ3ODJiXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg"'),
    //         new Movie('Pulp Fiction', 1994, 'Drama', id++, 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg'),
    //         new Movie('300', 2006, 'War', id++, 'https://m.media-amazon.com/images/M/MV5BMTg3OGRkY2YtNDRiMS00MTZkLWE1YjctMTE3OGZhZmFkZjA3XkEyXkFqcGdeQXVyNDA5NTgxNjU@._V1_.jpg'),
    //         new Movie('Legally Blonde', 2002, 'Comedy', id++, 'https://m.media-amazon.com/images/M/MV5BNTEyNjUwMTkxMV5BMl5BanBnXkFtZTcwNjk0NDk0NA@@._V1_.jpg'),
    //     ]
    // );
    
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    var page = 1;
    var total_pages = 1;
    
    const deleteMovie = (id) => {
        console.log('delete', id);
        setMovies(movies.filter((movie) => movie.id != id));
    }
    

    const getSearch = async (page_num = 1) => {
        let xx = 'c16757326823b21717940e69d88d8c02';
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_APIKEY}&language=en-US&query=${search}&page=${page_num}&include_adult=true`
        );
        setMovies(prev => ([...prev, ...data.results.filter((movie) => (movie.release_date != null  && movie.release_date.length > 4 && movie.poster_path != null && movie.genre_ids != null))]));
        
        return [data.page, data.total_pages];
        
    }
    async function doSearch(){
        var results = await getSearch(page);
        //results = await getSearch(2);
        //setTimeout(() => {getSearch(2);}, 4000);
        //results = await getSearch(2);
        //console.log(movies);
        // for (var k = curr_page+1; k < 5; k++){
        //     await getSearch(k);
        // }
    }



    useEffect(() => {
        if(search !== ''){
            setMovies([]);
            const timeID = setTimeout(() => doSearch(), 500);
            return () => clearTimeout(timeID);
        }
        
    }, [search]);

    useEffect(() => {},[movies]);


        
    

    return (
        <div className="App">   
            
            <div style ={{marginTop: '2.5em'}}>
                <input id='searchbar' className="search_bar" type="text" onChange={event => setSearch(event.target.value)} placeholder="Search for movies to add"></input>
 
            </div>
            

            <div style={{margin: '5em'}}>
                
                {movies.length > 0 ? (
                <div className="card_shelf">
                    <Shelf movies={movies} onDelete={deleteMovie}/>
                </div>
                ) : (
                <>
                    <div >
                        <h1 className='search_msg'>{search == "" ? "Find movies using the search bar" : "No movies found for the query \'" + search + "\'"}</h1>
                        <hr/>
                        <h2 className='search_msg'>Library is empty!</h2>
                    </div>
                        
                </>
                )}     

                
            </div>
        </div>
    );
}

export default App;
