import React from 'react';
import cx from 'clsx';
import Icons from 'bootstrap-icons/bootstrap-icons.svg';

const Icon = ({ className, iconName, height = '1rem', width = '1rem', ...restProps }) => (
  <svg
    className={cx('bi', `bi-${iconName}`, className)}
    width={width}
    height={height}
    fill="currentColor"
    {...restProps}
  >
    <use xlinkHref={`${Icons}#${iconName}`} />
  </svg>
);

export { Icon };
