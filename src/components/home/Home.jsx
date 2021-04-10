import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { fetchMovies, fetchGenre, fetchMovieByGenre, fetchPersons, fetchTopratedMovie } from '../../service/index';
import RBCarousel from 'react-bootstrap-carousel'
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css'
import {Link} from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import '@fortawesome/fontawesome-free/js/all'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../footer/Footer';


export function Home() {

    const [nowPlaying, setNowPlaying] = useState([])
    const [genres, setGenres] = useState([])
    const [movieByGenre, setMovieByGenre] = useState([])
    const [persons, setPersons] = useState([])
    const [topRated, setTopRated] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies())
            setGenres(await fetchGenre())
            setMovieByGenre(await fetchMovieByGenre())
            setPersons(await fetchPersons())
            setTopRated(await fetchTopratedMovie())

        }

        fetchAPI()
    }, []);
    
    const handleGenreClick = async (genre_id) => {
        setMovieByGenre(await fetchMovieByGenre(genre_id))
    }

    const movies = nowPlaying.slice(0, 5).map((item, index) => {
        return (
            <div style={{ height:500, width: "100%"}} key={index}>
                <div className="carousel-center">
                    <img style={{height: 600}} src={item.backPoster} alt={item.title} ></img>
                </div>
                <div className="carousel-center">
                <FontAwesomeIcon 
                    icon={["far","play-circle"]} 
                    style={{fontSize:95, color:'#f4c10f', cursor:'pointer'}}/>
                </div>
                <div 
                    className="carousel-caption" 
                    style={{ textAlign: "center", fontSize: 35}}
                >
                {item.title}    
                </div>
            </div>
        );
    });


    const genreList = genres.map((item, index) => {
        return(
            <li className="list-inline-item" key={index}>
                <button type="button" className="btn btn-outline-info" onClick={() => {handleGenreClick(item.id)}}>
                    {item.name}
                </button>
            </li>
        )
    })

    const movieList = movieByGenre.slice(0, 4).map((item, index) => {
        return(
            <div className="col-md-3 col-sm-6" key={index} >
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title}></img>
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{fontWeight:'bolder'}}> {item.title} </p>
                    <p>Rated: {item.ratings} </p>
                    <ReactStars count={item.ratings} size={20} color='#f4dd0f'></ReactStars> 
                </div>
            </div>
        )
    })

    const trendingPersons = persons.slice(0, 4).map((item, index) => {
        return(
            <div className="col-md-3 text-center" key={index}>
                <img 
                    className="img-fluid rounded-circle mx-auto d-block" 
                    src={item.profileImg} 
                    alt={item.name}
                ></img>
                <p className="font-weight-bolder text-center">
                    {item.name} 
                </p>
                <p className="font-weight-light text-center" style={{color:'#5a606b'}} >
                     Trending for {item.known} 
                </p>
            </div>
        )
    })
    
    const topRatedList = topRated.slice(0, 4).map((item, index) => {
        return(
            <div className="col-md-3" key={index} >
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title}></img>
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{fontWeight:'bolder'}}> {item.title} </p>
                    <p>Rated: {item.ratings} </p>
                    <ReactStars count={item.ratings} size={20} color='#f4dd0f'></ReactStars> 
                </div>
            </div>
        )
    })

    return (
        <div className="container">
            <div className="row mt-2">
                <div className="col">
                    <RBCarousel
                        autoplay={true}
                        pauseOnVisibility={true}
                        slidesshowSpeed={5000}
                        version={4} 
                        indicators={true}  
                    >
                        {movies}
                    </RBCarousel>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <ul className="list-inline">
                        {genreList}
                    </ul>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                {movieList}
            </div>
            

            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{color: '#5a606b'}}>
                        TRENDING PERSONS ON THIS WEEK
                    </p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                {trendingPersons}
            </div>

            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{color: '#5a606b'}}> TOP RATED MOVIES</p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                {topRatedList}
            </div>

            <Footer/>
            
        </div>
    )
}