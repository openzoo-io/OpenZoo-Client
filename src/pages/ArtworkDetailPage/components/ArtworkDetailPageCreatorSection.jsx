import { Avatar } from 'components/Avatar';
import React from 'react';
import { Link } from 'react-router-dom';

import Badge from 'assets/imgs/icons/Badge.svg';

export function ArtworkDetailPageCreatorSection() {
  return (
    <div className="creators">
      <div className="row">
        <div className="col-lg-6">
          <div className="avatars space-x-5">
            <div className="media">
              <Link to="#">
                <Avatar />
              </Link>
            </div>
            <div>
              <Link to="#">
                <p className="avatars_name color_black">
                  @ayoub_fennouni / fouzi...
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="avatars space-x-5">
            <div className="media">
              <div className="badge">
                <img className="badge" src={Badge} alt="" />
              </div>
              <Link to="#">
                <Avatar />
              </Link>
            </div>
            <div>
              <Link to="#">
                <p className="avatars_name color_black">@makinzi_jamy...</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
