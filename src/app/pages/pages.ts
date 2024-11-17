// import { VscMarkdown } from "react-icons/vsc";
import {
  SiCss3,
  SiPython,
  SiHtml5,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
} from "react-icons/si"

import { FaRegFilePdf } from "react-icons/fa"

export const pages = [
  {
    index: 0,
    name: "overview.md",
    route: "/overview",
    icon: SiNextdotjs,
    type: "md",
  },
  { index: 1, name: "skills.jsx", route: "/skills", icon: SiReact, type: "md" },
  {
    index: 2,
    name: "experience.js",
    route: "/experience",
    icon: SiJavascript,
    type: "md",
  },
  {
    index: 3,
    name: "education.ts",
    route: "/education",
    icon: SiTypescript,
    type: "md",
  },
  {
    index: 4,
    name: "projects.py",
    route: "/projects",
    icon: SiPython,
    type: "md",
  },
  {
    index: 5,
    name: "calendly.html",
    route: "/calendly",
    icon: SiHtml5,
    type: "calendly",
  },
  // {
  //   index: 6,
  //   name: "resume.pdf",
  //   route: "/resume",
  //   icon: FaRegFilePdf,
  //   type: "resume",
  // },
]
