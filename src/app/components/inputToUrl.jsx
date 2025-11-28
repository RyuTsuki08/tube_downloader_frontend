import * as React from 'react'
import {
    InputGroup,
    Form,
    Toast,
    ToastContainer,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap'
import { dataContext } from '../App_desktop';

export default function InputToUrl(props) {

    const data = React.useContext(dataContext);
    const [inputValue, setInputValue] = React.useState('');

    return (
        <>
            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999, marginTop: '60px' }}>
                <Toast
                    onClose={() => data.setError(false)}
                    show={data.error}
                    delay={3000}
                    autohide
                    bg="dark"
                    style={{ border: '1px solid var(--danger-color)', color: 'white' }}
                >
                    <Toast.Header closeButton={false} style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--danger-color)', borderBottom: '1px solid #333' }}>
                        <strong className="me-auto">Error</strong>
                        <small>Just now</small>
                        <button type="button" className="btn-close btn-close-white" onClick={() => data.setError(false)}></button>
                    </Toast.Header>
                    <Toast.Body>
                        Please check your URL. Ensure it is a valid YouTube link.
                    </Toast.Body>
                </Toast>

                <Toast
                    onClose={() => data.setShowToast(false)}
                    show={data.showToast}
                    delay={3000}
                    autohide
                    bg="dark"
                    style={{ border: '1px solid var(--success-color)', color: 'white' }}
                >
                    <Toast.Header closeButton={false} style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--success-color)', borderBottom: '1px solid #333' }}>
                        <strong className="me-auto">Success</strong>
                        <small>Just now</small>
                        <button type="button" className="btn-close btn-close-white" onClick={() => data.setShowToast(false)}></button>
                    </Toast.Header>
                    <Toast.Body>
                        {data.message || "Operation successful!"}
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            <OverlayTrigger
                placement='bottom'
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id='input-tooltip'>Paste a YouTube video or playlist URL here!</Tooltip>}
            >
                <InputGroup className="mb-3 shadow-lg">
                    <InputGroup.Text style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
                        🔗
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Paste YouTube URL (https://youtube.com/watch?v=...)"
                        value={inputValue}
                        style={{ color: 'var(--text-secondary)' }}
                        onChange={(e) => {
                            setInputValue(e.target.value)
                            data.getUrl(e.target.value)
                        }}
                        className="input-custom"
                    />
                </InputGroup>
            </OverlayTrigger>
        </>
    )
}