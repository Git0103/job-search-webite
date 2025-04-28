import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CloudIcon from '@mui/icons-material/Cloud';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <CloudIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cloud Job Search
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/jobs">
            Jobs
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/post-job"
            variant="outlined"
            sx={{ ml: 2 }}
          >
            Post Job
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 