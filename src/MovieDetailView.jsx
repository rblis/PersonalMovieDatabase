import { React } from 'react';
import ReactDOM from 'react-dom';
import './App.css'

const MovieDetailView = ({open, close, pic, name, year, genre, id, description, popularity, language}) => {
    if (!open){
        return null;
    }
    return ReactDOM.createPortal(
        <>
            <div className='overlay_style' onClick={() => close(false)}></div>
            <div className='modal_style'>
                {name} <br/> {year} <br/> {description}
                <div>
                <button>Add to Library</button>
                <button onClick={() => close(false)}>Close</button>
                
                </div>
            </div>
        </>
    , document.getElementById('modalPortal')
    )
}

export default MovieDetailView