import React, { useState, useEffect } from 'react'
// import clsx from "clsx";
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";

import NewsletterArticleCard from "@site/src/components/NewsletterArticleCard";

import newsletters from "./newsletter.data.js"
import newsletterData from '../../data/articles/WonOdtG'
import styles from "./newsletter.module.css";

const isDev = false // process.env.NODE_ENV === 'development'
async function getArticles (id: string) {
  if (isDev) return Promise.resolve(newsletterData)

  return fetch(`https://hail.to/api/v1/publications/${id}/articles`)
    .then(res => res.json())
}

export default function Newsletter(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [ title, setTitle ] = useState('Loading...')
  const [ articles, setArticles ] = useState([])

  const location = useLocation()
  const id = new URLSearchParams(location.search).get("id")

  useEffect(() => {
    if (id) {
      setTitle('Loading...')
      setArticles([])

      getArticles(id)
        .then((json: any) => {
          setTitle(newsletters.find(n => n.id === id)?.title)
          setArticles(json)
        })
        .catch(err => {
          console.log('ERROR fetching', err)
          // TODO: display some error message?
        })
    }
  }, [location.pathname, location.search])

  // TODO: see if there is a way to get all the publications from API

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A community run site supporting Miramar North School"
    >

      {/* Show all Newsletter options */}
      { !id ? (
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
        ) : null
      }

      {/* Show 1 Newsletter */}
      {/* NOTE: .newsletter-app is used by a plugin */}
      { id ? (
        <div className={`newsletter-app ${styles.container} ${styles.bgGrey}`}>
          <header>
            <Heading as="h1">
              { title }
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
              articles.length ? (
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
      ) : null }
    </Layout>
  );
}
