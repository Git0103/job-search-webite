import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Job } from '../types/job';

const JobList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [cloudType, setCloudType] = useState(searchParams.get('cloudType') || '');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showApplyAlert, setShowApplyAlert] = useState(false);
  const [appliedJobTitle, setAppliedJobTitle] = useState('');

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const jobsRef = collection(db, 'jobs');
      const q = query(jobsRef);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
    },
  });

  const handleViewDetails = async (jobId: string) => {
    try {
      setLoadingDetails(true);
      setError(null);
      console.log('Fetching job details for ID:', jobId);
      
      const docRef = doc(db, 'jobs', jobId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const jobData = { id: docSnap.id, ...docSnap.data() } as Job;
        console.log('Job details fetched:', jobData);
        setSelectedJob(jobData);
        setOpenDialog(true);
      } else {
        console.log('No job found with ID:', jobId);
        setError('Job details not found');
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
      setError('Failed to fetch job details. Please try again.');
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
    setError(null);
  };

  const handleApply = (jobTitle: string) => {
    setAppliedJobTitle(jobTitle);
    setShowApplyAlert(true);
  };

  const handleCloseAlert = () => {
    setShowApplyAlert(false);
  };

  useEffect(() => {
    let filtered = [...jobs];
    
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (cloudType) {
      filtered = filtered.filter(job => job.cloudType === cloudType);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, cloudType]);

  const jobsPerPage = 6;
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (page - 1) * jobsPerPage,
    page * jobsPerPage
  );

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search jobs..."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Job Role</InputLabel>
              <Select
                value={cloudType}
                label="Cloud Type"
                onChange={(e) => setCloudType(e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Data Analyst">Data Analyst</MenuItem>
                <MenuItem value="Cloud Engineer">Cloud Engineer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {paginatedJobs.map((job) => (
            <Grid item xs={12} md={6} key={job.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {job.title}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {job.company} - {job.location}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={job.cloudType}
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={job.type}
                      color="secondary"
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" paragraph>
                    {job.description.substring(0, 150)}...
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Posted: {new Date(job.postedAt).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleViewDetails(job.id)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleApply(job.title)}
                    >
                      Apply Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Apply Alert */}
        <Snackbar
          open={showApplyAlert}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
            Successfully applied for {appliedJobTitle}!
          </Alert>
        </Snackbar>

        {/* Job Details Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          {loadingDetails ? (
            <DialogContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            </DialogContent>
          ) : error ? (
            <DialogContent>
              <Alert severity="error">{error}</Alert>
            </DialogContent>
          ) : selectedJob ? (
            <>
              <DialogTitle>
                <Typography variant="h5">{selectedJob.title}</Typography>
                <Typography color="text.secondary">
                  {selectedJob.company} - {selectedJob.location}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={selectedJob.cloudType}
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={selectedJob.type}
                    color="secondary"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={`${selectedJob.experience.min}-${selectedJob.experience.max} years`}
                    variant="outlined"
                  />
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                <Typography variant="h6" gutterBottom>
                  Job Description
                </Typography>
                <Typography paragraph>
                  {selectedJob.description}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Requirements
                </Typography>
                <List>
                  {selectedJob.requirements.map((req, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={req} />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="h6" gutterBottom>
                  Skills Required
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedJob.skills.map((skill, index) => (
                    <Chip key={index} label={skill} variant="outlined" />
                  ))}
                </Box>

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Salary Range
                </Typography>
                <Typography>
                  {selectedJob.salary.currency} {selectedJob.salary.min} - {selectedJob.salary.max}
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Benefits
                </Typography>
                <List>
                  {selectedJob.benefits.map((benefit, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={benefit} />
                    </ListItem>
                  ))}
                </List>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleCloseDialog();
                    navigate(`/jobs/${selectedJob.id}`);
                  }}
                >
                  Apply Now
                </Button>
              </DialogActions>
            </>
          ) : null}
        </Dialog>

        {totalPages > 1 && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default JobList; 