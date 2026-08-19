const basePath = process.env.NODE_ENV === 'production' ? '/harini-portfolio' : ''

export function assetPath(path: string) {
  return `${basePath}${path}`
}

export const profile = {
  name: 'Harini Vinu',
  greeting: "Hi, I'm Harini Vinu",
  roles: ['Software Engineer'],
  email: 'vgharini21@gmail.com',
  location: 'Boston, MA · OPEN TO RELOCATION',
  // NOTE: Update these with your exact profile URLs.
  github: 'https://github.com/vgharini21',
  linkedin: 'https://www.linkedin.com/in/harinivinu/',
  resume: `${basePath}/Harini_Vinu_Resume.pdf`,
  intro:
    'I turn complex problems into scalable systems — from distributed backends and real-time data pipelines to intelligent, AI-powered applications.',
}

export const about = [
  'I’m a software engineer focused on backend systems, distributed infrastructure, and applied AI. I enjoy turning complex technical problems into reliable systems that perform at scale.',
  'I work across event-driven architectures, real-time data pipelines, cloud systems, and AI-powered applications — from processing millions of records to developing intelligent automation and computer vision systems.',
  ' I hold an MS in Computer Science from New York University and currently work on faculty-led research exploring how AI approaches computer science problems and how it can support CS education.',
]

export type Experience = {
  company: string
  role: string
  dates: string
  location: string
  context?: string
  points: string[]
  tech: string[]
}

export const experiences: Experience[] = [
  {
    company: 'Qualitest — CoCo',
    role: 'Software Engineering Intern',
    dates: 'May 2025 — Aug 2025',
    location: 'New York, United States',
    context: 'AI-driven Test Optimization Platform',
    points: [
      'Developed backend services for AI-driven test orchestration using Python, Redis (caching, queue-based processing), and MongoDB.',
      'Engineered asynchronous data-processing pipelines that reduced execution time by 40% across large-scale test workflows.',
      'Implemented fault-tolerant retry and monitoring mechanisms for distributed jobs, reducing failures by 30%.',
    ],
    tech: ['Python', 'Redis', 'MongoDB', 'Distributed Systems', 'Async Queues'],
  },
  {
    company: 'LOCOMeX',
    role: 'Software Engineering Intern',
    dates: 'Jun 2025 — Aug 2025',
    location: 'Remote',
    points: [
      'Designed data validation and processing services to handle 100K+ records, ensuring consistency across large-scale ingestion workflows.',
      'Developed event-driven microservices and REST APIs to propagate supplier risk signals in real time.',
      'Optimized data models and aggregation pipelines, reducing latency by 30% while improving ESG risk-scoring accuracy.',
    ],
    tech: ['Microservices', 'Event-Driven', 'REST APIs', 'Data Modeling'],
  },
  {
    company: 'New York University',
    role: 'Big Data Engineer Intern',
    dates: 'Jan 2025 — May 2025',
    location: 'New York, United States',
    points: [
      'Engineered distributed data pipelines with Apache Spark, Kafka, and Hadoop to process 10M+ records across scalable clusters.',
      'Designed real-time Kafka ingestion workflows for low-latency analytics and downstream reporting.',
      'Streamlined data-processing and automation workflows, improving system efficiency by 25% and cutting issue-resolution time by 90%.',
    ],
    tech: ['Apache Spark', 'Kafka', 'Hadoop', 'Streaming'],
  },
  {
    company: 'Skill Vertex',
    role: 'Software Engineering Intern',
    dates: 'Dec 2021 — Feb 2022',
    location: 'Chennai, India',
    points: [
      'Developed a real-time hand detection and gesture recognition system using Python and OpenCV, improving detection accuracy by 40%.',
      'Optimized computer-vision pipelines through preprocessing and model tuning, reducing false detections by 15% and latency by 25% while achieving 30 FPS across 1,000+ test samples.',
    ],
    tech: ['Python', 'OpenCV', 'Computer Vision', 'ML Pipelines'],
  },
]

export type Project = {
  title: string
  timeframe: string
  summary: string
  tech: string[]
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    title: 'Dining Concierge Chatbot',
    timeframe: 'Sep 2025 — Oct 2025',
    summary:
      'Built a serverless conversational assistant that delivers personalized restaurant recommendations using the Yelp API. Designed an event-driven AWS workflow for search, asynchronous processing, notifications, and monitoring.',
    tech: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Lex', 'Elasticsearch', 'SQS', 'SES'],
    github: 'https://github.com/vgharini21/DiningConciergeChatbot',
  },
  {
    title: 'Real-Time Stock Market Analysis System',
    timeframe: 'Sep 2024 — Oct 2024',
    summary:
      'Built a distributed streaming platform for analyzing live financial data in real time. Used Kafka and Spark Streaming for ingestion and processing, with time-series storage and Grafana dashboards for monitoring market trends and system performance.',
    tech: ['Kafka', 'Spark Streaming', 'Hadoop', 'PostgreSQL', 'InfluxDB', 'Grafana'],
    github: 'https://github.com/vgharini21/BdProject_TradeJoe',
  },
  {
    title: 'Real-Time Video Intelligence & Alerting',
    timeframe: 'Jan 2025 — May 2025',
    summary:
      'Built a real-time video monitoring pipeline that analyzes live streams and triggers automated alerts from detected events. Designed the system on AWS using Kinesis, Lambda, Rekognition, and SQS, with Elasticsearch and QuickSight for downstream analytics.',
    tech: ['AWS Kinesis', 'Lambda', 'DynamoDB', 'Rekognition', 'Elasticsearch', 'QuickSight'],
    github: 'https://github.com/BhuOne02/projectKoala',
  },
]

