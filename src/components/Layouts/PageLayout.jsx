import React from 'react';
import { Footer } from 'components/Footer';
import Header from 'components/header';

export function PageLayout(props) {
  const { children, cover } = props;
  return (
    <div className="overflow-hidden">
      <Header />
      {cover}
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
}
