import React, { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Toaster } from 'react-hot-toast';
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import axios from 'axios';
import CoinGeckoActions from 'actions/coinGecko.actions';

// import { ChainId } from '@sushiswap/sdk';
// import { Client } from '@bandprotocol/bandchain.js';
import ProtectedRoute from './ProtectedRoute';
//import AccountModal from './AccountModal';
import WFTMModal from './WFTMModal';
import NotFound from './NotFound';
//import PaintBoard from './PaintBoard';
//import ExplorePage from '../pages/explorepage';
//import AccountDetails from '../pages/AccountDetails';
//import NFTItem from '../pages/NFTItem';
//import CollectionCreate from '../pages/Collection/Create';
//import CollectionReview from '../pages/Collection/Review';
//import NotificationSetting from '../pages/NotificationSetting';

//import { HomePage } from 'pages/HomePage/HomePage';
//import { NewExplorePage } from 'pages/NewExplorePage';
//import { ArtworkDetailPage } from 'pages/ArtworkDetailPage';
//import { AccountProfilePage } from 'pages/AccountProfilePage';
//import { CollectionsPage } from 'pages/CollectionsPage';
//import { CollectionList } from 'pages/CollectionList';
import { useDispatch } from 'react-redux';

const HomePage = React.lazy(() => import('../pages/HomePage/HomePage'));
const NewExplorePage = React.lazy(() => import('../pages/NewExplorePage/NewExplorePage'));
const ArtworkDetailPage = React.lazy(() => import('../pages/ArtworkDetailPage/ArtworkDetailPage'));
const CollectionList = React.lazy(() => import('../pages/CollectionList/CollectionList'));
const CollectionsPage = React.lazy(() => import('../pages/CollectionsPage/CollectionsPage'));
const AccountProfilePage = React.lazy(() => import('../pages/AccountProfilePage/AccountProfilePage'));


// Protected Area //
const PaintBoard = React.lazy(() => import('./PaintBoard'));
const CollectionCreate = React.lazy(() => import('../pages/Collection/Create'));
const CollectionReview = React.lazy(() => import('../pages/Collection/Review'));
const NotificationSetting = React.lazy(() => import('../pages/NotificationSetting'));
const AccountModal = React.lazy(() => import('./AccountModal'));
//console.log('homepage', HomePage)

const App = () => {

  const dispatch = useDispatch();
  const LazyLoad = () => {
    useEffect(() => {
      NProgress.start();

      return () => {
        NProgress.done();
      };
    });

    return '';
  };

  useEffect(() => {
    //alert('OpenZoo is on maintenance mode. Please do not use it for now. We will be back soon. Thank you for your patience.');
    const fetch = () => {
      axios
        .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=zookeeper,wanchain&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(response => {
          if (response?.data?.[0]) {
            let datatosave = {}
            response.data.map((coin) => {
              if (coin.symbol === 'wan')
              {
                coin.symbol = 'wwan';
              }
              datatosave[coin.symbol.toUpperCase()] = coin.current_price;
            })
            console.log('datatosave',datatosave);
            dispatch(CoinGeckoActions.dataFetched(datatosave))
          }
         
        })
    }

    fetch();
    setInterval(fetch, 60000);
  }, []);


  return (
    <div>
      <Router history={history}>
        <React.Suspense fallback={<LazyLoad />}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/home" component={HomePage} />
            {/*
          <Route exact path="/old-explore" component={ExplorePage} />
          <Route path="/old-explore/:addr/:id" component={NFTItem} />
           */}
            <Route exact path="/explore" component={NewExplorePage} />
            <Route exact path="/explore/:addr" component={NewExplorePage} />
            <Route exact path="/collection/:addr/:id" component={ArtworkDetailPage} />

            <ProtectedRoute exact path="/create" component={PaintBoard} />
            {/* <Route path="/bundle/:bundleID" component={NFTItem} /> */}
            <Route path="/account/:uid" component={AccountProfilePage} />
            {/* <Route path="/old-account/:uid" component={AccountDetails} /> */}
            <Route path="/collections" component={CollectionsPage} />



            <ProtectedRoute
              path="/collection/create"
              component={() => <CollectionCreate isRegister={false} />}
            />
            <ProtectedRoute
              path="/collection/register"
              component={() => <CollectionCreate isRegister />}
            />
            <ProtectedRoute
              path="/collection/review"
              component={CollectionReview}
            />
            <ProtectedRoute
              path="/settings/notification"
              component={NotificationSetting}
            />

            <Route exact path="/collection/:addr" component={CollectionList} />

            <Route path="/404" component={NotFound} />
            <Route path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
        </React.Suspense>
        <AccountModal />
        <WFTMModal />
        <Toaster position="bottom-right" reverseOrder={false} />
      </Router>
    </div >
  );
};

export default App;
