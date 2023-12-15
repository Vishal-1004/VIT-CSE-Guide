import { commonrequest } from "./ApiCall";
import { BACKEND_URL } from "./Helper";

export const registerfunction = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/register`, data);
};

export const sentOtpFunction = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/sendotp`, data);
};

export const userVerify = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/login`, data);
};

export const userData = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/data`, data);
};

export const sendMsg = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/sendmsg`, data);
};

export const getMsg = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/allmsg`, data);
};

export const getTestimonials = async (data) => {
  return await commonrequest(
    "POST",
    `${BACKEND_URL}/user/alltestimonial`,
    data
  );
};

export const deleteMsg = async (data) => {
  return await commonrequest("DELETE", `${BACKEND_URL}/user/deletemsg`, data);
};

export const deleteTestimonial = async (data) => {
  return await commonrequest(
    "DELETE",
    `${BACKEND_URL}/user/deletetestimonial`,
    data
  );
};

export const uploadTestimonial = async (data) => {
  return await commonrequest(
    "POST",
    `${BACKEND_URL}/user/uploadtestimonial`,
    data
  );
};

export const getPaginateUsers = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/alluserdata`, data);
};

export const deleteOneUser = async (data) => {
  return await commonrequest("DELETE", `${BACKEND_URL}/user/delete`, data);
};

export const addSubject = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/subject`, data);
};

export const addStudyMaterial = async (data) => {
  return await commonrequest(
    "POST",
    `${BACKEND_URL}/user/subject/studymaterial`,
    data
  );
};