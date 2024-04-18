import { axios } from "./axios";

export async function login(email, password) {
  try {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const response = await axios.post("/auth/token", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail);
  }
}

export async function signup(email, password, fullname) {
  try {
    const response = await axios.post("/auth/users/", {
      email,
      password,
      full_name: fullname,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail);
  }
}

export async function requestPasswordReset(email) {
  try {
    const response = await axios.post(
      `/auth/request_password_reset/?email=${email}`
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail);
  }
}

export async function resetPassword(password, token) {
  try {
    const response = await axios.post(
      `/auth/reset_password/?token=${token}&new_password=${password}`
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail);
  }
}

export async function confirmEmail(token) {
  try {
    const response = await axios.post(`/auth/confirm_email/?token=${token}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail);
  }
}
