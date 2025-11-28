import * as React from 'react'
import { Container, Row, Col, Stack, Offcanvas, Spinner } from "react-bootstrap";
import Navigation from "./components/Navbar";
import axios from 'axios';
import InputToUrl from "./components/inputToUrl";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardVideo from './components/CardToVideo';
import Form from 'react-bootstrap/Form'

export const dataContext = React.createContext()

export default function App_Desktop() {

    const [video, setVideo] = React.useState({
        title: '',
        author: '',
        url: '',
        thumbnail: '',
        id: ''
    })
    const [playlistTitle, setPlaylistTitle] = React.useState({})
    const [typeFormat, setTypeFormat] = React.useState("audio")
    const [playlist, setPlaylist] = React.useState()
    const [message, setMessage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [dataLoaded, setDataLoaded] = React.useState(false)
    const [showToast, setShowToast] = React.useState(false);
    const [showSpinner, setShowSpinner] = React.useState(false);
    const [error, setError] = React.useState(false);

    function validateUrl(url) {
        try {
            if (url != '') {
                let onlyVideo = url.includes('/watch')
                let onlyPlaylist = url.includes('/playlist');
                let res = url.startsWith('https://www.youtube.com/') || url.startsWith('https://youtube.com/') || url.startsWith('https://m.youtube.com/');
                let res_obj = {
                    msg: 'url validate correctly',
                    error: null,
                    success: res,
                    playlist: onlyPlaylist,
                    onlyVideo: onlyVideo
                };
                return res_obj;
            }
        } catch (error) {
            let messageError = { msg: 'error, please check url', error: error, success: false }
            setMessage(messageError)
            return messageError;
        }
    }

    function getUrl(url) {
        if (url === '') {
            return 'Please enter a URL.'
        } else {
            const validation = validateUrl(url);
            if (validation.success == true && validation.onlyVideo == true) {
                setLoading(true);
                const urlGetVideo = `http://127.0.0.1:8000/?url=${url}`;
                axios.get(urlGetVideo).then((res) => {
                    console.log(res.data);
                    setVideo({
                        title: res.data.title,
                        url: res.data.url,
                        thumbnail: res.data.thumbnail,
                        author: res.data.author,
                        id: res.data.id
                    });
                    setMessage("Video loaded successfully")
                    setLoading(false)
                    setShowToast(true);
                    setDataLoaded(true);
                    setTimeout(() => setShowToast(false), 5000)
                }).catch((error) => {
                    console.error(error)
                    setLoading(false)
                    setError(true);
                    setTimeout(() => setError(false), 5000)
                })
            } else if (validation.success == true && validation.playlist == true) {
                setLoading(true);
                const urlDowloadPlaylist = `http://127.0.0.1:8000/playlist?url=${url}`;
                axios.get(urlDowloadPlaylist).then((res) => {
                    setPlaylistTitle({
                        title: res.data.title,
                        total_videos: res.data.total_videos,
                        url: url
                    })
                    setPlaylist(res.data.preview_videos);
                    setMessage(res.data.msg)
                    setLoading(false)
                    setShowToast(true);
                    setDataLoaded(true);
                    setTimeout(() => setShowToast(false), 5000)
                }).catch((err) => {
                    console.error(err)
                    setLoading(false)
                    setError(true);
                    setTimeout(() => setError(false), 5000)
                })
            }
        };
    }

    function donwloadOnlyVideo(url, title = null) {
        setLoading(true)
        const isAudio = typeFormat === "audio";

        axios.post('http://127.0.0.1:8000/download', {
            url: url,
            is_audio: isAudio
        }, {
            responseType: 'blob'
        })
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;

                let fileName = 'download.mp4';
                if (isAudio) fileName = 'download.m4a';

                if (title) {
                    const safeTitle = title.replace(/[^a-zA-Z0-9 ]/g, "").trim();
                    fileName = `${safeTitle}.${isAudio ? 'm4a' : 'mp4'}`;
                } else {
                    const contentDisposition = res.headers['content-disposition'];
                    if (contentDisposition) {
                        const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
                        if (fileNameMatch && fileNameMatch.length === 2)
                            fileName = fileNameMatch[1];
                    }
                }

                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();

                setMessage("Download started!")
                setLoading(false)
                setShowToast(true)
                setTimeout(() => setShowToast(false), 5000)
            }).catch((error) => {
                console.error(error)
                setLoading(false)
                setError(true)
                setTimeout(() => setError(false), 5000)
            })
    }

    function downloadPlaylist(url) {
        if (!playlist || playlist.length === 0) {
            setMessage("No videos in playlist to download.");
            return;
        }

        setMessage(`Starting download of ${playlist.length} videos...`);

        playlist.forEach((video, index) => {
            setTimeout(() => {
                console.log(`Starting download for: ${video.title}`);
                donwloadOnlyVideo(video.url, video.title);
            }, index * 2000);
        });
    }

    return (
        <>
            {/* Background Blobs */}
            <div className="bg-blob-1"></div>
            <div className="bg-blob-2"></div>

            {/* Loading Overlay */}
            {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}>
                    <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                    <h4 className="mt-3" style={{ fontWeight: 300 }}>Processing...</h4>
                </div>
            )}

            <Navigation />

            <Container className="app-body" style={{ paddingTop: '100px', paddingBottom: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1 }}>
                    <Row className="justify-content-center">
                        <Col xs={12} md={10} lg={8}>
                            <Stack gap={4}>
                                {/* Hero Section */}
                                <div className="text-center mb-4">
                                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', lineHeight: 1.2 }}>
                                        Your Trusted <span className="text-gradient">Downloader</span>
                                    </h1>
                                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                                        Download YouTube videos and playlists in high quality.
                                        Secure, fast, and free.
                                    </p>

                                    {/* How to Guide */}
                                    <div className="d-flex justify-content-center align-items-center mt-4 gap-3 flex-wrap" style={{ opacity: 0.8 }}>
                                        <div className="d-flex align-items-center gap-2">
                                            <span style={{ fontSize: '1.5rem' }}>📺</span>
                                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Find Video</span>
                                        </div>
                                        <span style={{ color: 'var(--accent-color)', fontSize: '1.2rem' }}>➜</span>
                                        <div className="d-flex align-items-center gap-2">
                                            <span style={{ fontSize: '1.5rem' }}>🔗</span>
                                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Copy Link</span>
                                        </div>
                                        <span style={{ color: 'var(--accent-color)', fontSize: '1.2rem' }}>➜</span>
                                        <div className="d-flex align-items-center gap-2">
                                            <span style={{ fontSize: '1.5rem' }}>📋</span>
                                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Paste Below</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Input Section */}
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
                                        validateUrl
                                    }}>
                                    <InputToUrl />

                                    {/* Content Section */}
                                    {playlist != undefined ? (
                                        <div className="glass-panel p-4 mt-4">
                                            <Stack gap={3}>
                                                <div className="text-center">
                                                    <h3 style={{ fontWeight: '700' }}>{playlistTitle.title}</h3>
                                                    <p className="text-muted">{playlistTitle.total_videos} videos found</p>
                                                </div>

                                                <Row className="justify-content-center g-3">
                                                    <Col xs={12} md={6}>
                                                        <Form.Select
                                                            defaultValue={typeFormat}
                                                            onChange={(e) => { setTypeFormat(e.target.value) }}
                                                            className="input-custom"
                                                        >
                                                            <option value="audio">Audio (.m4a)</option>
                                                            <option value="video">Video (.mp4)</option>
                                                        </Form.Select>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <Button
                                                            className="btn-primary-custom w-100"
                                                            onClick={(e) => { downloadPlaylist(playlistTitle.url) }}
                                                        >
                                                            Download All
                                                        </Button>
                                                    </Col>
                                                </Row>

                                                <Row className="g-4 mt-2">
                                                    {playlist.map((video, index) => (
                                                        <Col xs={12} md={6} lg={4} key={index}>
                                                            <Card className="card-custom h-100">
                                                                <div style={{ position: 'relative', height: '180px' }}>
                                                                    <Card.Img variant="top" src={video.thumbnail} style={{ height: '100%', objectFit: 'cover' }} />
                                                                    <Button
                                                                        variant='link'
                                                                        onClick={() => { window.open(video.url) }}
                                                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                                                    ></Button>
                                                                </div>
                                                                <Card.Body className="d-flex flex-column text-white">
                                                                    <Card.Title style={{ fontSize: '1rem', marginBottom: 'auto' }}>
                                                                        {video.title.length > 50 ? video.title.substring(0, 50) + '...' : video.title}
                                                                    </Card.Title>
                                                                    <Button
                                                                        variant="outline-primary"
                                                                        size="sm"
                                                                        className="mt-3"
                                                                        onClick={(e) => { donwloadOnlyVideo(video.url, video.title) }}
                                                                    >
                                                                        Download
                                                                    </Button>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </Stack>
                                        </div>
                                    ) : (
                                        <div className="mt-4">
                                            <CardVideo />
                                        </div>
                                    )}
                                </dataContext.Provider>
                            </Stack>
                        </Col>
                    </Row>
                </div>

                {/* Footer */}
                <footer className="text-center mt-5 pb-4">
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                        Desarrollado por <span style={{ color: 'white', fontWeight: '600' }}>Christian Paez</span>
                        <a href="https://github.com/RyuTsuki08" target="_blank" rel="noreferrer" className="ms-2" style={{ color: 'white', textDecoration: 'none' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                        </a>
                    </p>
                </footer>
            </Container>
        </>
    )
};