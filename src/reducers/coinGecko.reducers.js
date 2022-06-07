import CoinGeckoConstants from '../constants/coinGecko.constants';

export function CoinGecko(
    state = {
        currentPrice: null
    },
    action
) {
    switch (action.type) {
        case CoinGeckoConstants.DATA_FETCHED: {
            console.log(action.data)
            return {
                ...state,
                currentPrice: action.data.current_price,
            };
        }

        default: {
            return state;
        }
    }
}
