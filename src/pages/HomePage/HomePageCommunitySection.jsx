import React from 'react';

import GithubIcon from 'assets/imgs/icons/github.svg';
import TwitterIcon from 'assets/imgs/icons/twitter.svg';
import DiscordIcon from 'assets/imgs/icons/discord.svg';

export function HomePageCommunitySection() {
  return (
    <div className="container">
      <div className="community">
        <div className="section__head space-y-20">
          <h3 className="section__title text-center">Global community</h3>
          <p className="section__text text-center">
            Learn more about raroin, chat with the team, other people in the
            community, and express your opinion on the future development of
            raroin.
          </p>
        </div>

        <div className="community__items">
          <div className="row justify-content-center mb-20_reset">
            <div className="col-md-3">
              <div className="item space-y-10">
                <div className="logo">
                  <img src={GithubIcon} alt="logo_community" />
                </div>
                <h5 className="text-center">Github</h5>
                <p className="text-center">
                  Understand the progress of our code and project
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="item space-y-10">
                <div className="logo is_twitter">
                  <img src={TwitterIcon} alt="logo_community" />
                </div>
                <h5 className="text-center">Twitter</h5>
                <p className="text-center">
                  Understand the progress of our code and project
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="item space-y-10">
                <div className="logo is_discord">
                  <img src={DiscordIcon} alt="logo_community" />
                </div>
                <h5 className="text-center">Discord</h5>
                <p className="text-center">
                  Understand the progress of our code and project
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
