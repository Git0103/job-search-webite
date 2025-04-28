export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  postedAt: string;
  cloudType: 'SaaS' | 'PaaS' | 'IaaS';
  experience: {
    min: number;
    max: number;
  };
  skills: string[];
  benefits: string[];
  companyLogo?: string;
} 