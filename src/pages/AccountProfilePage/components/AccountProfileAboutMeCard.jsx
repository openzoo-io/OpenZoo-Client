import React from 'react';
import Skeleton from 'react-loading-skeleton';

export function AccountProfileAboutMeCard(props) {
  const { loading, user } = props;

  return (
    <div className="space-y-10">
      <h5>About me</h5>
      <div className="box space-y-20 aboutme">
        {loading ? (
          <Skeleton width="100%" height={200} />
        ) : (
          <>
            {user.bio && <p>{user.bio.split('\n').map((item, key) => {
              return <span key={key}>{item}<br/></span>
            })}</p>}
            {/**
            <div className="row">
              <div className="col-6">
                <span className="txt_sm color_text">Collections</span>
                <h4>105</h4>
              </div>
              <div className="col-6">
                <span className="txt_sm color_text">Creations</span>
                <h4>406</h4>
              </div>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}
