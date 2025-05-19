import React, { useState, useEffect } from 'react';
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import NewsletterArticleCard from "@site/src/components/NewsletterArticleCard";

import newsletters from "./newsletter.data.js";
import newsletterData from '../../data/articles/WonOdtG'; // For dev
import styles from "./newsletter.module.css";

const MONTH_NAMES_ORDERED = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function formatBodyIfDateList(body: string): string | null {
  const lines = body.split('\n\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  if (lines.length === 0) {
    return null;
  }

  const dateEvents = []
  const otherLines = []
  const linePattern = new RegExp(
    '^<p>' +
    `\\s*((?:Mon|Tues|Wed(?:nes)?|Thu(?:rs)?|Fri|Sat(?:ur)?|Sun)(?:day)?\\s+)?` + // Optional day of week
    `(\\d{1,2})(st|nd|rd|th)?\\s+` + // Date (e.g., 28th)
    `(January|February|March|April|May|June|July|August|September|October|November|December)` + // Month (captured)
    `(?::)?\\s*(.*)` + // Optional colon, then the rest of the event description
    '<\/p>$',
    'i' // Case-insensitive
  );

  for (const line of lines) {
    const match = line.match(linePattern);
    if (match === null) {
      otherLines.push(line)
    }
    else {
      // match[2] is date number, match[4] is month, match[5] is event description
      dateEvents.push({
        month: match[4],
        // text: line
        text: `<span class="date">${match[2]}${match[3]}</span> <span class="day">${match[1]}</span> : ${match[5]}`
      });
    }
  }

  const groupedByMonth: { [month: string]: string[] } = {};
  const uniqueMonthsInOrder = [...new Set(dateEvents.map(de => de.month))];

  uniqueMonthsInOrder.sort((a, b) => {
    const indexA = MONTH_NAMES_ORDERED.findIndex(m => new RegExp(`^${m}$`, 'i').test(a));
    const indexB = MONTH_NAMES_ORDERED.findIndex(m => new RegExp(`^${m}$`, 'i').test(b));
    return indexA - indexB;
  });
  
  for (const month of uniqueMonthsInOrder) {
    // Ensure the key in groupedByMonth uses the canonical casing from MONTH_NAMES_ORDERED if possible,
    // or at least consistent casing from uniqueMonthsInOrder.
    const canonicalMonth = MONTH_NAMES_ORDERED.find(m => new RegExp(`^${month}$`, 'i').test(m)) || month;
    groupedByMonth[canonicalMonth] = [];
  }

  for (const de of dateEvents) {
    const canonicalMonth = MONTH_NAMES_ORDERED.find(m => new RegExp(`^${de.month}$`, 'i').test(m)) || de.month;
    if (groupedByMonth[canonicalMonth]) {
         groupedByMonth[canonicalMonth].push(de.text);
    }
  }

  let htmlOutput = '';
  for (const month of uniqueMonthsInOrder) {
    // Retrieve using the possibly case-varied month from uniqueMonthsInOrder, then find its canonical form for lookup
    const canonicalMonthKey = MONTH_NAMES_ORDERED.find(m => new RegExp(`^${month}$`, 'i').test(m)) || month;
    if (groupedByMonth[canonicalMonthKey] && groupedByMonth[canonicalMonthKey].length > 0) {
      htmlOutput += `<h3>${canonicalMonthKey}</h3>\n`;
      htmlOutput += '<ul>\n';
      groupedByMonth[canonicalMonthKey].forEach(eventText => {
        htmlOutput += `  <li>${eventText}</li>\n`;
      });
      htmlOutput += '</ul>\n';
    }
  }

  if (dateEvents.length && otherLines.length) {
    htmlOutput += '<p>'
    otherLines.forEach(line => {
      htmlOutput += line
    })
    htmlOutput += '</p>'
  }

  return htmlOutput;
}

const isDev = false // process.env.NODE_ENV === 'development'
async function getArticles (id: string) {
  if (isDev) return Promise.resolve(newsletterData)

  return fetch(`https://hail.to/api/v1/publications/${id}/articles`)
    .then(res => res.json())
}

interface NewsletterShowProps {
  id: string;
}

export default function NewsletterShow({ id }: NewsletterShowProps): JSX.Element {
  const [title, setTitle] = useState('Loading...');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (id) {
      setTitle('Loading...');
      setArticles([]);

      getArticles(id)
        .then((json: any[]) => {
          setTitle(newsletters.find(n => n.id === id)?.title || 'Newsletter');

          const publicationArticleRegex = /https:\/\/hail\.to\/miramar-north-school\/publication\/(\w+)\/article\/(\w+)/g;
          const articleRegex = /https:\/\/hail\.to\/miramar-north-school\/article\/(\w+)/g;
          const processedArticles = json
            .map(article => {
              if (typeof article?.body !== 'string') return article;

              let newBody = article.body;

              // 1. Link replacements
              newBody = newBody
                .replace(publicationArticleRegex, (match, publicationId, articleId) => {
                  const isPublicationArticle = publicationId === id;
                  return isPublicationArticle ? `#${articleId}` : match;
                })
                .replace(articleRegex, (match, articleId) => {
                  const isPublicationArticle = json.find(art => art.id === articleId);
                  return isPublicationArticle ? `#${articleId}` : match;
                });

              // 2. Date list formatting
              const formattedDateListHtml = formatBodyIfDateList(newBody);
              if (formattedDateListHtml) {
                newBody = formattedDateListHtml;
              }

              return {
                ...article,
                body: newBody
              };
            });
          setArticles(processedArticles);
        })
        .catch(err => {
          console.log('ERROR fetching', err);
          setTitle('Error loading newsletter');
          // TODO: display some error message?
        });
    }
  }, [id]);

  return (
    // NOTE: .newsletter-app is used by a plugin
    <div className={`newsletter-app ${styles.container} ${styles.bgGrey}`}>
      <header>
        <Heading as="h1">
          {title}
        </Heading>
      </header>

      <main className={styles.newsletterView}>
        <div className={styles.publicationContainer}>
          {
            articles.map(item => (
              <NewsletterArticleCard article={item} key={item.id} />
            ))
          }
        </div>

        {
          articles.length > 0 ? (
            <div className={styles.publicationArticlesNav}>
              <Heading as="h2">
                Contents
              </Heading>

              <ul>
              {
                articles.map(item => (
                  <li key={item.id}>
                    <Link to={`#${item.id}`} >
                      {item.title}
                    </Link>
                  </li>
                ))
              }
              </ul>
            </div>
          ) : null
        }
      </main>
    </div>
  );
}
