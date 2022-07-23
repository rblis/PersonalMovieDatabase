import { useState } from 'react';
import {FaTimes} from 'react-icons/fa'
import MovieDetailView from './MovieDetailView';

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

const Card = ({onDelete, movie, onAdd, library}) =>{
    const [openMDV, setOpenMDV] = useState(false)
    
    const cardCLick = () => {
        setOpenMDV(true);
    }
    
    return (
        <>
            <MovieDetailView movie={movie} close={setOpenMDV} open={openMDV} onAdd={onAdd}></MovieDetailView>
            
            <div onClick={() => cardCLick()} className={library ? "libary_card" : 'movie_card'}>
                {!library ? <FaTimes className='delete_card red' onClick={() => onDelete(movie.id)}/> : ''}
                
                <img alt={movie.title} className="movie_card_pic" src={movie.poster_path === null ? noposter : "https://www.themoviedb.org/t/p/w1280/" + movie.poster_path} />

                <div className='movie_card_info'>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{movie.title} </div>
                    <div>{movie.release_date.substring(0, 4)} | {genres[movie.genre_ids[0]]} {movie.genre_ids.length > 1 ? " - " + genres[movie.genre_ids[1]] : ''} </div>
                </div>

            </div>
        </>
    )
}

Card.defaultProps = {
    pic: 'https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Light-With-Image.jpg?x81279',
    name: 'Movie Title',
    year: 2000,
    genre: 'Genre',
    id: 0

}

export default Card