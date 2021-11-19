import { DropdownButton } from 'components/DropdownButton';
import React from 'react';
import { ArtworkDetailPageHistoryItem } from './ArtworkDetailPageHistoryItem';
import PropTypes from 'prop-types';
import { ArtworkDetailPageAttributesView } from './ArtworkDetailPageAttributesView';
import { ArtworkDetailPagePropertiesView } from './ArtworkDetailPagePropertiesView';

const propTypes = {
  info: PropTypes.object,
  history: PropTypes.array,
  listings: PropTypes.array,
  prices: PropTypes.object,
  attributesComponent: PropTypes.element,
};

export function ArtworkDetailPageDetailSection(props) {
  const { info, address, listings, tokenID } = props;

  return (
    <div className="box">
      <div className="space-y-20">
        <div className="d-flex justify-content-between mb-30_reset">
          <ul className="nav nav-tabs d-flex space-x-10 mb-30" role="tablist">
            <li className="nav-item">
              <a
                className="btn btn-white btn-sm active"
                data-toggle="tab"
                href="#tabs-details"
                role="tab"
              >
                Details
              </a>
            </li>
            <li className="nav-item">
              <a
                className="btn btn-white btn-sm"
                data-toggle="tab"
                href="#tabs-bids"
                role="tab"
              >
                Bids
              </a>
            </li>
            <li className="nav-item">
              <a
                className="btn btn-white btn-sm"
                data-toggle="tab"
                href="#tabs-history"
                role="tab"
              >
                History
              </a>
            </li>
            {info?.attributes && (
              <li className="nav-item">
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
              <li className="nav-item">
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
          </ul>
          <DropdownButton
            title="Recent Active"
            items={[
              { id: 'action', label: 'Action' },
              { id: 'another-action', label: 'Another Action' },
              { id: 'action-3', label: 'Action #3' },
            ]}
          />
        </div>
        <div className="hr"></div>
        <div className="tab-content">
          <div className="tab-pane active" id="tabs-details" role="tabpanel">
            <p>{info?.description ?? '-'}</p>
          </div>
          <div className="tab-pane" id="tabs-bids" role="tabpanel">
            <p>No active bids yet. Be the first to make a bid!</p>
          </div>
          <div
            className="tab-pane space-y-20"
            id="tabs-history"
            role="tabpanel"
          >
            {listings?.map((listing, index) => (
              <ArtworkDetailPageHistoryItem
                key={`artwork-trade-history-listing-${index}`}
                listing={listing}
                prices={props.prices}
              />
            ))}
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
              <ArtworkDetailPagePropertiesView properties={info?.properties} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ArtworkDetailPageDetailSection.propTypes = propTypes;
