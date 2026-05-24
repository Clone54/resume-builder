export type LinkType = {
  id: string;
  label: string;
  url: string;
};

export type ExperienceType = {
  id: string;
  company: string;
  designation: string;
  duration: string;
  responsibilities: string; // newline separated points
};

export type ProjectType = {
  id: string;
  name: string;
  overview: string;
  liveLink: string;
  githubClient: string;
  githubServer: string;
  features: string; // newline separated points
};

export type LanguageType = {
  id: string;
  language: string;
  proficiency: string;
};

export type ResumeData = {
  heading: {
    fullName: string;
    designation: string;
    phone: string;
    email: string;
    address: string;
    links: LinkType[];
  };
  objective: string;
  skills: {
    technical: string; // comma or newline separated
    interpersonal: string;
  };
  experience: ExperienceType[];
  projects: ProjectType[];
  education: {
    institution: string;
    degree: string;
    duration: string;
    cgpa: string;
  };
  activities: string; // newline separated points
  languages: LanguageType[];
};

export const initialResumeState: ResumeData = {
  heading: {
    fullName: "",
    designation: "",
    phone: "",
    email: "",
    address: "",
    links: []
  },
  objective: "",
  skills: {
    technical: "",
    interpersonal: ""
  },
  experience: [],
  projects: [],
  education: {
    institution: "",
    degree: "",
    duration: "",
    cgpa: ""
  },
  activities: "",
  languages: []
};
