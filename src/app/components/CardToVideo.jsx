import * as React from 'react';
import { dataContext } from '../App_desktop';
import Card from 'react-bootstrap/Card';
import { Placeholder,
        Dropdown,
    DropdownButton,
    Stack, 
    Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'

export default function CardVideo(props){

    const data = React.useContext(dataContext);

    function CardLoaded(props){
            return(
                <Card style={{ width: '28rem' }}>
                <Button variant='transparent'  onClick={()=>{window.open(data.video.url)}} >
                <Card.Img variant="top" src={data.video.thumbnail} width="100%"/>
                </Button>
                <Card.Body>
                <Card.Title>{data.video.title} | {data.video.author}</Card.Title>
                <Stack>
                <Form.Select defaultValue={data.typeFormat} onChange={(e)=> {data.setTypeFormat(e.target.value)}}>
                    <option value="audio">Audio</option>
                    <option value="video">Video</option>
                    </Form.Select>

                <Button variant="primary" onClick={() => {data.donwloadOnlyVideo(data.video.url)}}>Download</Button>

                </Stack>
                
                </Card.Body>
            </Card>
            )
    }
    
    function CardLoading(props){
        return(
            <Card style={{ width: '28rem' }}>
            <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                <Placeholder xs={6} /> <Placeholder xs={8} />
            </Placeholder>
            <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
        </Card>
        )
    }

    if (data.dataLoaded) {
        return (
                <CardLoaded/>
        );
      } else if(data.loading){
          return (<CardLoading/>);
      }
}