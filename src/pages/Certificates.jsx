import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Sub-components
import CertificateCard from '../components/CertificateCard'
import CertificateModal from '../components/CertificateModal'
import DecryptedText from '../components/DecryptedText'
import * as LucideIcons from 'lucide-react'

// Data
import { certificates } from '../data/certificatesData'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [hoveredCertificate, setHoveredCertificate] = useState(null)
  const swiperRef = useRef(null)

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
                  const Icon = LucideIcons[certificate.iconName] || LucideIcons.Award
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
                            className="w-full h-full object-content transition-transform duration-500 group-hover:scale-110"
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
            {filteredCertificates.map((certificate, index) => (
              <CertificateCard 
                key={certificate.id} 
                certificate={certificate} 
                index={index}
                onClick={setSelectedCertificate}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedCertificate && (
          <CertificateModal 
            certificate={selectedCertificate} 
            onClose={() => setSelectedCertificate(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Certificates
