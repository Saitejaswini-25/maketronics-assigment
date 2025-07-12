// Card.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../themeContext.jsx";
import { Tooltip } from "react-tooltip";

const Card = ({ title, description, price, link, logo }) => {
  const { isDark } = useTheme();
  const [showMore, setShowMore] = useState(false);
  const preview = description.length > 200 ? description.slice(0, 200) + "..." : description;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-2xl shadow-md border transition-colors duration-300 hover:shadow-xl hover:border-purple-500 relative overflow-hidden group backdrop-blur-md ${
        isDark ? "bg-[#1f2937] text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-200"
      }`}
    >
      <div className="flex items-center mb-2">
        {logo && (
          <img
            src={logo}
            alt={`${title} logo`}
            onError={(e) => e.target.remove()}
            className="w-8 h-8 mr-3 object-contain rounded"
          />
        )}
        <h2
          className="text-xl font-semibold animate-pulse"
          data-tooltip-id="titleTip"
          data-tooltip-content={`Tool: ${title}`}
        >
          {title}
        </h2>
        <Tooltip id="titleTip" />
      </div>

      <p className="text-sm mb-2 text-gray-500 dark:text-gray-400 whitespace-pre-wrap">
        {showMore ? description : preview}
      </p>

      {description.length > 200 && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-xs text-blue-500 hover:underline mb-2"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}

      <p className="font-bold mb-1 text-purple-500 dark:text-purple-400">{price}</p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-500 hover:underline relative z-10"
      >
        Visit →
        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/10 via-white/30 to-white/10 blur-sm animate-shine"></span>
      </a>
    </motion.div>
  );
};

export default Card;