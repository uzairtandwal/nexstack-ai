export const UzairData = {
  name: "Uzair Ali",
  brand: "NexStack.AI",
  title: "Full-Stack Developer | AI Engineer | Cybersecurity Enthusiast | AWS Cloud Learner",
  bio: "Building Intelligent Digital Solutions with Architectural Precision. Specialized in modern web technologies, React, AI automation, and secure networking solutions.",
  experience_years: "3+",
  projects_completed: "50+",
  clients_satisfied: "100%",
  email: "nexstack.ai@gmail.com",
  phone: "+92 327 1809400",
  location: "Lahore, Pakistan",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    fiverr: "https://fiverr.com",
    upwork: "https://upwork.com"
  }
};

export const ServicesData = [
  {
    title: "Full Stack Web Development",
    description: "Creating responsive, fast-loading websites using React, Next.js, and modern CSS frameworks.",
    icon: "Code",
    tech: ["React.js", "Next.js", "Tailwind CSS", "Node.js"]
  },
  {
    title: "Flutter App Development",
    description: "Building cross-platform mobile apps for iOS and Android with a seamless native experience.",
    icon: "Smartphone",
    tech: ["Flutter", "Dart", "Firebase"]
  },
  {
    title: "AWS Cloud Deployment",
    description: "Expert infrastructure design and deployment on AWS with CI/CD automation.",
    icon: "Cloud",
    tech: ["AWS EC2", "S3", "Lambda", "Docker"]
  },
  {
    title: "AI Integration",
    description: "Integrating LLMs and Computer Vision into web and mobile applications for smart automation.",
    icon: "Cpu",
    tech: ["Python", "OpenCV", "TensorFlow", "HuggingFace"]
  },
  {
    title: "Cybersecurity Solutions",
    description: "Network security, penetration testing, and vulnerability assessments to protect your digital assets.",
    icon: "Shield",
    tech: ["Ethical Hacking", "Metasploit", "Nmap"]
  },
  {
    title: "DevOps Automation",
    description: "Streamlining development workflows with Docker, GitHub Actions, and Linux server management.",
    icon: "Repeat",
    tech: ["Docker", "Git", "GitHub Actions", "Linux"]
  }
];

