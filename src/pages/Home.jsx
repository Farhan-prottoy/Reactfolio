import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Download,
  ArrowRight,
  Code,
  Zap,
  Brain,
  Award,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
} from "lucide-react";

const Home = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const titles = [
    "EEE Engineer",
    "Web Developer",
    "Embedded Systems Enthusiast",
    "Machine Learning Explorer",
    "Problem Solver",
  ];

  useEffect(() => {
    const currentTitle = titles[currentIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= currentTitle.length) {
        setDisplayText(currentTitle.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % titles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  const skills = [
    { name: "Programming", icon: Code, color: "text-blue-500" },
    { name: "Embedded Systems", icon: Zap, color: "text-yellow-500" },
    { name: "Machine Learning", icon: Brain, color: "text-purple-500" },
    { name: "Problem Solving", icon: Award, color: "text-green-500" },
  ];

  const quickStats = [
    { label: "CGPA", value: "3.57/4.00" },
    { label: "Codeforces Problems", value: "300+" },
    { label: "CodeChef Rating", value: "1436" },
    { label: "Projects Completed", value: "5+" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <p className="text-primary-600 dark:text-primary-400 font-medium">
                  Hello, I'm
                </p>
                <h1 className="text-4xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white">
                  Farhan Arefin Khan
                </h1>
                <div className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 h-8">
                  <span className="typing-animation">{displayText}</span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                Passionate Electrical & Electronic Engineering student
                specializing in embedded systems, web development, and machine
                learning. Always eager to learn new technologies and solve
                complex problems.
              </motion.p>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400"
              >
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>Sylhet, Bangladesh</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>farhan.prottoy.17@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>+880 1751-948747</span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/contact" className="btn-primary group">
                  Get In Touch
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <a
                  href="/Farhan_Arefin_Khan_CV.pdf"
                  download="Farhan_Arefin_Khan_CV.pdf"
                  className="btn-secondary group"
                >
                  Download CV
                  <Download
                    size={18}
                    className="ml-2 group-hover:translate-y-1 transition-transform"
                  />
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex space-x-4"
              >
                <a
                  href="https://github.com/farhan-arefin-khan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/farhan-arefin-khan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-80 h-80 mx-auto lg:w-96 lg:h-96">
                {/* Background Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-4 border border-electric-300 dark:border-electric-700 rounded-full"
                />

                {/* Profile Image */}
                <div className="absolute inset-8 bg-gradient-to-br from-primary-100 to-electric-100 dark:from-primary-900 dark:to-electric-900 rounded-full flex items-center justify-center overflow-hidden shadow-2xl">
                  <img
                    src="/images/Images/my-image.jpg"
                    alt="Farhan Arefin Khan"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  {/* Fallback */}
                  <div
                    className="w-full h-full bg-gradient-to-br from-primary-600 to-electric-600 rounded-full flex items-center justify-center text-white text-4xl font-bold"
                    style={{ display: "none" }}
                  >
                    FK
                  </div>
                </div>

                {/* Floating Elements */}
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                      className={`absolute w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center ${skill.color}`}
                      style={{
                        top: `${20 + index * 15}%`,
                        left: index % 2 === 0 ? "-10%" : "110%",
                      }}
                    >
                      <Icon size={24} />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              What I Do
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate about creating innovative solutions through technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card text-center group"
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${skill.color}`}
                  >
                    <Icon size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {skill.name === "Programming" &&
                      "Python, C++, JavaScript, React, and more"}
                    {skill.name === "Problem Solving" &&
                      "Competitive programming and Web Development"}

                    {skill.name === "Embedded Systems" &&
                      "Arduino, ESP32, NodeMCU"}
                    {skill.name === "Machine Learning" &&
                      "TensorFlow, PyTorch, Computer Vision"}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-electric-600 text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Let's Work Together
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Have a project in mind? Let's discuss how we can bring your ideas
              to life.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 group"
            >
              Start a Conversation
              <ArrowRight
                size={20}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
