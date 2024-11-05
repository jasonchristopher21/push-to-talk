// App.js
import React, { useState, useRef, useEffect } from 'react';
import { getFirestore, doc, collection, addDoc, setDoc, getDoc, getDocs,updateDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
// import { firebaseApp } from './firebase'; // Import initialized Firebase app
import { firestore } from "./firebase"

const configuration = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

function RoomFunctions() {
  const [roomId, setRoomId] = useState(null);
  const [isCaller, setIsCaller] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const customButtonStyle = `border-[2px] bg-white px-4 py-2 border-[#00000050] rounded-lg hover:bg-[#00000025]`;

  useEffect(() => {
    if (localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const openUserMedia = async () => {
    if (!peerConnectionRef.current) {
      peerConnectionRef.current = new RTCPeerConnection(configuration);
    }
  
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (stream) {
      setLocalStream(stream);
      stream.getTracks().forEach(track => peerConnectionRef.current.addTrack(track, stream));
    }
  };
  

  const createRoom = async () => {
    setIsCaller(true);
    const roomRef = doc(collection(firestore, 'rooms'));
    setRoomId(roomRef.id);

    peerConnectionRef.current = new RTCPeerConnection(configuration);
    const callerCandidatesCollection = collection(roomRef, 'callerCandidates');

    peerConnectionRef.current.addEventListener('icecandidate', async (event) => {
      if (event.candidate) {
        await addDoc(callerCandidatesCollection, event.candidate.toJSON());
      }
    });

    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    await setDoc(roomRef, { offer });

    onSnapshot(roomRef, async (snapshot) => {
      const data = snapshot.data();
      if (data?.answer && !peerConnectionRef.current.currentRemoteDescription) {
        const answerDesc = new RTCSessionDescription(data.answer);
        await peerConnectionRef.current.setRemoteDescription(answerDesc);
      }
    });

    onSnapshot(collection(roomRef, 'calleeCandidates'), (snapshot) => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          peerConnectionRef.current.addIceCandidate(candidate);
        }
      });
    });
  };

  const joinRoom = async () => {
    const roomRef = doc(firestore, 'rooms', roomId);
    const roomSnapshot = await getDoc(roomRef);

    if (roomSnapshot.exists()) {
      setIsCaller(false);
      peerConnectionRef.current = new RTCPeerConnection(configuration);
      const calleeCandidatesCollection = collection(roomRef, 'calleeCandidates');

      peerConnectionRef.current.addEventListener('icecandidate', async (event) => {
        if (event.candidate) {
          await addDoc(calleeCandidatesCollection, event.candidate.toJSON());
        }
      });

      const offer = roomSnapshot.data().offer;
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      await updateDoc(roomRef, { answer });

      onSnapshot(collection(roomRef, 'callerCandidates'), (snapshot) => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const candidate = new RTCIceCandidate(change.doc.data());
            peerConnectionRef.current.addIceCandidate(candidate);
          }
        });
      });
    }
  };

  const hangUp = async () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }

    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
      setRemoteStream(new MediaStream());
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }

    if (roomId) {
      const roomRef = doc(firestore, 'rooms', roomId);
      const calleeCandidates = await getDocs(collection(roomRef, 'calleeCandidates'));
      const callerCandidates = await getDocs(collection(roomRef, 'callerCandidates'));

      await Promise.all([
        ...calleeCandidates.docs.map(doc => deleteDoc(doc.ref)),
        ...callerCandidates.docs.map(doc => deleteDoc(doc.ref)),
        deleteDoc(roomRef),
      ]);
    }

    setRoomId(null);
    setIsCaller(false);
  };
  const handleChange = (event) => {
    setRoomId(event.target.value);
  };
  return (
    <div className="App">
      <h1>WebRTC Video Chat</h1>
      <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '300px' }} />
      <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '300px' }} />
      <div>
        <button onClick={openUserMedia} className={customButtonStyle}>Open Camera & Microphone</button>
        <button onClick={createRoom} className={customButtonStyle} disabled={isCaller}>Create Room</button>
        <button onClick={joinRoom} className={customButtonStyle}>Join Room</button>
        <button onClick={hangUp} className={customButtonStyle}>Hang Up</button>
        <input
          type="text"
          id="input"
          value={roomId}
          onChange={handleChange}
          placeholder='Room ID'
          className={customButtonStyle}
        />
      </div>
      <div>
        {roomId && <p>Room ID: {roomId}</p>}
      </div>
    </div>
  );
}

export default RoomFunctions;
