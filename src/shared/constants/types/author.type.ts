export interface IAuthor {
    id?: string;
    name?: string;
  }
  
  export interface IAuthors {
    findAllAuthors: IAuthor[];
  }
  