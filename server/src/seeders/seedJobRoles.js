const JobRole = require("../models/JobRole");

const sampleJobRoles = [
  {
    jobTitle: "Frontend Developer",
    department: "Engineering",
    level: "Junior",
    description:
      "Build responsive user interfaces, integrate APIs, and maintain reusable React components."
  },
  {
    jobTitle: "Backend Developer",
    department: "Engineering",
    level: "Mid",
    description:
      "Design secure APIs, manage business logic, and optimize server-side application performance."
  },
  {
    jobTitle: "Full Stack Developer",
    department: "Engineering",
    level: "Senior",
    description:
      "Own frontend and backend delivery across features, releases, and production issue resolution."
  },
  {
    jobTitle: "QA Engineer",
    department: "Engineering",
    level: "Mid",
    description:
      "Plan test cases, validate releases, and ensure product quality across manual and automated testing."
  },
  {
    jobTitle: "Engineering Manager",
    department: "Engineering",
    level: "Lead",
    description:
      "Lead engineering delivery, mentor developers, and coordinate execution across product squads."
  },
  {
    jobTitle: "Sales Executive",
    department: "Sales",
    level: "Junior",
    description:
      "Generate leads, follow up with prospects, and support the sales pipeline with accurate updates."
  },
  {
    jobTitle: "Account Manager",
    department: "Sales",
    level: "Mid",
    description:
      "Manage client relationships, upsell opportunities, and coordinate renewals with internal teams."
  },
  {
    jobTitle: "Sales Manager",
    department: "Sales",
    level: "Senior",
    description:
      "Drive revenue growth, manage sales pipelines, and mentor account executives across territories."
  },
  {
    jobTitle: "HR Executive",
    department: "HR",
    level: "Junior",
    description:
      "Support hiring operations, employee communication, onboarding, and people process coordination."
  },
  {
    jobTitle: "Talent Acquisition Specialist",
    department: "HR",
    level: "Mid",
    description:
      "Source candidates, schedule interviews, and streamline hiring workflows for open positions."
  },
  {
    jobTitle: "Marketing Specialist",
    department: "Marketing",
    level: "Junior",
    description:
      "Execute campaigns, coordinate content calendars, and support digital growth initiatives."
  },
  {
    jobTitle: "Content Strategist",
    department: "Marketing",
    level: "Mid",
    description:
      "Plan content themes, align messaging, and improve campaign performance across channels."
  },
  {
    jobTitle: "Financial Analyst",
    department: "Finance",
    level: "Mid",
    description:
      "Build forecasts, analyze budgets, and provide reporting that supports financial decision making."
  },
  {
    jobTitle: "Finance Manager",
    department: "Finance",
    level: "Senior",
    description:
      "Oversee budgeting, cash flow tracking, and compliance across operational finance processes."
  }
];

async function seedJobRoles() {
  await JobRole.bulkWrite(
    sampleJobRoles.map((role) => ({
      updateOne: {
        filter: {
          jobTitle: role.jobTitle,
          department: role.department
        },
        update: {
          $set: role
        },
        upsert: true
      }
    }))
  );
}

module.exports = seedJobRoles;
