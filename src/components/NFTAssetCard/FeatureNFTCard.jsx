import React from 'react';

import ExampleImage from 'assets/imgs/exampleZooGenes.png';
import { StackAvatars } from 'components/Avatar';
import faker from 'faker';

export function FeatureNFTCard() {
  return (
    <div className="col-lg-4">
      <div className="card__item two">
        <div className="card_body space-y-10">
          <div className="card_head">
            <img src={ExampleImage} alt="" />
            <div className="block_timer">
              <div className="d-flex justify-content-center align-items-center">
                <div className="item">
                  <div className="number txt hours">
                    23<span></span>
                  </div>
                </div>
                <div className="dots">:</div>
                <div className="item">
                  <div className="number txt minutes">
                    53<span></span>
                  </div>
                </div>
                <div className="dots">:</div>
                <div className="item">
                  <div className="number txt seconds">
                    23<span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="details d-flex justify-content-between">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: '80%' }}
                  aria-valuenow="80"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
          <h6 className="card_title">
            <a className="color_black" href="/Item-details.html">
              Spider Eyes Modern Art
            </a>
          </h6>
          <div className="hr"></div>
          <div className="card_footer justify-content-between">
            {/* TODO: define users */}
            <StackAvatars
              users={new Array(2).fill({ alias: faker.name.findName() })}
            />
            <a href="#" className="space-x-3">
              <p className="color_green txt_sm">0,006 ETH</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
