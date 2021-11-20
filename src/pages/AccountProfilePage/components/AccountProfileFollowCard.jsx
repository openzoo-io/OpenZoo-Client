import React from 'react';

export function AccountProfileFollowCard() {
  return (
    <div className="space-y-10">
      <h5>Follow me</h5>
      <div className="box">
        <ul className="social_profile space-y-10 overflow-hidden">
          <li>
            <a href="#">
              <i className="ri-facebook-line"></i>
              <span className="color_text">facebook/</span>
              @creabik
            </a>
          </li>
          <li>
            <a href="#">
              <i className="ri-messenger-line"></i>
              <span className="color_text"> messenger/</span>
              @creabik
            </a>
          </li>
          <li>
            <a href="#">
              <i className="ri-whatsapp-line"></i>
              <span className="color_text"> whatsapp/</span>
              @creabik
            </a>
          </li>
          <li>
            <a href="#">
              <i className="ri-youtube-line"></i>
              <span className="color_text">youtube/</span>
              @creabik
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
