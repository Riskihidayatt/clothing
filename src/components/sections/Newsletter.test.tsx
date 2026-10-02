import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Newsletter } from "./Newsletter";

afterEach(() => vi.unstubAllGlobals());

describe("<Newsletter />", () => {
  it("shows a field error and does not call the API for an invalid email", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<Newsletter />);

    await userEvent.type(screen.getByLabelText(/email lo/i), "bukan-email");
    await userEvent.click(screen.getByRole("button", { name: /gabung/i }));

    expect(await screen.findByText(/format email-nya belum bener/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email lo/i)).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("submits a valid email and shows the success message", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true, message: "You're in." }), { status: 201 }),
    );
    vi.stubGlobal("fetch", fetchMock);
    render(<Newsletter />);

    await userEvent.type(screen.getByLabelText(/email lo/i), "Raka@Mail.com");
    await userEvent.click(screen.getByRole("button", { name: /gabung/i }));

    expect(await screen.findByText("You're in.")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/api/subscribe", expect.objectContaining({ method: "POST" }));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({ email: "raka@mail.com" });
    expect(screen.getByLabelText(/email lo/i)).toHaveValue("");
  });

  it("shows a generic message when the server errors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("oops", { status: 500 })));
    render(<Newsletter />);

    await userEvent.type(screen.getByLabelText(/email lo/i), "raka@mail.com");
    await userEvent.click(screen.getByRole("button", { name: /gabung/i }));

    expect(await screen.findByText(/server lagi sibuk/i)).toBeInTheDocument();
  });
});
