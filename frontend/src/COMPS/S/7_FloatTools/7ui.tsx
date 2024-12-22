import {styled} from "@mui/material";


export const FloatContainer = styled('div')({
    width: '400px',
    height: '72px', //same as Figma
    backgroundColor: 'white',
    border: '1px solid #00000050',
    borderRadius: '20px',
    position: 'absolute',
    // zIndex: 100,
    gap: '10px',
    left: '50%',
    bottom: '20px',
    transform: 'translateX(-50%)',
    boxShadow:'0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})