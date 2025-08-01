# Farhan Arefin Khan - Portfolio Website

A modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion showcasing my skills and experience as an Electrical & Electronic Engineering student.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Interactive Chatbot**: AI-powered chatbot with Gemini API integration
- **Certificate Gallery**: Interactive slideshow gallery for certificates
- **Contact Form**: Working contact form with EmailJS integration
- **Smooth Animations**: Beautiful animations powered by Framer Motion
- **SEO Optimized**: Meta tags and semantic HTML for better SEO

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: EmailJS
- **Carousel**: Swiper.js

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/farhan-arefin-khan/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

5. Start the development server:
```bash
npm run dev
```

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # Reusable components
│   ├── ChatBot/         # AI chatbot component
│   ├── Header.jsx       # Navigation header
│   ├── Footer.jsx       # Site footer
│   └── ...
├── pages/               # Page components
│   ├── Home.jsx         # Landing page
│   ├── About.jsx        # About page
│   ├── Projects.jsx     # Projects showcase
│   ├── Certificates.jsx # Certificate gallery
│   └── Contact.jsx      # Contact form
├── context/             # React contexts
│   └── ThemeContext.jsx # Theme management
└── assets/              # Static assets
```

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
```js
colors: {
  primary: { /* Blue shades */ },
  electric: { /* Cyan shades */ }
}
```

### Content
Update personal information in the respective page components:
- `src/pages/Home.jsx` - Personal info and intro
- `src/pages/About.jsx` - Education, skills, experience
- `src/pages/Projects.jsx` - Project details
- `src/pages/Certificates.jsx` - Certifications
- `src/pages/Contact.jsx` - Contact information

## 🤖 AI Chatbot Setup

1. Get a Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env` file as `VITE_GEMINI_API_KEY`
3. The chatbot will automatically use the API for intelligent responses
4. If the API key is not configured, it falls back to predefined responses

## 📧 Email Integration

1. Create an EmailJS account at [emailjs.com](https://www.emailjs.com/)
2. Set up a service and template
3. Add your credentials to the `.env` file
4. The contact form will use Gmail as a fallback if EmailJS is not configured

## 📱 Features in Detail

### Responsive Design
- Mobile-first approach
- Optimized for tablets and desktops
- Touch-friendly interactions

### Dark Mode
- System preference detection
- Manual toggle option
- Persistent theme selection

### Performance
- Lazy loading for images
- Optimized animations
- Code splitting
- Production build optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Farhan Arefin Khan**
- Email: farhan.prottoy.17@gmail.com
- LinkedIn: [farhan-arefin-khan](https://linkedin.com/in/farhan-arefin-khan)
- GitHub: [farhan-arefin-khan](https://github.com/farhan-arefin-khan)

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Styling by [Tailwind CSS](https://tailwindcss.com/)
- Build tool by [Vite](https://vitejs.dev/)

---

⭐ Star this repository if you found it helpful!
"# Reactfolio" 
