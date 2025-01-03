import { TAboutData } from "src/types/about";

export const about_data: TAboutData = {
  title: "About My Blogging Platform",
  description:
    "Welcome to my easy-to-use Blog Management Platform! This app makes it simple to create, manage, and share blogs. With modern technology, it offers great performance, a user-friendly design, and strong security.",

  list: [
    // {
    //   title: "Key Features",
    //   list: [
    //     "Blog Creation and Management: Easily create, edit, and delete blog posts with a user-friendly interface.",
    //     "Rich Text Editing: Enhance your blogs with rich formatting tools, including bullet points, bold text, and line spacing.",
    //     "User Authentication: Secure user accounts powered by Firebase Authentication.",
    //     "Real-Time Database: Synchronize and store blog data in real-time using Firebase.",
    //     "SEO Optimization: Structured for better visibility on search engines to help your content reach a broader audience.",
    //   ],
    // },
    {
      title: "Technologies Used",
      list: ["React", "TypeScript", "Firebase", "Axios", "Tailwind CSS"],
    },
  ],
  about: {
    title: "About the Developer",
    first_description:
      "Mohammad Esmaeilpour—a passionate front-end developer with over 3 years of experience, specializing in building modern, responsive, and feature-rich web applications. My expertise spans React, Next.js, JavaScript, TypeScript, Tailwind CSS, and Material UI.",
    second_description:
      "I have successfully developed and deployed various projects, including dashboards, e-commerce platforms, and portfolio websites. My focus is on delivering high-performance, SEO-friendly, and scalable solutions tailored to meet business needs.",
  },
};
