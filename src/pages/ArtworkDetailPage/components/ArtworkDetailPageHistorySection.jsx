import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useParams } from 'react-router';
import { formatDateTimeAgo, formatNumber } from 'utils';
import Skeleton from 'react-loading-skeleton';
import Identicon from 'components/Identicon';
import { Link } from 'react-router-dom';
import { DropdownButton } from 'components/DropdownButton';

import styles from '../styles.module.scss';

const filtersItems = [
  { id: 0, label: 'Trade History' },
  { id: 1, label: 'Transfer History' },
];
// const filters = ['Trade History', 'Transfer History'];

export function ArtworkDetailPageHistorySection(props) {
  const {
    historyLoading,
    tokenType,
    tradeHistory,
    transferHistory,
    onFilterChange,
  } = props;
  const { bundleID } = useParams();

  const [filter, setFilter] = useState(0);

  useEffect(() => {
    onFilterChange?.(filter);
  }, [filter]);

  const handleSelectFilter = item => {
    setFilter(item.id);
  };

  return (
    <div className="mt-20">
      <div className={styles.tradeHistoryWrapper}>
        <div className={styles.tradeHistoryHeader}>
          <div className={styles.tradeHistoryTitle}>
            {filtersItems[filter].label}
          </div>
          {!bundleID && (
            <DropdownButton
              value={filter}
              items={filtersItems}
              btnClassName="btn-white"
              onClickItem={handleSelectFilter}
            />
          )}
        </div>
        <div className={styles.histories}>
          <div className={cx(styles.history, styles.heading)}>
            {filter === 0 && <div className={styles.historyPrice}>Price</div>}
            {tokenType.current === 1155 && (
              <div className={styles.quantity}>Quantity</div>
            )}
            <div className={styles.from}>From</div>
            <div className={styles.to}>To</div>
            <div className={styles.saleDate}>Date</div>
          </div>
          {(historyLoading
            ? [null, null, null]
            : filter === 0
            ? tradeHistory
            : transferHistory
          ).map((history, idx) => {
            const saleDate = history ? new Date(history.createdAt) : null;
            return (
              <div className={styles.history} key={idx}>
                {filter === 0 && (
                  <div className={styles.historyPrice}>
                    {history ? (
                      <>
                        <img
                          src={history.token?.icon}
                          className={styles.tokenIcon}
                        />
                        {formatNumber(history.price)}
                        &nbsp;( ${formatNumber(history.priceInUSD.toFixed(3))} )
                      </>
                    ) : (
                      <Skeleton width={100} height={20} />
                    )}
                  </div>
                )}
                {tokenType.current === 1155 && (
                  <div className={styles.quantity}>
                    {history ? (
                      formatNumber(history.value)
                    ) : (
                      <Skeleton width={100} height={20} />
                    )}
                  </div>
                )}
                <div className={styles.from}>
                  {history ? (
                    <Link to={`/account/${history.from}`}>
                      <div className={styles.userAvatarWrapper}>
                        {history.fromImage ? (
                          <img
                            src={`https://openzoo.mypinata.cloud/ipfs/${history.fromImage}`}
                            className={styles.userAvatar}
                          />
                        ) : (
                          <Identicon
                            account={history.from}
                            size={24}
                            className={styles.userAvatar}
                          />
                        )}
                      </div>
                      {history.fromAlias || history.from?.substr(0, 6)}
                    </Link>
                  ) : (
                    <Skeleton width={180} height={20} />
                  )}
                </div>
                <div className={styles.to}>
                  {history ? (
                    <Link to={`/account/${history.to}`}>
                      <div className={styles.userAvatarWrapper}>
                        {history.toImage ? (
                          <img
                            src={`https://openzoo.mypinata.cloud/ipfs/${history.toImage}`}
                            className={styles.userAvatar}
                          />
                        ) : (
                          <Identicon
                            account={history.to}
                            size={24}
                            className={styles.userAvatar}
                          />
                        )}
                      </div>
                      {history.toAlias || history.to?.substr(0, 6)}
                    </Link>
                  ) : (
                    <Skeleton width={180} height={20} />
                  )}
                </div>
                <div className={styles.saleDate}>
                  {saleDate ? (
                    formatDateTimeAgo(saleDate)
                  ) : (
                    <Skeleton width={150} height={20} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* {!bundleID && (
          <div className={styles.panelWrapper}>
            <Panel
              title="More from this collection"
              icon={ViewModuleIcon}
              responsive
            >
              <div className={styles.panelBody}>
                {loading ? (
                  <div className={styles.loadingIndicator}>
                    <ClipLoader color="#007BFF" size={16} />
                  </div>
                ) : (
                  <div className={styles.itemsList}>
                    {moreItems?.map((item, idx) => (
                      <div key={idx} className={styles.moreItem}>
                        <NFTCard item={item} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Panel>
          </div>
        )} */}
      </div>
    </div>
  );
}
