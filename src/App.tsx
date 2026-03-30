import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, AtSign, Music } from 'lucide-react';

const DeadbeatsApp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <div className="page-wrapper">
      <div className="noise-overlay" />

      {/* Nav */}
      <nav className="nav">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="nav-brand"
        >
          DEADBEATS & CO.
        </motion.span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="nav-icons"
        >
          <a href="#" aria-label="Social"><AtSign size={16} /></a>
          <a href="#" aria-label="Music"><Music size={16} /></a>
        </motion.div>
      </nav>

      {/* Main */}
      <motion.main
        className="main-content"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Hero emblem */}
        <motion.div variants={fadeUp} className="hero-emblem-wrap">
          <img
            src={`${import.meta.env.BASE_URL}assets/skull-club-emblem.png`}
            alt="Deadbeats skull emblem"
            className="hero-emblem"
          />
        </motion.div>

        {/* Wordmark */}
        <motion.div variants={fadeUp} className="wordmark-wrap">
          <img
            src={`${import.meta.env.BASE_URL}assets/deadbeats-and-co-wordmark.png`}
            alt="Deadbeats & Co."
            className="wordmark"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </motion.div>

        {/* Store type */}
        <motion.div variants={fadeUp} className="store-label">
          <span className="label-line" />
          <span>THRIFT & VINTAGE</span>
          <span className="label-line" />
        </motion.div>

        {/* Tagline */}
        <motion.p variants={fadeUp} className="tagline">
          Curated secondhand style.<br />
          New location dropping soon.
        </motion.p>

        {/* Form */}
        <motion.div variants={fadeUp} className="form-wrapper">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, y: -10 }}
                className="signup-form"
              >
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="First name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="email-row">
                  <input
                    type="email"
                    placeholder="Your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="submit-btn" aria-label="Submit">
                    <ArrowRight size={18} />
                  </button>
                </div>
                <p className="form-note">
                  Be first to shop the collection
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-state"
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/skull-club-emblem.png`}
                  alt=""
                  className="success-skull"
                />
                <h3>YOU'RE ON THE LIST</h3>
                <p>We'll hit you up when doors open.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.main>

      {/* Footer */}
      <footer className="footer">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          EST. 2024
        </motion.span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="footer-center">
          COMING SOON
        </motion.span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          DEADBEATS & CO.
        </motion.span>
      </footer>
    </div>
  );
};

export default DeadbeatsApp;
