import joi from "joi";

export const email = joi
  .string()
  .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
  .required();

export const password = joi.string().min(6).required();
export const url = joi.string().required();
export const notes = joi.string().required();
export const name = joi.string().required();
