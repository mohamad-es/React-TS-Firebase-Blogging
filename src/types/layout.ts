export type TLayoutData = {
  header: {
    title: string;
    navbar: {
      title: string;
      link: string;
    }[];
    auth: {
      title: string;
      link: string;
    }[];
    profile_list: string[];
    write: string;
  };

  footer: {
    title: string;
    subTitle: string;
  };
};
