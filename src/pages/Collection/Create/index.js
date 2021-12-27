/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import cx from 'classnames';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Checkbox, FormGroup, Menu, MenuItem } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloseIcon from '@material-ui/icons/Close';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { ClipLoader } from 'react-spinners';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import showToast from 'utils/toast';

import { Categories } from 'constants/filter.constants';
import HeaderActions from 'actions/header.actions';
import BootstrapTooltip from 'components/BootstrapTooltip';
import PriceInput from 'components/PriceInput';
import toast from 'utils/toast';
import { useApi } from 'api';
import { useFactoryContract, getSigner } from 'contracts';

import nftIcon from 'assets/svgs/nft_black.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import {
  faDiscord,
  faTwitter,
  faInstagram,
  faMedium,
  faTelegramPlane
} from '@fortawesome/free-brands-svg-icons';

import styles from './styles.module.scss';
import { formatError, isAddress } from 'utils';
import { PageLayout } from 'components/Layouts';
import { ADMIN_ADDRESS } from 'constants/index';
import { TokenChoiceCard } from './components/TokenChoiceCard';
import { useDropzone } from 'react-dropzone';

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

const CustomRadio = withStyles({
  root: {
    '&$checked': {
      color: '#00a59a',
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const CollectionCreate = ({ isRegister }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { account } = useWeb3React();

  const { apiUrl, getNonce } = useApi();
  const { isModerator } = useSelector(state => state.ConnectWallet);
  const {
    getFactoryContract,
    getPrivateFactoryContract,
    getArtFactoryContract,
    getPrivateArtFactoryContract,
    createNFTContract,
  } = useFactoryContract();

  const onDrop = useCallback(acceptedFiles => {
    setLogo(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop,
    maxSize: 15728640,
  });

  // const inputRef = useRef(null);
  const imageRef = useRef();

  const { authToken } = useSelector(state => state.ConnectWallet);

  const [deploying, setDeploying] = useState(false);
  const [creating, setCreating] = useState(false);
  const [logo, setLogo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(null);
  const [symbol, setSymbol] = useState('');
  const [symbolError, setSymbolError] = useState(null);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(null);
  const [royalty, setRoyalty] = useState('');
  const [feeRecipient, setFeeRecipient] = useState('');
  const [recipientError, setRecipientError] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [discord, setDiscord] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [mediumHandle, setMediumHandle] = useState('');
  const [telegram, setTelegram] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [isSingle, setIsSingle] = useState(true);
  const [isAcceptUploadRight, setIsAcceptUploadRight] = useState(false);
  const [isAcceptTerms, setIsAcceptTerms] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    dispatch(HeaderActions.toggleSearchbar(true));
  }, []);

  useEffect(() => {
    setLogo(null);
    setAnchorEl(null);
    setSelected([]);
    setName('');
    setNameError(null);
    setSymbol('');
    setSymbolError(null);
    setDescription('');
    setDescriptionError(null);
    setEmail('');
    setEmailError(null);
    setAddress('');
    setAddressError(null);
    setSiteUrl('');
    setDiscord('');
    setTwitterHandle('');
    setInstagramHandle('');
    setMediumHandle('');
    setTelegram('');
  }, [isRegister]);

  const options = Categories.filter(cat => selected.indexOf(cat.id) === -1);
  const selectedCategories = Categories.filter(
    cat => selected.indexOf(cat.id) > -1
  );

  const removeImage = () => {
    setLogo(null);
    if (imageRef.current) {
      imageRef.current.value = '';
    }
  };

  // const handleFileSelect = e => {
  //   if (e.target.files.length > 0) {
  //     const file = e.target.files[0];

  //     const reader = new FileReader();

  //     reader.onload = function(e) {
  //       setLogo(e.target.result);
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // };

  const validateName = () => {
    if (name.length === 0) {
      setNameError("This field can't be blank");
    } else {
      setNameError(null);
    }
  };

  const validateSymbol = () => {
    if (symbol.length === 0) {
      setSymbolError("This field can't be blank");
    } else if (symbol.includes(' ')) {
      setSymbolError("Symbol can't include spaces");
    } else {
      setSymbolError(null);
    }
  };

  const validateDescription = () => {
    if (description.length === 0) {
      setDescriptionError("This field can't be blank");
    } else {
      setDescriptionError(null);
    }
  };

  const validateFeeRecipient = () => {
    if (feeRecipient.length === 0) {
      setRecipientError("This field can't be blank");
    } else if (!isAddress(feeRecipient)) {
      setRecipientError('Invalid address');
    } else {
      setRecipientError(null);
    }
  };

  const validEmail = email => /(.+)@(.+){2,}\.(.+){2,}/.test(email);

  const validateEmail = () => {
    if (email.length === 0) {
      setEmailError("This field can't be blank");
    } else if (validEmail(email)) {
      setEmailError(null);
    } else {
      setEmailError('Invalid email address.');
    }
  };

  const validateAddress = () => {
    if (address.length === 0) {
      setAddressError("This field can't be blank");
    } else {
      setAddressError(null);
    }
  };

  const handleMenuOpen = e => {
    if (selected.length < 2) {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const selectCategory = catId => {
    setSelected([...selected, catId]);
    if (selected.length === 2) {
      setAnchorEl(null);
    }
  };

  const deselectCategory = catId => {
    setSelected(selected.filter(id => id !== catId));
  };

  const isValid = (() => {
    if (!logo) return false;
    if (nameError) return false;
    if (descriptionError) return false;
    if (addressError) return false;
    if (!isRegister && (symbol.length === 0 || symbol.includes(' ')))
      return false;
    if (email.length === 0) return false;
    if (!validEmail(email)) return false;
    if (isRegister && !isAddress(feeRecipient)) return false;
    if (!isAcceptUploadRight || !isAcceptTerms) return false;
    return true;
  })();

  const clipImage = (image, clipX, clipY, clipWidth, clipHeight, cb) => {
    const CANVAS_SIZE = 128;
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      clipX,
      clipY,
      clipWidth,
      clipHeight,
      0,
      0,
      CANVAS_SIZE,
      CANVAS_SIZE
    );
    cb(canvas.toDataURL());
  };

  const handleRegister = async () => {
    if (creating) return;

    setCreating(true);

    const img = new Image();
    img.onload = function () {
      const w = this.width;
      const h = this.height;
      const size = Math.min(w, h);
      const x = (w - size) / 2;
      const y = (h - size) / 2;
      clipImage(img, x, y, size, size, async logodata => {
        try {
          const { data: nonce } = await getNonce(account, authToken);

          let signature;
          let signatureAddress;

          try {
            const signer = await getSigner();
            const msg = `Approve Signature on OpenZoo.io with nonce ${nonce}`;

            signature = await signer.signMessage(msg);
            signatureAddress = ethers.utils.verifyMessage(msg, signature);
          } catch (err) {
            toast(
              'error',
              'You need to sign the message to be able to register a collection.'
            );
            setCreating(false);
            return;
          }

          const formData = new FormData();
          formData.append('collectionName', name);
          formData.append('erc721Address', address);
          formData.append('imgData', logodata);
          const result = await axios({
            method: 'post',
            url: `${apiUrl}/ipfs/uploadCollectionImage2Server`,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${authToken}`,
            },
          });

          const logoImageHash = result.data.data;
          const data = {
            email,
            erc721Address: address,
            collectionName: name,
            description,
            categories: selected.join(','),
            logoImageHash,
            siteUrl,
            discord,
            twitterHandle,
            instagramHandle,
            mediumHandle,
            telegram,
            signature,
            signatureAddress,
            royalty,
            feeRecipient,
          };

          await axios({
            method: 'post',
            url: `${apiUrl}/collection/collectiondetails`,
            data: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          });

          toast(
            'success',
            'Application submitted!',
            'Your collection registration application is successfully submitted for review.\nOnce approved, you will get an email notification.'
          );

          setCreating(false);

          history.push('/explore');
        } catch (e) {
          console.log('Error: ', e);
          setCreating(false);
        }
      });
    };
    img.src = URL.createObjectURL(logo);
  };

  const handleCreate = async () => {
    
    setDeploying(true);
    try {
      const tx = await createNFTContract(
        isSingle
          ? isPrivate
            ? await getPrivateFactoryContract()
            : await getFactoryContract()
          : isPrivate
            ? await getPrivateArtFactoryContract()
            : await getArtFactoryContract(),
        name,
        symbol,
        ethers.utils.parseEther('0'),
        account
      );
      const res = await tx.wait();
      console.log(res);
      res.events.map(evt => {
        if (
          evt.topics[0] ===
          '0x2d49c67975aadd2d389580b368cfff5b49965b0bd5da33c144922ce01e7a4d7b'
        ) {
          setDeploying(false);
          setCreating(true);

          const address = ethers.utils.hexDataSlice(evt.data, 44);

          const img = new Image();
          img.onload = function () {
            const w = this.width;
            const h = this.height;
            const size = Math.min(w, h);
            const x = (w - size) / 2;
            const y = (h - size) / 2;
            clipImage(img, x, y, size, size, async logodata => {
              try {
                const { data: nonce } = await getNonce(account, authToken);

                let signature;
                try {
                  const signer = await getSigner();
                  signature = await signer.signMessage(
                    `Approve Signature on OpenZoo.io with nonce ${nonce}`
                  );
                } catch (err) {
                  toast(
                    'error',
                    'You need to sign the message to be able to create a collection.'
                  );
                  setCreating(false);
                  return;
                }

                const formData = new FormData();
                formData.append('collectionName', name);
                formData.append('erc721Address', address);
                formData.append('imgData', logodata);
                const result = await axios({
                  method: 'post',
                  url: `${apiUrl}/ipfs/uploadCollectionImage2Server`,
                  data: formData,
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authToken}`,
                  },
                });
                const logoImageHash = result.data.data;
                const data = {
                  email,
                  erc721Address: address,
                  collectionName: name,
                  description,
                  categories: selected.join(','),
                  logoImageHash,
                  siteUrl,
                  discord,
                  twitterHandle,
                  instagramHandle,
                  mediumHandle,
                  telegram,
                  signature,
                };
                await axios({
                  method: 'post',
                  url: `${apiUrl}/collection/collectiondetails`,
                  data: JSON.stringify(data),
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                  },
                });

                toast('success', 'Collection created successfully!');

                setCreating(false);

                history.push('/explore');
              } catch (e) {
                setCreating(false);
              }
            });
          };
          img.src = URL.createObjectURL(logo);
        }
      });
    } catch (err) {
      showToast('error', formatError(err));
      console.log(err);
      setDeploying(false);
    }
  };

  const menuId = 'select-category-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: -48, horizontal: 0 }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      classes={{
        paper: cx(styles.menu, 'col-lg-3 col-md-6'),
      }}
    >
      {options.map((cat, idx) => (
        <MenuItem
          key={idx}
          className={styles.category}
          onClick={() => {
            selectCategory(cat.id);
            handleMenuClose(0);
          }}
        >
          {/*<img src={cat.icon} className={styles.categoryImage} />*/}
          <span className={styles.categoryLabel}>{cat.label}</span>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <PageLayout
      containerClassName="form-container-page box"
      cover={
        !isRegister && (
          <div className="container" style={{paddingLeft:0,paddingRight:0}}>
            
            <div className="d-flex justify-content-between mt-40 space-x-40 sm:space-x-20">
              <TokenChoiceCard
                title="SINGLE TOKEN"
                subtitle="STANDARD COLLECTION"
                network="WRC721"
                detail="Your collectible will be one of a kind"
                selected={isSingle}
                onClick={() => setIsSingle(true)}
              />
              <TokenChoiceCard
                title="MULTI TOKEN"
                subtitle="STANDARD COLLECTION"
                network="WRC1155"
                detail="Your collectible will have multiple entities of one kind"
                selected={!isSingle}
                onClick={() => setIsSingle(false)}
              />
            </div>
          </div>
        )
      }
    >
      <div className="row w-full py-20 px-40 mb-50">
        <div className="col-lg-4 col-md-8 space-y-20">
          <h4>{isRegister ? 'COLLECTION REGISTOR' : 'COLLECTION CREATOR'}</h4>
          <p>
          NFTs can represent essentially any type of digital file, with artists
creating NFTs featuring images, videos, gifs, audio files, or a 
combination of each.
          </p>
          {!isRegister &&
            (isModerator ||
              account?.toLowerCase() && ADMIN_ADDRESS.includes(account?.toLowerCase())) && (
              <div className={styles.inputGroup}>
                <RadioGroup
                  className={styles.inputWrapper}
                  value={JSON.stringify(isPrivate)}
                  onChange={e => setIsPrivate(e.currentTarget.value === 'true')}
                >
                  <FormControlLabel
                    classes={{
                      root: cx(styles.option, !isPrivate && styles.active),
                      label: styles.optionLabel,
                    }}
                    value="false"
                    control={<CustomRadio color="primary" />}
                    label="Allow others mint NFTs under my collection"
                  />
                  <FormControlLabel
                    classes={{
                      root: cx(styles.option, isPrivate && styles.active),
                      label: styles.optionLabel,
                    }}
                    value="true"
                    control={<CustomRadio color="primary" />}
                    label="Only I can mint NFTs under my collection"
                  />
                </RadioGroup>
              </div>
            )}
          <div
            {...getRootProps({
              className: cx(styles.uploadCont, 'md:mx-auto'),
            })}
          >
            <input {...getInputProps()} ref={imageRef} />
            {logo ? (
              <>
                <img className={styles.image} src={URL.createObjectURL(logo)} />
                <div className={styles.overlay}>
                  <CloseIcon className={styles.remove} onClick={removeImage} />
                </div>
              </>
            ) : (
              <>
                <div className={styles.uploadtitle}>
                  Drop Collection logo image here or&nbsp;
                  <span
                    className={styles.browse}
                    onClick={() => imageRef.current?.click()}
                  >
                    Browse
                  </span>
                </div>
                <div className={cx(styles.uploadsubtitle, 'text-center')}>
                  <strong>JPG, PNG</strong>
                  <p>300x300 recommend</p>
                </div>
              </>
            )}
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <CustomCheckbox
                  classes={{ root: 'pt-0' }}
                  onChange={e => setIsAcceptUploadRight(e.target.checked)}
                />
              }
              label="I confirm that I'm the owner, or have the rights of publication and sale of this collection. *"
              className="align-items-start"
              classes={{ root: 'pt-20' }}
            />
            <FormControlLabel
              control={
                <CustomCheckbox
                  classes={{ root: 'pt-0' }}
                  onChange={e => setIsAcceptTerms(e.target.checked)}
                />
              }
              label="I accept OpenZoo's Terms and Conditions. *"
              className="align-items-start"
            />
          </FormGroup>
        </div>

        <div className="col-lg-4 col-md-8 space-y-20">
          <div>
            <div className={styles.inputTitle}>Category</div>
            <div className={cx(styles.inputWrapper, styles.categoryList)}>
              {selected.length < 2 && (
                <div
                  className={cx(
                    styles.categoryButton,
                    selected.length === 2 && styles.disabled,
                    'w-100 border-none bg_input txt_sm color_text'
                  )}
                  onClick={handleMenuOpen}
                >
                  Add Category
                </div>
              )}
              {selectedCategories.map((cat, idx) => (
                <div
                  className={styles.selectedCategory}
                  key={idx}
                  onClick={() => deselectCategory(cat.id)}
                >
                  {/*<img src={cat.icon} className={styles.categoryIcon} />*/}
                  <span className={styles.categoryLabel}>{cat.label}</span>
                  <CloseIcon className={styles.closeIcon} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className={styles.inputTitle}>Name *</div>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                className={cx(styles.input, nameError && styles.hasError)}
                maxLength={30}
                placeholder="Collection Name"
                value={name}
                onChange={e => setName(e.target.value)}
                onBlur={validateName}
              />
              <div className={styles.lengthIndicator}>{name.length}/30</div>
              {nameError && <div className={styles.error}>{nameError}</div>}
            </div>
          </div>
          {!isRegister && (
            <div>
              <div className={styles.inputTitle}>
                Symbol *&nbsp;
                <BootstrapTooltip
                  title="A symbol is used when we deploy your NFT contract. If you are not sure about symbol, be aware that name and symbol share the same value."
                  placement="top"
                >
                  <HelpOutlineIcon />
                </BootstrapTooltip>
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  className={cx(styles.input, symbolError && styles.hasError)}
                  maxLength={20}
                  placeholder="Collection Symbol"
                  value={symbol}
                  onChange={e => setSymbol(e.target.value)}
                  onBlur={validateSymbol}
                />
                <div className={styles.lengthIndicator}>{symbol.length}/20</div>
                {symbolError && (
                  <div className={styles.error}>{symbolError}</div>
                )}
              </div>
            </div>
          )}
          <div className={styles.inputGroup}>
            <div className={styles.inputTitle}>Description *</div>
            <div className={styles.inputWrapper}>
              <textarea
                className={cx(
                  styles.input,
                  styles.longInput,
                  descriptionError && styles.hasError
                )}
                maxLength={250}
                placeholder="Provide a description for your collection"
                value={description}
                onChange={e => setDescription(e.target.value)}
                onBlur={validateDescription}
              />
              <div className={styles.lengthIndicator}>
                {description.length}/250
              </div>
              {descriptionError && (
                <div className={styles.error}>{descriptionError}</div>
              )}
            </div>
          </div>
          {isRegister && (
            <div className={styles.inputGroup}>
              <div className={styles.inputTitle}>
                Royalty *&nbsp;
                <BootstrapTooltip
                  title="Each NFT under this collection exchanged through OpenZoo will have a percentage of sale given to nominated wallet address."
                  placement="top"
                >
                  <HelpOutlineIcon />
                </BootstrapTooltip>
              </div>
              <div className={styles.inputWrapper}>
                <PriceInput
                  className={styles.input}
                  placeholder="Collection Royalty"
                  decimals={2}
                  value={'' + royalty}
                  onChange={val =>
                    val[val.length - 1] === '.'
                      ? setRoyalty(val)
                      : setRoyalty(Math.min(100, +val))
                  }
                />
              </div>
            </div>
          )}

          {isRegister && (
            <div className={styles.inputGroup}>
              <div className={styles.inputTitle}>
                Fee Recipient *&nbsp;
                <BootstrapTooltip
                  title="The wallet address to receive royalties from each sale in this collection."
                  placement="top"
                >
                  <HelpOutlineIcon />
                </BootstrapTooltip>
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  className={cx(
                    styles.input,
                    recipientError && styles.hasError
                  )}
                  placeholder="Fee Recipient"
                  value={feeRecipient}
                  onChange={e => setFeeRecipient(e.target.value)}
                  onBlur={validateFeeRecipient}
                />
                {recipientError && (
                  <div className={styles.error}>{recipientError}</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="col-lg-4 col-md-8 space-y-20">
          <div className={styles.inputGroup}>
            <div className={styles.inputTitle}>Links (complete URL)*</div>
            <div className={styles.inputWrapper}>
              <div className={cx(styles.linksWrapper, 'space-y-10')}>
                {isRegister && (
                  <>
                    <div
                      className={cx(
                        styles.linkItem,
                        addressError && styles.hasError
                      )}
                    >
                      <div className={styles.linkIconWrapper}>
                        <div className={styles.linkIcon}>
                          <img src={nftIcon} className={styles.linkIconImg} />
                        </div>
                      </div>
                      <input
                        type="text"
                        className={styles.linkInput}
                        placeholder="Your collection's address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        onBlur={validateAddress}
                      />
                    </div>
                    {addressError && (
                      <div className={styles.error}>{addressError}</div>
                    )}
                  </>
                )}
                <div className={styles.linkItem}>
                  <div className={styles.linkIconWrapper}>
                    <div className={styles.linkIcon}>
                      <FontAwesomeIcon icon={faGlobe} size="lg" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className={styles.linkInput}
                    placeholder="Website"
                    value={siteUrl}
                    onChange={e => setSiteUrl(e.target.value)}
                  />
                </div>
                <div className={styles.linkItem}>
                  <div className={styles.linkIconWrapper}>
                    <div className={styles.linkIcon}>
                      <FontAwesomeIcon icon={faDiscord} size="lg" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className={styles.linkInput}
                    placeholder="Discord"
                    value={discord}
                    onChange={e => setDiscord(e.target.value)}
                  />
                </div>
                <div className={styles.linkItem}>
                  <div className={styles.linkIconWrapper}>
                    <div className={styles.linkIcon}>
                      <FontAwesomeIcon icon={faTwitter} size="lg" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className={styles.linkInput}
                    placeholder="Twitter"
                    value={twitterHandle}
                    onChange={e => setTwitterHandle(e.target.value)}
                  />
                </div>
                <div className={styles.linkItem}>
                  <div className={styles.linkIconWrapper}>
                    <div className={styles.linkIcon}>
                      <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className={styles.linkInput}
                    placeholder="Instagram"
                    value={instagramHandle}
                    onChange={e => setInstagramHandle(e.target.value)}
                  />
                </div>
                <div className={styles.linkItem}>
                  <div className={styles.linkIconWrapper}>
                    <div className={styles.linkIcon}>
                      <FontAwesomeIcon icon={faMedium} size="lg" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className={styles.linkInput}
                    placeholder="Medium"
                    value={mediumHandle}
                    onChange={e => setMediumHandle(e.target.value)}
                  />
                </div>
                <div className={styles.linkItem}>
                  <div className={styles.linkIconWrapper}>
                    <div className={styles.linkIcon}>
                      <FontAwesomeIcon icon={faTelegramPlane} size="lg" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className={styles.linkInput}
                    placeholder="Telegram"
                    value={telegram}
                    onChange={e => setTelegram(e.target.value)}
                  />
                </div>

  
 
              </div>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputTitle}>
              Email Address *&nbsp;
              <BootstrapTooltip
                title="We will use this email to notify you about your collection application. This will not be shared with others."
                placement="top"
              >
                <HelpOutlineIcon />
              </BootstrapTooltip>
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                className={cx(styles.input, emailError && styles.hasError)}
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={validateEmail}
              />
              {emailError && <div className={styles.error}>{emailError}</div>}
            </div>
          </div>
          <div>
            <strong>Note</strong>
            <p>
            The process of minting NFT is an irreversible process. Please make sure all of the above details are correct.
            </p>
          </div>
          <div className={styles.buttonsWrapper}>
            {isRegister ? (
              <div
                className={cx(
                  styles.createButton,
                  (creating || !isValid) && styles.disabled
                )}
                onClick={isValid ? handleRegister : null}
              >
                {creating ? (
                  <ClipLoader color="#FFF" size={16} />
                ) : (
                  'REGISTER COLLECTION'
                )}
              </div>
            ) : (
              <div
                className={cx(
                  styles.createButton,
                  (creating || deploying || !isValid) && styles.disabled
                )}
                onClick={
                  isValid && !creating && !deploying ? handleCreate : null
                }
              >
                {creating ? (
                  <ClipLoader color="#FFF" size={16} />
                ) : deploying ? (
                  'Deploying'
                ) : (
                  'CREATE COLLECTION'
                )}
              </div>
            )}
          </div>
         
        </div>
      </div>
      {renderMenu}
    </PageLayout>
  );
};

export default CollectionCreate;
