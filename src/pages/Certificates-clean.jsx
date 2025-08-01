import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import DecryptedText from '../components/DecryptedText'
import { 
  Award, 
  Calendar, 
  ExternalLink, 
  Download,
  ChevronLeft,
  ChevronRight,
  Zap,
  Code,
  Settings,
  BookOpen,
  X
} from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [hoveredCertificate, setHoveredCertificate] = useState(null)
  const swiperRef = useRef(null)

  const certificates = [
    {
      id: 1,
      title: 'Control Design Onramp with Simulink',
      issuer: 'MATLAB Academy',
      year: '2024',
      category: 'Technical',
      type: 'Online Course',
      description: 'Comprehensive course covering control system design fundamentals using MATLAB Simulink. Learned advanced control algorithms, system modeling, and simulation techniques.',
      skills: ['MATLAB', 'Simulink', 'Control Systems', 'System Modeling'],
      image: '/images/certificates/matlab-control-cert.svg',
      certificateUrl: '/certificates/matlab-control.pdf',
      credentialId: 'MAT-CTL-2024-001',
      featured: true,
      icon: Settings,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 2,
      title: '30 Days Webinar on PLC, VFD, HMI',
      issuer: 'Gobeshona Learning Academy',
      year: '2024',
      category: 'Industrial',
      type: 'Webinar Series',
      description: 'Intensive 30-day webinar series covering Programmable Logic Controllers (PLC), Variable Frequency Drives (VFD), and Human Machine Interface (HMI) technologies.',
      skills: ['PLC Programming', 'VFD', 'HMI Design', 'Industrial Automation'],
      image: '/images/certificates/plc-vfd-hmi-cert.svg',
      certificateUrl: '/certificates/plc-vfd-hmi.pdf',
      credentialId: 'GLA-IND-2024-030',
      featured: true,
      icon: Zap,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'VLSI System On Chip Design – Overview',
      issuer: 'Maven Silicon',
      year: '2025',
      category: 'Specialized',
      type: 'Professional Course',
      description: 'Advanced overview of Very Large Scale Integration (VLSI) and System on Chip (SoC) design principles, covering digital design, verification, and implementation.',
      skills: ['VLSI Design', 'SoC Architecture', 'Digital Design', 'Verification'],
      image: '/images/certificates/vlsi-soc-cert.svg',
      certificateUrl: '/certificates/vlsi-soc.pdf',
      credentialId: 'MVS-VLSI-2025-001',
      featured: true,
      icon: Code,
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Certificates', count: certificates.length },
    { id: 'Technical', name: 'Technical', count: certificates.filter(c => c.category === 'Technical').length },
    { id: 'Industrial', name: 'Industrial', count: certificates.filter(c => c.category === 'Industrial').length },
    { id: 'Specialized', name: 'Specialized', count: certificates.filter(c => c.category === 'Specialized').length }
  ]

  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredCertificates = selectedCategory === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory)

  const featuredCertificates = certificates.filter(cert => cert.featured)

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
              My <span className="text-gradient">Certificates</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A showcase of my continuous learning journey and professional development 
              in various domains of electrical engineering, programming, and technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Certificates Gallery */}
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
              Featured Certificates
            </h2>
            
            <div className="relative">
              <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                spaceBetween={30}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                effect="coverflow"
                coverflowEffect={{
                  rotate: 30,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={{
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet !bg-primary-600',
                }}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                className="certificate-swiper pb-12"
              >
                {featuredCertificates.map((certificate) => {
                  const Icon = certificate.icon
                  return (
                    <SwiperSlide key={certificate.id}>
                      <motion.div
                        className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer h-96"
                        onClick={() => setSelectedCertificate(certificate)}
                        onMouseEnter={() => setHoveredCertificate(certificate.id)}
                        onMouseLeave={() => setHoveredCertificate(null)}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        {/* Certificate Image/Preview */}
                        <div className="relative h-full w-full overflow-hidden">
                          <img
                            src={certificate.image}
                            alt={certificate.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                          
                          {/* Fallback gradient when image fails */}
                          <div 
                            className={`absolute inset-0 bg-gradient-to-br ${certificate.color} flex items-center justify-center`}
                            style={{ display: 'none' }}
                          >
                            <div className="text-center text-white">
                              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Icon size={32} />
                              </div>
                              <h3 className="text-lg font-bold mb-2">{certificate.title}</h3>
                              <p className="text-sm opacity-90">{certificate.issuer}</p>
                            </div>
                          </div>

                          {/* Hover overlay with shadow and decrypted text */}
                          <AnimatePresence>
                            {hoveredCertificate === certificate.id && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center text-white p-6"
                              >
                                <motion.div
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ delay: 0.1, duration: 0.5 }}
                                  className="text-center"
                                >
                                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Icon size={24} />
                                  </div>
                                  <h3 className="text-lg font-bold mb-2">
                                    <DecryptedText 
                                      text={certificate.title} 
                                      trigger={hoveredCertificate === certificate.id}
                                      className="text-white"
                                    />
                                  </h3>
                                  <p className="text-sm opacity-90 mb-2">
                                    <DecryptedText 
                                      text={certificate.issuer} 
                                      trigger={hoveredCertificate === certificate.id}
                                      className="text-white"
                                    />
                                  </p>
                                  <p className="text-xs opacity-80">
                                    <DecryptedText 
                                      text={certificate.year} 
                                      trigger={hoveredCertificate === certificate.id}
                                      className="text-white"
                                    />
                                  </p>
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Year Badge - always visible */}
                          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                            <span className="text-white text-sm font-semibold">
                              {certificate.year}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <button
                onClick={() => swiperRef.current?.swiper.slidePrev()}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => swiperRef.current?.swiper.slideNext()}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Certificates */}
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
              All Certificates
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
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
                  <span>{category.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Certificates Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertificates.map((certificate, index) => {
              const Icon = certificate.icon
              return (
                <motion.div
                  key={certificate.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -8,
                    rotateX: 5,
                    rotateY: 5,
                    scale: 1.02,
                    boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.3)"
                  }}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedCertificate(certificate)}
                >
                  {/* Certificate Preview */}
                  <div className={`relative h-48 bg-gradient-to-br ${certificate.color} overflow-hidden`}>
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                    
                    {/* Fallback gradient */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center text-white"
                      style={{ display: 'none' }}
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Icon size={24} />
                        </div>
                        <div className="text-sm font-semibold">{certificate.year}</div>
                      </div>
                    </div>

                    {/* Certificate-style decorative border */}
                    <div className="absolute inset-2 border border-white/20 rounded-lg pointer-events-none"></div>
                    <div className="absolute inset-4 border border-white/10 rounded-md pointer-events-none"></div>
                    
                    {/* Corner decorations */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/30"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white/30"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white/30"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/30"></div>
                    
                    {/* Year badge */}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                      <span className="text-white text-sm font-semibold">
                        {certificate.year}
                      </span>
                    </div>
                  </div>

                  {/* Certificate Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                        {certificate.category}
                      </span>
                      <Award className="text-electric-500" size={20} />
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {certificate.title}
                    </h3>
                    
                    <p className="text-primary-600 dark:text-primary-400 font-medium text-sm mb-3">
                      {certificate.issuer}
                    </p>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      {certificate.description.slice(0, 100)}...
                    </p>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {certificate.skills.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs hover:scale-110 transition-transform"
                        >
                          {skill}
                        </span>
                      ))}
                      {certificate.skills.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                          +{certificate.skills.length - 2}
                        </span>
                      )}
                    </div>
                    
                    <button className="w-full py-2 bg-gradient-to-r from-primary-600 to-electric-600 text-white rounded-lg font-medium text-sm flex items-center justify-center space-x-1 hover:scale-105 transition-transform">
                      <BookOpen size={14} />
                      <span>View Certificate</span>
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Certificate Detail Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X size={16} />
              </button>

              {/* Certificate Image Display */}
              <div className="relative h-64 md:h-80 bg-gray-100 dark:bg-gray-700 rounded-t-2xl overflow-hidden">
                <img
                  src={selectedCertificate.image}
                  alt={`${selectedCertificate.title} Certificate`}
                  className="w-full h-full object-contain bg-white"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                
                {/* Certificate placeholder when image fails */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${selectedCertificate.color} flex items-center justify-center text-white`}
                  style={{ display: 'none' }}
                >
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <selectedCertificate.icon size={40} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{selectedCertificate.title}</h2>
                    <p className="text-lg opacity-90 mb-2">{selectedCertificate.issuer}</p>
                    <p className="text-sm opacity-70">Certificate Image Placeholder</p>
                    
                    {/* Decorative certificate-style border */}
                    <div className="absolute inset-4 border-2 border-white/30 rounded-lg pointer-events-none"></div>
                    <div className="absolute inset-8 border border-white/20 rounded-md pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Watermark */}
                <div className="absolute bottom-4 right-4 text-white/70 text-xs">
                  Certificate Preview
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedCertificate.title}
                    </h2>
                    <p className="text-xl text-primary-600 dark:text-primary-400 font-semibold">
                      {selectedCertificate.issuer}
                    </p>
                  </div>
                  <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                    {selectedCertificate.category}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Year:</span>
                      <span className="text-gray-900 dark:text-white">{selectedCertificate.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Type:</span>
                      <span className="text-gray-900 dark:text-white">{selectedCertificate.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Credential ID:</span>
                      <span className="text-gray-900 dark:text-white font-mono text-xs">{selectedCertificate.credentialId}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Skills Acquired</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedCertificate.description}
                  </p>
                </div>

                <div className="flex space-x-4">
                  {selectedCertificate.certificateUrl && (
                    <a
                      href={selectedCertificate.certificateUrl}
                      download
                      className="flex-1 btn-primary flex items-center justify-center space-x-2"
                    >
                      <Download size={18} />
                      <span>Download Certificate</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Certificates
