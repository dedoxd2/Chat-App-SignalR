import { Row,Col } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";
const ChatRoom = ({messages , sendMessage}) => <div>

<Row className = "px-5 py-5"> 
        <Col sm={10} >

            <h2>ChatRoom</h2>    
        </Col>

        <Col>

        </Col>

</Row>

<Row className = "px-5 py-5">
        <Col sm = {12} > 
                <MessageContainer  messages = {messages} />

        </Col>    


        <Col sm = {12} > 
                <SendMessageForm sendMessage={sendMessage} />

        </Col>    

</Row>
</div>

export default ChatRoom;