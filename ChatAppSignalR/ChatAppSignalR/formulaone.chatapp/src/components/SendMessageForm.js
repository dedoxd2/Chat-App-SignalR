import { useState } from "react";
import { Button, InputGroup,Form } from "react-bootstrap";
const SendMessageForm = ({ sendMessage }) => {
    const [msg, setMessage] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      sendMessage(msg); // Ensure that sendMessage is accessed from props
      setMessage('');
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text>Chat</InputGroup.Text>
          <Form.Control
            onChange={(e) => setMessage(e.target.value)}
            value={msg}
            placeholder="Enter Your Message"
          />
          <Button variant="primary" type="submit" disabled={!msg}>
            Send
          </Button>
        </InputGroup>
      </Form>
    );
  };
  

export default SendMessageForm;