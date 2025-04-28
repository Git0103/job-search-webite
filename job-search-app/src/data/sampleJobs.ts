import { Job } from '../types/job';

export const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Cloud Solutions Architect',
    company: 'CloudTech Solutions',
    location: 'San Francisco, CA',
    description: 'We are looking for an experienced Cloud Solutions Architect to design and implement cloud-based solutions for our enterprise clients. The ideal candidate will have deep expertise in cloud architecture and a strong understanding of SaaS, PaaS, and IaaS platforms.',
    requirements: [
      '10+ years of experience in cloud architecture',
      'Expertise in AWS, Azure, or GCP',
      'Strong understanding of microservices architecture',
      'Experience with containerization and orchestration',
      'Excellent communication and leadership skills'
    ],
    salary: {
      min: 150000,
      max: 200000,
      currency: 'USD'
    },
    type: 'full-time',
    postedAt: '2024-03-15',
    cloudType: 'SaaS',
    experience: {
      min: 8,
      max: 15
    },
    skills: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
    benefits: [
      'Competitive salary',
      'Health insurance',
      '401(k) matching',
      'Remote work options',
      'Professional development budget'
    ]
  },
  {
    id: '2',
    title: 'Platform Engineer',
    company: 'PlatformPro',
    location: 'New York, NY',
    description: 'Join our team as a Platform Engineer to build and maintain our cloud platform infrastructure. You will be responsible for developing and optimizing our PaaS offerings, ensuring high availability and scalability.',
    requirements: [
      '5+ years of platform engineering experience',
      'Strong knowledge of cloud platforms',
      'Experience with infrastructure as code',
      'Understanding of DevOps practices',
      'Problem-solving skills'
    ],
    salary: {
      min: 120000,
      max: 160000,
      currency: 'USD'
    },
    type: 'full-time',
    postedAt: '2024-03-20',
    cloudType: 'PaaS',
    experience: {
      min: 5,
      max: 10
    },
    skills: ['Kubernetes', 'Docker', 'Terraform', 'Ansible', 'Python', 'Go'],
    benefits: [
      'Flexible work hours',
      'Stock options',
      'Health and wellness programs',
      'Learning and development opportunities',
      'Team building events'
    ]
  },
  {
    id: '3',
    title: 'Infrastructure Engineer',
    company: 'InfraCloud Inc',
    location: 'Austin, TX',
    description: 'We are seeking an Infrastructure Engineer to manage and optimize our IaaS infrastructure. The role involves designing, implementing, and maintaining cloud infrastructure components while ensuring security and performance.',
    requirements: [
      '7+ years of infrastructure engineering experience',
      'Deep knowledge of cloud infrastructure',
      'Experience with network security',
      'Strong troubleshooting skills',
      'Ability to work in a team environment'
    ],
    salary: {
      min: 130000,
      max: 170000,
      currency: 'USD'
    },
    type: 'full-time',
    postedAt: '2024-03-25',
    cloudType: 'IaaS',
    experience: {
      min: 7,
      max: 12
    },
    skills: ['AWS', 'Azure', 'Networking', 'Security', 'Linux', 'Automation'],
    benefits: [
      'Competitive compensation',
      'Comprehensive health coverage',
      'Remote work flexibility',
      'Professional certification support',
      'Generous vacation policy'
    ]
  }
]; 