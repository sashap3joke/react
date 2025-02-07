import React, { useState, useCallback } from "react";
import './App.css';
import Contacts from './contacts/index';
import Logo from "./Logo";
import ChannelStatistics from "./ChannelStatistics";

export const ContactContext = React.createContext();

function App() {
  const [channels, setChannels] = useState([{ id: 0, type: "none", details: "" }]);
  const [lastSelectedType, setLastSelectedType] = useState("");

  const addChannel = () => {
    const newChannel = { id: channels.length, type: "none", details: "" };
    setChannels([...channels, newChannel]);
  };

  const removeChannel = (id) => {
    setChannels(channels.filter(channel => channel.id !== id));
  };

  const updateChannelDetails = useCallback((id, name, value) => {
    setChannels(prevChannels =>
      prevChannels.map(channel =>
        channel.id === id ? { ...channel, [name]: value } : channel
      )
    );

    if (name === "type" && value !== "none") {
      setLastSelectedType(value); // This tracks the last selected type
    }
  }, []);

  return (
    <ContactContext.Provider value={{ channels, addChannel, removeChannel, updateChannelDetails, lastSelectedType }}>
      <div className="grid-container">
        <div>
          <Contacts />
        </div>
        <div>       
          <Logo /> 
          <ChannelStatistics />      
        </div>
      </div>
    </ContactContext.Provider>
  );
}

export default App;