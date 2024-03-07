import React, { useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import {Autocomplete,Box,TextField,Skeleton} from '@mui/material'
import font from '../themes/font.theme'
const mapState = {
  center: [55.76, 37.64],
  zoom: 17,
  controls: []
};

const AutocompleteMap = () => {
  const [yMap,setYMap] = useState(null)
  const [addressCoord,setAddressCoord] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [loadingMap, setLoadingMap] = useState(true)
  const [options,setOptions] = useState([])

  const handleFind = async (value) => {

    setInputValue(value)

    if(!yMap) return

    const res = await yMap.suggest(value)
    setOptions(res)
  }

  const handleClickToMap = async (e) => {
    const coords = e.get("coords")

    setAddressCoord(coords)

    const info = await yMap.geocode(coords)
    const geoObject = info.geoObjects.get(0)
    setInputValue(geoObject.getAddressLine())
  }

  const handleSelect = async (value) => {
    const res = await yMap.geocode(value)
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
      setInputValue(geoObject.getAddressLine())
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
        size={'small'}
        inputValue={inputValue}
        disablePortal
        sx={{...font}}
        options={options.map((option) => option.displayName)}
        onChange={(event, value) => {
          event && handleSelect(value);
        }}
        onInputChange={(event, value) => {
          event && handleFind(value);
        }}
        noOptionsText='Введите адрес'
        renderInput={(params) => <TextField {...params} label="Адрес доставки"/>}
      />
    </Box>
  );
}


export default AutocompleteMap
