import { useEffect, useState } from "react";
import { topics } from "./data/topics";
import Card from "./components/Card";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./themeContext";

// --- Description Generator ---
const generateHybridDescription = (original, title) => {
  const templates = [
    `${title} helps developers speed up their workflow by offering intuitive and efficient features. It’s great for collaboration and scaling. Trusted by teams worldwide.`,
    `${title} enhances your dev experience with built-in performance tools and a sleek interface. Perfect for individual and team productivity across projects.`,
    `${title} streamlines development with a balance of simplicity and power. It offers deep integrations, time-saving features, and modern support.`,
    `${title} is designed to help you build, test, and ship faster. With powerful customization options, it adapts to your tech stack and team needs.`,
    `${title} offers a modern solution to everyday developer challenges. Whether you're working solo or in a team, it makes tasks smoother and faster.`,
  ];
  const useOriginal = Math.random() < 0.4;
  return useOriginal ? original : templates[Math.floor(Math.random() * templates.length)];
};

// Flatten all tools
const allToolsBase = Object.values(topics).flat();

const App = () => {
  const [selectedTopic, setSelectedTopic] = useState("All Developer Tools");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { isDark, toggleTheme } = useTheme();
  const [showTop, setShowTop] = useState(false);

  const refreshData = () => {
    const sourceData =
      selectedTopic === "All Developer Tools" ? allToolsBase : topics[selectedTopic];
    const randomized = sourceData.map((item) => ({
      ...item,
      description: generateHybridDescription(item.description, item.title),
    }));
    setFilteredData(randomized);
  };

  useEffect(() => {
    refreshData();
  }, [selectedTopic]);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);

  const filteredItems = filteredData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      className={`min-h-screen px-4 sm:px-6 py-10 transition-colors duration-500 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start">
              {"Topic Explorer".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <p className="mt-2 text-sm sm:text-base text-gray-400 max-w-xl">
              Discover the best tools developers love — organized, searchable, and beautiful.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className={`p-2 w-full sm:w-auto rounded-md border ${
                isDark ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"
              }`}
            >
              <option value="All Developer Tools">All Developer Tools</option>
              {Object.keys(topics).map((topic, idx) => (
                <option key={idx} value={topic}>
                  {topic}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
              className={`p-2 w-full sm:w-auto rounded-md border ${
                isDark ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"
              }`}
            />

            <div className="flex gap-2">
              <button
                onClick={refreshData}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Refresh
              </button>

              <button
                onClick={toggleTheme}
                className="px-3 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition"
              >
                {isDark ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <Card
                key={idx}
                title={item.title}
                description={item.description}
                price={item.price}
                link={item.link}
                logo={item.logo}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Back to Top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-md transition z-50"
        >
          ⬆ Back to Top
        </button>
      )}
    </div>
  );
};

export default App;
