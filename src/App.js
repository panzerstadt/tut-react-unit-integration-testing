import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

import CommentForm from "./components/CommentForm";
import ImageCard from "./components/ImageCard";
import useFetch from "./components/Api";

import styles from "./App.module.css";

import img from "./assets/19023.jpeg";

const SingleTest = () => {
  const [state, doFetch] = useFetch("https://httpbin.org/get?id=1", {});

  return (
    <>
      <ImageCard src={img} title="Team Lab" author="@someone" />
      <div style={{ color: "white" }}>
        {state.data && state.data.args && state.data.args.id}
      </div>
    </>
  );
};

const Logo = () => {
  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>Quotidian_</h1>
    </div>
  );
};

const Intro = ({ onAnimationComplete }) => {
  return (
    <div className={styles.introContainer}>
      <motion.h1
        className={styles.intro}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          opacity: 1
        }}
        onAnimationComplete={onAnimationComplete}
      >
        Quotidian_
      </motion.h1>
    </div>
  );
};

const variant = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.5 }
  }
};

const intro = {
  hidden: { opacity: 0, transition: { delay: 1 } },
  visible: {
    opacity: 1,
    transition: { delay: 1 }
  }
};

const App = () => {
  const [introed, setIntroed] = useState(false);
  const [loadMain, setLoadMain] = useState(false);
  useEffect(() => {
    setIntroed(true);

    return () => setIntroed(false);
  }, []);
  return (
    <div className="App">
      <AnimatePresence initial={false}>
        {!introed ? (
          <motion.div
            key="intro"
            className={styles.intro}
            variants={intro}
            initial="visible"
            animate="visible"
            exit="hidden"
          >
            <Intro onAnimationComplete={() => setLoadMain(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={"hidden"}
            animate={"visible"}
            variants={variant}
          >
            <Logo />
            <CommentForm />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
