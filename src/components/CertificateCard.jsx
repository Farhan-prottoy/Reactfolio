import React from 'react'
import { motion } from 'framer-motion'
import { Award, BookOpen } from 'lucide-react'
// If we want icons to be dynamic based on string names from data, we might need a map or pass the component.
// For now, we assume the parent passes the Icon component or we handle it here.
// But the data file certificatesData.js has `iconName`. We need a mapper.

import * as LucideIcons from 'lucide-react'

const CertificateCard = ({ certificate, onClick, index }) => {
  // Resolve icon dynamically
  const Icon = LucideIcons[certificate.iconName] || LucideIcons.Award

  return (
    <motion.div
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
      onClick={() => onClick(certificate)}
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
}

export default CertificateCard
