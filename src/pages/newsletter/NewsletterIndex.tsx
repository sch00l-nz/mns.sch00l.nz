import React from 'react';
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";

import newsletters from "./newsletter.data.js";
import styles from "./newsletter.module.css";

interface NewsletterIndexProps {}

export default function NewsletterIndex({}: NewsletterIndexProps): JSX.Element {
  return (
    <div className={styles.container}>
      <header>
        <Heading as="h1" className="hero__title">
          Newsletter
        </Heading>
      </header>

      <main>
        <div className={styles.newsletterOptions}>
          {newsletters.map(newsletter => (
            <Link
              className="button button--secondary button--lg"
              to={`/newsletter?id=${newsletter.id}`}
              key={newsletter.id}
            >
              {newsletter.title}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
