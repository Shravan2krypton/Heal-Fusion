import React, { useState, useEffect, useRef, useContext } from 'react';
import { 
  Container, Typography, Box, Button, Grid, Card, CardContent,
  Alert, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const VideoConsultation = () => {
  const { user } = useContext(AuthContext);
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isInCall, setIsInCall] = useState(false);
  const [error, setError] = useState('');
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchConsultations();
    }
  }, [user]);

  const fetchConsultations = async () => {
    try {
      const response = await axios.get('/api/consultations', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setConsultations(response.data);
    } catch (error) {
      setError('Failed to fetch consultations');
    }
  };

  const startCall = async (consultation) => {
    setSelectedConsultation(consultation);
    setIsInCall(true);

    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      localVideoRef.current.srcObject = stream;

      // Create peer connection
      peerConnectionRef.current = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' }
        ]
      });

      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        peerConnectionRef.current.addTrack(track, stream);
      });

      // Handle remote stream
      peerConnectionRef.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      // Create offer
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      // In a real implementation, you would send this offer to the other peer
      // For demo purposes, we'll simulate a self-call
      console.log('Call started - WebRTC offer created');

    } catch (error) {
      setError('Failed to start video call: ' + error.message);
      setIsInCall(false);
    }
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }

    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }

    setIsInCall(false);
    setSelectedConsultation(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Video Consultations
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {!isInCall ? (
        <Grid container spacing={3}>
          {consultations.map((consultation) => (
            <Grid item xs={12} md={6} lg={4} key={consultation._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Consultation #{consultation._id.slice(-6)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {new Date(consultation.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Time: {consultation.time}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {consultation.status}
                  </Typography>
                  {consultation.doctor && (
                    <Typography variant="body2" color="text.secondary">
                      Doctor: {consultation.doctor.name}
                    </Typography>
                  )}
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => startCall(consultation)}
                    disabled={consultation.status !== 'confirmed'}
                  >
                    Start Video Call
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>
            Video Call in Progress
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Your Video
              </Typography>
              <video 
                ref={localVideoRef} 
                autoPlay 
                muted 
                style={{ width: '100%', border: '1px solid #ccc' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Doctor's Video
              </Typography>
              <video 
                ref={remoteVideoRef} 
                autoPlay 
                style={{ width: '100%', border: '1px solid #ccc' }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="error" onClick={endCall}>
              End Call
            </Button>
          </Box>
        </Box>
      )}

      {consultations.length === 0 && !isInCall && (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          No consultations found. Book a consultation to start video calling.
        </Typography>
      )}

      <Dialog open={!!selectedConsultation && !isInCall} onClose={() => setSelectedConsultation(null)}>
        <DialogTitle>Start Video Call</DialogTitle>
        <DialogContent>
          <Typography>
            Are you ready to start the video consultation? Make sure you have a stable internet connection and your camera/microphone are working.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedConsultation(null)}>Cancel</Button>
          <Button onClick={() => startCall(selectedConsultation)} variant="contained">
            Start Call
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default VideoConsultation;