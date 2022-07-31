import './App.css';
import Shelf from './Shelf.js'
import axios from 'axios'
import {useEffect, useRef, useState} from 'react'


const loadLibrary = axios.get('https://pmdb-backend.herokuapp.com/api/library').then(({data}) => data)

function App() {

    var id = 1;
    
    const [movies, setMovies] = useState([]);
    const [library, setLibrary] = useState(() => {
        return []
    });
    const [search, setSearch] = useState('');
    const updoot = useRef(false);
    var page = 1;
    var total_pages = 1;
    
    const deleteMovie = (id) => {
        setMovies(movies.filter((movie) => movie.id != id));
    }
    

    const getSearch = async (page_num = 1) => {
        const {data} = await axios.get(
            `https://pmdb-backend.herokuapp.com/api/search/${page_num}/${search}`
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

    useEffect(() => {
        loadLibrary.then(setLibrary)
        .catch(error => console.error(error))
    },[]);


        
    

    return (
        <div className="App">       

            <div style ={{marginTop: '2.5em'}}>
                <input id='searchbar' className="search_bar" type="text" onChange={event => setSearch(event.target.value)} placeholder="Search for movies to add"></input> 
            </div>
            

            <div className='grid grid_2col3' style={{margin: '5em'}}>
                <div >
                    <h1 className='colo' style={{'--colo': 'cyan'}}>Library</h1>
                    <div className='library_shelf'>
                        {
                            library.length == 0 ? (<h2 className='search_msg'>Library is empty!</h2>) :
                                (<Shelf movies={library} library={true} onAdd={setLibrary} onDelete={deleteMovie} />)
                        }

                    </div>

                </div>

                
                <div>
                    <h1>Discover</h1>
                    {movies.length > 0 ? (
                        <div className="card_shelf">
                            <Shelf movies={movies} library={false} onAdd={setLibrary} onDelete={deleteMovie} />
                        </div>
                    ) : (
                        <>
                            <div >
                                <h1 className='search_msg'>{search == "" ? "Find movies using the search bar" : "No movies found for the query \'" + search + "\'"}</h1>
                                <hr />
                                
                            </div>

                        </>
                    )}    
                </div>

                
            </div>
        </div>
    );
}

export default App;
