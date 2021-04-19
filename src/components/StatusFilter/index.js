import React, { useState } from 'react';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import StarIcon from '@material-ui/icons/Star';

import FilterActions from '../../actions/filter.actions';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    paddingBottom: 20,
  },
  wrapper: {
    boxShadow: 'none',
  },
  header: {
    height: 48,
    minHeight: '48px !important',
    borderRadius: 5,
    backgroundColor: '#fff',
    boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontWeight: 500,
    fontSize: 18,
    paddingLeft: 20,
    flexShrink: 0,
    color: '#007BFF',
  },
  icon: {
    color: '#007BFF',
  },
  body: {
    backgroundColor: '#f8f8f8',
    padding: '14px 20px',
  },
  statusFormGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  formControl: {
    width: '100%',
    marginRight: 0,
  },
  selected: {
    color: '#007BFF',
  },
  statusSvgDiv: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ExploreStatus = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const {
    statusNew,
    statusBuyNow,
    statusHasOffers,
    statusOnAuction,
  } = useSelector(state => state.Filter);

  const handleStatusChange = (field, selected) => {
    dispatch(FilterActions.updateStatusFilter(field, selected));
  };

  const handleAccordionColElapse = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCheckgroupChanges = event => {
    let name = event.target.name;
    switch (name) {
      case 'buynow':
        handleStatusChange('statusBuyNow', !statusBuyNow);
        break;
      case 'new':
        handleStatusChange('statusNew', !statusNew);
        break;
      case 'hasOffers':
        handleStatusChange('statusHasOffers', !statusHasOffers);
        break;
      case 'onAuction':
        handleStatusChange('statusOnAuction', !statusOnAuction);
        break;
      default: {
        console.log('nothing to change');
      }
    }
  };

  return (
    <div className={classes.root}>
      <Accordion
        className={classes.wrapper}
        expanded={expanded === 'panel1'}
        onChange={handleAccordionColElapse('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={classes.icon} />}
          className={classes.header}
        >
          <div className={classes.statusSvgDiv}>
            <StarIcon className={classes.icon} />
            <span className={classes.heading}>Status</span>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.body}>
          <FormGroup className={classes.statusFormGroup}>
            <FormControlLabel
              className={cx(
                classes.formControl,
                statusNew ? classes.selected : null
              )}
              control={
                <Checkbox
                  checked={statusNew}
                  onChange={handleCheckgroupChanges}
                  name="new"
                />
              }
              label="New"
            />
            <FormControlLabel
              className={cx(
                classes.formControl,
                statusBuyNow ? classes.selected : null
              )}
              control={
                <Checkbox
                  checked={statusBuyNow}
                  onChange={handleCheckgroupChanges}
                  name="buynow"
                />
              }
              label="Buy Now"
            />
            <FormControlLabel
              className={cx(
                classes.formControl,
                statusHasOffers ? classes.selected : null
              )}
              control={
                <Checkbox
                  checked={statusHasOffers}
                  onChange={handleCheckgroupChanges}
                  name="hasOffers"
                />
              }
              label="Has Offers"
            />
            <FormControlLabel
              className={cx(
                classes.formControl,
                statusOnAuction ? classes.selected : null
              )}
              control={
                <Checkbox
                  checked={statusOnAuction}
                  onChange={handleCheckgroupChanges}
                  name="onAuction"
                />
              }
              label="On Auction"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ExploreStatus;