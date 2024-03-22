import * as React from 'react'
import 
{ 
    Container,
    Button, 
    Form,
    InputGroup,
    Toast,
    Collapse,
    DropdownButton,
    Dropdown,
    Tooltip,
    OverlayTrigger
 } from 'react-bootstrap'
import { dataContext } from '../App_desktop';

export default function InputToUrl(props){

    const data = React.useContext(dataContext);

    const  [inputValue, setInputValue] = React.useState(''); 

    return(
        <>
        <style type='text/css'>
            {
                `
                .toast-data-loaded{
                    position: absolute;
                    top:11%;
                    right: 3%;
                    z-index: 999;
                }
                .message-toast{
                    font-family: "Anta", sans-serif;
                    font-weight: 400;
                    font-size: large;
                    font-style: normal;
                    text-align: center;
                }
                .input-group{
                    border: 2px;
                    border-style: solid;
                    border-color:  #000;
                    border-radius: 10px;
                }
                `
            }
        </style>
        <>
            <Toast 
                className='toast-data-loaded' 
                bg="danger" 
                animation={true} 
                delay={3000}
                onClose={()=>data.setError(false)} 
                show={data.error} > 
                    <Toast.Header >
                        <img src="./tube_downloader.svg" className="mr-2 rounded" alt="" width={20}/>
                        <strong className='me-auto'> Tube downloader </strong>
                    </Toast.Header>
                    <Toast.Body>
                        <div className='message-toast'><p>Error server, please check your url. Select <b>playlist</b> or <b> video </b></p></div>
                    </Toast.Body>
                </Toast>
                <Toast 
                className='toast-data-loaded' 
                bg="success" 
                animation={true} 
                delay={3000}
                onClose={()=>data.setShowToast(false)} 
                show={data.showToast} > 
                    <Toast.Header >
                        <img src="./tube_downloader.svg" className="mr-2 rounded" alt="" width={20}/>
                        <strong className='me-auto'> Tube downloader </strong>
                    </Toast.Header>
                    <Toast.Body>
                        { data.message ? (<div className='message-toast'><p>{data.message}</p></div>) : null }
                    </Toast.Body>
                </Toast>
            
        </>

            <OverlayTrigger
            placement='bottom'
            delay={{show: 250, hide: 400}}
            overlay={<Tooltip id='input-tooltip'> You can change from playlist to song just using the url! </Tooltip>}
            >

            <InputGroup className= "mb-3">
                <InputGroup.Text>https://</InputGroup.Text>
                <Form.Control type="text" placeholder="https://www.youtube.com/watch?v="
                value={inputValue} 
                onChange={(e) => {
                    setInputValue(e.target.value)
                    console.log(data.validateUrl(e.target.value).playlist)
                    data.getUrl(e.target.value)
                }}/>
            </InputGroup>
        </OverlayTrigger>
        </>
    )
}