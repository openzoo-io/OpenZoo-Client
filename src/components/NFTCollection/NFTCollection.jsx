import React from 'react';

import ExampleImage from 'assets/imgs/exampleZooGenes.png';
// import { Avatar } from 'components/Avatar';
// import { Link } from 'react-router-dom';

export function NFTCollection() {
  return (
    <div className="collections mb-30">
      <div className="d-flex space-x-10 collections_item">
        <div className="images-box">
          <img src={ExampleImage} alt="" />
        </div>
        <div className="detail">
          <h3>Creative Art collection</h3>
          <div className="txt _bold color_light_grey">
            created by <span className="color_brand owner">Genshimoro</span>
          </div>
          <div className="categories d-flex space-x-5 space-y-5 -ml-5">
            <div></div>
            <div className="txt_xs color_text px-3 py-1 bg_hard_light rounded-pill">
              Category 01
            </div>
            <div className="txt_xs color_text px-3 py-1 bg_hard_light rounded-pill">
              Category 02
            </div>
          </div>
          <div className="d-flex mt-10 space-x-10 space-y-10 -ml-10 flex-wrap">
            <div></div>
            <div className="stat-card shadow-sm">
              <h2 className="color_brand">224</h2>
              <span className="txt_xs color_text">items</span>
            </div>
            <div className="stat-card shadow-sm">
              <h2 className="color_brand">3.4k</h2>
              <span className="txt_xs color_text">Owners</span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="collections_footer justify-content-between">
        <h5 className="collection_title">
          <Link to="#">Creative Art collection</Link>
        </h5>
        <div className="cursor-pointer likes space-x-3">
          <i className="ri-heart-3-fill"></i>
          <span className="txt_md">2.1k</span>
        </div>
      </div>
      <div className="creators space-x-10">
        <span className="color_text txt_md"> 5 items · Created by</span>
        <div className="avatars space-x-5">
          <Link to="#">
            <Avatar />
          </Link>
        </div>
        <Link to="#">
          <p className="avatars_name txt_sm"> @william_jamy... </p>
        </Link>
      </div> */}
    </div>
  );
}
