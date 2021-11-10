import React, { useState } from 'react';
import cx from 'classnames';
import { CreatorItemSmall } from 'components/CreatorItem';
import faker from 'faker';

const fakeUsers = new Array(4).fill({ alias: faker.name.firstName() });

export function HomePageArtistsSection() {
  const [hotSellerDropdownShow, setHotSellerDropdownShow] = useState(false);
  const [hotBuyerDropdownShow, setHotBuyerDropdownShow] = useState(false);

  const handleClickHotSellerDropdown = () => {
    setHotSellerDropdownShow(previousValue => !previousValue);
  };

  const handleClickHotBuyerDropdown = () => {
    setHotBuyerDropdownShow(previousValue => !previousValue);
  };

  return (
    <div className="section__artists mt-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 space-y-30">
            <div className="section_head d-flex justify-content-between align-items-center">
              <h2 className="section__title">Hot Sellers</h2>
              <div className="dropdown">
                <button
                  className={cx(
                    'btn btn-white btn-sm dropdown-toggle',
                    hotSellerDropdownShow && 'show'
                  )}
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={handleClickHotSellerDropdown}
                >
                  Recent Active
                </button>
                <div
                  className={cx(
                    'dropdown-menu',
                    hotSellerDropdownShow && 'show'
                  )}
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="row">
                <div className="col-lg-6">
                  <div className="space-y-10">
                    {fakeUsers.map((creator, index) => (
                      <CreatorItemSmall
                        key={`hot-seller-creator-${index + 1}`}
                        user={creator}
                        rank={index + 1}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="space-y-10">
                    {fakeUsers.map((creator, index) => (
                      <CreatorItemSmall
                        key={`hot-seller-creator-${index + 5}`}
                        user={creator}
                        rank={index + 5}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 space-y-30">
            <div className="section_head d-flex justify-content-between align-items-center">
              <h2 className="section__title">Hot Buyers</h2>
              <div className="dropdown">
                <button
                  className={cx(
                    'btn btn-white btn-sm dropdown-toggle',
                    hotBuyerDropdownShow && 'show'
                  )}
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={handleClickHotBuyerDropdown}
                >
                  Recent Active
                </button>
                <div
                  className={cx(
                    'dropdown-menu',
                    hotBuyerDropdownShow && 'show'
                  )}
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="row">
                <div className="col-lg-6">
                  <div className="space-y-10">
                    {fakeUsers.map((creator, index) => (
                      <CreatorItemSmall
                        key={`hot-buyer-creator-${index + 1}`}
                        user={creator}
                        rank={index + 1}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="space-y-10">
                    {fakeUsers.map((creator, index) => (
                      <CreatorItemSmall
                        key={`hot-buyer-creator-${index + 5}`}
                        user={creator}
                        rank={index + 5}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
