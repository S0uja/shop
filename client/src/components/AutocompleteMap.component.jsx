import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import {Autocomplete,Box,TextField,Skeleton,CircularProgress} from '@mui/material'
import font from '../themes/font.theme'
import { useDispatch, useSelector } from 'react-redux'
const mapState = {
  center: [56.76, 37.64],
  zoom: 17,
  controls: []
}

const AutocompleteMap = (props) => {
  const Addresses = useSelector(state => state.user.addresses)
  const [yMap,setYMap] = useState(null)
  const [addressCoord,setAddressCoord] = useState(null)
  const [loadingMap, setLoadingMap] = useState(true)
  const [options,setOptions] = useState(Addresses)
  const [loading, setLoading] = useState(false)

  if(!options.length && Addresses.length>0){
    setOptions(Addresses)
  }
  const filterOptions = (options) => {
    const uniqueOptions = [];
    const uniqueDisplayNames = [];
    
    options.forEach((option) => {
      if (!uniqueDisplayNames.includes(option.displayName)) {
        uniqueDisplayNames.push(option.displayName);
        uniqueOptions.push(option);
      }
    });

    return uniqueOptions;
  }
  const handleFind = async (value) => {
    props.setAddress(value)

    if(!yMap) return
    setLoading(true)
    const res = await yMap.suggest(value)
    setOptions(filterOptions(res))
    setLoading(false)
  }
  const handleClickToMap = async (e) => {
    const coords = e.get("coords")

    setAddressCoord(coords)

    const info = await yMap.geocode(coords)
    const geoObject = info.geoObjects.get(0)
    props.setAddress(geoObject.getAddressLine())
  }
  const handleSelectFromOptions = async (value) => {
    const res = await yMap.geocode(value)
    props.setAddress(value)
    setAddressCoord(res.geoObjects.get(0).geometry._coordinates)
  }
  const onYmapsLoad = (ymaps) => {
    setLoadingMap(false)
    setYMap(ymaps)
    const getUserAddress = async () => {
      const res = await ymaps.geolocation.get()
      const coords = res.geoObjects.position
      setAddressCoord(coords)
      const info = await ymaps.geocode(coords)
      const geoObject = info.geoObjects.get(0)
      setOptions(Addresses)
      setOptions(prevArray => [{displayName:geoObject.getAddressLine()},...prevArray]);
      props.setAddress(geoObject.getAddressLine())
    }
    getUserAddress()
  }

  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:2,mb:2}}>

      <Box sx={{widht:'100%',height:'100%',borderRadius:2,overflow:'hidden',display:{es:'none',xs:'none',sm:'none',md:'block',lg:'block',xl:'block'}}}>
        <YMaps
          query={{
            load: "package.full",
            apikey: 'daacc1dd-d76e-494c-9bbe-a4ec74ba8d0b',
            suggest_apikey: '5aa0030e-aed2-4fc3-8dbb-8e5529e9bbae'
          }}
        >
          <Map
            height={loadingMap?'0px':'300px'}
            state={
              addressCoord ? { ...mapState, center: addressCoord } : mapState
            }
            onLoad={onYmapsLoad}
            onClick={handleClickToMap}
          >
            {addressCoord && <Placemark geometry={addressCoord} />}
          </Map>
        </YMaps>
        {
        loadingMap && <Skeleton variant="rectangular" width={'100%'} height={300} />
        }
      </Box>
      
      <Autocomplete
        disableClearable={true}
        isOptionEqualToValue={() => true}
        ListboxProps={{style:{maxHeight:'150px'}}}
        size={'small'}
        loading={loading}
        loadingText="Поиск..."
        value ={props.address}
        autoSelect={options.lenght>0 && true}
        sx={{...font,borderRadius:4}}
        options={options.map((option) => option?.displayName)}
        clearText="Очистить"
        onChange={(event, value) => {
          event && handleSelectFromOptions(value);
        }}
        onInputChange={(event, value) => {
          event && handleFind(value);
        }}
        noOptionsText='Введите адрес'
        renderInput={(params) => (
          <TextField
            {...params}
            FormHelperTextProps={{
              style:  { 
                ...font,
                color:'',
                fontSize:''
              }
            }}
            InputLabelProps={{
              style: {
                  ...font,
                  color:'',
              }
            }}
            error={props.errors.status}
            helperText={props.errors.message}
            label='Адрес доставки'
            InputProps={{
              ...params.InputProps,
              style: {
                ...font,
                borderRadius: 8
              },
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress sx={{color:'#787878'}} size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}


export default AutocompleteMap
