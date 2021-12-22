import React from 'react';
import Header from 'components/header';
import { AssetCard } from 'components/NFTAssetCard';
import { Link } from 'react-router-dom';
import { HomePageArtistsSection } from './HomePageArtistsSection';
import { HomePageRecentlyListSection } from './HomePageRecentlyListSection';
import { HomePageTopArtworksSection } from './HomePageTopArtworksSection';
import { HomePageCommunitySection } from './HomePageCommunitySection';
import { HomePageStartOwnCollectionSection } from './HomePageStartOwnCollectionSection';
import { Footer } from 'components/Footer';

export function HomePage() {
  return (
    <div className="overflow-hidden">
      <Header />
      
      <div className="hero__3">
        <div className="container">
          <div className="row align-items-center mb-50 md:space-y-20">
            <div className="col-lg-6">
              <h1 className="hero__title">
                <span className="color_brand">Discover</span> rare digital art
                and collect NFTs
              </h1>
            </div>
            <div className="col-lg-6">
              <p className="hero__text color_black">
                raroin is a shared liquidity NFT market smart contract which is
                used by multiple websites to provide the users the best possible
                experience.
              </p>
            </div>
          </div>
          <div className="wrapper">
            <div className="row">
              <div className="col-lg-4">
                <AssetCard preset="two" item={{}} />
              </div>
              <div className="col-lg-4">
                <AssetCard preset="two" item={{}} />
              </div>
              <div className="col-lg-4">
                <AssetCard preset="five" item={{}} />
                <AssetCard preset="five" item={{}} />
                <div className="d-flex justify-content-center mb-30">
                  <Link to="/explore" className="btn btn-md btn-dark">
                    View all
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomePageArtistsSection />
      <HomePageRecentlyListSection />
      <HomePageTopArtworksSection />

      <HomePageStartOwnCollectionSection />
      <HomePageCommunitySection />
      <Footer />
    </div>
  );
}
