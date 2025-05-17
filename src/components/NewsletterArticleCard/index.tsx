import styles from './styles.module.css';

export default function NewsletterArticleCard ({ article }: any): JSX.Element {
  const {
    id,
    hero_image,
    short_gallery,
    title,
    author,
    lead,
    body,
  } = article

  const gallery = short_gallery
    .filter(item =>
      item.file_2000_url !== hero_image.file_2000_url
    )

  return (
    <section id={id} className={styles.articleCard}>
      {
        /*
        <div
          className={styles.heroImage} 
          style={{ backgroundImage: `url(${hero_image.file_original_url})` }}
        />
        */
      }
      <div className={styles.heroImage}>
        <img src={hero_image.file_original_url} />
      </div>

      { 
        gallery.length ? (
        <div className={styles.gallery}>
          {
            gallery.map(item => {
              return (
                <img src={item.file_2000_url} key={item.file_2000_url}/>
              )
            })
          }
        </div>

        ) : null
      }

      <h2>{title}</h2>
      <div className={styles.author}>{author}</div>

      { 
        lead ? (
          <div
            className={styles.lead}
            dangerouslySetInnerHTML={{__html: lead }}
          />
        ) : null
      }

      <div 
        className={styles.body}
        dangerouslySetInnerHTML={{__html: body }}
      />
    </section>
  );
}
