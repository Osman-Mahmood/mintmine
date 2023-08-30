import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/system';

const StyledSlider = styled(Slider)(({ theme }) => {
    console.log("Theme object:", theme);  // Add this line
    return {
        '& .MuiSlider-markLabel': {
            // fontSize: theme?.typography.fontSize * 1.2,
        },
    };
});


export default function Range({ percentValue, barAmount, isDisable }) {
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
        <Box sx={{ width: 300, }}>
            <StyledSlider
                value={percentValue}
                onChange={(e) => {
                    barAmount(e.target.value)
                }}
                disabled={!isDisable}
                aria-label="Always visible"
                defaultValue={0}
                step={1}
                marks={marks.map((mark) => ({ ...mark, label: mark.label === "Max" ? mark.label : mark.label+ '%' }))}
                valueLabelDisplay="on"
            />
        </Box>
    );
}
