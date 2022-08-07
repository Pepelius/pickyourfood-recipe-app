import {motion} from 'framer-motion';
import Suggestions from "../components/Suggestions";

import React from "react";

function Home() {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: .5}}
        >
            <h1>Home</h1>
            <Suggestions />
        </motion.div>
    )
}

export default Home;