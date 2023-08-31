import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles'; // Import useTheme

const StyledSlider = styled(Slider)(({ theme }) => ({
    '& .MuiSlider-mark[data-index="1"], .MuiSlider-mark[data-index="2"], .MuiSlider-mark[data-index="3"], .MuiSlider-mark[data-index="4"]': {
        backgroundColor: 'blue',  // Set the color of the marks to black
        width: 5,  // Set the width of the marks
        height: 5, // Set the height of the marks
        marginTop: 0, // Adjust vertical positioning of the marks
    },
    '& .MuiSlider-rail': {
        backgroundColor: theme.palette.primary.light,
    },
    '& .MuiSlider-track': {
        backgroundColor: theme.palette.primary.main,
    },
    '& .MuiSlider-thumb': {
        color: theme.palette.primary.main,
    },
}));
export default function Range({ percentValue, barAmount, isDisable }) {
    const theme = useTheme(); // Get the current theme

    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 25,
            label: '25',
        },
        {
            value: 50,
            label: '50',
        },
        {
            value: 75,
            label: '75',
        },
        {
            value: 100,
            label: 'Max',
        },
    ];
    
    return (
        <Box sx={{ width: 300 }}>
            <StyledSlider
                theme={theme} // Pass the theme to StyledSlider
                value={percentValue}
                onChange={(e) => {
                    barAmount(e.target.value);
                }}
                disabled={!isDisable}
                aria-label="Always visible"
                defaultValue={0}
                step={1}
                marks={marks.map((mark) => ({ ...mark, label: mark.label === "Max" ? mark.label : mark.label + '%' }))}
                valueLabelDisplay="on"
            />
        </Box>
    );
}
