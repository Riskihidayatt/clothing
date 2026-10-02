import { describe, expect, it } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider, useCart } from "@/components/providers/CartProvider";
import { products } from "@/data/products";
import { FeaturedCollection } from "./FeaturedCollection";

function CartCount() {
  const { count } = useCart();
  return <output aria-label="cart count">{count}</output>;
}

function renderSection() {
  return render(
    <CartProvider>
      <CartCount />
      <FeaturedCollection />
    </CartProvider>,
  );
}

describe("<FeaturedCollection />", () => {
  it("renders every product with a Rupiah price", () => {
    renderSection();
    expect(screen.getAllByRole("article")).toHaveLength(products.length);
    expect(screen.getByText("Rp 459.000")).toBeInTheDocument();
  });

  it("filters by category", async () => {
    renderSection();
    await userEvent.click(screen.getByRole("button", { name: "Acc" }));

    const expected = products.filter((p) => p.category === "accessories").length;
    await waitFor(() => expect(screen.getAllByRole("article")).toHaveLength(expected));
    expect(screen.getByRole("button", { name: "Acc" })).toHaveAttribute("aria-pressed", "true");
  });

  it("adds available products to the cart and blocks sold-out ones", async () => {
    renderSection();
    const hoodie = screen.getByRole("heading", { name: /static heavyweight hoodie/i }).closest("article")!;
    await userEvent.click(within(hoodie).getByRole("button", { name: /tambah/i }));
    expect(screen.getByLabelText("cart count")).toHaveTextContent("1");

    const soldOut = screen.getByRole("button", { name: /night shift coach jacket sudah sold out/i });
    expect(soldOut).toBeDisabled();
  });

  it("shows front and back images for the hover swap", () => {
    renderSection();
    const card = screen.getByRole("heading", { name: /noise boxy tee/i }).closest("article")!;
    expect(within(card).getByAltText(/tampak depan/i)).toBeInTheDocument();
    expect(within(card).getByAltText(/tampak belakang/i)).toBeInTheDocument();
  });
});
