import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Documentação API 
        </h1>

        <div className={styles.description}>
          URL: <code className={styles.code}>api/ping</code>
          <br></br>
          <h4 >
            Possiveis retornos:
          </h4>
          <h5 >
            Status Code 200:
          </h5>
          1 - status: true
        </div>

      </main>
    </div>
  )
}
