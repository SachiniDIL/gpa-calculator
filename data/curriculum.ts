export interface Module {
  code: string;
  name: string;
  credits: number;
}

export interface SemesterData {
  year: number;
  semester: number;
  modules: Module[];
}

export const curriculum: SemesterData[] = [
  {
    year: 1,
    semester: 1,
    modules: [
      { code: "IT1010", name: "Introduction to Programming", credits: 4 },
      { code: "IT1020", name: "Introduction to Computer Systems", credits: 4 },
      { code: "IT1030", name: "Mathematics for Computing", credits: 4 },
      { code: "IT1040", name: "Communication Skills", credits: 3 },
    ],
  },
  {
    year: 1,
    semester: 2,
    modules: [
      { code: "IT1050", name: "Object Oriented Concepts", credits: 2 },
      { code: "IT1060", name: "Software Process Modeling", credits: 3 },
      { code: "IT1080", name: "English for Academic Purposes", credits: 3 },
      { code: "IT1090", name: "Information Systems & Data Modeling", credits: 4 },
      { code: "IT1100", name: "Internet & Web Technologies", credits: 4 },
    ],
  },
  {
    year: 2,
    semester: 1,
    modules: [
      { code: "IT2020", name: "Software Engineering", credits: 4 },
      { code: "IT2030", name: "Object Oriented Programming", credits: 4 },
      { code: "IT2040", name: "Database Management Systems", credits: 4 },
      { code: "IT2050", name: "Computer Networks", credits: 4 },
      { code: "IT2060", name: "Operating Systems and System Administration", credits: 4 },
    ],
  },
  {
    year: 2,
    semester: 2,
    modules: [
      { code: "IT2010", name: "Mobile Application Development", credits: 4 },
      { code: "IT2070", name: "Data Structures & Algorithms", credits: 4 },
      { code: "IT2080", name: "IT Project", credits: 4 },
      { code: "IT2090", name: "Professional Skills", credits: 2 },
      { code: "IT2110", name: "Probability & Statistics", credits: 3 },
    ],
  },
  {
    year: 3,
    semester: 1,
    modules: [
      { code: "SE3050", name: "User Experience Engineering", credits: 3 },
      { code: "SE3060", name: "Database Systems", credits: 4 },
      { code: "SE3070", name: "Case Studies in Software Engineering", credits: 4 },
      { code: "SE3080", name: "Software Project Management", credits: 3 },
    ],
  },
  {
    year: 3,
    semester: 2,
    modules: [
      { code: "SE3010", name: "Software Engineering Process & Quality Management", credits: 4 },
      { code: "SE3020", name: "Distributed Systems", credits: 4 },
      { code: "SE3030", name: "Software Architecture", credits: 4 },
      { code: "SE3040", name: "Application Frameworks", credits: 4 },
    ],
  },
  {
    year: 4,
    semester: 1,
    modules: [
      { code: "SE4030", name: "Secure Software Development", credits: 4 },
      { code: "SE4050", name: "Deep Learning", credits: 4 },
    ],
  },
  {
    year: 4,
    semester: 2,
    modules: [
      { code: "IT4010", name: "Research Project", credits: 16 },
      { code: "IT4060", name: "Machine Learning", credits: 4 },
      { code: "SE4010", name: "Current Trends in Software Engineering", credits: 4 },
    ],
  },
];
