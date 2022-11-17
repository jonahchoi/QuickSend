import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import UploadForm from './UploadForm.jsx';
import SelectScreen from './SelectScreen.jsx';
import Share from './Share.jsx';
import Downloads from './Downloads.jsx';
import Verification from './Verification.jsx';
import Err404 from './Err404.jsx';
import useStorage from '../Hooks/useStorage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import BlackLogo from '../assets/BlackLogo.png';
import WhiteLogo from '../assets/WhiteLogo.png';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [firstLoad, setFirstLoad] = useState(true);

  let {
    uploadToStorage,
    getFromStorage,
    queryFromStorage,
    progress,
    firestoreId,
    idCode,
    err
  } = useStorage();

  useEffect(() => {
    if(progress === 100 && firestoreId) {
      navigate(`/share/${firestoreId}`);
    }
  }, [firestoreId]);

  useEffect(() => {
    if(location.pathname !== '/') {
      setFirstLoad(false);
    } else {
      let timer = setTimeout(() => {
        setFirstLoad(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return(
    <HomePage>
      <GlobalStyle />
      <HeaderLink to="/">
        <Logo
          src={location.pathname === '/' ? BlackLogo : WhiteLogo}
          initial={location.pathname === '/' ? true : false}
          animate={{
            opacity: [0, 1],
            transition: {
              duration: 0,
              delay: 1
            }
          }}
        />
      </HeaderLink>
      <AnimatePresence initial={false}>
        <Routes>
          {/* <Route path='/'> */}
            <Route path='/'element={<SelectScreen firstLoad={firstLoad} />}/>
            <Route path='/upload' element={<UploadForm uploadToStorage={uploadToStorage} progress={progress} />} />
            <Route path='/share/:id' element={<Share getFromStorage={getFromStorage} navigate={navigate} />} />
            <Route path="/download" element={<Verification queryFromStorage={queryFromStorage} navigate={navigate} />} />
            <Route path='/download/:id' element={<Downloads getFromStorage={getFromStorage} />} />
            <Route path='/*' element={<Err404 />} />
          {/* </Route> */}
        </Routes>
      </AnimatePresence>
    </HomePage>
  );
}

const GlobalStyle = createGlobalStyle`
  body, html{
    margin: 0;
    padding: 0;
    background-color: #042A2B;
    color: white;
    font-family: 'Sono', sans-serif;
    overflow: hidden;
  }
  #root {
    height: 100vh;
    margin:0;
    padding: 0;
  }
`
const HomePage = styled.div`
  height: 100%;
`
const Logo = styled(motion.img)`
  width: 300px;
  height: auto;
  margin: 0;
`

const HeaderLink = styled(Link)`
  position: absolute;
  height: 5vh;
  top: 0;
  left: 0;
  margin: 0;
  padding: 10px 25px;
`

export default App;