import React, { useEffect, useState } from 'react'
import { fetchMovieDetail, fetchMovieVideos, fetchSimilarMovie, fetchCasts } from '../../service'
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css'
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactPlayer from 'react-player'
import ReactStars from 'react-rating-stars-component'
import {Link} from 'react-router-dom'
import Footer from '../footer/Footer'

export function MovieDetail({match}) {

    let params = match.params
    let genres = []
    const [detail, setDetail] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [video, setVideo] = useState([])
    const [casts, setCasts] = useState([])
    const [similarMovie, setSimilarMovie] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchMovieDetail(params.id))
            setVideo(await fetchMovieVideos(params.id))
            setCasts(await fetchCasts(params.id))
            setSimilarMovie(await fetchSimilarMovie(params.id))
        }

        fetchAPI()
    }, [params.id])

    genres = detail.genres

    const MoviePlayerModal = (props) => {
        const youtubeUrl = "https://www.youtube.com/watch?v="

        return(
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        style={{ color: '#000000', fontWeight: 'bolder'}}
                    >
                        {detail.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor:'#000000'}}>
                    <ReactPlayer
                        className="container-fluid"
                        url={youtubeUrl + video.key}
                        width="100%"
                    >

                    </ReactPlayer>
                </Modal.Body>
            </Modal>
        )
    }
    let genresList
    if(genres) {
        genresList = genres.map((g, index) => {
        return(
            <li className="list-inline-item" key={index}>
                <button type="button" className="btn btn-outline-info">
                    {g.name}
                </button>
            </li>
        )
        })
    }

    const castList = casts.slice(0, 4).map((cast, index) => {
        return(
            <div className="col-md-3 text-center" key={index}>
                <img 
                    className="img-fluid rounded-circle mx-auto d-block" 
                    src={cast.image} 
                    alt={cast.name}
                ></img>
                <p className="font-weight-bolder text-center">
                    {cast.name} 
                </p>
                <p className="font-weight-light text-center" style={{color:'#5a606b'}} >
                    {cast.character} 
                </p>
            </div>
        )
    })

    const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
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
                    <ReactStars 
                        count={10} 
                        value={item.ratings} 
                        size={20} 
                        color1='#f4dd0f' 
                        isHalf={true}
                        edit={false}
                    >
                    </ReactStars> 
                </div>
            </div>
        )
    })


    return (
        <div className="container">
            <div className="row mt-2">
                <MoviePlayerModal
                    show={isOpen}
                    onHide={() => setIsOpen(false)}
                >
                </MoviePlayerModal>
                <div className="col text-center" style={{width:'100%'}}>
                    <img 
                        className="img-fluid" 
                        src={detail.backPoster} 
                        alt={detail.title}>
                    </img>
                    <div className="carousel-center">
                        <FontAwesomeIcon icon={["far","play-circle"]} 
                                        onClick={() =>setIsOpen(true)} 
                                        style={{fontSize:95, color:'#f4c10f', cursor:'pointer'}}/>
                        {/* <i 
                            className="far fa-play-circle"
                            onClick={() =>setIsOpen(true)}
                            style={{fontSize:95, color:'#f4c10f', cursor:'pointer'}}> 
                        </i> */}
                    </div>
                    <div className="carousel-caption"
                        style={{textAlign:'center', fontSize: 35}}>
                        {detail.title}
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <p style={{ color: '#5a606b', fontWeight:"bolder"}}>GENRE</p>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="col">
                    <ul class="list-inline">
                        {genres && genresList}
                    </ul>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="col">
                    <div className="text-center">
                        <ReactStars 
                            count={10} 
                            value={detail.ratings} 
                            size={20} 
                            color1='#f4dd0f' 
                            isHalf={true}
                            edit={false}
                        >
                        </ReactStars> 
                    </div>
                    <div className="mt-3">
                        <p style={{ color: '#5a606b' , fontWeight:"bolder"}}>OVERVIEW</p>
                        {detail.overview}
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="col">
                    <p style={{ color: '#5a606b', fontWeight:"bolder"}}>CASTS</p>
                </div>
            </div>

            <div className="row mt-3">
                {castList}
            </div>

            <div className="row mt-3">
                <div className="col">
                    <p style={{ color: '#5a606b', fontWeight:"bolder"}}>SIMILAR MOVIES</p>
                </div>
            </div>

            <div className="row mt-3">
                {similarMovieList}
            </div>

            <Footer />
        </div>
    )
}