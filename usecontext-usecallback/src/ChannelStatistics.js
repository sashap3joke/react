import React, { useContext } from 'react';
import { ContactContext } from './App';

function ChannelStatistics() {
  const { channels, lastSelectedType } = useContext(ContactContext);
  
  return (
    <div>
      <p data-testid="statistics">
        count of channels: {channels.length}
        <br />
        {lastSelectedType && `Your last channel is: ${lastSelectedType}`}
      </p>
    </div>
  );
}

export default ChannelStatistics;