import React from 'react';
import { Footer } from 'components/Footer';
import Header from 'components/header';
import cx from 'classnames';
import { FooterEmbed } from 'components/FooterEmbed';
import { isEmbed } from 'utils';

export function PageLayout(props) {
  const { className, containerClassName, children, cover, ...rest } = props;
  return (
    <div className={cx('overflow-hidden', className)} {...rest}>
      {
        isEmbed() ?
          (
            <>
              {cover}
              <div className={cx('container', containerClassName)}>{children}</div>
              <FooterEmbed />
            </>
          ) :
          (
            <>
              <Header />
              {cover}
              <div className={cx('container', containerClassName)}>{children}</div>
              <Footer />
            </>
          )
      }
    </div>
  );
}
