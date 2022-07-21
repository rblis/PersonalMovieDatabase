import Card from './card.js'



const Shelf = ({movies, onDelete}) => {

    return (
        <>
            {movies.map((movie) => (
                <Card key={movie.id} id={movie.id} pic={movie.poster_path} name={movie.title} year={movie.release_date} genre={movie.genre_ids} description={movie.overview} popularity={movie.popularity} langauge={movie.original_language} onDelete={onDelete}/>               

            ))}
        </>
    )
}
export default Shelf

