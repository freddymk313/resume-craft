export interface PersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
}

export const getFullName = (info: PersonalInfo): string => {
  return [info.firstName, info.lastName].filter(Boolean).join(" ");
};

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  currentJob: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: string[];
  certifications: string[];
}

export type TemplateName = "modern-minimal" | "sidebar-professional" | "creative-accent" | "simple-accent" | "classic-bordered" | "clean-professional" | "corporate-classic" | "professional-dark-sidebar";

export const defaultResumeData: ResumeData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
};

export const sampleResumeData: ResumeData = {
  personalInfo: {
    firstName: "Sophie",
    lastName: "Martin",
    jobTitle: "Product Designer",
    email: "sophie@example.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    website: "sophiemartin.design",
    linkedin: "linkedin.com/in/sophiemartin",
  },
  summary: "Creative product designer with 5+ years of experience crafting intuitive digital experiences. Passionate about user-centered design and building products that make a difference.",
  experience: [
    {
      id: "1",
      company: "TechCorp",
      position: "Senior Product Designer",
      location: "Paris",
      startDate: "2022-01",
      endDate: "",
      currentJob: true,
      description: "Led design for the core product platform\nManaged a team of 3 designers\nImproved conversion rates by 34%",
    },
    {
      id: "2",
      company: "StartupXYZ",
      position: "UI/UX Designer",
      location: "Lyon",
      startDate: "2019-06",
      endDate: "2021-12",
      currentJob: false,
      description: "Designed the mobile app from scratch\nConducted user research and usability tests\nCreated the company design system",
    },
  ],
  education: [
    {
      id: "1",
      school: "École de Design Nantes",
      degree: "Master in Digital Design",
      location: "Nantes, France",
      startDate: "2015-09",
      endDate: "2019-06",
    },
  ],
  skills: ["Figma", "Sketch", "Adobe XD", "Prototyping", "User Research", "Design Systems", "HTML/CSS", "React"],
  languages: ["French (Native)", "English (Fluent)", "Spanish (Intermediate)"],
  certifications: ["Google UX Design Certificate", "Interaction Design Foundation"],
};
