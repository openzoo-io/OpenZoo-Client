import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import './styles.css';
import { ClipLoader } from 'react-spinners';
import Select from 'react-dropdown-select';
import Skeleton from 'react-loading-skeleton';
import { ethers } from 'ethers';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import BootstrapTooltip from 'components/BootstrapTooltip';
import PriceInput from 'components/PriceInput';
import { formatNumber } from 'utils';
import useTokens from 'hooks/useTokens';
import { useSalesContract } from 'contracts';

import { RaroinModal as Modal } from '../Modal/RaroinModal';
import styles from '../Modal/common.module.scss';
import InputError from '../InputError';

const AuctionModal = ({
  visible,
  info,
  onClose,
  onStartAuction,
  auction,
  auctionStarted,
  confirming,
  approveContract,
  contractApproving,
  contractApproved,
}) => {
  const { tokens } = useTokens();
  const { getSalesContract } = useSalesContract();

  const [now, setNow] = useState(new Date());
  const [reservePrice, setReservePrice] = useState('');
  const [startTime, setStartTime] = useState(
    new Date(new Date().getTime() + 2 * 60 * 1000)
  );
  const [endTime, setEndTime] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  );
  const [focused, setFocused] = useState(false);
  const [minBidReserve, setMinBidReserve] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tokenPrice, setTokenPrice] = useState();
  const [tokenPriceInterval, setTokenPriceInterval] = useState();
  const [inputError, setInputError] = useState(null);

  useEffect(() => {
    setInterval(() => setNow(new Date()), 1000);
  }, []);

  useEffect(() => {
    if (tokens?.length) {
      setOptions(tokens);
    }
  }, [tokens]);

  useEffect(() => {
    setReservePrice(auction?.reservePrice || '');
    setStartTime(
      auction?.startTime
        ? new Date(auction.startTime * 1000)
        : new Date(new Date().getTime() + 2 * 60 * 1000)
    );
    setEndTime(
      auction?.endTime
        ? new Date(auction.endTime * 1000)
        : new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    );
  }, [visible, auction]);

  useEffect(() => {
    if (visible && tokens?.length) {
      setSelected([auction ? auction.token : tokens[0]]);
    }
  }, [visible, auction]);

  const CustomCheckbox = withStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&$checked': {
        color: '#00a59a',
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

  const getTokenPrice = () => {
    if (tokenPriceInterval) clearInterval(tokenPriceInterval);
    const func = async () => {
      const tk = selected[0].address || ethers.constants.AddressZero;
      try {
        const salesContract = await getSalesContract();
        const price = await salesContract.getPrice(tk);
        setTokenPrice(parseFloat(ethers.utils.formatUnits(price, 18)));
      } catch {
        setTokenPrice(null);
      }
    };
    func();
    setTokenPriceInterval(setInterval(func, 60 * 1000));
  };

  useEffect(() => {
    if (selected.length === 0) return;

    getTokenPrice();
  }, [selected]);

  const validateInput = (() => {
    if (reservePrice.length === 0 || parseFloat(reservePrice) == 0)
      return false;
    if (!auctionStarted && startTime.getTime() < now.getTime()) return false;
    return (
      endTime.getTime() >= now.getTime() + 1000 * 60 * 5 &&
      endTime.getTime() >= startTime.getTime() + 1000 * 60 * 5
    );
  })();

  return (
    <Modal
      visible={visible}
      title={auction ? 'UPDATE AUCTION' : 'START AUCTION'}
      onClose={onClose}
      submitDisabled={
        contractApproving ||
        confirming ||
        (contractApproved && !validateInput) ||
        inputError
      }
      submitLabel={
        contractApproved ? (
          confirming ? (
            <ClipLoader color="#FFF" size={16} />
          ) : auction ? (
            'UPDATE AUCTION'
          ) : (
            'START AUCTION'
          )
        ) : contractApproving ? (
          'APPROVING ITEM'
        ) : (
          'APPROVE ITEM'
        )
      }
      onSubmit={() =>
        contractApproved
          ? !confirming && validateInput
            ? onStartAuction(
                selected[0],
                reservePrice,
                startTime,
                endTime,
                minBidReserve
              )
            : null
          : approveContract()
      }
    >
      {info?.name && (
        <p>
          You are about to start an auction for
          <br />
          <span className="color_brand">{info?.name}</span>
        </p>
      )}
      <div className={styles.formGroup}>
        <div className={styles.formLabel}>
          Reserve Price&nbsp;
          <BootstrapTooltip
            title="Reserve price is the minimum bid you are willing to accept for this auction."
            placement="top"
          >
            <HelpOutlineIcon />
          </BootstrapTooltip>
        </div>
        <div
          className={cx(
            'd-flex rounded-15 bg_input align-items-center',
            focused && styles.focused
          )}
        >
          <Select
            options={options}
            disabled={auction || confirming}
            values={selected}
            onChange={tk => {
              setSelected(tk);
            }}
            className={styles.select}
            placeholder=""
            itemRenderer={({ item, itemIndex, methods }) => (
              <div
                key={itemIndex}
                className={styles.token}
                onClick={() => {
                  methods.clearAll();
                  methods.addItem(item);
                }}
              >
                <img src={item?.icon} className={styles.tokenIcon} />
                <div className={styles.tokenSymbol}>{item.symbol}</div>
              </div>
            )}
            contentRenderer={({ props: { values } }) =>
              values.length > 0 ? (
                <div className={styles.selectedToken}>
                  <img src={values[0]?.icon} className={styles.tokenIcon} />
                  <div className={styles.tokenSymbol}>{values[0].symbol}</div>
                </div>
              ) : (
                <div className={styles.selectedToken} />
              )
            }
          />
          <PriceInput
            className={styles.formInput}
            placeholder="0.00"
            value={'' + reservePrice}
            decimals={selected[0]?.decimals || 0}
            onChange={setReservePrice}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={contractApproving || confirming}
            onInputError={err => setInputError(err)}
          />
          <div className={`${styles.usdPrice} d-none d-sm-flex`}>
            {!isNaN(tokenPrice) && tokenPrice !== null ? (
              `$${formatNumber(
                ((parseFloat(reservePrice) || 0) * tokenPrice).toFixed(2)
              )}`
            ) : (
              <Skeleton width={100} height={24} />
            )}
          </div>
        </div>
        <div className={`${styles.usdPriceMobile} d-sm-none`}>
          {!isNaN(tokenPrice) && tokenPrice !== null ? (
            `$${formatNumber(
              ((parseFloat(reservePrice) || 0) * tokenPrice).toFixed(2)
            )}`
          ) : (
            <Skeleton width={100} height={24} />
          )}
        </div>
        <InputError text={inputError} />
      </div>
      <div className={styles.formGroup}>
        <div className={styles.formLabel}>Start Time</div>
        <div className={'d-flex rounded-15 bg_input align-items-center'}>
          <Datetime
            value={startTime}
            className={'calendarAboveInput'}
            onChange={val => setStartTime(val.toDate())}
            inputProps={{
              className: styles.formInput,
              onKeyDown: e => e.preventDefault(),
              disabled: auctionStarted || contractApproving || confirming,
            }}
            closeOnSelect
            isValidDate={cur =>
              cur.valueOf() > now.getTime() - 1000 * 60 * 60 * 24
            }
          />
        </div>
      </div>
      <div className={styles.formGroup}>
        <div className={styles.formLabel}>Auction Expiration</div>
        <div className={'d-flex rounded-15 bg_input align-items-center'}>
          <Datetime
            value={endTime}
            className={'calendarAboveInput'}
            onChange={val => setEndTime(val.toDate())}
            inputProps={{
              className: styles.formInput,
              onKeyDown: e => e.preventDefault(),
              disabled: contractApproving || confirming,
            }}
            closeOnSelect
            isValidDate={cur =>
              cur.valueOf() > startTime.getTime() - ((1000 * 60 * 60 * 24)+(300*1000))
            }
          />
        </div>
      </div>
      <FormControlLabel
        className={cx(styles.formControl, styles.selected, 'align-items-start')}
        classes={{ label: styles.groupTitle }}
        control={
          <CustomCheckbox
            classes={{ root: 'pt-0' }}
            checked={minBidReserve}
            onChange={() => setMinBidReserve(prevState => !prevState)}
          />
        }
        label="Minimum bid should be equal or greater than reserve price"
      />
    </Modal>
  );
};

export default AuctionModal;
