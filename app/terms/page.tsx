import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service — Taffy",
};

// Terms of Service. Drafted from the codebase-verified spec in the Transorter
// repo (docs/launch-setup.md §C1). Owned by the "Real legal + App Store URLs"
// roadmap task. NOTE: the "no paid products" / no-payments clauses must be
// revisited when the subscription wiring lands — see docs/plans/2026-06-13-payments.md §3.
export default function Terms() {
  return (
    <LegalLayout title="Terms of Service" updated="June 18, 2026">
      <p className="lead">
        These Terms of Service (&ldquo;Terms&rdquo;) are an agreement between you
        and <strong>Terris Zhu</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;) governing your use of <strong>Taffy</strong> (the
        &ldquo;app&rdquo; or &ldquo;Services&rdquo;). By downloading, accessing,
        or using Taffy, you agree to these Terms. If you do not agree, do not use
        the Services.
      </p>

      <h2>1. The service</h2>
      <p>
        Taffy is a personal-finance mobile app that securely connects to your
        bank through Plaid and helps you categorize your transactions into
        spending buckets. Taffy does not move, hold, or transfer money, and it
        does not provide financial, investment, tax, or legal advice.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old (or the age of majority in your
        jurisdiction) to use Taffy. By using the Services, you represent that you
        meet this requirement.
      </p>

      <h2>3. Your account</h2>
      <p>
        You can create an account using your email address or Sign in with Apple.
        You are responsible for keeping your account credentials secure and for
        all activity under your account. Notify us promptly at{" "}
        <a href="mailto:support@taffybuckets.com">support@taffybuckets.com</a> if
        you suspect unauthorized use.
      </p>

      <h2>4. Connecting your bank</h2>
      <p>
        Taffy uses <strong>Plaid Inc.</strong> to connect to your financial
        institutions. When you link an account, you enter your bank credentials
        directly with your bank through Plaid — we never receive or store those
        credentials. Your use of Plaid is also governed by Plaid&rsquo;s{" "}
        <a
          href="https://plaid.com/legal/#end-user-privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          end-user privacy policy
        </a>
        . You authorize us to access and refresh your account and transaction
        data through Plaid in order to provide the Services.
      </p>

      <h2>5. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Services for any unlawful or fraudulent purpose;</li>
        <li>
          Access another person&rsquo;s account or data without authorization;
        </li>
        <li>
          Reverse-engineer, decompile, interfere with, or attempt to gain
          unauthorized access to the Services or their underlying systems; or
        </li>
        <li>
          Use the Services in any way that could damage, disable, or impair them.
        </li>
      </ul>

      <h2>6. Fees</h2>
      <p>
        Taffy is currently free to use and contains no in-app purchases. We may
        introduce paid features or subscriptions in the future; if we do, we will
        update these Terms and make the pricing and billing terms clear before
        you are charged.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        The Services, including their design, software, and content (excluding
        your data), are owned by us and protected by intellectual-property laws.
        We grant you a limited, non-exclusive, non-transferable, revocable
        license to use the app for its intended purpose. The data you create and
        the financial data associated with your account remain yours.
      </p>

      <h2>8. Third-party services</h2>
      <p>
        Taffy relies on third-party services to function, and your use of the app
        is also subject to their terms — including <strong>Plaid</strong> (bank
        connectivity) and <strong>Apple</strong> (App Store distribution, Sign in
        with Apple, and push notifications). Your download and use of the app is
        also subject to the{" "}
        <a
          href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apple Licensed Application End User License Agreement
        </a>
        .
      </p>

      <h2>9. Disclaimers</h2>
      <p>
        The Services are provided <strong>&ldquo;as is&rdquo;</strong> and{" "}
        <strong>&ldquo;as available&rdquo;</strong> without warranties of any
        kind, whether express or implied. Taffy is{" "}
        <strong>not financial advice</strong>. Transaction and account
        information is sourced from your bank through Plaid, and we do not
        guarantee its accuracy, completeness, or timeliness. You are responsible
        for verifying your financial information with your bank.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, we will not be liable for any
        indirect, incidental, special, consequential, or punitive damages, or any
        loss of data, profits, or revenue, arising out of or related to your use
        of the Services. Nothing in these Terms limits liability that cannot be
        limited under applicable law.
      </p>

      <h2>11. Indemnification</h2>
      <p>
        You agree to indemnify and hold us harmless from any claims, damages, or
        expenses arising out of your misuse of the Services or your violation of
        these Terms.
      </p>

      <h2>12. Termination</h2>
      <p>
        You may stop using the Services at any time and can delete your account
        and all associated data from <strong>Settings → Delete Account</strong>,
        which also revokes our access to your bank data through Plaid. We may
        suspend or terminate your access if you violate these Terms or use the
        Services in a way that could cause harm.
      </p>

      <h2>13. Governing law</h2>
      <p>
        These Terms are governed by the laws of the Province of Ontario and the
        federal laws of Canada applicable therein, without regard to conflict-of-law
        principles.
      </p>

      <h2>14. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. The updated version will be
        indicated by a revised &ldquo;Last updated&rdquo; date at the top of this
        page. For material changes, we may notify you in the app or by email. Your
        continued use of the Services after changes take effect constitutes
        acceptance of the revised Terms.
      </p>

      <h2>15. Contact</h2>
      <p>
        Questions about these Terms? Email us at{" "}
        <a href="mailto:support@taffybuckets.com">support@taffybuckets.com</a>.
      </p>
    </LegalLayout>
  );
}
