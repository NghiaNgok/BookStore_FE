/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IApi {
  operationName: string;
  query: string;
  variables: any; // default type Record<string, unknown> if not provided
}
