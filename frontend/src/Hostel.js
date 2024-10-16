import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Card, Chip, Dialog, DialogContent, DialogTitle, DialogActions, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { ArrowBack, Wifi as WifiIcon, LocalParking as LocalParkingIcon, LocalDining as LocalDiningIcon, Verified as VerifiedIcon, ExpandMore as ExpandMoreIcon, Star as StarIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import Slider from 'react-slick';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ImgHostel1 from './assets/hostel1.jpg';
import ImgHostel2 from './assets/hostel2.jpg';
import ImgHostel3 from './assets/hostel3.jpg';
import profileImage from './assets/buddie.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import Header_sub from './Header_sub';


import Img11 from './assets/img11.jpg';
import Img22 from './assets/img22.jpg';
import Img33 from './assets/img33.jpg';




const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: 4,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '14px 16px',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  zIndex: 1000,
});

const StayText = styled(Typography)({
  fontFamily: '"Sofia", sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  color: 'orange',
});

const BuddieText = styled(Typography)({
  fontFamily: '"Sofia", sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
});


const ProfileIcon = styled(IconButton)({
  borderRadius: '50%',
  backgroundColor: '#ddd',
  width: '40px',
  height: '40px',
});


const carouselSettings = {
  // dots: true,
  infinite: true,
  speed: 200,
  autoplay: true, // Auto-scroll
  autoplaySpeed: 3000, // Speed of auto-scroll
  slidesToShow: 1,
  slidesToScroll: 1,
};


const CarouselContainer = styled('div')({
  height: '350px',
  position: 'relative',
  overflow: 'hidden',
});


const CarouselImage = styled('img')({
  width: '100%',
  // height: '100%',
  height: '350px',
  objectFit: 'contain',
});




const SectionContainer = styled(Box)({
  backgroundColor: '#fff',
  padding: '16px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
});

const SectionTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '20px',
  marginBottom: '16px',
});

const ReadMoreButton = styled(Button)({
  fontSize: '12px',
  textTransform: 'none',
  color: '#007BFF',
  padding: '0',
});

const RatingsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '16px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
});

const RatingValue = styled(Typography)({
  fontSize: '36px',
  fontWeight: 'bold',
  color: '#333',
});

const RatingSlider = styled(Slider)({
  '.slick-slide': {
    textAlign: 'center',
  },
  '.slick-slide img': {
    width: '100px',
    height: 'auto',
    borderRadius: '10px',
  },
});




const testimonials = [
  { message: 'Great stay! The staff was friendly and the amenities were top-notch.', name: 'John Doe', rating: 4 },
  { message: 'Very clean and well-maintained. I will definitely come back.', name: 'Jane Smith', rating: 5 },
  { message: 'Very clean and well-maintained. I will definitely come back.', name: 'Jane Smith', rating: 5 },

];

const ratingsData = [
  { star: 5, value: 60 },
  { star: 4, value: 30 },
  { star: 3, value: 70 },
  { star: 2, value: 20 },
  { star: 1, value: 10 },
];

const hostels = [
  ImgHostel1,
  ImgHostel2,
  ImgHostel3,
];


