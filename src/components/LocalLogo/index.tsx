import styles from './styles.module.css';
// @ts-ignore next line
import LogoUrl from '@site/static/img/logo.webp';

export default function LocalLogo (): JSX.Element {

  return (
    <div className={styles.container}>
      <img src={LogoUrl} className={styles.logo} />
    </div>
  );
}
