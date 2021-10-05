import React,{useState} from 'react';
import { Modal, Button } from "react-bootstrap";
const HOSTNAME = "127.0.0.1";

export default function LinkWrapper({link}) {    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const url = new URL(link)
    console.log(url)
    if (url.hostname === HOSTNAME ) return <a target="_blank" href={link}>{link}</a>
    else
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Open Link
        </Button>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Title>Link Popup</Modal.Title>
          <Modal.Body><iframe src={link} style={{width:'100%',height:'400px'}}/></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }