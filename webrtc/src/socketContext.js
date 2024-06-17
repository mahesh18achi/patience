import React, { createContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const socketContext = createContext();

const socket = io('https://patience-0l1t.onrender.com');

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [videoUser, setVideoUser] = useState(true);
  const [audioUser, setAudioUser] = useState(true);
  const [name, setName] = useState('');
  const [notification,setNotification]=useState('')
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    getUserMedia();

    socket.on('me', (id) => setMe(id));
    socket.on('calluser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });

    socket.on('callended', () => {
      handleCallEnded();
    });

    return () => {
      socket.off('me');
      socket.off('calluser');
      socket.off('callended');
    };
  }, []);

  useEffect(() => {
    if (stream && stream.getVideoTracks().length > 0) {
      stream.getVideoTracks()[0].enabled = videoUser;
    }
  }, [videoUser, stream]);

  useEffect(() => {
    if (stream && stream.getAudioTracks().length > 0) {
      stream.getAudioTracks()[0].enabled = audioUser;
    }
  }, [audioUser, stream]);

  const handleCallEnded = (id) => {
    setCallEnded(true);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    
    window.location.reload();
  };

  const answerCall = () => {
    setCallAccepted(true);
    try {
      const peer = new Peer({ initiator: false, trickle: false, stream });

      peer.on('signal', (data) => {
        socket.emit('answercall', { signal: data, to: call.from });
      });
  
      peer.on('stream', (currentStream) => {
        userVideo.current.srcObject = currentStream;
      });
  
      peer.on('close', handleCallEnded);
      peer.on('error', (err) => {
        console.error("Peer error:", err);
        handleCallEnded();
      });
  
      peer.signal(call.signal);
      connectionRef.current = peer;
    } catch (error) {
       console.log("call ended",error)
    }
  };

  const callUser = (id) => {
    try {
      const peer = new Peer({ initiator: true, trickle: false, stream });

      peer.on('signal', (data) => {
        socket.emit('calluser', { userToCall: id, signalData: data, from: me, name });
      });
  
      peer.on('stream', (currentStream) => {
        userVideo.current.srcObject = currentStream;
      });
  
      peer.on('close', handleCallEnded);
      peer.on('error', (err) => {
        console.error("Peer error:", err);
        handleCallEnded();
      });
  
      socket.on('callaccepted', (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });
      socket.on('alreadyincall',(msg)=>{
        setNotification('already in call')
      })
  
      connectionRef.current = peer;
    } catch (error) {
      console.log(error)
      
    }
  };

  const leaveCall = (id) => {
    handleCallEnded(id);
  };

  return (
    <socketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      setAudioUser,
      setVideoUser,
      audioUser,
      videoUser,
      notification,
      setNotification
    }}>
      {children}
    </socketContext.Provider>
  );
};

export { ContextProvider, socketContext };
