const basePath = process.env.NODE_ENV === 'production' ? '/harini-portfolio' : ''

export function assetPath(path: string) {
  return `${basePath}${path}`
}

export const profile = {
  name: 'Harini Vinu',
  roles: ['Software Engineer', 'AI Engineer'],
  email: 'vgharini21@gmail.com',
  location: 'Boston, United States',
  // NOTE: Update these with your exact profile URLs.
  github: 'https://github.com/vgharini21',
  linkedin: 'https://www.linkedin.com/in/harinivinu/',
  resume: `${basePath}/Harini_Vinu_Resume.pdf`,
  intro:
    'Software Engineer and AI Engineer focused on building reliable distributed systems, scalable backend services, and data-intensive pipelines. Graduated with an MS in Computer Science from NYU, with hands-on experience across large-scale orchestration, real-time streaming, and machine learning.',
}

export const about = [
  'I build backend and data infrastructure that stays fast and dependable under load. My work spans AI-driven test orchestration, event-driven microservices, and distributed data pipelines processing tens of millions of records.',
  'Across internships at Qualitest, LOCOMeX, and NYU, I have engineered systems for distributed job scheduling, real-time streaming, and large-scale data processing — consistently focused on reliability, throughput, and measurable performance gains.',
  'I am completing my MS in Computer Science at New York University, with graduate coursework in distributed systems, big data, cloud computing, machine learning, and deep learning.',
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
      'Enabled reliable distributed job scheduling across 100+ concurrent tasks in large-scale automated workflows.',
      'Engineered scalable data processing pipelines for large test datasets using asynchronous queue-based processing and optimized aggregation logic, reducing execution time by 40% in high-throughput distributed systems.',
      'Integrated monitoring and fault-tolerant retry mechanisms for distributed jobs, improving system reliability and reducing job failures by 30%.',
      'Architected backend services to manage test workflows, improving automation scalability and service orchestration.',
    ],
    tech: ['Python', 'Redis', 'MongoDB', 'Distributed Systems', 'Async Queues'],
  },
  {
    company: 'LOCOMeX',
    role: 'Software Engineering Intern',
    dates: 'Jun 2025 — Aug 2025',
    location: 'New York, United States',
    points: [
      'Designed data validation and processing services to handle 100K+ records, ensuring consistency across large-scale ingestion workflows.',
      'Optimized query execution and REST API performance by restructuring hierarchical data models and database access patterns.',
      'Built scalable microservices using event-driven architecture to propagate risk signals across supplier networks in real time.',
      'Implemented aggregation, transformation, and normalization logic for large supplier datasets, improving ESG risk scoring accuracy and reducing latency by 30%.',
    ],
    tech: ['Microservices', 'Event-Driven', 'REST APIs', 'Data Modeling'],
  },
  {
    company: 'New York University',
    role: 'Big Data Engineer Intern',
    dates: 'Jan 2025 — May 2025',
    location: 'New York, United States',
    points: [
      'Engineered distributed data pipelines using Apache Spark, Kafka, and Hadoop to process 10M+ records across scalable clusters.',
      'Accelerated automation tools to streamline workflow reliability, cutting issue resolution time by 90%.',
      'Optimized scalable data ingestion and processing modules with real-world datasets, improving distributed system efficiency by 25%.',
      'Designed real-time streaming data ingestion systems using Kafka producers and consumers, enabling near-real-time analytics and reducing data latency for downstream reports.',
    ],
    tech: ['Apache Spark', 'Kafka', 'Hadoop', 'Streaming'],
  },
  {
    company: 'Skill Vertex',
    role: 'Software Engineering Intern',
    dates: 'Dec 2021 — Feb 2022',
    location: 'Chennai, India',
    points: [
      'Built a hand detection and gesture recognition system with Python, OpenCV, and Google AI tools, improving detection accuracy by 40%.',
      'Enhanced object tracking and optimized machine-learning pipelines using preprocessing and hyperparameter tuning — cutting false detections by 15%, lowering latency by 25%, and achieving real-time processing at 30 FPS on over 1,000 test samples.',
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
      'Serverless conversational chatbot delivering real-time restaurant recommendations. Built with AWS (S3, API Gateway, Lambda, Lex, DynamoDB, Elasticsearch) integrated with the Yelp API. Orchestrated asynchronous workflows with SQS, automated personalized alerts via SES, and used CloudWatch for monitoring, logging, and event-driven scheduling.',
    tech: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Lex', 'Elasticsearch', 'SQS', 'SES'],
    github: 'https://github.com/vgharini21/DiningConciergeChatbot',
  },
  {
    title: 'Real-Time Stock Market Analysis System',
    timeframe: 'Sep 2024 — Oct 2024',
    summary:
      'Distributed streaming analytics platform processing live financial data feeds with Kafka, Spark Streaming, and Hadoop. Built backend services for computing technical indicators and storing high-volume time-series data in PostgreSQL and InfluxDB for low-latency analytics, with Grafana dashboards for performance monitoring and visualization.',
    tech: ['Kafka', 'Spark Streaming', 'Hadoop', 'PostgreSQL', 'InfluxDB', 'Grafana'],
    github: 'https://github.com/vgharini21/BdProject_TradeJoe',
  },
  {
    title: 'Real-Time Video Monitoring & Alert System',
    timeframe: 'Jan 2025 — May 2025',
    summary:
      'Scalable real-time monitoring system using AWS Kinesis, Lambda, SQS, DynamoDB, and Rekognition to process live data streams and perform image analysis with millisecond-level alerting. Implemented analytics pipelines with Elasticsearch and AWS QuickSight to surface operational insights from streaming event data.',
    tech: ['AWS Kinesis', 'Lambda', 'DynamoDB', 'Rekognition', 'Elasticsearch', 'QuickSight'],
    github: 'https://github.com/BhuOne02/projectKoala',
  },
]

