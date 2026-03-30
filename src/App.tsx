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
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const base = import.meta.env.BASE_URL;

  return (
    <div className="page">
      <div className="grain" />
      <div className="bg-glow" />
      <div className="page-border" />

      {/* Nav */}
      <nav className="nav">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="nav-brand"
        >
          DEADBEATS & CO.
        </motion.span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="nav-icons"
        >
          <a href="#"><AtSign size={15} /></a>
          <a href="#"><Music size={15} /></a>
        </motion.div>
      </nav>

      {/* Content */}
      <motion.main
        className="content"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Skull emblem — blended so black bg disappears */}
        <motion.div variants={fadeUp} className="emblem-wrap">
          <img
            src={`${base}assets/skull-club-emblem.png`}
            alt="Deadbeats"
            className="emblem"
          />
        </motion.div>

        {/* & CO. */}
        <motion.div variants={fadeUp} className="co-text">
          & Co.
        </motion.div>

        {/* Badge */}
        <motion.div variants={fadeUp} className="badge">
          THRIFT & VINTAGE
        </motion.div>

        {/* Tagline */}
        <motion.p variants={fadeUp} className="tagline">
          Curated secondhand style.<br />
          New location dropping soon.
        </motion.p>

        {/* Form */}
        <motion.div variants={fadeUp} className="form-wrap">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="fields-row">
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
                    placeholder="Email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit">
                    <ArrowRight size={18} />
                  </button>
                </div>
                <p className="form-hint">Be first to shop the collection</p>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success"
              >
                <img
                  src={`${base}assets/skull-club-emblem.png`}
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
      <footer className="foot">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          EST. 2026
        </motion.span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="foot-mid">
          COMING SOON
        </motion.span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
          DEADBEATS & CO.
        </motion.span>
      </footer>
    </div>
  );
};

export default DeadbeatsApp;
