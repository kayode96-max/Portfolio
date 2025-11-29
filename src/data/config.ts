import { PortfolioData } from "@/types";

export const portfolioConfig = {
  // Personal Information (overrides GitHub)
  name: "Kayode Max",
  title: "Full Stack Developer",
  email: "kayode@example.com",
  location: "Lagos, Nigeria",

  // Social Links (in addition to GitHub)
  social: {
    linkedin: "https://linkedin.com/in/kayode-max",
    twitter: "https://twitter.com/kayode_max",
    website: "https://kayodemax.com",
  },

  // Work Experience (Manual Entry)
  experience: [
    {
      company: "Tech Solutions Inc.",
      role: "Senior Frontend Developer",
      startDate: "2023-01",
      endDate: "Present",
      description:
        "Leading the frontend team in building scalable web applications using Next.js and React. Improved performance by 40%.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      logo: "/companies/tech-solutions.png", // You'll need to add these images or use placeholders
    },
    {
      company: "Creative Agency",
      role: "Web Developer",
      startDate: "2021-06",
      endDate: "2022-12",
      description:
        "Developed responsive websites for various clients. Collaborated with designers to implement pixel-perfect UIs.",
      technologies: ["Vue.js", "SCSS", "JavaScript", "PHP"],
    },
  ],

  // Manual Skills (to supplement GitHub)
  skills: [
    {
      name: "System Design",
      category: "Architecture",
      level: 85,
    },
    {
      name: "UI/UX Design",
      category: "Design",
      level: 80,
    },
    {
      name: "Project Management",
      category: "Soft Skills",
      level: 90,
    },
  ],

  // Manual Projects (e.g. closed source)
  projects: [
    {
      name: "E-commerce Dashboard",
      description:
        "A comprehensive dashboard for managing online stores. Built with React and Node.js.",
      url: "https://dashboard-demo.com",
      thumbnail: "", // Add URL
      language: "TypeScript",
      stars: 0,
      forks: 0,
      topics: ["React", "Dashboard", "Analytics"],
      updatedAt: "2024-03-15",
    },
  ],
  // Certifications
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      url: "https://aws.amazon.com/certification/",
      image: "/certifications/aws-sa.png"
    },
    {
      name: "Meta Frontend Developer Professional Certificate",
      issuer: "Meta",
      date: "2022",
      url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
      image: "/certifications/meta-frontend.png"
    }
  ]
};
