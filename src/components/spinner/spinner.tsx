import styles from './spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.loader} />
    </div>
  );
};

export default Spinner;
