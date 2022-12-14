import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { ColumnFlex } from './CommonStyles/Styles.jsx';
import AnimatedButton from './CommonStyles/AnimatedButton.jsx';
import PaperPlane from '../assets/PaperPlane.png';

/*
  TODO:
  Animate loading screen dots
*/
const SelectScreen = ({ firstLoad }) => {
  const rightControls = useAnimation();
  const leftControls = useAnimation();
  const innerRightControls = useAnimation();

  const animate = async () => {
    leftControls.start({
      opacity: [0, 1],
      transition: {
        duration: 0,
        delay: 1.5
      }
    })
    innerRightControls.start({
      opacity: 0,
      transition: {duration: 0}
    })
    await rightControls.start({
      left: ['-150%', '-100%', '-50%', '0%', '0%'],
      scaleX: [2, 2, 2, 2, 1],
      transition: {
        // left: {duration: 3},
        // scaleX: {duration: 4},
        duration: 2,
        delay: 0.5,
        times: [0, 0.25, 0.5, 0.8, 1],
        ease: 'linear'
      }
    })
    await innerRightControls.start({
      opacity: 1,
      transition: {
        duration: 1.5
      }
    })
  }
  let loadingScreenVar = {
    'initial':{},
    'load': {transition: {staggerChildren: 0.3}}
  }
  let dotsVar = {
    'initial': {y : 0},
    'load': {
      y: [0, -50, 0],
      transition: {
        duration: 0.6
      }
    }
  }

  useEffect(() => {
    firstLoad && animate();
  }, []);

  return (
    <HalfScreens>
      { firstLoad &&
      <LoadingScreen variants={loadingScreenVar} initial='initial' animate='load' >
        <i className="fa-solid fa-desktop"></i>
        <Dots variants={dotsVar}>.</Dots>
        <Dots variants={dotsVar}>.</Dots>
        <Dots variants={dotsVar}>.</Dots>
        <i className="fa-solid fa-mobile-screen-button"></i>
      </LoadingScreen> }
      <LeftSide
      animate={leftControls}>
        <h2>Sending files is as easy as 1, 2, 3</h2>
        <p>(Toss me!)</p>
        <motion.div
        drag
        dragConstraints={{left: 0, bottom: 0}}
        style={{position: 'relative'}}
        animate={{
          'zIndex': [0, 10],
          transition: {
            delay: 2.5
          }
        }}
        >
          <PlaneImg
          src={PaperPlane}
          draggable={false}
          ></PlaneImg>
        </motion.div>
        <motion.div>

        </motion.div>
      </LeftSide>
      <RightSide
      animate={rightControls}>
        <VerticalContainer
        as={motion.div}
        animate={innerRightControls}>
          <AnimatedButton direction={'upload'} />
          <VerticalBar />
          <AnimatedButton direction={'download'}/>
        </VerticalContainer>
      </RightSide>
    </HalfScreens>
  )
}

const HalfScreens = styled(ColumnFlex)`
  flex-direction: row;
  background-color: #9EE37D;
  color: black;
`
const RightSide = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: #042A2B;
  color: white;
  position: relative;
`
const VerticalContainer = styled(ColumnFlex)`

`
const LoadingScreen = styled(motion.div)`
  position: absolute;
  font-size: 10rem;
  color: black;
  top: calc(50% - 3.5rem);
  left: 35vw;

`
const LeftSide = styled(motion.div)`
  width: 100%;
  font-size: 1.5rem;
  text-align: center;
`
const VerticalBar = styled.div`
  background-color: white;
  height:5px;
  width: 100%;
`
const PlaneImg = styled(motion.img)`
  width: 25%;
  height: auto;
  position: relative;
`
const Dots = styled(motion.div)`
  display: inline-block;
`
export default SelectScreen;
