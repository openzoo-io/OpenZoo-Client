// import { DropdownButton } from 'components/DropdownButton';
import React from 'react';
import PropTypes from 'prop-types';
import {
  ArtworkDetailPageAttributesView,
  ArtworkDetailPagePropertiesView,
  ArtworkDetailPageBundleInfoTab,
  ArtworkDetailPageAboutCollectionTab,
  ArtworkDetailPageChainInfoTab,
  ArtworkDetailPageRoyaltyTab,
  ArtworkDetailPageListingsTab,
  ArtworkDetailPagePriceHistoryTab,
  ArtworkDetailPageDirectOfferTab,
} from './DetailTabContents';

const propTypes = {
  info: PropTypes.object,
  bundleID: PropTypes.string,
  history: PropTypes.array,
  listings: PropTypes.array,
  prices: PropTypes.object,
  attributesComponent: PropTypes.element,
};

export function ArtworkDetailPageDetailSection(props) {
  const {
    info,
    bundleID,
    address,
    tokenID,
    creatorInfoLoading,
    creatorInfo,
    creator,
    account,
    collection,
    explorerUrl,
    collectionRoyalty,
    data,
    tokenInfo,
    listings,
    bundleListing,
    loading,
    owner,
    ownerInfo,
    isMine,
    buyingItem,
    prices,
    handleBuyBundle,
    handleBuyItem,
    offers,
    now,
    myHolding,
    salesContractApproving,
    offerAccepting,
    isBundleContractApproved,
    handleApproveBundleSalesContract,
    salesContractApproved,
    handleApproveSalesContract,
    offerCanceling,
    tokenType,
    auction,
    offerPlacing,
    handleAcceptOffer,
    handleCancelOffer,
    setOfferModalVisible,
  } = props;

  return (
    <div className="box">
      <div className="space-y-20">
        <div className="d-flex justify-content-between mb-30_reset">
          <ul className="nav nav-tabs d-flex mb-30" role="tablist">
            <li className="nav-item mx-1.5 mb-2">
              <a
                className="btn btn-white btn-sm active"
                data-toggle="tab"
                href="#tabs-details"
                role="tab"
              >
                Details
              </a>
            </li>
            {/* <li className="nav-item mx-1.5 mb-2">
              <a
                className="btn btn-white btn-sm"
                data-toggle="tab"
                href="#tabs-price-history"
                role="tab"
              >
                Price History
              </a>
            </li>
            <li className="nav-item mx-1.5 mb-2">
              <a
                className="btn btn-white btn-sm"
                data-toggle="tab"
                href="#tabs-listings"
                role="tab"
              >
                Listing
              </a>
            </li>
            <li className="nav-item mx-1.5 mb-2">
              <a
                className="btn btn-white btn-sm"
                data-toggle="tab"
                href="#tabs-direct-offers"
                role="tab"
              >
                Direct Offers
              </a>
            </li> */}
            {info?.attributes && (
              <li className="nav-item mx-1.5 mb-2">
                <a
                  className="btn btn-white btn-sm"
                  data-toggle="tab"
                  href="#tabs-attributes"
                  role="tab"
                >
                  Attributes
                </a>
              </li>
            )}
            {info?.properties && (
              <li className="nav-item mx-1.5 mb-2">
                <a
                  className="btn btn-white btn-sm"
                  data-toggle="tab"
                  href="#tabs-properties"
                  role="tab"
                >
                  Properties
                </a>
              </li>
            )}
            {bundleID && (
              <li className="nav-item mx-1.5 mb-2">
                <a
                  className="btn btn-white btn-sm"
                  data-toggle="tab"
                  href="#tabs-bundleInfo"
                  role="tab"
                >
                  Bundle Description
                </a>
              </li>
            )}
            {!bundleID && collection && (
              <li className="nav-item mx-1.5 mb-2">
                <a
                  className="btn btn-white btn-sm"
                  data-toggle="tab"
                  href="#tabs-collection-detail"
                  role="tab"
                >
                  About {collection?.collectionName || collection?.name}
                </a>
              </li>
            )}
            {!bundleID && (
              <li className="nav-item mx-1.5 mb-2">
                <a
                  className="btn btn-white btn-sm"
                  data-toggle="tab"
                  href="#tabs-chain-info"
                  role="tab"
                >
                  Chain Info
                </a>
              </li>
            )}
            {!bundleID && collectionRoyalty && (
              <li className="nav-item mx-1.5 mb-2">
                <a
                  className="btn btn-white btn-sm"
                  data-toggle="tab"
                  href="#tabs-collection-royalty"
                  role="tab"
                >
                  Royalty
                </a>
              </li>
            )}
          </ul>
          {/* <DropdownButton
            title="Recent Active"
            items={[
              { id: 'action', label: 'Action' },
              { id: 'another-action', label: 'Another Action' },
              { id: 'action-3', label: 'Action #3' },
            ]}
          /> */}
        </div>
        <div className="hr"></div>
        <div className="tab-content pb-10">
          <div className="tab-pane active" id="tabs-details" role="tabpanel">
            <p>{info?.description ?? '-'}</p>
          </div>
          <div className="tab-pane" id="tabs-price-history" role="tabpanel">
            <ArtworkDetailPagePriceHistoryTab data={data} />
          </div>
          <div className="tab-pane" id="tabs-listings" role="tabpanel">
            <ArtworkDetailPageListingsTab
              tokenInfo={tokenInfo}
              listings={listings}
              bundleListing={bundleListing}
              loading={loading}
              owner={owner}
              ownerInfo={ownerInfo}
              isMine={isMine}
              buyingItem={buyingItem}
              prices={prices}
              account={account}
              handleBuyBundle={handleBuyBundle}
              handleBuyItem={handleBuyItem}
            />
          </div>
          <div className="tab-pane" id="tabs-direct-offers" role="tabpanel">
            <ArtworkDetailPageDirectOfferTab
              offers={offers}
              tokenInfo={tokenInfo}
              now={now}
              prices={prices}
              isMine={isMine}
              myHolding={myHolding}
              account={account}
              salesContractApproving={salesContractApproving}
              offerAccepting={offerAccepting}
              bundleID={bundleID}
              isBundleContractApproved={isBundleContractApproved}
              handleApproveBundleSalesContract={
                handleApproveBundleSalesContract
              }
              salesContractApproved={salesContractApproved}
              handleApproveSalesContract={handleApproveSalesContract}
              offerCanceling={offerCanceling}
              tokenType={tokenType}
              auction={auction}
              offerPlacing={offerPlacing}
              handleAcceptOffer={handleAcceptOffer}
              handleCancelOffer={handleCancelOffer}
              setOfferModalVisible={setOfferModalVisible}
            />
          </div>
          <div className="tab-pane pb" id="tabs-attributes" role="tabpanel">
            {info?.attributes && (
              <ArtworkDetailPageAttributesView
                address={address}
                tokenID={tokenID}
                attributes={info?.attributes}
              />
            )}
          </div>
          <div className="tab-pane" id="tabs-properties" role="tabpanel">
            {info?.properties && (
              <ArtworkDetailPagePropertiesView properties={info?.properties} animationUrl={info?.animation_url}/>
            )}
          </div>
          <div className="tab-pane" id="tabs-bundleInfo" role="tabpanel">
            {bundleID && (
              <ArtworkDetailPageBundleInfoTab
                creatorInfoLoading={creatorInfoLoading}
                creatorInfo={creatorInfo}
                creator={creator}
                account={account}
              />
            )}
          </div>
          <div className="tab-pane" id="tabs-collection-detail" role="tabpanel">
            {!bundleID && collection && (
              <ArtworkDetailPageAboutCollectionTab collection={collection} />
            )}
          </div>
          <div className="tab-pane" id="tabs-chain-info" role="tabpanel">
            {!bundleID && (
              <ArtworkDetailPageChainInfoTab
                explorerUrl={explorerUrl}
                address={address}
              />
            )}
          </div>
          <div
            className="tab-pane"
            id="tabs-collection-royalty"
            role="tabpanel"
          >
            {!bundleID && collectionRoyalty && (
              <ArtworkDetailPageRoyaltyTab
                collectionRoyalty={collectionRoyalty}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ArtworkDetailPageDetailSection.propTypes = propTypes;
