/* Change this file to get your personal Portfolio */

// Website related settings
const settings = {
  isSplash: false,
};

// SEO Related settings
const seo = {
  title: "Andrew Caskey's Portfolio",
  description:
    "Observability Engineer with 3+ years of enterprise-scale infrastructure and application monitoring. Deep expertise in Dynatrace across 2000+ hosts. AWS Certified.",
  og: {
    title: "Andrew Caskey Portfolio",
    type: "website",
    url: "http://andrewcaskey.com/",
  },
};

// Home Page
const greeting = {
  title: "Andrew Caskey",
  logo_name: "AndrewCaskey",
  nickname: "",
  subTitle: "",
  resumeLink: "/Andrew_Caskey_Resume.pdf",
  portfolio_repository: "#",
  githubProfile: "https://github.com/andrewcaskey",
};

const socialMediaLinks = [
  {
    name: "Github",
    link: "https://github.com/andrewcaskey",
    fontAwesomeIcon: "fa-github",
    backgroundColor: "#181717",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/andrew-caskey/",
    fontAwesomeIcon: "fa-linkedin-in",
    backgroundColor: "#0077B5",
  },
];

const skills = {
  data: [
    {
      title: "Observability & Monitoring",
      fileName: "DataScienceImg",
      skills: [
        "⚡ Administered Dynatrace at enterprise scale across 2000+ Linux/Windows hosts",
        "⚡ Built ingestion pipelines using Dynatrace OpenPipeline and OpenTelemetry for real-time log and trace collection",
        "⚡ Designed alerting policies, SLO frameworks, and DORA metric dashboards",
        "⚡ Experienced with Grafana, Datadog, New Relic, Prometheus, CloudWatch, and PagerDuty",
      ],
      softwareSkills: [
        {
          skillName: "Dynatrace",
          fontAwesomeClassname: "simple-icons:dynatrace",
          style: { color: "#1496FF" },
        },
        {
          skillName: "OpenTelemetry",
          fontAwesomeClassname: "simple-icons:opentelemetry",
          style: { color: "#F5A800" },
        },
        {
          skillName: "Grafana",
          fontAwesomeClassname: "simple-icons:grafana",
          style: { color: "#F46800" },
        },
        {
          skillName: "Prometheus",
          fontAwesomeClassname: "simple-icons:prometheus",
          style: { color: "#E6522C" },
        },
        {
          skillName: "Datadog",
          fontAwesomeClassname: "simple-icons:datadog",
          style: { color: "#632CA6" },
        },
        {
          skillName: "New Relic",
          fontAwesomeClassname: "simple-icons:newrelic",
          style: { color: "#008C99" },
        },
      ],
    },
    {
      title: "Cloud & Infrastructure as Code",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ AWS Certified — hands-on EC2, EKS, S3, CloudWatch, Lambda experience",
        "⚡ Multi-cloud deployments across AWS, Azure, GCP, and Hetzner; DNS and edge via Cloudflare",
        "⚡ Infrastructure as code with Terraform, Ansible, and Monaco",
      ],
      softwareSkills: [
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: { color: "#FF9900" },
        },
        {
          skillName: "Azure",
          fontAwesomeClassname: "simple-icons:microsoftazure",
          style: { color: "#0089D6" },
        },
        {
          skillName: "GCP",
          fontAwesomeClassname: "simple-icons:googlecloud",
          style: { color: "#4285F4" },
        },
        {
          skillName: "Hetzner",
          fontAwesomeClassname: "simple-icons:hetzner",
          style: { color: "#D50C2D" },
        },
        {
          skillName: "Cloudflare",
          fontAwesomeClassname: "simple-icons:cloudflare",
          style: { color: "#F38020" },
        },
        {
          skillName: "Terraform",
          fontAwesomeClassname: "simple-icons:terraform",
          style: { color: "#7B42BC" },
        },
        {
          skillName: "Ansible",
          fontAwesomeClassname: "simple-icons:ansible",
          style: { color: "#EE0000" },
        },
      ],
    },
    {
      title: "DevOps & Orchestration",
      fileName: "FullStackImg",
      skills: [
        "⚡ Managed Kubernetes infrastructure across 10 clusters and 81 nodes in production",
        "⚡ Implemented CI/CD pipelines via Azure Pipelines and GitHub Actions",
        "⚡ Container orchestration with Docker and EKS; CI tooling including Jenkins and Harness",
      ],
      softwareSkills: [
        {
          skillName: "Kubernetes",
          fontAwesomeClassname: "simple-icons:kubernetes",
          style: { color: "#326CE5" },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: { color: "#2496ED" },
        },
        {
          skillName: "GitHub Actions",
          fontAwesomeClassname: "simple-icons:githubactions",
          style: { color: "#2088FF" },
        },
        {
          skillName: "Jenkins",
          fontAwesomeClassname: "simple-icons:jenkins",
          style: { color: "#D24939" },
        },
        {
          skillName: "Linux",
          fontAwesomeClassname: "simple-icons:linux",
          style: { color: "#FCC624" },
        },
      ],
    },
    {
      title: "Programming & Scripting",
      fileName: "DesignImg",
      skills: [
        "⚡ Scripting automation solutions in Python and Bash for monitoring and infrastructure tasks",
        "⚡ Built an MCP server and dtctl CLI in Go for AI-native Dynatrace interactions",
        "⚡ TypeScript/Next.js for client web development; PowerShell for Windows Server automation",
      ],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "simple-icons:python",
          style: { color: "#3776AB" },
        },
        {
          skillName: "Go",
          fontAwesomeClassname: "simple-icons:go",
          style: { color: "#00ADD8" },
        },
        {
          skillName: "TypeScript",
          fontAwesomeClassname: "simple-icons:typescript",
          style: { color: "#3178C6" },
        },
        {
          skillName: "PowerShell",
          fontAwesomeClassname: "simple-icons:powershell",
          style: { color: "#5391FE" },
        },
        {
          skillName: "Bash",
          fontAwesomeClassname: "simple-icons:gnubash",
          style: { color: "#4EAA25" },
        },
      ],
    },
  ],
};

