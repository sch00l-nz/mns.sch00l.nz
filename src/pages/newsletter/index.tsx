import React from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import NewsletterIndex from "./NewsletterIndex";
import NewsletterShow from "./NewsletterShow";
// import styles from "./newsletter.module.css"; // styles are used by children

export default function NewsletterPage(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  return (
    <Layout
      title={`Newsletter - ${siteConfig.title}`}
      description="A community run site supporting Miramar North School"
    >
      {
        id
        ? <NewsletterShow id={id} />
        : <NewsletterIndex />
      }
    </Layout>
  );
}
