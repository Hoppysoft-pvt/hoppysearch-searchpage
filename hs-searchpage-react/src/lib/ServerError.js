import Box from "@mui/material/Box";
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import { Typography } from "@mui/material";

const ServerError = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <ReportGmailerrorredOutlinedIcon fontSize='large' sx={{ mt: 5 }} />
            <Typography variant="subtitle1" sx={{ mt: 2, fontSize: 25 }}>
                Oops, something went wrong!
            </Typography>
            <Typography variant="subtitle1">
                {
                    `Our server encountered an error and we were unable to complete your request. 
                We apologize for any inconvenience this may have caused.`
                }
            </Typography>
            <Typography variant="subtitle1">
                {`If the problem persists, please report ` }
                <a target="_blank" href="https://help@hoppysearch.com/">here</a>
                {` and include this 
                error message and any relevant details about the action you were attempting to perform.`
                }
            </Typography>
        </Box>
    );
}

export default ServerError;