// Education Page
const competitiveSites = {
  competitiveSites: [],
};

const degrees = {
  degrees: [
    {
      title: "University of Missouri – Columbia",
      subtitle: "B.S. in Information Technology | Minor in Mathematics",
      logo_path: "mizzou_logo.png",
      alt_name: "Mizzou",
      duration: "2020 - 2024",
      descriptions: [
        "⚡ Bachelor of Science in Information Technology with a Minor in Mathematics.",
        "⚡ Coursework in systems administration, networking, database management, and software development.",
        "⚡ Worked as IT Support Specialist at Mizzou DoIT, managing enterprise hardware and ITIL-aligned incident resolution.",
      ],
      website_link: "https://missouri.edu",
    },
  ],
};

const certifications = {
  certifications: [
    {
      title: "AWS Certified Developer",
      subtitle: "Associate (DVA-C02)",
      logo_path: "aws_logo.png",
      certificate_link: "#",
      alt_name: "Amazon Web Services",
      color_code: "#FF990099",
    },
    {
      title: "AWS Cloud Practitioner",
      subtitle: "Foundational (CLF-C01)",
      logo_path: "aws_logo.png",
      certificate_link: "#",
      alt_name: "Amazon Web Services",
      color_code: "#FF990099",
    },
    {
      title: "Dynatrace Certified",
      subtitle: "Associate",
      logo_path: "dynatrace_logo.png",
      certificate_link: "#",
      alt_name: "Dynatrace",
      color_code: "#1496FF99",
    },
    {
      title: "ServiceNow",
      subtitle: "Event Management Fundamentals",
      logo_path: "servicenow_logo.png",
      certificate_link: "#",
      alt_name: "ServiceNow",
      color_code: "#81B5A199",
    },
  ],
};

// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Work & Internships",
  description:
    "Observability Engineer with enterprise-scale Dynatrace administration, CI/CD pipeline design, and infrastructure automation across HealthEquity's hybrid cloud environment. Founder of ACE Media Solutions LLC providing DevOps and web services to SMBs.",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work",
      work: true,
      experiences: [
        {
          title: "Observability Engineer",
          company: "HealthEquity",
          company_url: "https://www.healthequity.com/",
          logo_path: "healthequity_logo.png",
          duration: "Jan 2024 – Present",
          location: "Remote",
          description:
            "Administered Dynatrace across 2000+ Linux/Windows hosts. Designed log ingestion pipelines using Dynatrace OpenPipeline and Splunk. Built CI/CD pipelines via Azure Pipelines and GitHub Actions. Engineered configuration drift detection with Monaco and Terraform. Managed Kubernetes across 10 clusters and 81 nodes. Pioneered AI-native observability tooling via MCP server and dtctl CLI.",
          color: "#0078D4",
        },
        {
          title: "Founder & DevOps Engineer",
          company: "ACE Media Solutions LLC",
          company_url: "#",
          logo_path: "ace_logo.png",
          duration: "May 2021 – Present",
          location: "Remote",
          description:
            "Assist SMBs with web development, SEO, CRM, and automation. Built scalable DevOps pipelines on AWS, GCP, and Vercel. Implemented Grafana and Datadog monitoring with automated alerting — reducing incident detection time by 80%. Developed client sites using TypeScript and Next.js with Make workflow automation.",
          color: "#1a1a2e",
        },
        {
          title: "IT Support Specialist",
          company: "Mizzou DoIT",
          company_url: "https://doit.missouri.edu/",
          logo_path: "mizzou_logo.png",
          duration: "Apr 2022 – May 2023",
          location: "Columbia, MO",
          description:
            "Provided enterprise IT support following ITIL incident management processes, maintaining 98% satisfaction across 2000+ tickets for 10,000+ users. Managed hardware lifecycle for 500+ devices; supported Windows Server and Office 365 with 99.5% service availability.",
          color: "#F1B82D",
        },
      ],
    },
    {
      title: "Internships",
      experiences: [
        {
          title: "Observability Intern",
          company: "HealthEquity",
          company_url: "https://www.healthequity.com/",
          logo_path: "healthequity_logo.png",
          duration: "May 2023 – Jan 2024",
          location: "Remote",
          description:
            "Performed gap analysis identifying monitoring blind spots; implemented 15+ new Splunk and Dynatrace dashboards. Automated Dynatrace Davis AI alert routing to stakeholders via Power Apps. Supported Tanium-based server provisioning with zero critical failures across 500+ deployments.",
          color: "#0078D4",
        },
      ],
    },
  ],
};

