import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useParams } from 'react-router';
import { formatDateTimeAgo, formatNumber } from 'utils';
import Skeleton from 'react-loading-skeleton';
import Identicon from 'components/Identicon';
import { Link } from 'react-router-dom';

import styles from '../styles.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGavel, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useApi } from 'api';
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
  const { explorerUrl } = useApi();
  const [filter, setFilter] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    onFilterChange?.(filter);
  }, [filter]);

  const handleClickFilter = id => () => {
    setFilter(id);
    setTimeout(() => {
      setExpanded(true);
    }, 100);
  };

  const handleClickExpand = () => {
    setExpanded(old => !old);
  };

  return (
    <div className="mt-20">
      <div className={'bg_white rounded-20 py-10 px-20 box'}>
        <div className={cx(styles.tradeHistoryHeader, 'py-1')}>
          <div className={cx('d-flex space-x-10 sm:space-x-10')}>
            <i className="ri-arrow-left-right-line txt_lg"></i>&nbsp;
            <button
              className={cx(
                styles.tradeHistoryButton,
                'btn btn-sm btn-link',
                filter === 0 && styles.active
              )}
              onClick={handleClickFilter(0)}
            >
              {filtersItems[0].label}
            </button>
            <div
              style={{
                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                margin: '5px 0',
              }}
            ></div>
            {!bundleID && tokenType.current !== 1155 && (
              <button
                className={cx(
                  styles.tradeHistoryButton,
                  'btn btn-sm btn-link',
                  filter === 1 && styles.active
                )}
                onClick={handleClickFilter(1)}
              >
                {filtersItems[1].label}
              </button>
            )}
          </div>
          <div className="cursor-pointer" onClick={handleClickExpand}>
            <svg
              className="MuiSvgIcon-root"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              color="#A2A2AD"
            >
              {expanded ? (
                <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
              ) : (
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
              )}
            </svg>
          </div>
          {/* {!bundleID && (
            <DropdownButton
              value={filter}
              items={filtersItems}
              btnClassName="btn-white"
              onClickItem={handleSelectFilter}
            />
          )} */}
        </div>
        <div
          className={cx(
            'bg-white collapse mt-3',
            expanded && 'show',
            styles.histories
          )}
        >
          <div className={cx(styles.history, styles.heading, 'bg_white')}>
            {filter === 0 && <div className={styles.historyPrice}>Price</div>}
            {tokenType.current === 1155 && (
              <div className={styles.quantity}>Quantity</div>
            )}
            <div className={styles.from}>From</div>
            <div className={styles.to}>To</div>
            <div className={styles.saleDate}>Date</div>
            <div className={styles.explorer}></div>
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
                        <div>
                          <a>
                            {formatNumber(history.price)}{' '}
                            {history.isAuction === true ? (
                              <FontAwesomeIcon icon={faGavel} />
                            ) : (
                              ''
                            )}
                          </a>
                          <span style={{fontSize:11}}>
                            (${formatNumber(history.priceInUSD.toFixed(3))})
                          </span>
                          <span style={{fontSize:10}}>
                           ${(history.priceInUSD / history.price).toFixed(3)} / ZOO
                          </span>
                        </div>
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
                <div className={styles.explorer}>
                  {history ? (
                    history?.txHash && (
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={explorerUrl + '/tx/' + history?.txHash}
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </a>
                    )
                  ) : (
                    <Skeleton width={150} height={20} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {filter === 0 && (
          <div style={{ fontSize: 11, marginTop: 10 }}>
            * USD value at time of transaction
          </div>
        )}
      </div>
    </div>
  );
}
