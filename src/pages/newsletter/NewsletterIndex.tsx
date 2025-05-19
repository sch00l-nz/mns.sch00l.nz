import React from 'react';
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";

import newsletters from "./newsletter.data.js";
import styles from "./newsletter.module.css";

interface Newsletter {
  id: string;
  title: string;
  year: number;
  month: string; // Retaining month as it's in the data, though not used for grouping
  term: number;
  syndicate: string | null;
}

interface GroupedNewsletters {
  [year: string]: {
    [term: string]: Newsletter[];
  };
}

interface NewsletterIndexProps {}

export default function NewsletterIndex({}: NewsletterIndexProps): JSX.Element {
  const groupedNewsletters = newsletters.reduce((acc: GroupedNewsletters, newsletter: Newsletter) => {
    const { year, term } = newsletter;
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][term]) {
      acc[year][term] = [];
    }
    acc[year][term].push(newsletter);
    // Newsletters within each term will appear in the order they are in the data file.
    // If specific sorting is needed (e.g., by title or syndicate), it can be added here.
    // For example, to sort by title:
    // acc[year][term].sort((a, b) => a.title.localeCompare(b.title));
    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(groupedNewsletters).sort((a, b) => Number(b) - Number(a));

  return (
    <div className={styles.container}>
      <header>
        <Heading as="h1" className="hero__title">
          Newsletter
        </Heading>
      </header>

      <main>
        {sortedYears.map(year => (
          <div key={year} className={styles.yearGroup}>
            <Heading as="h2">{year}</Heading>
            {Object.keys(groupedNewsletters[year])
              .sort((a, b) => Number(b) - Number(a)) // Sort terms in descending order
              .map(term => (
                <div key={term} className={styles.termGroup}>
                  <Heading as="h3">Term {term}</Heading>
                  <div className={styles.newsletterOptions}>
                    {groupedNewsletters[year][term].map(newsletter => (
                      <Link
                        className="button button--secondary button--lg"
                        to={`/newsletter?id=${newsletter.id}`}
                        key={newsletter.id}
                      >
                        {newsletter.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </main>
    </div>
  );
}
