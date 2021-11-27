import React from 'react';
import { Footer } from 'components/Footer';
import Header from 'components/header';
import cx from 'classnames';

export function PageLayout(props) {
  const { className, containerClassName, children, cover, ...rest } = props;
  return (
    <div className={cx('overflow-hidden', className)} {...rest}>
      <Header />
      {cover}
      <div className={cx('container', containerClassName)}>{children}</div>
      <Footer />
    </div>
  );
}
