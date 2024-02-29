import * as React from 'react'
import 
{ 
    Container,
    Button, 
    Form,
    InputGroup,

 } from 'react-bootstrap'
 import axios from 'axios';

 function validateUrl (url){
    try {
        if(url != ''){
            let res = url.startsWith('https://www.youtube.com/')
            return {msg: 'url validate correctly', error: null, success: res};
        }
    } catch (error) {
        return {msg: 'error, please check url', error: e, success: false};
    }
 }


export default function InputToUrl(props){

    const  [inputValue, setInputValue] = React.useState(''); 
    const [video, setVideo] = React.useState({
        title: '',
        author: '',
        url: '',
        thumbnail: '',
        id: ''
    })

    function getUrl(url){
        if(url === '') {
            return 'Please enter a URL.'
        } else{
            if(validateUrl(url).success){
                const urlVideo = `http://127.0.0.1:8000/?url=${url}`;
                let apiPyTube = axios.get(urlVideo).then((res)=>{
                    console.log(res.data);
                    setVideo({
                        title:  res.data.video.tile,
                        url: res.data.video.url,
                        thumbnail: res.data.video.thumbnail,
                        author: res.data.video.author,
                        id: res.data.video.id
                    });
            }).catch((error) => console.error(error) )
            }
        };
    }

    return(
        <InputGroup className= "mb-3">
            <Form.Control type="text" placeholder="url" value={inputValue} onChange={(e) => {
                console.log
                setInputValue(e.target.value)
                getUrl(e.target.value)
            }}/>
            
                {/* <Button variant="outline-secondary" onClick={()=> props.addURL(document.querySelector('input').value/> */}

        </InputGroup>
    )
}