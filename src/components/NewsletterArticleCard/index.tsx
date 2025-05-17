import styles from './styles.module.css';

type Article = {
  id: string;
  title: string;
  body: string;
};

export default function NewsletterArticleCard ({ article }: any): JSX.Element {
  const {
    id,
    hero_image,
    title,
    lead,
    body,
  } = article

  return (
    <section id={id} className={styles.articleCard}>
      {/*
      <div
        className="heroImage"
        style={{
          backgroundImage: `url(${hero_image.file_original_url})`,
          backgroundSize: 'cover',
          height: 200
        }}
      />
      */}
      <img className={styles.heroImage} src={hero_image.file_original_url} />

      <h2>{title}</h2>

      <div className={styles.lead}
        dangerouslySetInnerHTML={{__html: lead }}
      />

      <div dangerouslySetInnerHTML={{__html: body }} />
    </section>
  );
}
