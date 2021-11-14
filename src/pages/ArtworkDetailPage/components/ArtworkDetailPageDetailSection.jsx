import { DropdownButton } from 'components/DropdownButton';
import React from 'react';
import { ArtworkDetailPageHistoryItem } from './ArtworkDetailPageHistoryItem';
import PropTypes from 'prop-types';

const propTypes = {
  info: PropTypes.object,
  history: PropTypes.array,
};

export function ArtworkDetailPageDetailSection(props) {
  const { info } = props;
  return (
    <div className="box">
      <div className="space-y-20">
        <div className="d-flex justify-content-between mb-30_reset">
          <ul className="nav nav-tabs d-flex space-x-10 mb-30" role="tablist">
            <li className="nav-item">
              <a
                className="btn btn-white btn-sm active"
                data-toggle="tab"
                href="#tabs-1"
                role="tab"
              >
                Details
              </a>
            </li>
            <li className="nav-item">
              <a
                className="btn btn-white btn-sm"
                data-toggle="tab"
                href="#tabs-2"
                role="tab"
              >
                Bids
              </a>
            </li>
            <li className="nav-item">
              <a
                className="btn btn-white btn-sm"
                data-toggle="tab"
                href="#tabs-3"
                role="tab"
              >
                History
              </a>
            </li>
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
          <div className="tab-pane active" id="tabs-1" role="tabpanel">
            <p>{info?.description ?? '-'}</p>
          </div>
          <div className="tab-pane" id="tabs-2" role="tabpanel">
            <p>No active bids yet. Be the first to make a bid!</p>
          </div>
          <div className="tab-pane space-y-20" id="tabs-3" role="tabpanel">
            <ArtworkDetailPageHistoryItem />
            <ArtworkDetailPageHistoryItem />
          </div>
        </div>
      </div>
    </div>
  );
}

ArtworkDetailPageDetailSection.propTypes = propTypes;
