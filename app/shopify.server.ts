import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";
import { BillingInterval } from "@shopify/shopify-api";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.January25,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  future: {
    unstable_newEmbeddedAuthStrategy: true,
    removeRest: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export const BASIC_PLAN = {
  amount: 5.0,
  currencyCode: "USD",
  interval: BillingInterval.Every30Days,
  usageTerms: "Basic features included",
  trialDays: 7,
  name: "Basic Plan",
};

export const PRO_PLAN = {
  amount: 15.0,
  currencyCode: "USD",
  interval: BillingInterval.Every30Days,
  usageTerms: "Pro features included",
  trialDays: 7,
  name: "Pro Plan",
};

export const ENTERPRISE_PLAN = {
  amount: 50.0,
  currencyCode: "USD",
  interval: BillingInterval.Every30Days,
  usageTerms: "Enterprise features included",
  trialDays: 14,
  name: "Enterprise Plan",
};

export const PLANS = {
  basic: BASIC_PLAN,
  pro: PRO_PLAN,
  enterprise: ENTERPRISE_PLAN,
};

export default shopify;
export const apiVersion = ApiVersion.January25;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
