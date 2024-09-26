

export const getAllAuthorQuery = () => {
  return {
    operationName: "FindAllAuthors",
    query: `query FindAllAuthors {
        findAllAuthors {
            id
            name
        }
    }    
    `,
    variables: {},
  };
};
