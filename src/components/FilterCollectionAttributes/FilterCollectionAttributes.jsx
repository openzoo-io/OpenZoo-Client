import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from 'api';
import {
  Chip,
  Grid,
  Checkbox,
  Slider,
  TextField,
  Popper,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './FilterCollectionAttributes.css';
import { useDispatch } from 'react-redux';
import FilterActions from 'actions/filter.actions';
import { Contracts } from 'constants/networks';
const ENV = process.env.REACT_APP_ENV;
const CHAIN = ENV === 'MAINNET' ? 888 : 999;


export function FilterCollectionAttributes({
  hidden = true,
  hideFunction,
  toggleAttributeButton,
}) {
  const { getAttributeFilterData } = useApi();
  const params = useParams();
  const [filterData, setFilterData] = useState([]);
  const [filterableFilterData, setFilterableFilterData] = useState([]);
  const [formData, setFormData] = useState({});
  const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState(true);
  const [isResetButtonDisabled, setIsResetButtonDisabled] = useState(true);
  const [resetCounter, setResetCounter] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    //alert('reset');
    dispatch(FilterActions.updateAttributeFilter({}));
    setFilterableFilterData([]);
    setFormData({});
    setResetCounter(0);
    setFilterData([]);
    hideFunction();
    fetchFilterData();
  }, [params]);

  useEffect(() => {
    setIsApplyButtonDisabled(Object.keys(formData).length === 0);
    setIsResetButtonDisabled(Object.keys(formData).length === 0);
  }, [formData]);

  useEffect(() => {
    if (resetCounter === 0) return;
    apply();
  }, [resetCounter]);

  useEffect(() => {
    setFilterableFilterData(
      filterData.filter(
        data =>
          (data.isNumeric && data.value.min !== data.value.max) ||
          (!data.isNumeric && data.value.length > 1)
      )
    );
  }, [filterData]);

  useEffect(() => {
    toggleAttributeButton(filterableFilterData.length);
  }, [filterableFilterData]);

  const fetchFilterData = async () => {
    try {
      let data = await getAttributeFilterData(params.addr);
      setFilterData(data);
    } catch (e) {
      setFilterData([]);
    }
  };

  const renderOptions = () => {
    if (!filterData) return;

    const inputTemplate = params => (
      <TextField {...params} placeholder="Select..." />
    );

    const optionTemplate = (option, state) => {
      const checkboxStyle = {
        color: '#00a59a',
      };

      const chipStyle = {
        background: '#f9bb32',
        color: '#fff',
        fontSize: '.7rem',
        borderColor: '#fff',
      };

      return (
        <Grid style={{ alignItems: 'center', fontSize: '.8rem' }} container>
          <Grid item xs={3}>
            <Checkbox style={checkboxStyle} checked={state.selected} />
          </Grid>
          <Grid item xs={6}>
            {option.label || option.value}
          </Grid>
          <Grid style={{ textAlign: 'right' }} item xs={3}>
            <Chip style={chipStyle} label={`${option.count}`} size="small" />
          </Grid>
        </Grid>
      );
    };

    const tagTemplate = (value, getTagProps) =>
      value.map((option, index) => {
        return (
          <Chip
            className="autocomplete-chip"
            key={option.value}
            label={option.label || option.value}
            size="small"
            {...getTagProps({ index })}
          />
        );
      });

    const numericInputTemplate = (key, data) => (
      <Grid className="input-container" key={key} item xs={12} md={3}>
        <h6>{key}</h6>
        <p className="slider-info">
          <strong>Between:</strong>{' '}
          {key in formData
            ? `${formData[key].value[0]} - ${formData[key].value[1]}`
            : `${data.min} - ${data.max}`}
        </p>
        <Slider
          valueLabelDisplay="auto"
          defaultValue={[data.min, data.max]}
          min={data.min}
          max={data.max}
          onChange={(_e, newValue) => {
            setFormData({
              ...formData,
              [key]: { value: newValue, isNumeric: true },
            });
          }}
          value={formData?.[key]?.value ?? [data.min, data.max]}
        />
      </Grid>
    );

    const popperTemplate = function(props) {
      const styles = {
        background: '#fff',
        marginTop: 6,
        width: 280,
      };
      return <Popper {...props} style={styles} placement="bottom-start" />;
    };

    // const parseZooKeeper = (key, value) => {
    //         console.log('key',key);
    //         console.log('value',value);
    //           if (value==1)
    //           {
    //             console.log('done')
    //             return 'kuay';
    //           }

    //         return value;
    //       }

    const autoCompleteInputTemplate = (key, data) => {
      let key_display = key;

      if (params.addr === Contracts[CHAIN].zooBooster.toLowerCase()) { // Zoo Booster //
        if (key === 'item') {
          key_display = 'class';
          const booster_cat = ['N','R','SR','SSR','UR'];
          data.map((v,i) => {
              data[i].label = booster_cat[Number(v.value)-1];
          });
        }
        if (key === 'category')
        {
          const booster_cat = ['Fruits','Foods','Sweets','Potions','Spices','Magic'];
          data.map((v,i) => {
              data[i].label = booster_cat[Number(v.value)-1];
          });
        }
        if (key === 'level')
        {
          const booster_cat = ['★☆☆','★★☆','★★★','MAX'];
          data.map((v,i) => {
              data[i].label = booster_cat[Number(v.value)-1];
          });
        }
      }

      return (
        <Grid className="input-container" key={key} item xs={12} md={3}>
          <h6>{key_display.toLowerCase()}</h6>
          {
            <Autocomplete
              PopperComponent={popperTemplate}
              size="small"
              multiple
              id={key}
              getOptionLabel={option => option.value}
              options={data}
              disableCloseOnSelect
              limitTags={1}
              noOptionsText="No results..."
              renderInput={inputTemplate}
              renderOption={optionTemplate}
              renderTags={tagTemplate}
              onChange={(_e, newValue) => {
                setFormData({
                  ...formData,
                  [key]: { value: newValue, isNumeric: false },
                });
              }}
              value={formData[key]?.value ?? []}
              getOptionSelected={(option, value) =>
                option.value === value.value
              }
            />
          }
        </Grid>
      );
    };

    const inputElements = filterableFilterData.map(data => {
      return data.isNumeric
        ? numericInputTemplate(data._id, data.value)
        : autoCompleteInputTemplate(data._id, data.value);
    });

    return (
      <Grid container spacing={4}>
        {inputElements}
      </Grid>
    );
  };

  const apply = () => {
    dispatch(FilterActions.updateAttributeFilter(formData));
    setIsApplyButtonDisabled(true);
  };

  const reset = () => {
    setFormData({});
    setResetCounter(resetCounter + 1);
  };

  return hidden ? null : (
    <div className="attribute-filter-container">
      <div className="filter-header filter-container">
        <Grid container>
          <Grid item xs={6}>
            <h4 className="title">Filter Attributes</h4>
          </Grid>
          <Grid className="filter-header-buttons text-right" item xs={6}>
            <button
              className="btn btn-white btn-sm"
              onClick={() => hideFunction()}
            >
              <i className="ri-close-line color_red"></i>
              Close
            </button>
          </Grid>
        </Grid>
      </div>
      <div className="filter-container">{renderOptions()}</div>
      <div className="filter-footer filter-container text-right">
        <button
          disabled={isResetButtonDisabled}
          className="btn btn-white btn-sm"
          onClick={reset}
        >
          <i className="ri-restart-line color_red"></i> Reset
        </button>
        <button
          disabled={isApplyButtonDisabled}
          className="btn btn-primary btn-sm"
          onClick={apply}
        >
          <i className="ri-check-line"></i>
          Apply
        </button>
      </div>
    </div>
  );
}
