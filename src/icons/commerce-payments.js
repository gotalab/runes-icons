import { c, l, p, rect } from "./primitives.js";

const icon = (name, slug, loreName, cue, nodes) => ({ name, slug, groupId: "commerce-payments", loreName, cue, nodes });

export const icons = [
  icon("Shopping Cart", "shopping-cart", "Provision Cart", "familiar wheeled basket with one continuous purchase rail", [p("M3 4h2l2 11h11l2-7H7"), c(9, 19, 1), c(17, 19, 1)]),
  icon("Credit Card", "credit-card", "Payment Plate", "bounded payment card with one magnetic rail and account line", [rect(3, 6, 18, 12, 2), l(3, 10, 21, 10), l(6, 15, 10, 15)]),
  icon("Wallet", "wallet", "Coin Purse", "practical wallet body with one inset rounded clasp pocket", [rect(3, 6, 18, 13, 2), p("M11.5 10H17v5h-5.5a2.5 2.5 0 0 1 0-5Z"), c(14.5, 12.5, 0.5)]),
  icon("Receipt", "receipt", "Trade Record", "transaction record with simple rows and one alternating paper edge", [p("M5 3h14v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5Z"), l(8, 8, 16, 8), l(8, 12, 16, 12), l(8, 16, 13, 16)]),
];
