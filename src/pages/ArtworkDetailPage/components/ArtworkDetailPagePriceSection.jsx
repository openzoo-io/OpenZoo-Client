import React from 'react';
import { formatNumber } from 'utils';
import styles from '../styles.module.scss';
import PropTypes from 'prop-types';

const propTypes = {
  bestListing: PropTypes.object,
  prices: PropTypes.object,
};

export function ArtworkDetailPagePriceSection(props) {
  const { bestListing, prices } = props;

  if (bestListing == null) {
    return null;
  }

  return (
    <div className="numbers">
      <div className="row">
        <div className="col-lg-6">
          <div className="space-y-5">
            <p className="color_text">Minimum bid</p>
            <div className="row">
              {bestListing && (
                <h4>
                  <img
                    src={bestListing?.token?.icon}
                    className={styles.tokenLogo}
                  />
                  {formatNumber(bestListing.price)}
                  <span className="txt_sm color_text">
                    {prices[bestListing.token?.address]
                      ? `/ $${formatNumber(
                          (
                            bestListing.price *
                            prices[bestListing.token?.address]
                          ).toFixed(3)
                        )}`
                      : null}
                  </span>
                </h4>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="space-y-5">
            <p className="color_text">countdown</p>
            <div className="d-flex countdown_item align-items-center">
              <div className="item">
                <div className="number hours">
                  22<span></span>
                </div>
              </div>
              <div className="dots">:</div>
              <div className="item">
                <div className="number minutes">
                  04<span></span>
                </div>
              </div>
              <div className="dots">:</div>
              <div className="item">
                <div className="number seconds">
                  35<span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ArtworkDetailPagePriceSection.propTypes = propTypes;
