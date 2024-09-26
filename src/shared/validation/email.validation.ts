import { RuleObject } from "rc-field-form/lib/interface";
export const validateEmail = (_: RuleObject, value: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value && emailPattern.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Invalid email."));
};
