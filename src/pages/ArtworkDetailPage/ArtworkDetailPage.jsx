import { Footer } from 'components/Footer';
import Header from 'components/header';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShareButton } from 'components/ShareButton';
import { ReportButton } from 'components/ReportButton';
import {
  ArtworkDetailPageDetailSection,
  ViewProofButton,
  ArtworkDetailPageCreatorSection,
} from './components';
import { useApi } from 'api';
import useTokens from 'hooks/useTokens';
import { useNFTContract } from 'contracts';
import { getRandomIPFS } from 'utils';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';

export function ArtworkDetailPage() {
  const { addr: address, id: tokenID, bundleID } = useParams();
  const { getTokenByAddress } = useTokens();

  const { fetchItemDetails, get1155Info, getTokenHolders } = useApi();
  const { getERC721Contract } = useNFTContract();

  const [info, setInfo] = useState();
  const [liked, setLiked] = useState();
  const [owner, setOwner] = useState();
  const [holders, setHolders] = useState([]);
  const [tokenInfo, setTokenInfo] = useState();
  const [hasUnlockable, setHasUnlockable] = useState(false);

  const [loading, setLoading] = useState();
  const [tokenOwnerLoading, setTokenOwnerLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const listings = useRef([]);
  const offers = useRef([]);
  const tradeHistory = useRef([]);
  const contentType = useRef();
  const moreItems = useRef([]);
  const tokenType = useRef();

  useEffect(() => {
    console.log({
      owner,
      holders,
      tokenInfo,
      hasUnlockable,
      loading,
      tokenOwnerLoading,
      historyLoading,
    });
  }, []);

  useEffect(() => {
    getItemDetails();
  }, [address, bundleID]);

  const getItemDetails = async () => {
    setLoading(true);
    setTokenOwnerLoading(true);
    setHistoryLoading(true);
    tradeHistory.current = [];
    try {
      const {
        data: {
          contentType: _contentType,
          history,
          likes,
          listings: _listings,
          offers: _offers,
          nfts,
          tokenType: type,
          uri,
          hasUnlockable: _hasUnlockable,
        },
      } = await fetchItemDetails(address, tokenID);

      contentType.current = _contentType;
      console.log('!contentType', contentType);
      tradeHistory.current = history
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .map(history => ({
          ...history,
          token: getTokenByAddress(history.paymentToken),
        }));
      setLiked(likes);
      setHasUnlockable(_hasUnlockable);
      listings.current = _listings.map(listing => ({
        ...listing,
        token: getTokenByAddress(listing.paymentToken),
      }));
      offers.current = _offers.map(offer => ({
        ...offer,
        token: getTokenByAddress(offer.paymentToken),
      }));

      moreItems.current = nfts;

      try {
        tokenType.current = type;
        if (type === 721) {
          const contract = await getERC721Contract(address);
          const res = await contract.ownerOf(tokenID);
          setOwner(res);
        } else if (type === 1155) {
          const { data: _tokenInfo } = await get1155Info(address, tokenID);
          setTokenInfo(_tokenInfo);
          try {
            const { data: _holders } = await getTokenHolders(address, tokenID);
            setHolders(_holders);
          } catch {
            setHolders([]);
          }
          setOwner(null);
        }
      } catch {
        setOwner(null);
      }
      let data;
      const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
      if (base64regex.test(uri)) {
        const string = atob(uri);
        data = JSON.parse(string);
      } else {
        const realUri = getRandomIPFS(uri);

        new URL(realUri);
        const response = await axios.get(realUri);
        data = response.data;
      }

      if (data[Object.keys(data)[0]].image) {
        data.image = getRandomIPFS(data[Object.keys(data)[0]].image);
        data.name = data[Object.keys(data)[0]].name;
        data.description = data[Object.keys(data)[0]].description;
      }

      if (data.properties?.royalty) {
        data.properties.royalty = parseInt(data.properties.royalty) / 100;
      }

      if (data.image) {
        data.image = getRandomIPFS(data.image);
      }

      setInfo(data);
    } catch (err) {
      console.log('!2 222222', err);

      try {
        console.warn(
          'Failed to retrieve Item data, fallback to fetching from contract'
        );
        const contract = await getERC721Contract(address);
        const tokenURI = await contract.tokenURI(tokenID);
        const realUri = getRandomIPFS(tokenURI);

        const { data } = await axios.get(realUri);

        if (data.image) {
          data.image = getRandomIPFS(data.image);
        }

        setInfo(data);
      } catch {
        history.replace('/404');
      }
    }
    setLoading(false);
    setTokenOwnerLoading(false);
    setHistoryLoading(false);
  };

  if (loading) {
    return (
      <div className="overflow-hidden">
        <Header />
        <div className="container">
          <Link to="/" className="btn btn-white btn-sm my-40">
            Back to home
          </Link>
          <div
            className="item_details"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress size={'1.5rem'} color="primary" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <Header />
      <div className="container">
        <Link to="/" className="btn btn-white btn-sm my-40">
          Back to home
        </Link>
        <div className="item_details">
          <div className="row sm:space-y-20">
            <div className="col-lg-6">
              <img className="item_img" src={info?.image} alt="" />
            </div>

            <div className="col-lg-6">
              <div className="space-y-20">
                <h3>{info?.name || ''}</h3>
                <div className="d-flex justify-content-between">
                  <div className="space-x-10 d-flex align-items-center">
                    <p>1 of 1</p>
                    <a href="#" className="likes space-x-3">
                      <i className="ri-heart-3-fill"></i>
                      <span className="txt_sm">{liked || 0}</span>
                    </a>
                  </div>
                  <div className="space-x-10 d-flex align-items-center">
                    <ShareButton />
                    <ReportButton />
                  </div>
                </div>
                <ViewProofButton />
                <ArtworkDetailPageDetailSection />

                <div className="numbers">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="space-y-5">
                        <p className="color_text">Minimum bid</p>
                        <h4>
                          2.4000{' '}
                          <span className="txt_sm color_text">
                            ETH/ $4769.88
                          </span>
                        </h4>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="space-y-5">
                        <p className="color_text">countdown</p>
                        <div
                          className="d-flex countdown_item
													align-items-center"
                        >
                          <div className="item">
                            <div className="number hours">
                              22<span></span>
                            </div>
                          </div>
                          <div className="dots">:</div>
                          <div className="item">
                            <div className="number minutes">
                              04<span></span>
                            </div>
                          </div>
                          <div className="dots">:</div>
                          <div className="item">
                            <div className="number seconds">
                              35<span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hr2"></div>
                <ArtworkDetailPageCreatorSection />

                <div className="d-flex space-x-20">
                  <a
                    href=""
                    className="btn btn-primary btn-lg"
                    data-toggle="modal"
                    data-target="#popup_buy"
                  >
                    Buy Now
                  </a>
                  <a
                    href=""
                    className="btn btn-grad btn-lg"
                    data-toggle="modal"
                    data-target="#popup_bid"
                  >
                    Place bid
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
