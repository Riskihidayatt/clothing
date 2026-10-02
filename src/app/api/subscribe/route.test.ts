import { describe, expect, it } from "vitest";
import { POST } from "./route";

const post = (body: unknown, contentType = "application/json") =>
  POST(
    new Request("http://localhost/api/subscribe", {
      method: "POST",
      headers: { "content-type": contentType },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );

describe("POST /api/subscribe", () => {
  it("returns 201 for a valid email", async () => {
    const res = await post({ email: "raka@mail.com" });
    expect(res.status).toBe(201);
    expect(await res.json()).toMatchObject({ ok: true });
  });

  it("returns 400 with a message for an invalid email", async () => {
    const res = await post({ email: "nope" });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(data.error).toEqual(expect.any(String));
  });

  it("returns 400 for malformed JSON", async () => {
    const res = await post("{bad json");
    expect(res.status).toBe(400);
  });

  it("returns 415 for non-JSON content type", async () => {
    const res = await post("email=raka@mail.com", "application/x-www-form-urlencoded");
    expect(res.status).toBe(415);
  });

  it("silently accepts honeypot submissions without validating", async () => {
    const res = await post({ email: "garbage", company: "Spam Inc" });
    expect(res.status).toBe(201);
  });
});
