import React from 'react';

import ExampleImage from 'assets/imgs/exampleZooGenes.png';
import { Avatar } from 'components/Avatar';
import { Link } from 'react-router-dom';

export function NFTCollection() {
  return (
    <div className="collections space-y-10 mb-30">
      <Link to="#">
        <div className="collections_item">
          <div className="images-box space-y-10">
            <div className="top_imgs">
              <img src={ExampleImage} alt="" />
              <img src={ExampleImage} alt="" />
              <img src={ExampleImage} alt="" />
            </div>
            <img src={ExampleImage} alt="" />
          </div>
        </div>
      </Link>
      <div className="collections_footer justify-content-between">
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
      </div>
    </div>
  );
}
