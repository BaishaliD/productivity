import { AnimatePresence, motion } from "framer-motion";

const Label = ({ text }) => {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={text}
        initial={{ x: -150 }}
        animate={{
          x: 0,
          transition: { delay: 0.3, duration: 0.3 },
        }}
        exit={{ x: 150, transition: { duration: 0.3 } }}
      >
        {text}
      </motion.div>
    </AnimatePresence>
  );
};

export default Label;
