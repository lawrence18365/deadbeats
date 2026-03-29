import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Skull, Music } from 'lucide-react';

const DeadbeatsApp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mouse-driven parallax on the skull watermark
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const skullX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const skullY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 40);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      console.log('Submitted:', { firstName, lastName, email });
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.13, delayChildren: 0.5 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <div className="page-wrapper">
      {/* Atmospheric layers */}
      <div className="noise-overlay" />
      <div className="scan-line" />
      <div className="crt-lines" />
      <div className="vignette" />

      {/* Corner registration marks */}
      <div className="corner top-left" />
      <div className="corner top-right" />
      <div className="corner bottom-left" />
      <div className="corner bottom-right" />

      {/* Massive skull watermark with parallax + glow */}
      <motion.div className="skull-watermark" style={{ x: skullX, y: skullY }}>
        <img src="/assets/skull-club-emblem.png" alt="" className="skull-img" />
        <div className="skull-glow" />
      </motion.div>

      {/* Navigation */}
      <nav className="nav">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          DEADBEATS & CO.
        </motion.span>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="nav-icons"
        >
          <Music size={14} />
          <Skull size={14} />
        </motion.div>
      </nav>

      {/* Main content — cinematic staggered reveal */}
      <motion.main
        className="main-content"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="coming-soon-label">
          <span className="label-line" />
          <span>COMING SOON</span>
          <span className="label-line" />
        </motion.div>

        <motion.div variants={fadeUp} className="wordmark-wrap">
          <img
            src="/assets/deadbeats-and-co-wordmark.png"
            alt="Deadbeats & Co."
            className="wordmark glitch"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </motion.div>

        <motion.div variants={fadeUp} className="divider">
          <span className="div-line" />
          <span className="div-text">TRIBE &nbsp;&#9670;&nbsp; RISK &nbsp;&#9670;&nbsp; REBELLION</span>
          <span className="div-line" />
        </motion.div>

        <motion.p variants={fadeUp} className="tagline">
          For the outsiders, the riders,
          <br />
          and the night people.
        </motion.p>

        <motion.div variants={fadeUp} className="form-wrapper">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, y: -20 }}
                className="signup-form"
              >
                <div className="form-row">
                  <div className="form-field">
                    <input
                      type="text"
                      placeholder="FIRST NAME"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <span className="field-accent" />
                  </div>
                  <div className="form-field">
                    <input
                      type="text"
                      placeholder="LAST NAME"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <span className="field-accent" />
                  </div>
                </div>
                <div className="form-field email-field">
                  <input
                    type="email"
                    placeholder="YOUR EMAIL ADDRESS"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="field-accent" />
                  <button type="submit" className="submit-btn">
                    <ArrowRight size={16} />
                  </button>
                </div>
                <p className="form-note">
                  Join the inner circle — first access to everything
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-state"
              >
                <div className="success-icon">
                  <Skull size={40} className="flicker" />
                  <div className="success-glow" />
                </div>
                <h3>YOU'RE IN</h3>
                <p>Signal received. Stand by.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.main>

      {/* Footer */}
      <footer className="footer">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 1.8 }}
        >
          EST. 2024
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 2.0 }}
          className="footer-center"
        >
          STAY DEAD // BEAT THE ODDS
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 2.2 }}
        >
          V1.0
        </motion.span>
      </footer>
    </div>
  );
};

export default DeadbeatsApp;
