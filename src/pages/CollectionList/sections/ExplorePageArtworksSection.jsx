import { AssetCard } from 'components/NFTAssetCard';
import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { Categories } from 'constants/filter.constants';
import { useDispatch } from 'react-redux';
import FilterActions from 'actions/filter.actions';

const propTypes = {
  items: PropTypes.array,
  category: PropTypes.string,
  count: PropTypes.number,
  loading: PropTypes.bool,
  onReachBottom: PropTypes.func,
};

export function ExplorePageArtworksSection(props) {
  const dispatch = useDispatch();
  const observer = React.useRef();

  const loadMoreRef = React.useCallback(
    node => {
      const hasMore = props.items.length !== props.count;
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
      {props.items?.map((item, index) => (
        <div
          key={'explore-artwork-item-' + index.toString()}
          className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
        >
          <AssetCard preset="five" item={item} />
        </div>
      ))}
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
          <Loader type="Oval" color="#007BFF" height={32} width={32} />
        )}
      </div>
    </div>
  );
}

ExplorePageArtworksSection.propTypes = propTypes;
