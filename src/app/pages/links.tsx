import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import { VscFilePdf } from "react-icons/vsc";

export const links = [
  {
    index: 0,
    title: "Find me on Github",
    href: "https://github.com/DKotzer",
    icon: <FaGithub />,
  },
  {
    index: 1,
    title: "Find me on LinkedIn",
    href: "https://www.linkedin.com/in/dylan-kotzer-3a5421190/",
    icon: <FaLinkedin />,
  },
  {
    index: 2,
    title: "Contact me via email",
    href: "mailto:dylankotzer@gmail.com",
    icon: <FaEnvelope />,
  },
  {
    index: 3,
    title: "View Resume",
    href: "/Dylan_Kotzer.pdf",
    icon: <VscFilePdf />,
  },
];
