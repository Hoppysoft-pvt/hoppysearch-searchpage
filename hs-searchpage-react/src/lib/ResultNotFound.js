import React from 'react';
import Box from "@mui/material/Box";
import SentimentDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentDissatisfiedTwoTone';
import { Typography } from "@mui/material";

const ResultNotFound = ({ searchText }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <SentimentDissatisfiedTwoToneIcon fontSize='large' sx={{mt: 5}} />
            <Typography variant="subtitle1" sx={{mt: 2, fontSize: 25}}>
                Sorry! No result found for: <b>{searchText}</b>
            </Typography>
            <Typography variant="subtitle1">
                Please try using other words.
            </Typography>
        </Box>
    );
}

export default ResultNotFound;
