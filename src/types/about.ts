export type TAboutData = {
  title: string;
  description: string;
  list: {
    title: string;
    list: string[];
  }[];
  about: {
    title:string;
    first_description: string;
    second_description: string;
  };
};
