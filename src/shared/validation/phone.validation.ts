/* eslint-disable @typescript-eslint/no-explicit-any */
export const validatePhoneNumber = (_: any, value: string) => {
    const phoneNumberPattern = /^\d{10,11}$/;
    if (value && phoneNumberPattern.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid phone number'));
  };