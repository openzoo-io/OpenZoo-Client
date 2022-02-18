import { AssetCard } from 'components/NFTAssetCard';
import { ArtworkProfileFillterStatus } from './AccountProfileFillterStatus';
import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

const propTypes = {
  tab: PropTypes.number,
  items: PropTypes.array,
  warnedCollections: PropTypes.array,
  count: PropTypes.number,
  loading: PropTypes.bool,
  onReachBottom: PropTypes.func,
};

function AccountProfileArtworksListComponent(props) {
  
  const observer = React.useRef();
  const loadMoreRef = React.useCallback(
    node => {
      const hasMore = props.items.length !== props.count;
      if (props.loading) return;
      if (observer.current) observer.current?.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          // console.log('reach bottom', props.items.length, props.count);
          props.onReachBottom?.();
        }
      });
      if (node) observer.current.observe(node);
    },
    [props.items, props.count, props.loading]
  );

  return (
    <div className="tab-content">
      <div className="tab-pane active">
        {props.tab === 0 && (
          <div className="section">
            <div className="section__head">
              <ArtworkProfileFillterStatus />
            </div>
          </div>
        )}
        <div className="row">
          {props.items?.map((item, index) => (
            <div
              key={item?.tokenID + index.toString()}
              className="col-xl-4 col-lg-6 col-md-6"
            >
              <AssetCard
                preset="four"
                item={item}
                warnedCollections={props.warnedCollections}
                onLike={props.onLike}
              />
            </div>
          ))}
          <div className={'d-flex justify-content-center'} ref={loadMoreRef}>
            {props.loading && (
              <Loader type="Oval" color="#00A59A" height={32} width={32} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

AccountProfileArtworksListComponent.propTypes = propTypes;
export const AccountProfileArtworksList = AccountProfileArtworksListComponent;
