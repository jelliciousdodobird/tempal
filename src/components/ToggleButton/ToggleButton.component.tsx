// import { container, content, scrubber } from "./ToggleButton.css";
import { motion } from "framer-motion";

export const ToggleButton = () => {
  return (
    <motion.button className={`container`}>
      <span className={`scrubber`}></span>
    </motion.button>
  );
};
