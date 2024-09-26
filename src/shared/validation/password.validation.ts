import { RuleObject } from "antd/es/form";

export const validateMinLength = (_: RuleObject, value: string) => {
  if (value && value.length >= 6) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Password must be at least 6 characters."));
};
