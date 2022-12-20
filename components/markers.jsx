import React, { useRef, useMemo, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
// mui
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ExpandMore } from '@mui/icons-material';

const Markers = ({ entrances, dot, setCrtDot, setMarkerArray }) => {
  const ref = useRef({});
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setMarkerArray((pre) => [...pre, ref.current]);
  }, []);

  return (
    <>
      <Marker
        ref={ref}
        position={[dot['x'], dot['y']]}
        eventHandlers={{ click: () => setCrtDot(dot) }}
      >
        <Popup closeButton={true}>
          <CardHeader title={entrances['TR_CNAME']} />
          <CardContent>
            {dot['memo'] && (
              <Typography variant="body2" color="text.secondary">
                {`登山口位置: ${dot['memo']}`}
              </Typography>
            )}
            {entrances['TR_SPECIAL'] && (
              <Typography variant="body2" color="text.secondary">
                {`登山口介紹 : ${entrances['TR_SPECIAL']}`}
              </Typography>
            )}
          </CardContent>
        </Popup>
      </Marker>
    </>
  );
};

export default Markers;
