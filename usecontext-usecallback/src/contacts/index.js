import React, { useContext } from "react";
import stylesCenter from "./index.module.css";
import ContactItem from "./ContactItem";
import { ContactContext } from "../App";

const Contacts = () => {
  const { channels, addChannel } = useContext(ContactContext);

  return (
    <>
      <div className={stylesCenter.channels}>
        {channels.map((channel, index) => (
          <ContactItem 
            key={channel.id}
            index={index} 
            channel={channel} 
          />
        ))}
      </div>
      <div>
        <button
          className={stylesCenter.addButton}
          data-testid="add-button"
          onClick={addChannel}
        >
          <img src="plus.svg" alt="plus logo" />
          <span className={stylesCenter.addButtonText}>
            Додати канал зв'язку
          </span>
        </button>
      </div>
    </>
  );
};

export default Contacts;