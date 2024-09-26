export const getAllCategoryQuery = () => {
  return {
    operationName: "FindAllCategories",
    query: `query FindAllCategories {
            findAllCategories {
                id
                name
            }
        }      
      `,
    variables: {},
  };
};
