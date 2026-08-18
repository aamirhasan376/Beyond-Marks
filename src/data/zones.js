export const ZONE_NAMES = ["Creator", "Builder", "Thinker", "Helper", "Problem-Solver"];

export const ZONES = {
  Creator: {
    color: "#8C5B8F",
    tag: "Expression",
    line: "You're drawn to turning ideas into things people can see, hear, or feel.",
    day: [
      "Sketch three rough concepts before lunch, throw away two",
      "Sit in a feedback session and rework something based on it",
      "Chase a detail nobody else would notice until it's right",
      "Ship something and watch how people actually react to it",
    ],
    paths: [
      { course: "B.Des / Design", where: "NID, NIFT, private design schools" },
      { course: "Fine Arts (BFA)", where: "Government & private art colleges" },
      { course: "Mass Media / Film (BMM)", where: "University mass-comm departments" },
      { course: "Architecture (creative track)", where: "NATA-based B.Arch programs" },
      { course: "Content & Communication", where: "Journalism & advertising degrees" },
    ],
  },
  Builder: {
    color: "#B4772F",
    tag: "Making it real",
    line: "You're drawn to turning ideas into things that actually work.",
    day: [
      "Prototype something, break it, figure out why",
      "Debug a problem for two hours longer than planned",
      "Test under real conditions, not just on paper",
      "Iterate until it's reliable, not just clever",
    ],
    paths: [
      { course: "B.E / B.Tech Engineering", where: "Any core or CS branch, JEE/state CET" },
      { course: "Architecture (B.Arch)", where: "NATA / JEE Paper 2" },
      { course: "Entrepreneurship / BBA", where: "Management schools with incubators" },
      { course: "Product Development", where: "Engineering + design-adjacent electives" },
      { course: "Applied Sciences (B.Sc)", where: "Instrumentation, applied physics etc." },
    ],
  },
  Thinker: {
    color: "#3E5C86",
    tag: "Understanding",
    line: "You're drawn to the why beneath the what.",
    day: [
      "Read three papers before writing one page",
      "Sit with a question longer than feels comfortable",
      "Run an experiment just to test a hunch",
      "Notice a pattern nobody else flagged",
    ],
    paths: [
      { course: "B.Sc Pure Sciences", where: "Physics, Chemistry, Biology, Math" },
      { course: "Integrated Research (BS-MS)", where: "IISERs, central universities" },
      { course: "Mathematics / Statistics", where: "ISI, CMI, university math depts" },
      { course: "Academia track", where: "B.Sc → M.Sc → PhD pipeline" },
      { course: "Data & Analytics", where: "B.Sc/B.Tech with statistics focus" },
    ],
  },
  Helper: {
    color: "#C15B5B",
    tag: "People, first",
    line: "You're drawn to people — their wellbeing, growth, and care.",
    day: [
      "Listen fully before offering an opinion",
      "Notice when someone's struggling before they say it",
      "Explain the same thing three ways until it lands",
      "Show up consistently, even on the unremarkable days",
    ],
    paths: [
      { course: "MBBS / Healthcare", where: "NEET-based medical & allied health" },
      { course: "B.Ed / Teaching", where: "Education degrees, TET-track" },
      { course: "Psychology (B.A/B.Sc)", where: "University psychology departments" },
      { course: "Social Work (BSW)", where: "TISS and other social work schools" },
      { course: "Counseling & Human Development", where: "Applied psychology programs" },
    ],
  },
  "Problem-Solver": {
    color: "#3F7A6E",
    tag: "Untangling",
    line: "You're drawn to finding the smartest way through complexity.",
    day: [
      "Diagnose what's actually broken, not just the symptom",
      "Prioritize three fires and let the rest wait",
      "Decide under pressure with incomplete information",
      "Find the workaround nobody else tried",
    ],
    paths: [
      { course: "B.Tech CS/IT", where: "JEE/state CET, coding-heavy programs" },
      { course: "Business Analytics", where: "BBA/B.Com with analytics electives" },
      { course: "Strategy & Consulting track", where: "BBA/Economics + case-based clubs" },
      { course: "Law (BA LLB)", where: "CLAT-based integrated law programs" },
      { course: "Operations & Systems", where: "Industrial engineering, B.Tech IE" },
    ],
  },
};
