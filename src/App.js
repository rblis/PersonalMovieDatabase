import './App.css';
import Shelf from './Shelf.js'
import axios from 'axios'
import {useEffect, useRef, useState} from 'react'

function App() {

    var id = 1;
    const filler = [
        {
            "adult": false,
            "backdrop_path": "/5jkE2SzR5uR2egEb1rRhF22JyWN.jpg",
            "genre_ids": [
                12,
                14
            ],
            "id": 671,
            "original_language": "en",
            "original_title": "Harry Potter and the Philosopher's Stone",
            "overview": "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard—with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths—and about the villain who's to blame.",
            "popularity": 217.535,
            "poster_path": "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
            "release_date": "2001-11-16",
            "title": "Harry Potter and the Philosopher's Stone",
            "video": false,
            "vote_average": 7.9,
            "vote_count": 22908
        },
        {
            "adult": false,
            "backdrop_path": "/urDWNffjwmNi5IQaezw9GwqkUXa.jpg",
            "genre_ids": [
                12,
                14
            ],
            "id": 767,
            "original_language": "en",
            "original_title": "Harry Potter and the Half-Blood Prince",
            "overview": "As Lord Voldemort tightens his grip on both the Muggle and wizarding worlds, Hogwarts is no longer a safe haven. Harry suspects perils may even lie within the castle, but Dumbledore is more intent upon preparing him for the final battle fast approaching. Together they work to find the key to unlock Voldemorts defenses and to this end, Dumbledore recruits his old friend and colleague Horace Slughorn, whom he believes holds crucial information. Even as the decisive showdown looms, romance blossoms for Harry, Ron, Hermione and their classmates. Love is in the air, but danger lies ahead and Hogwarts may never be the same again.",
            "popularity": 175.835,
            "poster_path": "/z7uo9zmQdQwU5ZJHFpv2Upl30i1.jpg",
            "release_date": "2009-07-07",
            "title": "Harry Potter and the Half-Blood Prince",
            "video": false,
            "vote_average": 7.7,
            "vote_count": 16338
        },
        {
            "adult": false,
            "backdrop_path": "/1stUIsjawROZxjiCMtqqXqgfZWC.jpg",
            "genre_ids": [
                12,
                14
            ],
            "id": 672,
            "original_language": "en",
            "original_title": "Harry Potter and the Chamber of Secrets",
            "overview": "Cars fly, trees fight back, and a mysterious house-elf comes to warn Harry Potter at the start of his second year at Hogwarts. Adventure and danger await when bloody writing on a wall announces: The Chamber Of Secrets Has Been Opened. To save Hogwarts will require all of Harry, Ron and Hermione’s magical abilities and courage.",
            "popularity": 206.089,
            "poster_path": "/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg",
            "release_date": "2002-11-13",
            "title": "Harry Potter and the Chamber of Secrets",
            "video": false,
            "vote_average": 7.7,
            "vote_count": 18460
        },
        {
            "adult": false,
            "backdrop_path": "/ve4TEHHmJdnEKVWSYlRa3DdoeKz.jpg",
            "genre_ids": [
                12,
                14
            ],
            "id": 673,
            "original_language": "en",
            "original_title": "Harry Potter and the Prisoner of Azkaban",
            "overview": "Year three at Hogwarts means new fun and challenges as Harry learns the delicate art of approaching a Hippogriff, transforming shape-shifting Boggarts into hilarity and even turning back time. But the term also brings danger: soul-sucking Dementors hover over the school, an ally of the accursed He-Who-Cannot-Be-Named lurks within the castle walls, and fearsome wizard Sirius Black escapes Azkaban. And Harry will confront them all.",
            "popularity": 207.215,
            "poster_path": "/aWxwnYoe8p2d2fcxOqtvAtJ72Rw.jpg",
            "release_date": "2004-05-31",
            "title": "Harry Potter and the Prisoner of Azkaban",
            "video": false,
            "vote_average": 8,
            "vote_count": 18154
        }
    ]
    const [movies, setMovies] = useState([]);
    const [library, setLibrary] = useState(filler);
    const [search, setSearch] = useState('');
    const updoot = useRef(false);
    var page = 1;
    var total_pages = 1;
    
    const deleteMovie = (id) => {
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

    useEffect(() => {
        updoot.current = false
    },[updoot.current]);


        
    

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