export const research = {
  focus:
    'Distributed systems, big data engineering, and applied machine learning — with an emphasis on real-time streaming architectures and large-scale data processing.',
  areas: [
    {
      title: 'Distributed Data Pipelines',
      description:
        'Engineering fault-tolerant pipelines with Apache Spark, Kafka, and Hadoop to process 10M+ records across scalable clusters, improving distributed system efficiency by 25%.',
    },
    {
      title: 'Real-Time Streaming Systems',
      description:
        'Designing near-real-time ingestion using Kafka producers and consumers to power low-latency analytics for downstream reporting.',
    },
    {
      title: 'Applied Computer Vision',
      description:
        'Building and tuning ML pipelines for gesture recognition and object tracking, achieving real-time 30 FPS inference with improved detection accuracy.',
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
    gpa: '3.74 / 4.00',
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
    skills: ['Python', 'C++', 'Java', 'Scala', 'Go', 'JavaScript', 'Bash'],
  },
  {
    category: 'Backend & APIs',
    skills: [
      'Microservices Architecture',
      'Spring Boot',
      'FastAPI',
      'Django',
      'Flask',
      'gRPC',
      'GraphQL',
      'REST APIs',
      'OpenAPI',
      'Swagger',
    ],
  },
  {
    category: 'Data & Machine Learning',
    skills: [
      'TensorFlow',
      'Scikit-learn',
      'OpenCV',
      'Computer Vision',
      'ML Pipelines',
      'Hadoop',
      'Hive',
      'Akka',
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
      'Hibernate',
    ],
  },
  {
    category: 'Cloud, DevOps & Monitoring',
    skills: [
      'AWS',
      'Serverless',
      'Docker',
      'Kubernetes',
      'Terraform',
      'Jenkins',
      'Prometheus',
      'Grafana',
      'Splunk',
      'Ansible',
      'Linux/Unix',
    ],
  },
]

export const certifications = [
  'NYU: CareerHub Data Science Bootcamp',
  'Accenture: AI',
  'Infosys SpringBoard: Java Certified Foundation Associate',
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
