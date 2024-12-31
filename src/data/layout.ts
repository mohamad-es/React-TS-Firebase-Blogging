import { TLayoutData } from "src/types/layout";

export const layout_data: TLayoutData = {
  header: {
    title: "Blogging app",
    navbar: [
      {
        title: "Blogs",
        link: "/",
      },
      {
        title: "About",
        link: "/about",
      },
    ],
    auth: [
      {
        title: "Login",
        link: "/login",
      },
      {
        title: "Register",
        link: "/register",
      },
    ],
    profile_list: ["Profile", "Logout"],
    write: "Write",
  },
  footer: {
    title: "© 2024 Mohammad Esmaeilpour. All rights reserved.",
    subTitle:
      "Empowering your voice—one story at a time. 🚀 | Built with ❤️ using React, TypeScript, and Firebase.",
  },
};
