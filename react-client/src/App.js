import CreateAccount from './components/createAccount';
import Login from './components/login';
import SendEmail from './components/sendEmail';
import Home from './components/home';
import Inbox from './components/inbox';
import Sent from './components/sent';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CreateAccount/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/inbox" element={<Inbox/>}/>
          <Route path="/sent" element={<Sent/>}/>
          <Route path="/sendEmail" element={<SendEmail/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
