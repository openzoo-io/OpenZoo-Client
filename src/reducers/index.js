import { combineReducers } from 'redux';
import { Auth } from './auth.reducers';
import { CoinGecko } from './coinGecko.reducers';
import { Collections } from './collections.reducers';
import { ConnectWallet } from './connectwallet.reducers';
import { Filter } from './filter.reducers';
import { HeaderOptions } from './header.reducers';
import { Modal } from './modal.reducers';
import { Price } from './price.reducers';
import { Tokens } from './tokens.reducers';

const rootReducer = combineReducers({
  Auth,
  ConnectWallet,
  HeaderOptions,
  Modal,
  Filter,
  Collections,
  Tokens,
  Price,
  CoinGecko
});

export default rootReducer;
