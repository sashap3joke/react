import React, { useContext, useState } from 'react';
import { IconButton } from "@mui/material";
import { ContactContext } from "../App";
import stylescenter from "./ContactItem.module.css";

const options = [
  { value: "none", label: "" },
  { value: "viber", label: "Viber" },
  { value: "telegram", label: "Telegram" },
  { value: "messenger", label: "Messenger" },
  { value: "sms", label: "SMS" },
];

const ContactItem = React.memo(({ index, channel }) => {
  const { removeChannel, updateChannelDetails } = useContext(ContactContext);
  const [type, setType] = useState(channel.type);
  const [details, setDetails] = useState(channel.details);

  const handleTypeChange = (e) => {
    setType(e.target.value);
    updateChannelDetails(channel.id, e.target.value, details);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
    updateChannelDetails(channel.id, type, e.target.value);
  };

  const { id } = channel;  // Destructure channel object

  return (
    <div className={stylescenter.fullChannelControll}>
      <div className={stylescenter.channelAndChannel}>
        <p className={stylescenter.channelOfConntection}>
          Канал зв'язку
        </p>
        <select
          className={stylescenter.selecterOptions}
          value={type}
          onChange={handleTypeChange}
          name="optionSelected"
        >
          {options.map((el) => (
            <option key={el.value} value={el.value}>
              {el.label}
            </option>
          ))}
        </select>
      </div>
      <div className={stylescenter.detailsAndInputAndDelete}>
        <p className={stylescenter.channelOfConntection}>
          Деталі
        </p>
        <textarea
          data-testid="details"
          maxLength="100"
          rows="2"
          className={stylescenter.detailsChannelInput}
          placeholder="введіть телефон або @username"
          value={details}
          onChange={handleDetailsChange}
        />
        <div className={stylescenter.removeButtons}>
          {index !== 0 && (
            <span>
              <IconButton onClick={() => removeChannel(id)}>
                <img src="bin.svg" alt="bin logo" />
                <span className={stylescenter.removeButtonText}>
                  Видалити канал
                </span>
              </IconButton>
            </span>
          )}
        </div>
      </div>
    </div>
  );
});


export default ContactItem;