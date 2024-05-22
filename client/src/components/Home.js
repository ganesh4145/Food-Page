import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const images = [
  {
    url: 'https://img.freepik.com/premium-photo/frying-pan-with-cooking-food-gas-kitchen-stove-with-burning-burner_124507-57986.jpg',
    title: 'Login',
    width: '50%',
	linkto: '/login',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549_640.jpg',
    title: 'Signup',
    width: '50%',
	linkto: '/signup',
  }
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', 
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

  const BackgroundBox = styled(Box)(({theme})=>({
    backgroundImage:`url(https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9mdWxsX29mX2luZGlhbl9mb29kX3RvcF92aWV3X2ZsYXRfbF9mMmNkNWJlZC05OGJlLTQ2ZmUtOWJlOS1kMTdkMTY0ZmNiODhfMS5qcGc.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition:'center',
    height:'40vh',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center',
    position: 'relative',
    opacity: 0.8
  }))


export default function ButtonBaseDemo() {
  return (
    <div>
    <h1 style={{ margin: '0 auto', width: 'fit-content' }}>Neem</h1>
    <BackgroundBox>
      
     <Typography variant="h1" align="center" color={'darkgreen'}>Neem</Typography> 
    </BackgroundBox>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          href={image.linkto}
          key={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
    </div>
  );
}