export const research = {
  focus:
    'Building scalable systems, real-time data pipelines, and applied AI — while exploring how AI is reshaping computer science.',
  areas: [
    {
      title: 'Distributed & Cloud Systems',
      description:
        'Building reliable backend and cloud infrastructure using AWS, microservices, event-driven architectures, and distributed systems patterns.',
      tech: 'AWS · Microservices · Serverless · Docker',
    },
    {
      title: 'Real-Time Data Engineering',
      description:
        'Designing high-throughput data pipelines and streaming systems for processing, transforming, and analyzing large-scale data with low latency.',
      tech: 'Kafka · Spark · Kinesis · Hadoop',
    },
    {
      title: 'Applied AI & Machine Learning',
      description:
        'Building practical AI systems across computer vision, deep learning, LLM applications, and intelligent automation — from experimentation to working products.',
      tech: 'PyTorch · TensorFlow · Computer Vision · LLMs',
    },
    {
      title: 'AI for Computer Science Education',
      description:
        'Evaluating how AI tools approach computer science assignments across different academic levels and subject areas, including algorithms, security, operating systems, machine learning, privacy, and policy.',
      tech: 'LLMs · AI Evaluation · CS Education · Technical Research',
    },
  ],
}

export type Education = {
  school: string
  degree: string
  dates: string
  gpa: string
  courses: string[]
}

export const education: Education[] = [
  {
    school: 'New York University',
    degree: 'Master of Science, Computer Science',
    dates: 'Sep 2024 — May 2026',
    gpa: '3.75 / 4.00',
    courses: [
      'Data Structures & Algorithms',
      'Distributed Systems',
      'Big Data',
      'Cloud Computing',
      'Blockchain',
      'Machine Learning',
      'Deep Learning',
    ],
  },
  {
    school: 'SRM Institute of Science and Technology',
    degree: 'Bachelor of Technology, Computer Science',
    dates: 'Sep 2020 — May 2024',
    gpa: '3.8 / 4.00',
    courses: [
      'Artificial Intelligence',
      'Object-Oriented Programming',
      'Operating Systems',
      'Software Engineering',
      'Computer Networks',
      'System Design',
      'Database Systems',
    ],
  },
]

export const skillGroups: { category: string; skills: string[] }[] = [
  {
    category: 'Programming & Languages',
    skills: ['Python', 'C++', 'Java', 'SQL', 'JavaScript', 'Bash'],
  },
  {
    category: 'Backend & APIs',
    skills: [
      'Microservices',
      'Spring Boot',
      'FastAPI',
      'Flask',
      'gRPC',
      'GraphQL',
      'REST APIs',
      'OpenAPI',
    ],
  },
  {
    category: 'Data & Machine Learning',
    skills: [
      'TensorFlow',
      'Scikit-learn',
      'OpenCV',
      'ML Pipelines',
      'Hadoop',
    ],
  },
  {
    category: 'Databases & Caching',
    skills: [
      'MySQL',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'InfluxDB',
      'SQLite',
    ],
  },
  {
    category: 'Cloud, DevOps & Monitoring',
    skills: [
      'AWS',
      'Docker',
      'Kubernetes',
      'Terraform',
      'Prometheus',
      'Grafana',
      'CI/CD',
      'Linux/Unix',
    ],
  },
]

export type Certification = {
  title: string
  issuer: string
  year?: string
  category: 'AI & ML' | 'Data' | 'Software' | 'Security' | 'Data Science'
  credential?: string
}

export const certifications: Certification[] = [
  {
    title: 'Artificial Intelligence',
    issuer: 'Infosys Springboard',
    year: '2023',
    category: 'AI & ML',
  },
  {
    title: 'Career Hub Data Science Bootcamp',
    issuer: 'NYU Tandon School of Engineering',
    category: 'Data Science',
  },
  {
    title: 'Digital Skills: Artificial Intelligence',
    issuer: 'Accenture',
    category: 'AI & ML',
  },
  {
    title: 'Big Data Programming Languages & Big Data vs Data Science',
    issuer: 'Udemy',
    category: 'Data',
  },
  {
    title: 'Data Analytics, Storage, Mining & Visual Big Data Technologies',
    issuer: 'Udemy',
    category: 'Data',
  },
  {
    title: 'Cyber-Security Bootcamp',
    issuer: 'Udemy',
    category: 'Security',
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
