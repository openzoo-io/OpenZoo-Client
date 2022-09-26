import { AssetCard } from 'components/NFTAssetCard';
import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { Categories } from 'constants/filter.constants';
import { useDispatch, useSelector } from 'react-redux';
import FilterActions from 'actions/filter.actions';
import permanentlist from 'constants/permanent.collection.js';

const propTypes = {
  items: PropTypes.array,
  warnedCollections: PropTypes.array,
  category: PropTypes.string,
  count: PropTypes.number,
  loading: PropTypes.bool,
  onReachBottom: PropTypes.func,
};

export function ExplorePageArtworksSection(props) {
  const dispatch = useDispatch();
  const observer = React.useRef();
  const filter = useSelector(state => state.Filter);
  const loadMoreRef = React.useCallback(
    node => {
      const hasMore = props.items.length !== props.count - 1;
      if (props.loading) return;
      if (observer.current) observer.current?.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          props.onReachBottom?.();
        }
      });
      if (node) observer.current.observe(node);
    },
    [props.items, props.count, props.loading]
  );

  return (
    <div className="row mb-30_reset" ref={props.ref}>
      {props.items?.map((item, index) => {
        // To remove expired items - tmp remove //
        if (item.price !== 0 && item.isAuction === false && item.tokenType === 721 && (new Date(item.listedAt).getTime() +
        1000 * 86400 * 30 * 5 < new Date().getTime()) &&
        permanentlist[item.contractAddress.toLowerCase()] !== item.owner.toLowerCase() 
        && filter?.statusBuyNow === true
        )
        {
          return;
        }

        return (
          <div
            key={'explore-artwork-item-' + index.toString()}
            className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
          >
            <AssetCard
              preset="four"
              item={item}
              warnedCollections={props.warnedCollections}
            />
          </div>
        );
      })}
      {!props.loading &&
        !props.items.length &&
        props.category !== null &&
        props.category !== undefined && (
          <p>
            No results found for the{' '}
            <span className="txt _bold">
              {Categories[props.category].label}
            </span>{' '}
            category.
            <span
              className="ml-2 cursor-pointer color_info"
              onClick={() => dispatch(FilterActions.updateCategoryFilter(null))}
            >
              Select all categories
            </span>
          </p>
        )}
      <div className={'d-flex justify-content-center'} ref={loadMoreRef}>
        {props.loading && (
          <Loader type="Oval" color="#00A59A" height={32} width={32} />
        )}
      </div>
    </div>
  );
}

ExplorePageArtworksSection.propTypes = propTypes;
