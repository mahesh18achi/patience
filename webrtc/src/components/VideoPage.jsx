import React, { useContext, useEffect, useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash, FaPhone, FaPhoneAlt } from 'react-icons/fa';
import { socketContext } from '../socketContext';

const VideoPage = () => {
  const {
    call, callAccepted, myVideo, userVideo, stream, name, setName,
    callEnded, me, callUser, leaveCall, answerCall, setVideoUser,
    setAudioUser, audioUser, videoUser, 
  } = useContext(socketContext);

  

  

  

  

  const [callerId, setCallerId] = useState('');

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
  };

  const videoStyle = {
    width: '100%',
    maxWidth: '800px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const controlsStyle = {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const buttonStyle = {
    padding: '14px 24px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const iconStyle = {
    marginRight: '10px',
    fontSize: '20px',
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(me);
      
    } catch (err) {
      console.error('Failed to copy:', err);
    
    }
  };

  

  

  return (
    <div style={containerStyle}>
      <video ref={myVideo} style={videoStyle} autoPlay muted />
      <div style={{ display: 'flex', marginTop: '10px', gap: '10px' }}>
        
      </div>

      {callAccepted && !callEnded && (
        <video ref={userVideo} style={videoStyle} autoPlay />
      )}

      <div style={controlsStyle}>
      
        
        <input type="text" placeholder='Enter ID' onChange={(e) => setCallerId(e.target.value)} />
        <input type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
        <button onClick={() => callUser(callerId)} style={buttonStyle} disabled={callAccepted && !callEnded}>
          <FaPhoneAlt style={iconStyle} />
          Call User
        </button>
        {!callAccepted || callEnded ? (
          <button onClick={() => answerCall()} style={buttonStyle} disabled={!call.isReceivedCall}>
            <FaPhone style={iconStyle} />
            Answer Call
          </button>
        ) : (
          <button onClick={() => leaveCall(me)} style={{ ...buttonStyle, backgroundColor: 'red' }}>
            <FaPhoneSlash style={iconStyle} />
            End Call
          </button>
        )}
        {call.isReceivedCall && <div>{call.name} is calling, answer or reject</div>}
      </div>

      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button onClick={handleCopy} style={{ ...buttonStyle, backgroundColor: '#28a745' }}>
          Copy My ID
        </button>
      
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            video {
              max-width: 100%;
              height: auto;
            }
            .controls {
              flex-direction: column;
              align-items: center;
            }
          }
          @media (max-width: 480px) {
            .controls {
              width: 100%;
            }
            button {
              width: 100%;
              margin: 5px 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default VideoPage;
