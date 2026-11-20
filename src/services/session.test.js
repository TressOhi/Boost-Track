import { afterEach, describe, expect, it } from "vitest";
import { clearToken, getSession, homePathFor, setToken } from "./session";

const b64 = (obj) =>
  btoa(JSON.stringify(obj)).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
const makeToken = (claims) => `${b64({ alg: "HS256" })}.${b64(claims)}.sig`;
const inOneHour = () => Math.floor(Date.now() / 1000) + 3600;

afterEach(() => clearToken());

describe("getSession", () => {
  it("returns null with no token", () => {
    expect(getSession()).toBeNull();
  });

  it("decodes a valid token and detects admins", () => {
    setToken(makeToken({ user: "admin", exp: inOneHour() }));
    expect(getSession()).toMatchObject({ isAdmin: true });
  });

  it("clears a malformed token instead of crashing", () => {
    setToken("not-a-jwt");
    expect(getSession()).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
  });

  it("clears an expired token", () => {
    setToken(makeToken({ user: "x", exp: Math.floor(Date.now() / 1000) - 10 }));
    expect(getSession()).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
  });
});

describe("homePathFor", () => {
  it("routes admins to /admin and others to /dashboard", () => {
    expect(homePathFor({ isAdmin: true })).toBe("/admin");
    expect(homePathFor({ isAdmin: false })).toBe("/dashboard");
  });
});
