import * as React from 'react';
import { dataContext } from '../App_desktop';
import Card from 'react-bootstrap/Card';
import { Placeholder, Stack, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'

export default function CardVideo(props) {

    const data = React.useContext(dataContext);

    function CardLoaded(props) {
        return (
            <Card className="card-custom" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <Card.Img variant="top" src={data.video.thumbnail} style={{ objectFit: 'cover', height: '225px' }} />
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(to bottom, transparent 70%, rgba(0,0,0,0.8))',
                        pointerEvents: 'none'
                    }}></div>
                    <Button
                        variant='link'
                        onClick={() => { window.open(data.video.url) }}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    ></Button>
                </div>

                <Card.Body className="text-white">
                    <Card.Title style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', minHeight: '3rem' }}>
                        {data.video.title}
                    </Card.Title>
                    <Card.Subtitle className="mb-3 text-muted" style={{ fontSize: '0.9rem' }}>
                        {data.video.author}
                    </Card.Subtitle>

                    <Stack gap={2}>
                        <Form.Select
                            defaultValue={data.typeFormat}
                            onChange={(e) => { data.setTypeFormat(e.target.value) }}
                            className="input-custom"
                            style={{ padding: '0.5rem' }}
                        >
                            <option value="audio">Audio (.m4a)</option>
                            <option value="video">Video (.mp4)</option>
                        </Form.Select>

                        <Button
                            className="btn-primary-custom w-100"
                            onClick={() => { data.donwloadOnlyVideo(data.video.url, data.video.title) }}
                        >
                            Download Now
                        </Button>
                    </Stack>
                </Card.Body>
            </Card>
        )
    }

    function CardLoading(props) {
        return (
            <Card className="card-custom" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                <div style={{ height: '225px', backgroundColor: '#2d3748' }} className="placeholder-glow">
                    <Placeholder xs={12} style={{ height: '100%' }} />
                </div>
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder.Button variant="primary" xs={12} />
                </Card.Body>
            </Card>
        )
    }

    if (data.dataLoaded) {
        return <CardLoaded />;
    } else if (data.loading) {
        return <CardLoading />;
    } else {
        return null;
    }
}