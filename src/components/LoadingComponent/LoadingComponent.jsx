import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate({size}) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress
        color='secondary'
        size={size}
      />
    </Box>
  );
}