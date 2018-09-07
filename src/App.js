import React, { Component } from 'react';
import './App.css';
import Movie from './Movie'


class App extends Component {

  /**
   * 컴포넌트의 동작 순서(각 위치에 어떤 역활을 넣을지 고민하면 더 좋은 어플리케이션이 될 수 있음)
   * Render : componentWillMount() -> render() -> vomponrnyzfifzmouny()
   * 
   * 컴포넌트의 Props(데이터)를 업데이트 할 때의 동작 순서
   * Update : componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() - > componentDidUpdate()
   * 
   */

   state = { };
  componentWillMount(){
    //Api 작업을 이곳에서 함
    console.log('Will mount process');
  }

  componentDidMount(){
    //컴포넌트가 데이터를 불러올때 작업해주는 장소 (코드의 크기가 크면 좋지 않다) 
    console.log('Did mount process')
    this._getMovies();
  }

  _renderMovies = () =>{
    const movies = this.state.movies.map(movie => {
      return (
        <Movie 
          title = {movie.title_english} 
          poster = {movie.medium_cover_image} 
          key= {movie.id}
          genres = {movie.genres}
          synopsis = {movie.synopsis}
        />
      );
    });
    return movies;
  };


  //비동기화 함수
   _getMovies = async () => {
    //await : 해당 함수의 결과가 어떻든 반환되는 값을 movies 변수에 저장 (데이터가 있을 수도 error 메시지가 있을수도 있음)
    const movies = await this._callApi();
    //반환된 데이터를 새로운 state로 설정 이 경우 다시 render를 하게 됨
    this.setState({
      movies
    });
  };


  _callApi = () => {
    //반환되는 것이 있어야 화면에 보여줄텐데 참..
    return fetch(
      'https://yts.am/api/v2/list_movies.json?sort_by=download_count'
    )
      .then(_response => _response.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err));
  };
  

  render() {
    console.log('Render process')
    const {movies} = this.state;
    //페이지의 로딩을 할때 아래와 같은 방식으로 하면 좋음 라인 60
    return (
      <div className= { movies ? "App" : "App--loading" }>
          {movies ? this._renderMovies() : "Loading" }
      </div>
    );
  }
}

export default App;