export const ProjectsData = [
  {
    id: 1,
    title: "University Attendance System CMS",
    category: "Web Application",
    description: "Complete student & staff management with automated grading and QR attendance.",
    features: ["Teacher dashboard", "Admin CMS panel", "QR attendance", "Cloud sync"],
    tech: ["React.js", "Laravel", "PostgreSQL", "AWS"],
    images: ["/images/attendance1.jpg", "/images/attendance4.png", "/images/attendance6.jpg"],
    fullAnalysis: "This project was designed to solve the manual overhead in large-scale universities. We implemented a robust real-time synchronization system that handles thousands of requests per second during peak hours. The architecture focuses on high availability and data integrity. By using AWS infrastructure, we reduced attendance processing time by 85% and eliminated proxy attendance using encrypted QR technology.",
    highlights: ["Scalable AWS Architecture", "Encrypted QR Security", "Real-time Data Sync", "Automated Grade Integration"]
  },
  {
    id: 2,
    title: "AI Hospital Queue Management",
    category: "Smart Healthcare",
    description: "Advanced healthcare system with AI disease suggestion and live hospital rush tracking.",
    features: ["Live queue tracking", "AI disease suggestion", "Google Maps integration"],
    tech: ["React.js", "Django", "PostgreSQL", "AI APIs"],
    images: ["/images/hodpital1.jpg", "/images/hospital2.jpg", "/images/hospital3.jpg", "/images/hospital4.jpg"],
    fullAnalysis: "Healthcare efficiency is critical. We developed a predictive model that estimates wait times with 92% accuracy. The system integrates with Google Maps to redirect patients to less crowded facilities, significantly balancing the load across city hospitals. The AI diagnostic assistant helps staff prioritize emergency cases through automated symptom analysis.",
    highlights: ["Predictive Load Balancing", "AI Diagnostic Assistant", "Geo-spatial Optimization", "Emergency Prioritization"]
  },
  {
    id: 3,
    title: "AI Face Analysis & Voice Changer",
    category: "AI Application",
    description: "Real-time face detection, emotion analysis, and AI-driven voice modulation.",
    features: ["Emotion analysis", "Real-time camera processing", "Voice effects"],
    tech: ["Python", "OpenCV", "TensorFlow", "React.js"],
    images: ["/images/faceAnalysics1.jpg", "/images/faceanalysics3.jpg", "/images/facedetect.jpg", "/images/vociechanger1.jpg"],
    fullAnalysis: "Leveraging deep learning for interactive entertainment and security. The system utilizes TensorFlow models to detect 7 distinct human emotions in real-time with sub-30ms latency. The voice modulation engine uses spectral processing to provide high-fidelity voice transformation, suitable for both privacy and creative content creation.",
    highlights: ["Sub-30ms Latency", "Deep Emotion Mapping", "High-Fidelity Audio DSP", "Neural Network Integration"]
  },
  {
    id: 4,
    title: "Leave Application & Approval System",
    category: "Enterprise Web System",
    description: "Multi-level HR approval system with leave analytics and calendar integration.",
    features: ["Employee requests", "HR dashboard", "Email notifications"],
    tech: ["React.js", "Node.js", "MySQL", "AWS SES"],
    images: ["/images/attendance2.jpg", "/images/p1.jpg", "/images/p13.jpg"],
    fullAnalysis: "Streamlining corporate HR workflows. This system replaces outdated email-based requests with a structured multi-tier approval chain. It features an automated calendar sync for teams to visualize availability and an analytics dashboard for HR to monitor leave trends and balance workloads across departments.",
    highlights: ["Multi-Tier Approval Chain", "Automated Calendar Sync", "HR Analytics Dashboard", "Enterprise SES Notifications"]
  },
  {
    id: 5,
    title: "AI Mouse Control via Gestures",
    category: "AI Application",
    description: "Revolutionary camera-based interaction using hand gestures for OS control.",
    features: ["Hand tracking", "Gesture recognition", "AI automation"],
    tech: ["Python", "MediaPipe", "OpenCV"],
    images: ["/images/ai mouse.jpg", "/images/ai mouse .jpg", "/images/p14.jpg"],
    fullAnalysis: "Reimagining Human-Computer Interaction (HCI). By utilizing MediaPipe's hand tracking, we mapped 21 key points on the hand to control OS mouse movements, clicks, and scrolling. This project demonstrates the power of computer vision in creating accessible interfaces for users with mobility challenges or for sterile surgical environments.",
    highlights: ["21-Point Hand Tracking", "Touchless HCI Control", "Accessibility Focused", "OpenCV Image Pipeline"]
  },
  {
    id: 6,
    title: "NexGen AI Video Analytics",
    category: "AI Application",
    description: "Advanced real-time video processing system for object detection, traffic monitoring, and security alerts.",
    features: ["Object detection", "Real-time alerts", "Traffic analytics"],
    tech: ["Python", "PyTorch", "OpenCV", "AWS Rekognition"],
    images: ["/images/video genration.jpg", "/images/p15.jpg", "/images/p16.jpg"],
    fullAnalysis: "Intelligent surveillance at scale. The system processes multiple RTSP streams simultaneously, performing object detection and classification in real-time. It uses PyTorch models to identify security breaches or traffic violations, instantly notifying administrators via AWS Rekognition event triggers and custom dashboards.",
    highlights: ["Multi-Stream Processing", "Real-time Violation Alerts", "AWS Cloud Integration", "Neural Object Classification"]
  },
  {
    id: 7,
    title: "NexShop: Premium E-Commerce",
    category: "Web Application",
    description: "High-performance store with AI product recommendations and multi-vendor admin panel.",
    features: ["Order tracking", "Admin dashboard", "AI recommendations"],
    tech: ["React.js", "Laravel", "MySQL", "AWS"],
    images: ["/images/ecommerance1.jpg", "/images/ecommerance2.jpg", "/images/ecommerance3.jpg", "/images/ecommerace 7.jpg"],
    fullAnalysis: "Enterprise-grade retail solution. NexShop isn't just a store; it's a conversion-optimized machine. We integrated a custom AI recommendation engine that analyzes user behavior to suggest relevant products, resulting in a 25% increase in Average Order Value (AOV) for our pilot clients. The backend supports massive traffic with optimized MySQL indexing and AWS caching.",
    highlights: ["AI Behavior Analysis", "Conversion Optimized UI", "Multi-Vendor Capability", "High-Traffic Ready Architecture"]
  },
  {
    id: 8,
    title: "Scientific Research App",
    category: "Research Platform",
    description: "Collaboration platform for scientists with AI summaries and citation management.",
    features: ["PDF viewer", "AI summaries", "Notes management"],
    tech: ["Flutter", "Django", "PostgreSQL"],
    images: ["/images/research1.jpg", "/images/research2.jpg", "/images/research 3.jpg", "/images/app rearsh1.png"],
    fullAnalysis: "Accelerating scientific discovery. This platform simplifies academic research by providing AI-generated summaries of complex PDF papers. Built with Flutter for a seamless cross-platform experience, it includes a robust citation manager and collaborative workspaces where research teams can share insights and data in real-time.",
    highlights: ["AI Abstract Generation", "Cross-Platform Flutter UI", "Collaborative Workspaces", "Reference Management System"]
  },
  {
    id: 10,
    title: "SecureNet: Cybersecurity Dashboard",
    category: "Cybersecurity",
    description: "Live threat monitoring platform with vulnerability reports and network logs.",
    features: ["Threat monitoring", "Security alerts", "Real-time logs"],
    tech: ["React.js", "Django", "AWS CloudWatch"],
    images: ["/images/cyber.jpg", "/images/cybdersecurity 3.jpg", "/images/cybersecuirty3.jpg"],
    fullAnalysis: "Vigilance through automation. SecureNet provides a bird's-eye view of an organization's network health. It monitors for unusual patterns, potentially identifying DDoS attacks or unauthorized access attempts before they cause damage. Detailed vulnerability reporting helps security teams patch infrastructure flaws proactively based on AWS CloudWatch metrics.",
    highlights: ["Intrusion Detection Logic", "Automated Vulnerability Scans", "AWS Security Integration", "SOC Analytics Dashboard"]
  },
  {
    id: 11,
    title: "Jamia Tul Quran ERP",
    category: "Educational ERP",
    description: "Enterprise Resource Planning for Islamic institutes with fee tracking, attendance, and student portal.",
    features: ["Fee management", "Offline attendance", "Parent portal"],
    tech: ["Flutter", "React.js", "Laravel", "MySQL"],
    images: ["/images/attandance6.jpg", "/images/atteandance5.png", "/images/p20.jpg"],
    fullAnalysis: "Modernizing traditional education. This ERP handles the unique requirements of Islamic institutes, including complex fee structures and diverse student categories. The system supports offline attendance syncing for rural branches and provides a parent portal for real-time performance and financial updates, bridging the gap between teachers and families.",
    highlights: ["Offline Sync Capability", "Complex Fee Logic", "Bilingual Support", "Cloud Backup Integration"]
  }
];

export const SkillsData = {
  frontend: [
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "Flutter", level: 85 },
    { name: "Tailwind CSS", level: 98 }
  ],
  backend: [
    { name: "Node.js", level: 88 },
    { name: "Laravel", level: 92 },
    { name: "Django", level: 85 },
    { name: "PostgreSQL", level: 90 }
  ],
  devops: [
    { name: "AWS", level: 80 },
    { name: "Docker", level: 85 },
    { name: "CI/CD", level: 75 },
    { name: "Linux", level: 90 }
  ],
  cybersecurity: [
    { name: "Ethical Hacking", level: 75 },
    { name: "Network Security", level: 80 },
    { name: "Penetration Testing", level: 70 }
  ]
};
