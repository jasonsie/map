import { useContext, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import css from '../styles/All.module.scss';
import CircularProgress from '@mui/material/CircularProgress';
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material';
// component
import NavBar from '../components/navBar';
const TrailMap = dynamic(() => import('../components/trailMap'), { ssr: false });

// fetch data and re-organize the data
import useFetch from '../utilis/useFetch';
//useContext + useReducer
import { ContextProvider } from '../utilis/context';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

export default function Home() {
  const { data, prov } = useFetch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mapRef = useRef(null);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  return (
    <>
      <ContextProvider>
        <Box sx={{ display: 'flex', height: '100vh' }}>
          <Box
            sx={{ position: 'fixed', textAlign: 'center', pt: 1, zIndex: 999, top: 10, left: 40 }}
          >
            <Button onClick={handleDrawerToggle}>
              <SettingsIcon />
            </Button>
          </Box>
          <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            {Object.keys(prov[0]).length !== 0 && (
              <NavBar
                data={prov}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                drawerWidth={drawerWidth}
              />
            )}
          </Box>
          <Box
            component="main"
            sx={{
              width: { sm: `calc(100vw - ${drawerWidth}px)` },
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              // flexGrow: 1,
              flex: 3,
            }}
          >
            {Object.keys(data[0]).length === 0 ? (
              <CircularProgress />
            ) : (
              <TrailMap data={{ allData: data, mapRef: mapRef }} />
            )}
          </Box>
        </Box>
      </ContextProvider>
    </>
  );
}
