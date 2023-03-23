// import { VscMarkdown } from "react-icons/vsc";
import {
  SiCss3,
  SiPython,
  SiHtml5,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
} from "react-icons/si";

export const pages = [
  { index: 0, name: "overview.md", route: "/overview", icon: SiNextdotjs },
  { index: 1, name: "skills.jsx", route: "/skills", icon: SiReact },
  { index: 2, name: "experience.js", route: "/experience", icon: SiJavascript },
  { index: 3, name: "education.ts", route: "/education", icon: SiTypescript },
  { index: 4, name: "projects.py", route: "/projects", icon: SiPython },
  {
    index: 5,
    name: "certificates.html",
    route: "/certificates",
    icon: SiHtml5,
  },
  { index: 6, name: "awards.css", route: "/awards", icon: SiCss3 },
  // { index: 7, name: "resume.pdf", route: "/Dylan_Kotzer.pdf" },
];
