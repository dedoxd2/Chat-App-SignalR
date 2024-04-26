import { Container , Row , Col } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './components/waitingroom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './components/ChatRomm';
import SendMessageForm from './components/SendMessageForm';
// import MessageContainer from './components/MessageContainer';
function App() {
  const [conn, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  // This is the joinChatRoom function
  const joinChatRoom = async (username, chatroom) => {
    try {
      // initiate a connection
      const conn = new HubConnectionBuilder()
        .withUrl("https://localhost:7028/Chat")
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("JoinSpecificChatRoom", (username, msg) => {
        console.log("msg: ", msg);
      });

      conn.on("ReceiveSpecificMessageMessage", (username, msg) => {
        setMessages((messages) => [...messages, { username, msg }]);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { username, chatroom });
      setConnection(conn);

      conn.on("ReceiveMessage", (username, message) => {
        console.log(`${username}: ${message}`);
      });
    } catch (e) {
      console.log(e);
    }
  };

  // This is the sendMessage function
  const sendMessage = async (message) => {
    try {
      await conn.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <main>
        <Container>
          <Row>
            <Col clas="px-5 my-5">
              <Col sm="12">
                <h1 className="font-weight-light">
                  {" "}
                  Welcome to the Leash ChatApp
                </h1>
              </Col>
            </Col>
          </Row>

          {/* Conditional rendering based on whether 'conn' exists */}
          {!conn ? (
            // If 'conn' doesn't exist, render the WaitingRoom component
            <WaitingRoom joinChatRoom={joinChatRoom} />
          ) : (
            // If 'conn' exists, render the ChatRoom component and pass 'messages' and 'sendMessage' as props
            <ChatRoom messages={messages} sendMessage={sendMessage} />
          )}
        </Container>
      </main>
    </div>
  );
}
export default App;
