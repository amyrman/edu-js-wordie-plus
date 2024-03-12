import { Typography, Box } from '@mui/material';

function About() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                typography: 'body1',
                bgcolor: 'background.default',
            }}
        >
            <Typography variant="h1" sx={{ color: 'primary.main' }}>
                About
            </Typography>
            <Typography sx={{ color: 'text.primary', mt: 2 }}>
                This is a description of the project.
            </Typography>
        </Box>
    );
}

export default About;
