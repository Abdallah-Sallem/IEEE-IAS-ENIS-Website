import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './IntroScreen.module.css';
import introVideo from '../../assets/INTRO.mp4';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 1.5 } },
};

const exitVariants = {
  exit: { opacity: 0, scale: 1.04, transition: { duration: 0.5, ease: 'easeIn' } },
};

export default function IntroScreen({ onEnter }) {
  return (
    <motion.div
      className={styles.introScreen}
      variants={exitVariants}
      exit="exit"
    >
      {/* Background Video */}
      <video
        className={styles.bgVideo}
        src={introVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className={styles.overlay} aria-hidden="true" />

      {/* Content */}
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          className={styles.enterBtn}
          variants={itemVariants}
          onClick={onEnter}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Enter the IEEE IAS ENIS SBC website"
        >
          Enter Site
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
