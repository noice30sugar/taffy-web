// JSON-LD structured data for the landing page, plus the FAQ content it wraps.
//
// The FAQ lives here — not in the component — because `FAQPage` structured data
// is only legitimate when it mirrors FAQ content that is actually visible on the
// page. Both `components/Faq.tsx` and the `FAQPage` node below read from `FAQS`,
// so the two can never drift apart.
//
// Every claim here is sourced from shipped product truth:
//   - pricing / free tier ....... marketing/app-store/description.txt (transorter)
//   - 30-day Taffy+ trial ....... EntitlementService.swift (transorter)
//   - CA + US bank support ...... create-link-token/_lib.ts `normalizeCountry`
//   - tap (not swipe) mechanic .. components/Features.tsx, the app's core loop
//
// Deliberately omitted: `aggregateRating` (Taffy has no ratings yet — a
// placeholder rating violates Google's structured-data policy) and
// `fileSize`/`storageRequirements` (unverified). Omit a field rather than
// assert a value you cannot source.

export const SITE_URL = "https://taffybuckets.com";
export const APP_STORE_URL = "https://apps.apple.com/app/id6781802776";

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "Is Taffy a budgeting app?",
    answer:
      "No. Taffy is a spending tracker, not a budgeting app. There are no budgets to set, no envelopes to fund, no savings goals, and no monthly reset ritual. You sort transactions that have already happened into buckets, and Taffy shows you where your money actually went.",
  },
  {
    question: "How does Taffy connect to my bank securely?",
    answer:
      "Taffy connects through Plaid, the same bank-linking service used by major finance apps. You enter your credentials with Plaid, never with Taffy — the app never sees, handles, or stores your bank username or password. The connection is read-only: Taffy can pull your transactions in, but it can never move money.",
  },
  {
    question: "Which banks and countries does Taffy support?",
    answer:
      "Taffy supports banks and credit cards across Canada and the United States through Plaid, covering the major institutions in both countries.",
  },
  {
    question: "What does Taffy cost?",
    answer:
      "Taffy is free to download and free to use with one bank connected — the whole app, every feature, with no timer on the core experience. Taffy+ costs CA$6.99 per month or CA$39.99 per year and unlocks unlimited bank and card connections. New accounts start with a 30-day Taffy+ trial; when it ends you keep everything, with one connected bank.",
  },
  {
    question: "How long does it take to use?",
    answer:
      "Under a minute at a time. Each new transaction shows up as a card, and you tap a category button to bucket it. Merchants you have sorted before get tagged automatically, so the deck gets shorter the longer you use it.",
  },
  {
    question: "Is Taffy available on Android?",
    answer:
      "Not yet. Taffy is a native iPhone app and is currently available on the App Store for iOS only.",
  },
];

const softwareApplication = {
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#app`,
  name: "Taffy",
  alternateName: "Taffy: Spending Tracker",
  description:
    "Taffy is a spending tracker for iPhone. Connect your bank through Plaid, tap each transaction into a bucket, and see where your money went — without setting a budget.",
  url: SITE_URL,
  downloadUrl: APP_STORE_URL,
  installUrl: APP_STORE_URL,
  applicationCategory: "FinanceApplication",
  applicationSubCategory: "Personal Finance & Spending Tracker",
  operatingSystem: "iOS",
  softwareVersion: "1.0.1",
  countriesSupported: ["CA", "US"],
  inLanguage: "en",
  author: {
    "@type": "Person",
    name: "Terris Zhu",
  },
  screenshot: [
    `${SITE_URL}/screens/inbox-deck.png`,
    `${SITE_URL}/screens/dashboard-overview-v4.png`,
    `${SITE_URL}/screens/lifetime.png`,
    `${SITE_URL}/screens/accounts-plaid.png`,
  ],
  featureList: [
    "Sort each transaction into a bucket with a single tap",
    "Automatic tagging for merchants you have sorted before",
    "Read-only bank and credit card syncing through Plaid",
    "Spending dashboard with every category measured against last month",
    "Lifetime trends, top merchants, and detected subscriptions",
  ],
  offers: [
    {
      "@type": "Offer",
      name: "Taffy",
      description:
        "Free to download and use with one connected bank — every feature, no timer.",
      price: "0",
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      url: APP_STORE_URL,
    },
    {
      "@type": "Offer",
      name: "Taffy+ Monthly",
      description:
        "Unlocks unlimited bank and card connections, billed monthly.",
      category: "subscription",
      price: "6.99",
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      url: APP_STORE_URL,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "6.99",
        priceCurrency: "CAD",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: 1,
          unitCode: "MON",
        },
      },
    },
    {
      "@type": "Offer",
      name: "Taffy+ Annual",
      description:
        "Unlocks unlimited bank and card connections, billed yearly.",
      category: "subscription",
      price: "39.99",
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      url: APP_STORE_URL,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "39.99",
        priceCurrency: "CAD",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: 1,
          unitCode: "ANN",
        },
      },
    },
  ],
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Bank connection method",
      value: "Plaid account aggregation, read-only transaction access",
    },
    {
      "@type": "PropertyValue",
      name: "Credential handling",
      value:
        "Credentials are entered with Plaid and never seen or stored by Taffy",
    },
    {
      "@type": "PropertyValue",
      name: "Core interaction",
      value: "Tap each transaction card into a spending bucket",
    },
  ],
};

const faqPage = {
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: FAQS.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [softwareApplication, faqPage],
};

/**
 * Serialized JSON-LD, safe to hand to `dangerouslySetInnerHTML`.
 *
 * `JSON.stringify` does not escape HTML, so a `<` in any string would let the
 * payload close the surrounding `<script>` tag. Escaping it to its unicode
 * form closes that XSS vector — this is the escape Next's JSON-LD guide
 * prescribes (`node_modules/next/dist/docs/01-app/02-guides/json-ld.md`).
 */
export const structuredDataJson = JSON.stringify(structuredData).replace(
  /</g,
  "\\u003c",
);
