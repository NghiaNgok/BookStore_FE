
export const getAboutData = () => {
    return {
      operationName: "FindOneAbout",
      query: `
      query FindOneAbout {
        findOneAbout {
            content
            id
        }
    }
      `,
      variables: {},
    };
  };
  