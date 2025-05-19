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
    const { year, term } = newsletter
    if (!acc[year])       acc[year] = {}
    if (!acc[year][term]) acc[year][term] = []

    acc[year][term].push(newsletter)
    return acc
  }, {})

  // Sort years in descending order
  const sortedYears = Object.keys(groupedNewsletters).sort((a, b) => Number(b) - Number(a));

  return (
    <div className={styles.container}>
      <header>
        <Heading as="h1" className="hero__title">
          Newsletters
        </Heading>
      </header>

      <main>
        {sortedYears.map(year => (
          // YEAR
          <div key={year} className={styles.yearGroup}>
            <Heading as="h2">{year}</Heading>

            {Object.keys(groupedNewsletters[year])
              .sort((a, b) => Number(b) - Number(a)) // Sort terms in descending order
              .map(term => (

                // TERM
                <div key={term} className={styles.termGroup}>
                  <Heading as="h3">Term {term}</Heading>

                  <div className={styles.newsletterOptions}>
                    {groupedNewsletters[year][term].map(newsletter => (

                      // NEWSLETTER
                      <Link
                        className="button button--secondary button--lg"
                        to={`/newsletter?id=${newsletter.id}`}
                        key={newsletter.id}
                      >
                        <span className='title'>
                          {
                            // prune the title of redundant works
                            newsletter.title
                              .replace(`Term ${term}`, '')
                              .replace(year, '')
                              .replace(newsletter.syndicate ? 'Newsletter' : '', '')

                          }
                        </span>
                        <SyndicateToYear syndicate={newsletter.syndicate} />
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

function SyndicateToYear (props: any): JSX.Element {
  if (!props.syndicate) return null

  let text = ''
  if (props.syndicate === 'Rimu')            text = 'Years 1-2'
  else if (props.syndicate === 'Kōwhai')     text = 'Years 3-4'
  else if (props.syndicate === 'Pōhutukawa') text = 'Years 5-6'

  return (
    <span className={styles.syndicateHelper}>
      {text}
    </span>
  )
}
