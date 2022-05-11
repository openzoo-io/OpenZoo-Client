import {
  faDiscord, faInstagram,
  faMedium,
  faTelegramPlane, faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useWeb3React } from '@web3-react/core';
import { useApi } from 'api';
import axios from 'axios';
import cx from 'classnames';
import { Categories } from 'constants/filter.constants';
import { getSigner } from 'contracts';
import { ethers } from 'ethers';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { ClipLoader } from 'react-spinners';
import { getRandomIPFS } from 'utils';
import { default as showToast, default as toast } from 'utils/toast';
import Modal from '../Modal';
import styles from './styles.module.scss';
const EditCollectionModal = ({ visible, onClose }) => {
  const FORM_INITIAL = {
    // collectionName: null,
    description: null,
    siteUrl: null,
    twitterHandle: null,
    discord: null,
    instagramHandle: null,
    mediumHandle: null,
    telegram: null,
    logoImageHash: null,
    categories: [],
    erc721Address: null,
  }

  const { addr } = useParams();
  const { fetchCollection, apiUrl, updateCollection, getNonce } = useApi();
  const [form, setForm] = useState(FORM_INITIAL);
  const [errors, setErrors] = useState({
    name: null, description: null, logoImageHash: null,
  });
  const [formLoading, setFormLoading] = useState(true);
  const [logo, setLogo] = useState(null);
  const [logoChanged, setLogoChanged] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [saving, setSaving] = useState(false);
  const { authToken } = useSelector(state => state.ConnectWallet);
  const { account } = useWeb3React();
  const imageRef = useRef();
  const [collectionName, setCollectionName] = useState(null)

  const options = Categories.filter(cat => form.categories.indexOf(cat.id.toString()) === -1);
  const selectedCategories = Categories.filter(
    cat => form.categories.indexOf(cat.id.toString()) > -1
  );

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const selectCategory = catId => {
    setForm({ ...form, categories: [...form.categories, catId.toString()] });
    if (form.categories.length === 2) {
      setAnchorEl(null);
    }
  };

  const deselectCategory = catId => {
    setForm({ ...form, categories: form.categories.filter(id => id.toString() !== catId.toString()) });
  };

  const handleMenuOpen = e => {
    if (form.categories.length < 2) {
      setAnchorEl(e.currentTarget);
    }
  };
  const isMenuOpen = Boolean(anchorEl);
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
          <span className={styles.categoryLabel}>{cat.label}</span>
        </MenuItem>
      ))}
    </Menu>
  );

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

  const onDrop = useCallback(acceptedFiles => {
    setLogo(acceptedFiles[0]);
    setLogoChanged(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop,
    maxSize: 15728640,
  });

  const removeImage = () => {
    setLogo(null);
    setLogoChanged(true)
    if (imageRef.current) {
      imageRef.current.value = '';
    }
  };

  const validateRequired = (fieldName) => {
    if (form[fieldName].length === 0) {
      setErrors({ ...errors, [fieldName]: "This field can't be blank" });
    } else {
      setErrors({ ...errors, [fieldName]: null });
    }
  }

  const validate = {
    // collectionName: validateRequired.bind(this, "collectionName"),
    description: validateRequired.bind(this, "description"),
    logoImageHash: () => {
      logo !== null
      setErrors({ ...errors, logoImageHash: logo === null ? "Logo is required" : null })
    }
  }

  const uploadImage = async () => {
    return new Promise((resolve, reject) => {

      if (!logo || !logoChanged)
        return resolve();

      const img = new Image();
      img.src = URL.createObjectURL(logo);
      img.onload = function () {
        console.log(apiUrl)
        const w = this.width;
        const h = this.height;
        const size = Math.min(w, h);
        const x = (w - size) / 2;
        const y = (h - size) / 2;
        clipImage(img, x, y, size, size, async logodata => {
          try {
            const formData = new FormData();
            formData.append('collectionName', collectionName);
            formData.append('erc721Address', addr);
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
            setForm({ ...form, logoImageHash: logoImageHash });
            return resolve();
          } catch (e) {
            return reject(e);
          }
        });
      }
    })
  }

  useEffect(() => {
    if (!visible) {
      return;
    }

    fetchCollection(addr).then((response) => {
      setSaving(false);
      const collection = response.data;
      setForm({
        // collectionName: collection.collectionName,
        description: collection.description,
        siteUrl: collection.siteUrl,
        twitterHandle: collection.twitterHandle,
        discord: collection.discord,
        instagramHandle: collection.instagramHandle,
        mediumHandle: collection.mediumHandle,
        telegram: collection.telegram,
        logoImageHash: collection.logoImageHash,
        categories: collection.categories, erc721Address: addr
      });
      setCollectionName(collection.collectionName);
      setFormLoading(false);
      if (collection.logoImageHash)
        axios.get(`${getRandomIPFS('', true)}${collection.logoImageHash}`, { responseType: 'arraybuffer' }).then(response => {
          try {
            setLogo(new Blob([response.data]));
          } catch (e) {
            setLogo(null);
          }
        })
    });

  }, [visible]);

  const sign = async () => {
    const { data: nonce } = await getNonce(account, authToken);

    let signature;
    let signatureAddress;

    try {
      const signer = await getSigner();
      const msg = `Approve Signature on OpenZoo.io with nonce ${nonce}`;

      signature = await signer.signMessage(msg);
      signatureAddress = ethers.utils.verifyMessage(msg, signature);
      return { signature, signatureAddress };
    } catch (err) {
      toast(
        'error',
        'You need to sign the message to be able to register a collection.'
      );
      throw err;
    }
  }

  const saveCollection = async () => {
    setSaving(true);

    try {
      const signature = await sign();
      await uploadImage();
      await updateCollection(form, signature.signature, signature.signatureAddress, authToken);
      showToast('success', "The collection has been saved successfully. The page will reload in 2 seconds.");
      onClose();
      setTimeout(() => { window.location.reload(); }, 2000);
    } catch {
      showToast('error', "An error occurred while saving the form.");
    }
    finally {
      setSaving(false);
    }
  }

  const isValid = () => {
    return Object.values(errors).every(x => x === null);
  };

  return (<Modal
    visible={visible}
    onClose={onClose}
    title="Edit Collection">
    <div className='modal-body' style={{ maxHeight: "60vh", overflow: "auto" }}>
      {
        formLoading ? <ClipLoader size={100} /> :

          (<>
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
            {/* <div className={styles.inputTitle}>Name *</div>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                className={cx(styles.input, errors.collectionName && styles.hasError)}
                maxLength={30}
                placeholder="Collection Name"
                value={form.collectionName}
                onChange={e => setForm({ ...form, collectionName: e.target.value })}
                onBlur={validate.collectionName}
              />
              {form.collectionName && <div className={styles.lengthIndicator}>{form.collectionName.length}/30</div>}
              {errors.collectionName && <div className={styles.error}>{errors.collectionName}</div>}
            </div> */}

            <div className={styles.inputGroup}>
              <div className={styles.inputTitle}>Description *</div>
              <div className={styles.inputWrapper}>
                <textarea
                  className={cx(
                    styles.input,
                    styles.longInput,
                    errors.description && styles.hasError
                  )}
                  maxLength={250}
                  placeholder="Provide a description for your collection"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  onBlur={validate.description}
                />
                {form.description && <div className={styles.lengthIndicator}>
                  {form.description.length}/250
                </div>}
                {errors.description && (
                  <div className={styles.error}>{errors.description}</div>
                )}
              </div>
            </div>
            <div>
              <div className={styles.inputTitle}>Category</div>
              <div className={cx(styles.inputWrapper, styles.categoryList)}>
                {form.categories.length < 2 && (
                  <div
                    className={cx(
                      styles.categoryButton,
                      form.categories.length === 2 && styles.disabled,
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
                    <span className={styles.categoryLabel}>{cat.label}</span>
                    <CloseIcon className={styles.closeIcon} />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.inputTitle}>Social</div>
              <div className={styles.inputWrapper}>
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
                    value={form.siteUrl}
                    onChange={e => setForm({ ...form, siteUrl: e.target.value })}
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
                    value={form.discord}
                    onChange={e => setForm({ ...form, discord: e.target.value })}
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
                    value={form.twitterHandle}
                    onChange={e => setForm({ ...form, twitterHandle: e.target.value })}
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
                    value={form.instagramHandle}
                    onChange={e => setForm({ ...form, instagramHandle: e.target.value })}
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
                    value={form.mediumHandle}
                    onChange={e => setForm({ ...form, mediumHandle: e.target.value })}
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
                    value={form.telegram}
                    onChange={e => setForm({ ...form, telegram: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {renderMenu}
          </>
          )
      }
    </div>
    <div className="modal-footer">
      <div className={styles.buttonsWrapper}>
        <div
          className={cx(
            styles.createButton,
            (saving || !isValid()) && styles.disabled
          )}
          onClick={isValid() ? saveCollection : null}
        >
          {saving ? (
            <ClipLoader color="#FFF" size={16} />
          ) : (
            'Save'
          )}
        </div>
      </div>
    </div>
  </Modal>)
}

export default EditCollectionModal
