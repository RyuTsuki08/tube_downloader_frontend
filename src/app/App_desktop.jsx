import * as React from 'react'
import { ThemeProvider, Container, Row, Col, Stack } from "react-bootstrap";
import Navigation from "./components/Navbar";
import axios from 'axios';
import InputToUrl from "./components/inputToUrl";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardVideo from './components/CardToVideo';
import Form from  'react-bootstrap/Form'

export const dataContext = React.createContext()

function validateUrl (url){
    try {
        if(url != ''){
            let onlyVideo = url.includes('/watch')
            let  onlyPlaylist = url.includes('/playlist' );
            let res = url.startsWith('https://www.youtube.com/')
            let res_obj = {msg: 'url validate correctly', error: null, success: res, playlist: onlyPlaylist, onlyVideo: onlyVideo};
            return res_obj;
        }
    } catch (error) {
        return {msg: 'error, please check url', error: e, success: false};
    }
 }

export default function App_Desktop(){

    const [video, setVideo] = React.useState({
        title: '',
        author: '',
        url: '',
        thumbnail: '',
        id: ''
    })
    const [playlistTitle, setPlaylistTitle] = React.useState({}) 
    const [ typeFormat, setTypeFormat ] = React.useState("")
    const [playlist, setPlaylist] = React.useState()
    const [message, setMessage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [dataLoaded, setDataLoaded] = React.useState(false)
    const [ showToast, setShowToast ] = React.useState(false);
    const [showSpinner, setShowSpinner] = React.useState(false)
    const [error, setError] = React.useState(false)

    console.log(playlistTitle)

    function getUrl(url){
        if(url === '') {
            return 'Please enter a URL.'
        } else{
            setLoading(true)
            if(validateUrl(url).success && validateUrl(url).onlyVideo == true){
                const urlDownloadVideo = `http://127.0.0.1:8000/?url=${url}`;
                axios.get(urlDownloadVideo).then((res)=>{
                    console.log( res.data);
                    setVideo({
                        title:  res.data.video.tile,
                        url: res.data.video.url,
                        thumbnail: res.data.video.thumbnail,
                        author: res.data.video.author,
                        id: res.data.video.id
                    });
                    setMessage(res.data.msg)
                    setLoading(false)
                    setShowToast(true);
                    setDataLoaded(true);
                    setTimeout(()=>setShowToast(false),5000)
            }).catch((error) => {
                console.error(error)
                setError(true);
                setTimeout(()=>setError(false),5000)
            } )
            } else if(validateUrl(url).success == true && validateUrl(url).playlist == true){
                const urlDowloadPlaylist = `http://127.0.0.1:8000/playlist?url=${url}`;
                axios.get(urlDowloadPlaylist).then((res) => {
                    setPlaylistTitle({
                        title: res.data.title,
                        total_videos: res.data.total_videos,
                        url: url
                    })
                    setPlaylist(res.data.videos);
                    setMessage(res.data.msg)
                    setLoading(false)
                    setShowToast(true);
                    setDataLoaded(true);
                    setTimeout(()=>setShowToast(false),5000)
                }).catch((err) => {
                    console.error(err)
                    
                    setError(true);
                    setTimeout(()=>setError(false),5000)
                })
            }
        };
    }

    function donwloadOnlyVideo(url){
            const urlDownloadVideo = typeFormat === "audio" ? `http://127.0.0.1:8000/download?url=${url}&type=${true}` : `http://127.0.0.1:8000/download?url=${url}&type=${false}`;
            axios.post(urlDownloadVideo)
            .then((res) => {
                console.log(res.data);
            }).catch((error) => {console.log(error)})
        }

    function downloadPlaylist(url){
        const urlDownloadPlaylist = typeFormat === "audio" ? `http://127.0.0.1:8000/playlist?url=${url}&type=${true}` : `http://127.0.0.1:8000/playlist?url=${url}&type=${false}`;
        axios.post(urlDownloadPlaylist)
        .then((res) => {
            console.log(res.data);
        }).catch((error) => {console.log(error)})
    }

    return(
        <>
        <Navigation expand="lg" theme="dark" />

            <style type="text/css">
            {
                `
                .app-body{
                    height: 100vh
                }
                `
            }
            </style>

            <Container className="app-body">
                <Col  xs={12}>
                </Col>
                    <Col>
                        <Stack gap={3}>

                                <style type="text/css">
                                    {
                                        `
                                        .app-title{

                                                font-family: "Anta", sans-serif;
                                                font-weight: 400;
                                                font-style: normal;
                                                font-size: 450%;
                                                text-align: center;
                                        }
                                        .app-subtitle{
                                            font-family: "Anta", sans-serif;
                                            font-weight: 100;
                                            font-style: normal;
                                            text-align: center;
                                        }
                                        .playlist-grid{
                                            display: grid;
                                            grid-template-columns: 1fr 1fr 1fr;
                                            justify-content: center;
                                            grid-gap: 10px;
                                        }
                                        `
                                    }
                                </style>

                                <h1 className="app-title">
                                Your trusted downloader...
                                </h1>
                                <h6 className="app-subtitle">
                                You can download a video as only audio or video. A complete playlist!
                                </h6>
                                <h6 className="app-subtitle">
                                Just put the url here:
                                </h6>

                            <>
                            </>

                    <Col>
                    <dataContext.Provider
                     value={{
                        video, setVideo, 
                        message, setMessage, 
                        dataLoaded, setDataLoaded, 
                        showToast, setShowToast, 
                        error, setError, 
                        showSpinner, setShowSpinner,
                        loading, setLoading,
                        typeFormat, setTypeFormat,
                        setPlaylist, setPlaylistTitle,
                        getUrl,
                        donwloadOnlyVideo, 
                        downloadPlaylist,
                        validateUrl}}>
                        <InputToUrl />
                                    {
                                    playlist != undefined ?
                                    <>
                                    <Stack style={{
                                        height: '200px',
                                        justifyContent: 'space-evenly'
                                    }}>
                                            <h6 style={{
                                                textAlign: 'center',
                                                fontSize: 'x-large'
                                            }}>
                                                {  `Playlist: ${playlistTitle.title}`}
                                                </h6>
                                        <h6 style={{
                                            textAlign: 'center',
                                            fontSize: 'medium'
                                        }}>
                                            Total videos in this playlist: {playlistTitle.total_videos}
                                        </h6>

                                        <Form.Select defaultValue={typeFormat} onChange={(e)=> {setTypeFormat(e.target.value)}}>
                                            <option value="audio">Audio</option>
                                            <option value="video">Video</option>
                                        </Form.Select>
                                        
                                        <Button variant='danger' style={{
                                                textAlign: 'center',
                                                }}
                                                onClick={(e) => {}}>
                                                    Download All: {playlistTitle.total_videos}
                                        </Button>
                                        </Stack>

                                            <Container className='playlist-grid'>
                                            {
                                            playlist.map((video,index) => (

                                                            <Col xs={6}>
                                                                <Card style={{ width: '25rem' }}>
                                                                    <Button variant='transparent'  onClick={()=>{window.open(video.url)}} >
                                                                    <Card.Img variant="top" src={video.thumbnail} width="100%"/>
                                                                    </Button>
                                                                    <Card.Body>
                                                                    <Card.Title>{video.title} | {video.author}</Card.Title>
                                                                    <Card.Text>
                                                                    </Card.Text>
                                                                    <Stack>
                                                                        <Form.Select defaultValue={typeFormat} onChange={(e)=> {setTypeFormat(e.target.value)}}>
                                                                            <option value="audio">Audio</option>
                                                                            <option value="video">Video</option>
                                                                            </Form.Select>

                                                                        <Button variant="primary">Download</Button>

                                                                        </Stack>
                                                                    </Card.Body>
                                                                </Card>
                                                            </Col>

                                                ))
                                                }
                                                </Container>
                                            </>
                                        :
                                        <CardVideo />
                                    }
                        </dataContext.Provider>
                        
                    </Col>

                </Stack>
                    </Col>
            </Container>
        </>
    )
};