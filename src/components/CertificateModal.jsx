import React from 'react'
import { motion } from 'framer-motion'
import { X, Download } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

const CertificateModal = ({ certificate, onClose }) => {
  if (!certificate) return null

  const Icon = LucideIcons[certificate.iconName] || LucideIcons.Award

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
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
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <X size={16} />
        </button>

        {/* Certificate Image Display */}
        <div className="relative h-64 md:h-80 bg-gray-100 dark:bg-gray-700 rounded-t-2xl overflow-hidden">
          <img
            src={certificate.image}
            alt={`${certificate.title} Certificate`}
            className="w-full h-full object-contain bg-white"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          
          {/* Certificate placeholder when image fails */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${certificate.color} flex items-center justify-center text-white`}
            style={{ display: 'none' }}
          >
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-2">{certificate.title}</h2>
              <p className="text-lg opacity-90 mb-2">{certificate.issuer}</p>
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
                {certificate.title}
              </h2>
              <p className="text-xl text-primary-600 dark:text-primary-400 font-semibold">
                {certificate.issuer}
              </p>
            </div>
            <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
              {certificate.category}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Year:</span>
                <span className="text-gray-900 dark:text-white">{certificate.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Type:</span>
                <span className="text-gray-900 dark:text-white">{certificate.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Credential ID:</span>
                <span className="text-gray-900 dark:text-white font-mono text-xs">{certificate.credentialId}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Skills Acquired</h3>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill) => (
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
              {certificate.description}
            </p>
          </div>

          <div className="flex space-x-4">
            {/* Special case: certificate id 7 should offer two download options */}
            {certificate.id === 7 && (certificate.certificateUrl || certificate.certificateUrl2) ? (
              <>
                {certificate.certificateUrl && (
                  <a
                    href={encodeURI(certificate.certificateUrl)}
                    download
                    className="flex-1 btn-primary flex items-center justify-center space-x-2"
                  >
                    <Download size={18} />
                    <span>Download Option 1</span>
                  </a>
                )}

                {certificate.certificateUrl2 && (
                  <a
                    href={encodeURI(certificate.certificateUrl2)}
                    download
                    className="flex-1 btn-primary flex items-center justify-center space-x-2"
                  >
                    <Download size={18} />
                    <span>Download Option 2</span>
                  </a>
                )}
              </>
            ) : (
              certificate.certificateUrl && (
                <a
                  href={encodeURI(certificate.certificateUrl)}
                  download
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <Download size={18} />
                  <span>Download Certificate</span>
                </a>
              )
            )}

            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CertificateModal
