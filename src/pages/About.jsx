import React from 'react'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Award, 
  Code, 
  Zap, 
  Brain,
  Users,
  MapPin,
  Calendar,
  Trophy,
  Target
} from 'lucide-react'

const About = () => {
  const education = {
    degree: 'Bachelor of Science in Electrical and Electronic Engineering (EEE)',
    institution: 'Sylhet Engineering College',
    duration: '2020 – 2025',
    cgpa: '3.57 / 4.00',
    thesis: 'Detection and Classification of 2D Material Flakes Using Ensemble GMM and Neural Networks',
    location: 'Sylhet, Bangladesh',
    expectedGraduation: 'December 2025',
    relevantCourses: [
      'Microprocessor and Embedded Systems',
      'Digital Signal Processing',
      'Machine Learning Applications',
      'Power Electronics',
      'Control Systems',
      'VLSI Design'
    ]
  }

  const certifications = [
    {
      title: 'Control Design Onramp with Simulink',
      issuer: 'MATLAB Academy',
      year: '2024',
      type: 'Technical Certification'
    },
    {
      title: '30 Days Webinar on PLC, VFD, HMI',
      issuer: 'Gobeshona Learning Academy',
      year: '2024',
      type: 'Industrial Training'
    },
    {
      title: 'VLSI System On Chip Design – Overview',
      issuer: 'Maven Silicon',
      year: '2025',
      type: 'Specialized Course'
    }
  ]

  const skills = {
    'Programming & Scripting': [
      'Python', 'C', 'C++', 'MATLAB', 'HTML', 'CSS', 'JavaScript'
    ],
    'Embedded Systems': [
      'Arduino', 'ESP32', 'Proteus'
    ],
    'Web Development': [
      'HTML', 'CSS', 'JavaScript', 'React'
    ],
    'ML/DL & Computer Vision': [
      'NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'OpenCV'
    ],
    'Simulation & Design Tools': [
      'MATLAB', 'Simulink', 'AutoCAD', 'SAM (System Advisor Model)'
    ],
    'Data Analysis & Visualization': [
      'Excel', 'PowerPoint', 'Matplotlib', 'Seaborn'
    ],
    'Productivity & Collaboration': [
      'Jupyter Notebook', 'Git', 'GitHub', 'Microsoft Office'
    ]
  }

  const coursework = [
    'Electrical Properties of Materials',
    'Microprocessor and Embedded Systems',
    'Digital Signal Processing',
    'Continuous Signals and Linear Systems',
    'Digital Electronics',
    'Power Electronics',
    'Electronics I & II',
    'Very Large Scale Integration (VLSI)',
    'Introduction to Computer Language',
    'Control System I',
    'Communication I',
    'Fundamentals of Biomedical Engineering',
    'Power System I & II',
    'Power Plant Engineering'
  ]

  const programmingStats = [
    {
      platform: 'Codeforces',
      problems: '300+',
      rating: '1009 (Newbie)',
      icon: '🏆'
    },
    {
      platform: 'CodeChef',
      problems: '150+',
      rating: '1436 (3-Star Coder)',
      icon: '⭐'
    },
    {
      platform: 'LeetCode, LightOJ, UVA, CSES',
      problems: '50+',
      rating: 'Data Structures & Algorithms',
      icon: '💡'
    }
  ]

  const experience = [
    {
      title: 'Cultural Secretary',
      organization: 'EEE Association, Sylhet Engineering College',
      duration: 'Aug 2024 – Jul 2025',
      type: 'Leadership',
      description: 'Leading cultural activities and events for the EEE department, organizing technical seminars and cultural programs',
      achievements: [
        'Organized 5+ technical seminars with 200+ participants',
        'Led team of 15+ members for cultural events',
        'Improved department engagement by 40%'
      ]
    },
    {
      title: 'Research Assistant',
      organization: 'Machine Learning Research Lab',
      duration: 'Jan 2024 – Present',
      type: 'Research',
      description: 'Working on 2D material detection using computer vision and machine learning techniques',
      achievements: [
        'Developed novel detection algorithm with 95% accuracy',
        'Published research findings in department symposium',
        'Collaborated with faculty on multiple research projects'
      ]
    },
    {
      title: 'Industrial Training',
      organization: 'TICI, Narsingdi',
      duration: 'Jan 2024',
      type: 'Training',
      description: 'Industrial Technology on Electrical Engineering & Instrumentation (A+ Grade)',
      achievements: [
        'Received A+ grade for outstanding performance',
        'Learned industrial automation and control systems',
        'Hands-on experience with PLCs and SCADA systems'
      ]
    },
    {
      title: 'Electrical Wiring Training',
      organization: 'Sylhet Engineering College',
      duration: 'May 2023',
      type: 'Technical',
      description: 'Single Phase Electrical Wiring and Installation',
      achievements: [
        'Completed comprehensive wiring certification',
        'Practical experience with electrical installations',
        'Safety protocols and electrical codes training'
      ]
    }
  ]

  const achievements = [
    {
      title: 'Dean\'s List',
      description: 'Academic Excellence Recognition',
      year: '2023-2024',
      icon: '🏆'
    },
    {
      title: 'Best Project Award',
      description: 'Three-Phase Inverter System',
      year: '2024',
      icon: '🥇'
    },
    {
      title: 'Programming Contest',
      description: 'Top 10 in University Contest',
      year: '2023',
      icon: '💻'
    },
    {
      title: 'Leadership Excellence',
      description: 'Cultural Secretary Recognition',
      year: '2024',
      icon: '👑'
    }
  ]

  const personalInfo = {
    fullName: 'Farhan Arefin Khan',
    email: 'farhan.prottoy.17@gmail.com',
    phone: '+8801751948747',
    location: 'Sylhet, Bangladesh',
    nationality: 'Bangladeshi',
    dateOfBirth: 'Available upon request',
    interests: [
      'Embedded Systems',
      'Machine Learning',
      'Renewable Energy',
      'IoT Development',
      'Research & Innovation',
      'Problem Solving'
    ],
    hobbies: [
      'Competitive Programming',
      'Electronics Projects',
      'Reading Tech Blogs',
      'Photography',
      'Music',
      'Travel'
    ]
  }

  const languages = [
    { name: 'Bangla', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Hindi', level: 'Conversational' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section with Profile */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-electric-50 dark:from-primary-900/20 dark:to-electric-900/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <img
                  src="/images/Images/cropped-image.jpg"
                  alt="Farhan Arefin Khan"
                  className="w-22 h-32 lg:w-30 lg:h-40 rounded-full mx-auto shadow-2xl"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-600/20 to-electric-600/20"></div>
              </div>
            </motion.div>
            
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6">
              About <span className="text-gradient">Me</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I'm a passionate Electrical & Electronic Engineering student with a strong foundation 
              in programming, embedded systems, and machine learning. Currently pursuing my undergraduate 
              degree at Sylhet Engineering College with a focus on innovative technology solutions 
              and problem-solving.
            </p>
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  5+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years of Coding</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  3.57
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">CGPA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  20+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  500+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Problems Solved</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <GraduationCap className="mr-3 text-primary-600" size={32} />
              Education
            </h2>
            
            <div className="card">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {education.degree}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">
                    {education.institution}
                  </p>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>{education.duration}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {education.cgpa}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">CGPA</div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Thesis:</h4>
                <p className="text-gray-600 dark:text-gray-300">{education.thesis}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Location:</h4>
                  <p className="text-gray-600 dark:text-gray-300">{education.location}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Expected Graduation:</h4>
                  <p className="text-gray-600 dark:text-gray-300">{education.expectedGraduation}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Users className="mr-3 text-primary-600" size={32} />
              Experience & Leadership
            </h2>
            
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div className="mb-4 lg:mb-0">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">
                        {exp.organization}
                      </p>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <Calendar size={16} className="mr-2" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      exp.type === 'Leadership' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                      exp.type === 'Research' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      exp.type === 'Training' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}>
                      {exp.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  {exp.achievements && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                            <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Award className="mr-3 text-primary-600" size={32} />
              Achievements & Recognition
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="card text-center"
                >
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {achievement.description}
                  </p>
                  <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                    {achievement.year}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Code className="mr-3 text-primary-600" size={32} />
              Technical Skills
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, skillList], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Programming Experience */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Trophy className="mr-3 text-primary-600" size={32} />
              Programming Experience
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {programmingStats.map((stat, index) => (
                <motion.div
                  key={stat.platform}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card text-center"
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {stat.platform}
                  </h3>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                    {stat.problems}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.rating}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Award className="mr-3 text-primary-600" size={32} />
              Certifications
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card"
                >
                  <div className="flex justify-between items-start mb-3">
                    <Award className="text-electric-500" size={24} />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {cert.year}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                    {cert.issuer}
                  </p>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-sm">
                    {cert.type}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Coursework */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Target className="mr-3 text-primary-600" size={32} />
              Relevant Coursework
            </h2>
            
            <div className="card">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {coursework.map((course, index) => (
                  <motion.div
                    key={course}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {course}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Languages & Personal Info */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <MapPin className="mr-3 text-primary-600" size={32} />
                Languages
              </h2>
              
              <div className="card">
                <div className="space-y-4">
                  {languages.map((language, index) => (
                    <motion.div
                      key={language.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-900 dark:text-white font-medium">
                        {language.name}
                      </span>
                      <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                        {language.level}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <Brain className="mr-3 text-primary-600" size={32} />
                Interests & Hobbies
              </h2>
              
              <div className="card">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Professional Interests
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {personalInfo.interests.map((interest, index) => (
                        <motion.span
                          key={interest}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: false, amount: 0.3 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="px-3 py-1 bg-gradient-to-r from-primary-100 to-electric-100 dark:from-primary-900/30 dark:to-electric-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium"
                        >
                          {interest}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Personal Hobbies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {personalInfo.hobbies.map((hobby, index) => (
                        <motion.span
                          key={hobby}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: false, amount: 0.3 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                        >
                          {hobby}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default About
