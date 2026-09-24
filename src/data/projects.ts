export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  category: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Real-Time Chat App",
    description:
      "A full-stack real-time chat app built with MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. It supports one-on-one messaging, real-time typing indicators, emoji picker, image upload, and theme toggling.",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Antd Design",
      "Socket.IO",
      "Emoji Picker",
    ],
    liveUrl: "https://chat-app-fu9v.onrender.com",
    githubUrl: "https://github.com/ManneUdayKiran/Real-Time-Chat-App.git",
    image: "🌌",
    category: "Full Stack Development",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: 2,
    title: "Mini RAG",
    description:
      "Mini RAG is a modern, responsive app for Retrieval-Augmented Generation. Upload PDFs, DOCX, images (OCR), or add web URLs, then ask questions and get answers strictly from your provided content. Built with React, Ant Design, and FastAPI for rapid, user-friendly knowledge retrieval.",
    technologies: ["React", "FastApi", "MongoDB", "LLM MOdels"],
    liveUrl: "",
    githubUrl: "https://github.com/ManneUdayKiran/MiniRAG-Project.git",
    image: "🛒",
    category: "Machine Learning",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "AI-Powered Dashboard",
    description:
      "Advanced data visualization platform with AI-driven insights, interactive charts, and predictive analytics for business intelligence.",
    technologies: ["React", "D3.js", "Python", "FastAPI"],
    liveUrl: "#",
    githubUrl: "#",
    image: "📊",
    category: "AI & Data",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "Prompt-to-Product",
    description:
      "Prompt-to-Product is a powerful MVP platform that lets developers instantly turn prompts into usable code or insights. It combines the capabilities of AI chat and code generation in a single, intuitive interface..",
    technologies: [
      "React",
      "Antd",
      "FastApi",
      "Firebase",
      "LLM Models",
      "TailWind CSS",
    ],
    liveUrl: "https://prompt-to-product.onrender.com",
    githubUrl: "https://github.com/ManneUdayKiran/MVP-Platform-Project.git",
    image: "📱",
    category: "Full Stack Development",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: 5,
    title: "Resume Analyzer",
    description:
      "A comprehensive resume analysis tool that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS) and provides personalized improvement suggestions.",
    technologies: [
      "React",
      "Material UI",
      "FastApi",
      "MongoDB",
      "Machine Learning",
      "LLM Model",
    ],
    liveUrl: "https://frontend-two-pi-49.vercel.app/",
    githubUrl: "https://github.com/ManneUdayKiran/ResuScan-Resume-Analyser.git",
    image: "💬",
    category: "Full Stack Development",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: 6,
    title: "Intelligent Journaling App",
    description:
      "An intelligent journaling app powered by LLMs that allows users to record daily thoughts and receive AI-generated summaries, mood detection, and mental wellness suggestions.",
    technologies: [
      "React",
      "MongoDB",
      "Antd",
      "Material UI",
      "Node.js",
      "Express.js",
    ],
    liveUrl: "https://ai-journalentry-app.onrender.com",
    githubUrl: "https://github.com/ManneUdayKiran/AI-Journal-App.git",
    image: "☁️",
    category: "DevOps",
    gradient: "from-blue-500 to-indigo-500",
  },
];