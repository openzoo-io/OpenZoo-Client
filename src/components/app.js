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

// import { ChainId } from '@sushiswap/sdk';
// import { Client } from '@bandprotocol/bandchain.js';
import ProtectedRoute from './ProtectedRoute';
//import AccountModal from './AccountModal';
//import WFTMModal from './WFTMModal';
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

  const LazyLoad = () => {
    useEffect(() => {
      NProgress.start();

      return () => {
        NProgress.done();
      };
    });

    return '';
  };


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
        {/* <WFTMModal /> */}
        <Toaster position="bottom-right" reverseOrder={false} />
      </Router>
    </div >
  );
};

export default App;
