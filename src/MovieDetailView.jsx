import { React } from 'react';
import ReactDOM from 'react-dom';
import './App.css'

const noposter = 'https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Light-With-Image.jpg?x81279';
const genres = {28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10762: 'Kids', 10402: 'Musical', 9648: 'Mystery', 10763: 'News', 10764: 'Reality', 10749: 'Romance', 878: 'Sci-Fy', 10765: 'Sci-Fy', 10766: 'Soap Opera', 10768: 'Politics', 10767: 'Talk Show', 10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'};

const genreids = {
'Action':28,
'Adventure':12,
'Animation':16,
'Comedy':35,
'Crime':80,
'Documentary':99,
'Drama':18,
'Family':10751,
'Fantasy':14,
'History':36,
'Horror':27,
'Music':10402,
'Mystery':9648,
'Romance':10749,
'Science Fiction':878,
'TV Movie':10770,
'Thriller':53,
'War':10752,
'Western':37,
};


const MovieDetailView = ({open, close, movie, onAdd}) => {
    if (!open){
        return null;
    }

    function addToLibrary(){
        close(false);
        onAdd((prev) => {
            prev.push(movie);
            return [...prev]
        })
    }

    return ReactDOM.createPortal(
        <>
            <div className='overlay_style' onClick={() => close(false)}></div>
            <div className='modal_style grid grid_2col'>
                <img alt={movie.title} className="MDV_pic" src={movie.poster_path === null ? noposter : "https://www.themoviedb.org/t/p/w1280/" + movie.poster_path} />
                <div className='MDV_info'>
                    <h2>{movie.title}</h2>
                    <p>
                        Released: {movie.release_date}<br />
                        Language: {movie.original_language}<br />
                        Rating: {movie.vote_average}<br />
                        Popularity: {movie.popularity}<br /><br />
                        {movie.genre_ids.map((gid) => `${genres[gid]} `)}
                    </p>
                    <p>
                        {movie.overview}
                    </p><br/>
                    <div>
                        <button className='marginLR fontsz2' onClick={() => addToLibrary()}>Add to Library</button>
                        <button className='marginLR fontsz2' onClick={() => close(false)}>Close</button>
                    </div>
                </div>
            </div>
        </>
    , document.getElementById('modalPortal')
    )
}

export default MovieDetailView