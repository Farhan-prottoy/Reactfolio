import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ExternalLink, 
  Github, 
  Code, 
  Zap, 
  Brain,
  Filter,
  Calendar,
  Tag,
  Eye,
  Info
} from 'lucide-react'

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredProject, setHoveredProject] = useState(null)
  const [previewProject, setPreviewProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: 'Three-Phase Inverter System',
      description: 'A comprehensive three-phase inverter system using IGBT and Arduino for power conversion applications. Features advanced control algorithms and protection mechanisms for efficient AC power generation.',
      category: 'embedded',
      technologies: ['Arduino', 'IGBT', 'Power Electronics', 'C++', 'PWM Control'],
      image: '/images/projects/three-phase-inverter.svg',
      github: 'https://github.com/farhan-arefin-khan/three-phase-inverter',
      demo: null,
      featured: true,
      year: '2024',
      status: 'completed',
      details: 'Designed and implemented a three-phase inverter capable of converting DC to AC power with precise frequency and voltage control. The system incorporates protection circuits for overcurrent, overvoltage, and thermal protection.'
    },
    {
      id: 2,
      title: 'Smart Light Switch',
      description: 'An intelligent lighting control system with both manual and automatic control features. Includes motion sensing, ambient light detection, and smartphone integration via WiFi connectivity.',
      category: 'embedded',
      technologies: ['ESP32', 'IoT', 'Sensors', 'Mobile App', 'WiFi', 'MQTT'],
      image: '/images/projects/smart-light-switch.svg',
      github: 'https://github.com/farhan-arefin-khan/smart-light-switch',
      demo: null,
      featured: true,
      year: '2024',
      status: 'completed',
      details: 'Developed an IoT-based smart lighting system that automatically adjusts based on ambient conditions and occupancy. Features remote control through a mobile application and energy usage monitoring.'
    },
    {
      id: 3,
      title: '2D Material Flake Detection',
      description: 'Advanced computer vision system for detection and classification of 2D material flakes using Ensemble GMM and Neural Networks. Part of my undergraduate thesis research with high accuracy results.',
      category: 'ml',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'GMM', 'Neural Networks', 'Image Processing'],
      image: '/images/projects/2d-material-detection.svg',
      github: 'https://github.com/farhan-arefin-khan/2d-material-detection',
      demo: null,
      featured: true,
      year: '2024-2025',
      status: 'in-progress',
      details: 'Research project focusing on automated detection and classification of 2D materials like graphene flakes using machine learning techniques. Combines traditional computer vision with modern deep learning approaches.'
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion. Features dark mode, interactive chatbot, smooth animations, and optimized performance.',
      category: 'web',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'JavaScript', 'Responsive Design'],
      image: '/images/projects/portfolio-website.svg',
      github: 'https://github.com/farhan-arefin-khan/portfolio',
      demo: 'https://farhan-arefin-khan.com',
      featured: true,
      year: '2025',
      status: 'completed',
      details: 'A comprehensive portfolio website showcasing projects, skills, and achievements. Built with modern web technologies and optimized for performance and accessibility.'
    },
    {
      id: 5,
      title: 'Arduino Weather Station',
      description: 'IoT-based weather monitoring system using Arduino and various sensors. Collects temperature, humidity, atmospheric pressure data and displays real-time information on a web dashboard.',
      category: 'embedded',
      technologies: ['Arduino', 'DHT22', 'BMP280', 'WiFi', 'Web Dashboard', 'Real-time Data'],
      image: '/images/projects/weather-station.svg',
      github: 'https://github.com/farhan-arefin-khan/weather-station',
      demo: null,
      featured: false,
      year: '2023',
      status: 'completed',
      details: 'Comprehensive weather monitoring system that tracks environmental parameters and provides real-time data visualization through a web interface.'
    },
    {
      id: 6,
      title: 'Image Classification CNN',
      description: 'Convolutional Neural Network for image classification tasks. Implemented various CNN architectures and achieved high accuracy on custom datasets with data augmentation techniques.',
      category: 'ml',
      technologies: ['Python', 'TensorFlow', 'Keras', 'CNN', 'Data Augmentation', 'Transfer Learning'],
      image: '/images/projects/cnn-classification.svg',
      github: 'https://github.com/farhan-arefin-khan/image-classification',
      demo: null,
      featured: false,
      year: '2024',
      status: 'completed',
      details: 'Deep learning project implementing various CNN architectures for image classification. Explored different optimization techniques and achieved competitive results on benchmark datasets.'
    },
    {
      id: 7,
      title: 'PLC-Based Automation System',
      description: 'Industrial automation system using Programmable Logic Controllers (PLC) for manufacturing process control. Includes HMI interface and SCADA integration for monitoring.',
      category: 'embedded',
      technologies: ['PLC', 'HMI', 'SCADA', 'Ladder Logic', 'Industrial Automation'],
      image: '/images/projects/three-phase-inverter.svg', // Reusing image as placeholder
      github: 'https://github.com/farhan-arefin-khan/plc-automation',
      demo: null,
      featured: false,
      year: '2024',
      status: 'completed',
      details: 'Developed an industrial automation solution for manufacturing process control using PLC programming and HMI design principles.'
    },
    {
      id: 8,
      title: 'MATLAB Control System Design',
      description: 'Advanced control system design and simulation using MATLAB and Simulink. Implemented various control strategies including PID, LQR, and Model Predictive Control.',
      category: 'ml',
      technologies: ['MATLAB', 'Simulink', 'Control Systems', 'PID', 'LQR', 'MPC'],
      image: '/images/projects/2d-material-detection.svg', // Reusing image as placeholder
      github: 'https://github.com/farhan-arefin-khan/control-systems',
      demo: null,
      featured: false,
      year: '2024',
      status: 'completed',
      details: 'Comprehensive study and implementation of modern control techniques using MATLAB/Simulink environment for various engineering applications.'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Projects', icon: Code },
    { id: 'embedded', name: 'Embedded Systems', icon: Zap },
    { id: 'ml', name: 'Machine Learning', icon: Brain },
    { id: 'web', name: 'Web Development', icon: Code }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const featuredProjects = projects.filter(project => project.featured)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-electric-50 dark:from-primary-900/20 dark:to-electric-900/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6">
              My <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A collection of projects showcasing my skills in embedded systems, 
              machine learning, and web development. Each project represents a 
              learning journey and problem-solving approach.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 text-center">
              Featured Projects
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredProjects.slice(0, 2).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary-100 to-electric-100 dark:from-primary-900 dark:to-electric-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-600/80 to-electric-600/80 flex items-center justify-center">
                      <div className="text-white text-4xl font-bold">
                        {project.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Calendar size={16} className="mr-1" />
                        <span>{project.year}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-md text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Github size={18} />
                          <span>Code</span>
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          <ExternalLink size={18} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Projects */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800/50">
        <div className="container">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 text-center">
              All Projects
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{category.name}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => setPreviewProject(project)}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-electric-100 dark:from-primary-900 dark:to-electric-900">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                    
                    {/* Overlay with project initials fallback */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-600/70 to-electric-600/70 flex items-center justify-center">
                      <div className="text-white text-2xl font-bold">
                        {project.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
                      </div>
                    </div>

                    {/* Hover overlay with preview button */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ 
                          scale: hoveredProject === project.id ? 1 : 0.8, 
                          opacity: hoveredProject === project.id ? 1 : 0 
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors">
                          <Eye size={16} />
                          <span>Preview</span>
                        </button>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github size={16} />
                            <span>Code</span>
                          </a>
                        )}
                      </motion.div>
                    </motion.div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                        project.status === 'completed' 
                          ? 'bg-green-500/80 text-white' 
                          : 'bg-yellow-500/80 text-white'
                      }`}>
                        {project.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/80 text-white backdrop-blur-sm">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                        <Calendar size={14} className="mr-1" />
                        <span>{project.year}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      {project.description.length > 120 
                        ? `${project.description.slice(0, 120)}...` 
                        : project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05 }}
                          className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-xs font-medium hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      {project.github && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={16} />
                          <span>Code</span>
                        </motion.a>
                      )}
                      {project.demo && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} />
                          <span>Demo</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try selecting a different category or check back later for more projects.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Preview Modal */}
      <AnimatePresence>
        {previewProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setPreviewProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={() => setPreviewProject(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-sm"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Project Image */}
                <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-primary-100 to-electric-100 dark:from-primary-900 dark:to-electric-900">
                  <img
                    src={previewProject.image}
                    alt={previewProject.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600/70 to-electric-600/70 flex items-center justify-center">
                    <div className="text-white text-4xl font-bold">
                      {previewProject.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 md:p-8 max-h-96 overflow-y-auto">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {previewProject.title}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          <span>{previewProject.year}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          previewProject.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {previewProject.status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {previewProject.details || previewProject.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {previewProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    {previewProject.github && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={previewProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium"
                      >
                        <Github size={20} />
                        <span>View Code</span>
                      </motion.a>
                    )}
                    {previewProject.demo && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={previewProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                      >
                        <ExternalLink size={20} />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Projects
