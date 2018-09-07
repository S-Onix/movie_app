import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';
import LinesEllipsis from 'react-lines-ellipsis';


function Movie({title , poster, genres, synopsis}){
    return(
        <div className = "Movie">
            <div className ="Moive__Column">
                <MoviePoster poster = {poster} alt ={title}/>
            </div>
            <div className ="Movie__Column">
                <h1>{title}</h1>
                <div className="Movie__Genres">
                    {genres.map((genre, index) => <MovieGenre genre = {genre} key = {index} />)}
                </div>
                <div className ="Movie__Synopsis">
                    <LinesEllipsis 
                        text={synopsis}
                        maxLine='3'
                        ellipsis = '...'
                        trimRight
                        basedOn ='letters'
                    />
                </div>
            </div>
        </div>
    )
}

function MoviePoster({poster, alt}){
    return(
        <img src={poster} alt={alt} title ={alt} className ="Movie__Poster"/>
     )
}

//새로운 컴포넌트를 만들어준 이유 : 장르의 타입은 array이기 때문에 직접 component에 넣기 보다는 따로 빼서 작성함
function MovieGenre({genre}){
    return(
        <span className="Movie__Genre">{genre}</span>
    )
}

Movie.PropTypes = {
    title : PropTypes.string.isRequired,
    poster : PropTypes.string.isRequired,
    genres : PropTypes.array.isRequired,
    synopsis : PropTypes.string.isRequired
}

MoviePoster.PropTypes = {
    poster : PropTypes.string.isRequired,
    alt : PropTypes.string.isRequired
}

MovieGenre.PropTypes = {
    genre : PropTypes.string.isRequired
}

export default Movie;