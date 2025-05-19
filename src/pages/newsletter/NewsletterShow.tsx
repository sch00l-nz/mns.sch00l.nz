import React, { useState, useEffect } from 'react';
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import NewsletterArticleCard from "@site/src/components/NewsletterArticleCard";

import newsletters from "./newsletter.data.js";
import newsletterData from '../../data/articles/WonOdtG'; // For dev
import styles from "./newsletter.module.css";

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
              if (typeof article?.body !== 'string') return article

              const newBody = article.body
                .replace(publicationArticleRegex, (match, publicationId, articleId) => {
                  const isPublicationArticle = publicationId === id
                  // if it's an article in same publication, swap for local link
                  return isPublicationArticle ? `#${articleId}` : match
                })
                .replace(articleRegex, (match, articleId) => {
                  const isPublicationArticle = json.find(article => article.id === articleId)
                  // if it's an article in same publication, swap for local link
                  return isPublicationArticle ? `#${articleId}` : match
                })
              return {
                ...article,
                body: newBody
              };
            })
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
