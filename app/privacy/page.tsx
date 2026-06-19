import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Taffy",
};

// Privacy Policy. Drafted from the codebase-verified data-practices spec in the
// Transorter repo (docs/launch-setup.md §C1), structured after a Termly export.
// Owned by the "Real legal + App Store URLs" roadmap task.
export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="June 18, 2026">
      <p className="lead">
        This Privacy Policy describes how <strong>Terris Zhu</strong> (&ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;) accesses, collects, stores, uses,
        and shares your personal information when you use <strong>Taffy</strong>{" "}
        (the &ldquo;Services&rdquo;) — including when you download and use our
        mobile app (<em>Taffy: Spending</em>), create an account, connect a bank,
        or contact us.
      </p>
      <p>
        Taffy is a personal-finance mobile app that securely connects to your
        bank through Plaid and helps you categorize your transactions into
        spending buckets. It does not move money or give financial advice.
      </p>
      <p>
        If you have questions or concerns, contact us at{" "}
        <a href="mailto:support@taffybuckets.com">support@taffybuckets.com</a>.
        If you do not agree with this policy, please do not use the Services.
      </p>

      <h2>1. What information we collect</h2>

      <h3>Information you provide directly</h3>
      <ul>
        <li>
          <strong>Email address</strong> — when you sign up with email.
        </li>
        <li>
          <strong>Password</strong> — when you create an email account. Your
          password is handled and hashed by our authentication provider
          (Supabase) and is{" "}
          <strong>never stored in plaintext or accessible to us</strong>.
        </li>
        <li>
          <strong>Apple ID information</strong> — if you use Sign in with Apple,
          we receive the email address Apple provides, which may be a private{" "}
          <em>@privaterelay.appleid.com</em> relay address.
        </li>
        <li>
          <strong>Things you create in the app</strong> — the spending
          categories you make and the auto-tag rules learned from how you sort.
        </li>
      </ul>

      <h3>Financial information we receive through Plaid</h3>
      <p>
        When you connect a bank account, we receive the following from{" "}
        <strong>Plaid</strong>, our bank-data provider:
      </p>
      <ul>
        <li>Bank and account names</li>
        <li>Account mask (the last four digits of the account)</li>
        <li>Account balances</li>
        <li>Transaction details — amount, date, and merchant</li>
      </ul>
      <p>
        <strong>
          Your bank login credentials are never collected by us and never touch
          our servers.
        </strong>{" "}
        You enter them directly with your bank through Plaid&rsquo;s secure flow.
      </p>

      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Push notification token</strong> — an Apple Push Notification
          (APNs) device token, used only to notify you about new transactions.
          You can turn notifications off in your device settings at any time.
        </li>
      </ul>

      <h2>2. How we use your information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Create and manage your account and authenticate you;</li>
        <li>
          Provide the Services — connect your bank, categorize transactions, and
          sync your data across your devices;
        </li>
        <li>
          Send administrative information, such as transaction notifications and
          changes to our terms;
        </li>
        <li>Respond to your inquiries and provide support;</li>
        <li>Request feedback;</li>
        <li>Protect the Services, including fraud monitoring and prevention;</li>
        <li>Evaluate and improve the Services and your experience; and</li>
        <li>Comply with our legal obligations.</li>
      </ul>
      <p>
        We do <strong>not</strong> use your information for third-party
        advertising, and we do <strong>not</strong> use third-party analytics,
        advertising, or cross-app tracking SDKs.
      </p>

      <h2>3. Legal bases for processing (Canada / PIPEDA)</h2>
      <p>
        We are based in Canada and process personal information in accordance
        with the Personal Information Protection and Electronic Documents Act
        (PIPEDA). We process your information only when we have a valid legal
        reason to do so — primarily with your consent, to provide the Services
        you have requested, to comply with law, or for our legitimate business
        interests such as security and service improvement. You can withdraw
        your consent at any time by contacting us.
      </p>

      <h2>4. When and with whom we share your information</h2>
      <p>
        <strong>We do not sell or rent your personal information.</strong> We
        share it only with the service providers (sub-processors) we use to
        operate Taffy, and only as needed to provide the Services:
      </p>
      <ul>
        <li>
          <strong>Plaid Inc.</strong> — connects your bank accounts and provides
          account and transaction data. See{" "}
          <a
            href="https://plaid.com/legal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            plaid.com/legal
          </a>
          .
        </li>
        <li>
          <strong>Supabase</strong> — provides our database, authentication, and
          hosting (running on Amazon Web Services). See{" "}
          <a
            href="https://supabase.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            supabase.com/privacy
          </a>
          .
        </li>
        <li>
          <strong>Apple</strong> — provides Sign in with Apple, push
          notifications (APNs), and App Store distribution. See{" "}
          <a
            href="https://www.apple.com/legal/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            apple.com/legal/privacy
          </a>
          .
        </li>
      </ul>
      <p>
        We may also share information in connection with a business transfer
        (such as a merger, acquisition, or sale of assets), or where required by
        law.
      </p>

      <h2>5. How long we keep your information</h2>
      <p>
        We keep your personal information for as long as you have an account with
        us. When you delete your account, we revoke our access to your bank data
        through Plaid and permanently delete your data — accounts, transactions,
        categories, rules, and device tokens — from our active databases, except
        where we are required to retain limited information by law.
      </p>

      <h2>6. How we keep your information safe</h2>
      <ul>
        <li>Plaid access tokens are encrypted at rest.</li>
        <li>
          Your data is isolated on a per-user basis using PostgreSQL Row-Level
          Security, so one user can never access another&rsquo;s data.
        </li>
        <li>Data is encrypted in transit using TLS.</li>
      </ul>
      <p>
        No method of transmission or storage is 100% secure, so while we work
        hard to protect your information, we cannot guarantee absolute security.
      </p>

      <h2>7. Children</h2>
      <p>
        Taffy is not directed at children. We do not knowingly collect
        information from anyone under 18 years of age (or the equivalent age of
        majority in your jurisdiction). If you believe a minor has provided us
        information, contact us at{" "}
        <a href="mailto:support@taffybuckets.com">support@taffybuckets.com</a>{" "}
        and we will delete it.
      </p>

      <h2>8. Your privacy rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct,
        delete, or restrict the processing of your personal information, to data
        portability, and to withdraw consent. You can review or update your
        account information in the app, and you can delete your account and all
        its data at any time from{" "}
        <strong>Settings → Delete Account</strong>. To exercise any other right,
        contact us at{" "}
        <a href="mailto:support@taffybuckets.com">support@taffybuckets.com</a>.
      </p>

      <h2>9. Controls for Do-Not-Track features</h2>
      <p>
        Most browsers and some mobile operating systems offer a Do-Not-Track
        (&ldquo;DNT&rdquo;) setting. There is no finalized industry standard for
        responding to DNT signals, so we do not currently respond to them. If a
        standard is adopted, we will update this policy.
      </p>

      <h2>10. Updates to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The updated version
        will be indicated by a revised &ldquo;Last updated&rdquo; date at the top
        of this page. For material changes, we may notify you in the app or by
        email.
      </p>

      <h2>11. How to contact us</h2>
      <p>
        If you have questions or comments about this policy, email us at{" "}
        <a href="mailto:support@taffybuckets.com">support@taffybuckets.com</a>.
      </p>
    </LegalLayout>
  );
}
