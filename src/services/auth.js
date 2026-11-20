import { axios, apiErrorMessage } from "./axios";

async function call(request, fallback) {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    throw new Error(apiErrorMessage(error, fallback));
  }
}

export function login(email, password) {
  const body = new URLSearchParams({ username: email, password });
  return call(() => axios.post("/auth/token", body), "Could not sign in");
}

export function signup(email, password, fullname) {
  return call(
    () => axios.post("/auth/users/", { email, password, full_name: fullname }),
    "Could not create account"
  );
}

// `params` URL-encodes values; string interpolation let an email like
// "a@b.com&x=y" inject extra query parameters.
export function requestPasswordReset(email) {
  return call(
    () => axios.post("/auth/request_password_reset/", null, { params: { email } }),
    "Could not send reset link"
  );
}

// NOTE: the backend takes the new password as a query parameter, which ends up
// in server/proxy access logs. Move it to the request body on the API side,
// then send `{ token, new_password }` as JSON here.
export function resetPassword(password, token) {
  return call(
    () =>
      axios.post("/auth/reset_password/", null, {
        params: { token, new_password: password },
      }),
    "Could not reset password"
  );
}

export function confirmEmail(token) {
  return call(
    () => axios.post("/auth/confirm_email/", null, { params: { token } }),
    "Could not verify email"
  );
}
