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

const Intro = () => {
  return (
    <div className={styles.introContainer}>
      <motion.h1
        className={styles.intro}
        initial={{ height: 0 }}
        animate={{ height: 300, transition: { delay: 0.3 } }}
      >
        Quotidian_
      </motion.h1>
    </div>
  );
};

const parent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3
    }
  }
};

const children = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0
  }
};

const intro = {
  hidden: { opacity: 0, transition: { delay: 0.2 } },
  visible: {
    opacity: 1
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
        {!introed && (
          <motion.div
            key="intro"
            className={styles.intro}
            variants={intro}
            initial="visible"
            exit="hidden"
            onAnimationComplete={() => setLoadMain(true)}
          >
            <Intro />
          </motion.div>
        )}

        <motion.div
          key="main"
          initial={"hidden"}
          animate={loadMain ? "visible" : "hidden"}
          variants={parent}
        >
          <motion.div key={1} variants={children}>
            <Logo />
          </motion.div>

          <motion.div key={2} variants={children}>
            <CommentForm />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