const HostelScreen = () => {

  const params = useParams(); // Extract parameters from the URL
  const hostelId = params.id; // Correctly access 'id' from params object


  const [hostel, setHostel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!hostelId) {
      setError('Hostel ID is missing');
      setLoading(false);
      return;
    }

    const fetchHostelDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/hostel/${hostelId}`);

        setHostel(response.data);
        // console.log(response.data);
      } catch (err) {
        setError('Error fetching hostel details');
        console.error('Error fetching hostel details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHostelDetails();
  }, []);



  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  const handleReadMoreClick = () => {
    setIsReadMoreOpen(true);
  };

  const handleReadMoreClose = () => {
    setIsReadMoreOpen(false);
  };


  const testimonialSettings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };


  // Convert hostel_owner_languages object to a readable string
  const getLanguages = (languages) => {
    if (!languages) return 'N/A';
    return Object.keys(languages)
      .filter(language => languages[language]) // Filter languages where value is true
      .join(', '); // Join the languages into a comma-separated string
  };

  
  const amenities = hostel.hostel_facilities || [];

  return (
    <div>
      {/* <AppBar position="static">
        <HeaderContainer>
          <Box display="flex" alignItems="center">
            <IconButton edge="start" color="inherit" aria-label="back" style={{ color: 'black' }} onClick={handleBackClick}>
              <ArrowBack />
            </IconButton>
            <StayText variant="h4" component="h1" style={{ marginLeft: '25px', color: '#006399' }}>
              Stay
            </StayText>
            <BuddieText variant="h4" component="h1">
              Buddie
            </BuddieText>
          </Box>
          <Box>
            <ProfileIcon>
              <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
            </ProfileIcon>
          </Box>
        </HeaderContainer>
      </AppBar> */}
      <Header_sub/>

      <CarouselContainer style={{ marginTop: '4px' }}>
  {loading ? (
    <Skeleton variant="rectangular" height={350} />
  ) : (
    <Slider {...carouselSettings}>
      <div>
        <img src={`data:image/jpeg;base64,${hostel.hostel_image}`} alt="Hostel" style={{  width: '100%',
  // height: '100%',
  height: '350px',
  objectFit: 'contain',}}/>
      </div>
      <div>
        <img src={`data:image/png;base64,${hostel.hostel_image1}`} alt="Slide 2"  style={{  width: '100%',
  // height: '100%',
  height: '350px',
  objectFit: 'contain',}}/>
      </div>
      <div>
        <img src={`data:image/png;base64,${hostel.hostel_image2}`} alt="Slide 3" style={{  width: '100%',
  // height: '100%',
  height: '350px',
  objectFit: 'contain',}}/>
      </div>
    </Slider>
  )}
</CarouselContainer>



      <Box p={2}>
        {loading ? (
          <>
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="rectangular" width="100%" height={100} style={{ margin: '16px 0' }} />
          </>
        ) : (
          <>
            <SectionContainer>
              <SectionTitle>Hostel Information</SectionTitle>

              
              <Typography variant="h5" fontWeight="bold">{hostel.hostel_name}</Typography>
              <Typography variant="body2" color="textSecondary" style={{ margin: '8px 0' }}>
                <StarIcon style={{ color: '#ffd700', marginRight: '4px' }} /> 4.5/5 Rating
              </Typography>
              <Typography variant="body2" color="textSecondary">{hostel.hostel_area}, {hostel.hostel_city}</Typography>
              <Typography variant="body2" color="textSecondary">Owner: {hostel.hostel_owner_name}</Typography>
              <Typography variant="body2" color="textSecondary">Since: {hostel.hostel_year}</Typography>
              {/* <Box component="img" src={hostel.hostel_qr_code} alt="Fabulous or Free" sx={{ height: '60px', borderRadius: '10px' }} /> */}

            </SectionContainer>

            <SectionContainer>
              <SectionTitle>About the Hostel</SectionTitle>
              <Typography variant="body2" color="textSecondary">
                {hostel.hostel_about}
              </Typography>
              <Box mt={2}>
                <Typography variant="body2" color="textSecondary">Amenities Rated: 3.5/5</Typography>
                <Box display="flex" flexWrap="wrap" alignItems="center" mt={1}>
                  {amenities.map((facility, idx) => (
                    <Chip key={idx} label={facility} style={{ margin: '4px' }} color="primary" />
                  ))}
                </Box>
              </Box>
            </SectionContainer>
          </>
        )}

        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={200} style={{ marginTop: '16px' }} />
        ) : (
          <RatingsContainer>
            <Box>
              <Typography variant="body2" color="textSecondary">Overall Rating</Typography>
              <RatingValue>4.5</RatingValue>
              <Box display="flex" alignItems="center">
                <StarIcon style={{ color: '#ffd700', marginRight: '4px' }} />
                <Typography variant="body2">4.5/5</Typography>
              </Box>
            </Box>
            <Box width="50%">
              <RatingSlider {...testimonialSettings}>
                {ratingsData.map((data) => (
                  <Box key={data.star} display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="body2">{data.star} Star</Typography>
                    <Box width="100%" mt={1} height="20px" position="relative">
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        width={`${data.value}%`}
                        height="100%"
                        backgroundColor="#ff9800"
                        borderRadius="10px"
                      />
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        border="1px solid #ff9800"
                        borderRadius="10px"
                        backgroundColor="transparent"
                      />
                    </Box>
                  </Box>
                ))}
              </RatingSlider>
            </Box>
          </RatingsContainer>
        )}
{/* 
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={300} style={{ marginTop: '16px' }} />
        ) : (
          <SectionContainer>
            <SectionTitle>Location Map</SectionTitle>
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '300px', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>Sunrise Hostel</Popup>
              </Marker>
            </MapContainer>
          </SectionContainer>
        )} */}


{loading ? (
  <Skeleton variant="rectangular" width="100%" height={300} style={{ marginTop: '16px' }} />
) : (
  <SectionContainer>
    <SectionTitle>Location Map</SectionTitle>
    <iframe
  src={hostel.hostel_google_map_location}
  width="100%"
  height="300"
  style={{ border: '0', marginTop: '16px' }}
  allowFullScreen=""
  loading="lazy">
</iframe>
  </SectionContainer>
)}

      </Box>
    </div>
  );
};

export default HostelScreen;