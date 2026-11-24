import { portfolio, portfolioCategories } from "./portfolio";

// Influencer gallery. Starts as a copy of the portfolio so the page is
// ready to view — swap these for influencer photos as they come in.
export const influencers = portfolio.map((item) => ({ ...item }));
export const influencerCategories = portfolioCategories;
