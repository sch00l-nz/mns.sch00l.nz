import React from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import NewsletterIndex from "@site/src/components/NewsletterIndex";
import NewsletterShow from "@site/src/components/NewsletterShow";

const newsletters = [
  {
    id: "QaY8g7T",
    title: "May Newsletter 2025",
    year: 2025,
    month: "May",
    term: 2,
    syndicate: null
  },
  {
    id: "Won0dtG",
    title: "Rimu Newsletter Term 2 2025",
    year: 2025,
    term: 2,
    syndicate: "Rimu"
  },
  {
    id: "zU7DGlI",
    title: "Kōwhai Term 2 Newsletter 2025",
    year: 2025,
    term: 2,
    syndicate: "Kōwhai"
  },
  {
    id: "Lt7euHu",
    title: "Pōhutukawa Newsletter Term 2 2025",
    year: 2025,
    term: 2,
    syndicate: "Pōhutukawa"
  }
];

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
        ? <NewsletterShow newsletters={newsletters} id={id} />
        : <NewsletterIndex newsletters={newsletters} />
      }
    </Layout>
  );
}
