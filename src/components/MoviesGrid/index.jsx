import s from './styles.module.scss';

const MoviesGrid = ({ children, ...restProps }) => (
  <div className={s.grid} {...restProps}>
    {children}
  </div>
);

export { MoviesGrid };
