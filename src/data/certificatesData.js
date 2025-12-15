import { Settings } from "lucide-react";

// You can map imported icons in the component if needed, or export a mapping here if serialization is an issue.
// For simplicity in this data file, we will store the string name of the icon or import it if we change the structure to allow JSX in data (not recommended for pure data files).
// Best practice: Store string keys for icons and map them in the component.

export const certificates = [
  {
    id: 1,
    title: "Python Basics",
    issuer: "HackerRank",
    year: "2025",
    category: "Technical",
    type: "Online Course",
    description:
      "Comprehensive course covering Python programming fundamentals, including syntax, data structures, and problem-solving techniques.",
    skills: ["Python", "Data Structures", "Algorithms", "Problem Solving"],
    image: "/images/certificates/Python_basic.png",
    certificateUrl: "/images/certificates/python_basics_certificate.pdf",
    credentialId: "553D92DC354D",
    featured: true,
    iconName: "Settings",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 2,
    title: "Supervised Machine Learning Regression and Classification",
    issuer: "DeepLearning.ai",
    year: "2025",
    category: "Technical",
    type: "Online Course",
    description:
      "Comprehensive course covering supervised machine learning techniques, including regression and classification algorithms, model evaluation, and practical applications.",
    skills: ["Machine Learning", "Python", "Regression", "Classification"],
    image: "/images/certificates/Supervised_Learning.png",
    certificateUrl:
      "/images/certificates/Supervised_Machine_Learning_Regression_and_Classification.pdf",
    credentialId: "",
    featured: true,
    iconName: "Settings",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 3,
    title: "Training Institute for Chemical Industries",
    issuer: "Training Institute for Chemical Industries",
    year: "2024",
    category: "Industrial",
    type: "Offline Course",
    description:
      "Certification from the Training Institute for Chemical Industries, validating expertise in chemical industry processes and safety protocols.",
    skills: [
      "Working of Industrial Machineries",
      "Safety Protocols",
      "Industrial Processes",
    ],
    image: "/images/certificates/TICI.jpeg",
    certificateUrl: "",
    credentialId: "",
    featured: true,
    iconName: "Settings",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    title: "Single Phase Electrical Wiring and Installation",
    issuer: "Sylhet Engineering College",
    year: "2024",
    category: "Technical",
    type: "Offline Course",
    description:
      "Comprehensive course covering single phase electrical wiring and installation techniques, safety protocols, and practical applications.",
    skills: [
      "Electrical Wiring",
      "Installation",
      "Safety Protocols",
      "Troubleshooting",
    ],
    image: "/images/certificates/Single_phase_wiring.jpeg",
    certificateUrl: "",
    credentialId: "",
    featured: true,
    iconName: "Settings",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    title: "30 Days Webiner on PLC, VFD, DMI",
    issuer: "Gobeshona Learning Academy",
    year: "2024",
    category: "Industrial",
    type: "Online Course",
    description:
      "Comprehensive course covering PLC, VFD, and DMI technologies, including programming, operation, and troubleshooting.",
    skills: [
      "PLC Programming",
      "VFD Operation",
      "DMI Configuration",
      "Troubleshooting",
    ],
    image: "/images/certificates/PLC.png",
    certificateUrl: "/images/certificates/Gobeshona_learning(PLC).pdf",
    credentialId: "",
    featured: true,
    iconName: "Settings",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 6,
    title: "VLSI System on Chip",
    issuer: "Maven",
    year: "2024",
    category: "Specialized",
    type: "Online Course",
    description:
      "Comprehensive course covering control design principles and techniques using Matlab and Simulink.",
    skills: ["Control Systems", "Matlab", "Simulink", "System Modeling"],
    image: "/images/certificates/VLSI_System_On_Chip_Design_Overview.jpg",
    certificateUrl:
      "/images/certificates/VLSI_System_On_Chip_Design_-_Overview-Farhan_Arefin_Khan_553.pdf",
    credentialId: "9921023004",
    featured: true,
    iconName: "Settings",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 7,
    title: "Control Design Onramp",
    issuer: "Matlab",
    year: "2024",
    category: "Specialized",
    type: "Online Course",
    description:
      "Comprehensive course covering control design principles and techniques using Matlab and Simulink.",
    skills: ["Control Systems", "Matlab", "Simulink", "System Modeling"],
    image: "/images/certificates/Control_Design_onramp_by_Matlab.png",
    certificateUrl:
      "/images/certificates/Control_Design_Onramp_with_Simulink.pdf",
    certificateUrl2:
      "/images/certificates/Control_Design_Onramp_with_Simulink_report.pdf",
    credentialId: "",
    featured: true,
    iconName: "Settings",
    color: "from-orange-500 to-red-500",
  },
];
