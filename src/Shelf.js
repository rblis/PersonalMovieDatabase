import Card from './Card.js'



const Shelf = ({movies, onDelete, library, onAdd}) => {

    return (
        <>
            {movies.map((movie) => 
                (
                <Card movie={movie} library={library} key={movie.id} id={movie.id} onDelete={onDelete} onAdd={onAdd}/>
                )
            
            )}
        </>
    )
}
export default Shelf

