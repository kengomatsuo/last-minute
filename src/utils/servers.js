const servers = {
  iceServers: [
    'stun:stun1.l.google.com:19302',
    'stun:stun2.l.google.com:19302',
    'stun:stun3.l.google.com:19302',
    'stun:stun4.l.google.com:19302',
  ],
  iceCandidatePoolSize: 10,
}

const pc = new RTCPeerConnection(servers)
let localStream = null
let remoteStream = null
