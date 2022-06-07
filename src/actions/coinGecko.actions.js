import CoinGeckoConstants from '../constants/coinGecko.constants';

const CoinGeckoActions = {
  dataFetched
};

function dataFetched(data) {
  return dispatch => {
    dispatch(_dataFetched(data));
  };
}

const _dataFetched = (data) => {
  return {
    type: CoinGeckoConstants.DATA_FETCHED,
    data: data
  };
};



export default CoinGeckoActions;
