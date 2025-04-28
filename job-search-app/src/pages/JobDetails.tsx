import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Job } from '../types/job';

const JobDetails = () => {
  const { id } = useParams();
  const { data: job, isLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const docRef = doc(db, 'jobs', id!);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Job;
      }
      throw new Error('Job not found');
    },
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!job) {
    return <Typography>Job not found</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {job.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {job.company} - {job.location}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Chip
                label={job.cloudType}
                color="primary"
                sx={{ mr: 1 }}
              />
              <Chip
                label={job.type}
                color="secondary"
                sx={{ mr: 1 }}
              />
              <Chip
                label={`${job.experience.min}-${job.experience.max} years`}
                variant="outlined"
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Job Description
            </Typography>
            <Typography paragraph>
              {job.description}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Requirements
            </Typography>
            <List>
              {job.requirements.map((req, index) => (
                <ListItem key={index}>
                  <ListItemText primary={req} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Benefits
            </Typography>
            <List>
              {job.benefits.map((benefit, index) => (
                <ListItem key={index}>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Skills Required
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {job.skills.map((skill, index) => (
                <Chip key={index} label={skill} variant="outlined" />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Salary Range
            </Typography>
            <Typography>
              {job.salary.currency} {job.salary.min} - {job.salary.max}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
            >
              Apply Now
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default JobDetails; 