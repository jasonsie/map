import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import { trail } from './type';

const useFetch = () => {
  const [data, setData] = useState([{}]);
  const [prov, setProv] = useState([{}]);

  // 1. get the province structure for the sideebar
  function get_province_structure(res: trail[]) {
    // [{ctg:[1,2,3...]}]
    let pronvLs: [] = [];
    const rule = /(\D{2}縣{1})|(\D{2}市{1})/g;
    res.forEach((each) => {
      let TR_POSITION = each['TR_POSITION'].match(rule)[0];
      const TR_CNAME = each['TR_CNAME'];
      const TR_ENTRANCE = each['TR_ENTRANCE'];

      const idx = pronvLs.findIndex((each) => Object.keys(each)[0] === TR_POSITION);

      if (idx == -1) {
        const provObj = { [TR_POSITION]: [[TR_CNAME, TR_ENTRANCE]] };
        pronvLs.push(provObj);
      } else {
        pronvLs[idx][TR_POSITION].push([TR_CNAME, TR_ENTRANCE]);
      }
    });
    return pronvLs;
  }

  // transforming coordination
  function transform_tm2_to_WGS84(res: trail[]) {
    proj4.defs([
      [
        'EPSG:4326',
        '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees',
      ],
      [
        'EPSG:3826',
        '+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
      ],
      ['EPSG:3828', '+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=aust_SA'],
    ]);

    const EPSG3826 = new proj4.Proj('EPSG:3826'); //TWD97 121分帶
    const EPSG3828 = new proj4.Proj('EPSG:3828'); //TWD67 121分帶
    const EPSG4326 = new proj4.Proj('EPSG:4326'); //WGS84
    function paringCoord(entrance: any) {
      const newCoord = proj4(EPSG3828, EPSG4326, [entrance['x'], entrance['y']]);
      return { ...entrance, x: newCoord[1], y: newCoord[0] };
    }
    const updateRes = res.map((each) => {
      const entrances = each['TR_ENTRANCE'];
      const setRes = entrances.map((entrance) => paringCoord(entrance));
      return { ...each, TR_ENTRANCE: setRes };
    });

    return updateRes;
  }

  // 2. fetching and setting all data
  useEffect(() => {
    const staticData = fetch('/position.json')
      .then((res) => res.json())
      .then((staticData) => {
        return {
          staticData,
        };
      })
      .catch((err) => console.log(err));

    const apiData = fetch('https://recreation.forest.gov.tw/mis/api/BasicInfo/Trail')
      .then((res) => res.json())
      .then((res) => {
        const apiData = transform_tm2_to_WGS84(res);
        return {
          apiData,
        };
      })
      .catch((err) => console.log(err));

    Promise.all([staticData, apiData])
      .then(([staticOne, apiOne]) => {
        const { staticData }: any = staticOne;
        const { apiData }: any = apiOne;
        const getProv = get_province_structure([...staticData, ...apiData]);

        setData([...staticData, ...apiData]);
        setProv(getProv);
      })
      .catch((err) => console.log(err));
  }, []);

  return { data, prov };
};

export default useFetch;