// Projects Page
const projectsHeader = {
  title: "Projects",
  description:
    "Personal and professional projects spanning observability tooling, DevOps automation, and web development. Includes the dtctl CLI and MCP server for AI-native Dynatrace operations.",
  avatar_image_path: "projects_image.svg",
};

const publicationsHeader = {
  title: "Publications",
  description:
    "Articles and technical writing on observability and infrastructure engineering.",
  avatar_image_path: "projects_image.svg",
};

const publications = {
  data: [],
};

// Contact Page
const contactInfo = {
  title: "Contact Me",
  subtitle: "Feel free to reach out — I'll respond within 24 hours.",
  number: "+1-941-264-9578",
  email_address: "caskeyandrew24@gmail.com",
};

const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "animated_ashutosh.png",
    description:
      "I'm available on LinkedIn and email. Feel free to reach out about observability engineering, infrastructure automation, or SRE opportunities.",
  },
  blogSection: {
    title: "Blog",
    subtitle: "Writing about observability, infrastructure, and engineering.",
    link: "/blog",
    avatar_image_path: "blogs_image.svg",
  },
  addressSection: {
    title: "Location",
    subtitle: "Salt Lake City, UT",
    locality: "Salt Lake City",
    country: "USA",
    region: "Utah",
    postalCode: "84101",
    streetAddress: "",
    avatar_image_path: "address_image.svg",
    location_map_link: "https://maps.google.com/?q=Salt+Lake+City,+UT",
  },
  phoneSection: {
    title: "Phone",
    subtitle: "+1-941-264-9578",
  },
};

const blogSection = {
  title: "Blog",
  subtitle: "Thoughts on observability, infrastructure, and engineering.",
  externalBlog: {
    label: "Read more on my SRE blog",
    url: "https://sre.andrewcaskey.com",
  },
  posts: [
    {
      slug: "linux-namespaces-container-isolation",
      title: "Linux Namespaces: The Building Blocks of Container Isolation",
      date: "2026-05-31",
      category: "Docker",
      series: "Docker Deep Dive",
      seriesOrder: 2,
      description:
        "A ground-up walkthrough of the seven Linux namespace types — PID, NET, MNT, UTS, IPC, USER, and TIME — and how Docker uses them to isolate every container.",
    },
    {
      slug: "docker-from-the-ground-up",
      title: "Docker from the Ground Up: A Hierarchical View",
      date: "2026-05-31",
      category: "Docker",
      series: "Docker Deep Dive",
      seriesOrder: 1,
      description:
        "Trace a docker run command from the CLI through dockerd, containerd, runc, and the OCI bundle — understanding each layer's role before diving into namespaces.",
    },
    {
      slug: "agentic-web-security",
      title: "The Hidden Dangers of AI Agents on the Open Web",
      date: "2026-05-23",
      category: "AI",
      series: null,
      seriesOrder: null,
      description:
        "A summary of a recent arXiv survey mapping the full threat landscape for agentic AI systems — prompt injection, memory poisoning, toolchain abuse, and why the Agentic Web makes all of it harder.",
    },
    {
      slug: "getting-started-with-opentelemetry",
      title: "Getting Started with OpenTelemetry in Go",
      date: "2026-04-10",
      category: "Observability",
      series: null,
      seriesOrder: null,
      description:
        "A practical guide to instrumenting Go services with OpenTelemetry — structured logging with slog, Prometheus metrics, distributed tracing, and correlating all three signals.",
    },
  ],
};

export {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  experience,
  projectsHeader,
  publicationsHeader,
  publications,
  contactInfo,
  contactPageData,
  blogSection,
};
