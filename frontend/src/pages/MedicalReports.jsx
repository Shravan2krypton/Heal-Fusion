import React, { useState, useEffect, useContext } from 'react';
import { 
  Container, Typography, Grid, Card, CardContent, 
  Button, Box, Chip, Alert, Dialog, DialogTitle, DialogContent
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const MedicalReports = () => {
  const { user } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchReports();
    }
  }, [user]);

  const fetchReports = async () => {
    try {
      const response = await axios.get('/api/medical-reports', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setReports(response.data);
    } catch (error) {
      setError('Failed to fetch medical reports');
    }
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const handleCloseDialog = () => {
    setSelectedReport(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Medical Reports
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {reports.map((report) => (
          <Grid item xs={12} md={6} lg={4} key={report._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {report.title}
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Chip 
                    label={report.type} 
                    color="primary" 
                    size="small" 
                  />
                  <Chip 
                    label={report.status} 
                    color={report.status === 'final' ? 'success' : 'warning'} 
                    size="small" 
                    sx={{ ml: 1 }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Date: {new Date(report.date).toLocaleDateString()}
                </Typography>
                {report.doctor && (
                  <Typography variant="body2" color="text.secondary">
                    Doctor: {report.doctor.name} ({report.doctor.specialization?.join(', ')})
                  </Typography>
                )}
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={() => handleViewReport(report)}
                >
                  View Report
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {reports.length === 0 && (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          No medical reports found.
        </Typography>
      )}

      <Dialog open={!!selectedReport} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedReport?.title}
        </DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Date: {new Date(selectedReport.date).toLocaleDateString()}
              </Typography>
              {selectedReport.doctor && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Doctor: {selectedReport.doctor.name} ({selectedReport.doctor.specialization?.join(', ')})
                </Typography>
              )}
              <Typography variant="body1" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
                {selectedReport.content}
              </Typography>
              {selectedReport.attachments && selectedReport.attachments.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Attachments
                  </Typography>
                  {selectedReport.attachments.map((attachment, index) => (
                    <Typography key={index} variant="body2">
                      <a href={attachment} target="_blank" rel="noopener noreferrer">
                        {attachment}
                      </a>
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default MedicalReports;