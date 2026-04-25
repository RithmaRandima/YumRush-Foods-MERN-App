import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FloatingBoxes = () => {
  // Scroll position state
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100 py-20">
      <div className="flex flex-wrap justify-center gap-12">
        {/* Red Box */}
        <motion.div
          className="w-32 h-32 bg-red-500 rounded-lg"
          style={{ y: scrollY * 0.2 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Green Box */}
        <motion.div
          className="w-48 h-24 bg-green-500 rounded-lg"
          style={{ y: scrollY * -0.15 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Yellow Box */}
        <motion.div
          className="w-24 h-48 bg-yellow-500 rounded-lg"
          style={{ y: scrollY * 0.25 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Blue Box */}
        <motion.div
          className="w-36 h-36 bg-blue-500 rounded-lg"
          style={{ y: scrollY * -0.2 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Purple Box */}
        <motion.div
          className="w-28 h-28 bg-purple-500 rounded-lg"
          style={{ y: scrollY * 0.3 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Orange Box */}
        <motion.div
          className="w-40 h-20 bg-orange-500 rounded-lg"
          style={{ y: scrollY * -0.1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Pink Box */}
        <motion.div
          className="w-32 h-40 bg-pink-500 rounded-lg"
          style={{ y: scrollY * 0.15 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </div>
  );
};

export default FloatingBoxes;
