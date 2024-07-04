import { ExperienceItem } from "./ExperienceItem";
import { Heading } from "./Heading";

const experienceData = [
  {
    id: 1,
    company: "1Centre",
    website: "https://1centre.com",
    role: "Senior Front End Engineer",
    startDate: "Jul 2023",
    endDate: "Present",
  },
  {
    id: 2,
    company: "Relay",
    website: "https://relay.ai",
    role: "Senior Front End Engineer",
    startDate: "Apr 2022",
    endDate: "Apr 2023",
  },
  {
    id: 3,
    company: "Firstbyte Digital Solutions",
    website: "https://firstbytedigital.com",
    role: "Co-Founder & CTO",
    startDate: "Nov 2017",
    endDate: "Mar 2022",
  },
  {
    id: 4,
    company: "Self Employed",
    role: "Freelance Web Developer",
    startDate: "Jan 2016",
    endDate: "Oct 2017",
  },
  {
    id: 5,
    company: "Web Application Developer",
    role: "Senior Front End Engineer",
    startDate: "May 2015",
    endDate: "Aug 2015",
  },
  {
    id: 6,
    company: "VisualIQ",
    website: "https://www.linkedin.com/company/visualiq/",
    role: "Developer Intern",
    startDate: "Jun 2013",
    endDate: "Jun 2013",
  },
];

export const Experience = () => {
  return (
    <>
      <Heading>Professional experience</Heading>
      {experienceData.map((experience) => (
        <ExperienceItem {...experience} />
      ))}
    </>
  );
};
