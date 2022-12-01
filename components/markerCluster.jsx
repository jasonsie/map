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

// import proj4 from 'proj4';

const MarkerCluster = ({ entrances, dot, setCrtDot, setMarkerArray }) => {
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
          {/* <Card sx={{ maxWidth: 345 }}> */}
          <CardHeader title={entrances['TR_CNAME']} subheader={dot['memo']} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {entrances['TR_SPECIAL']}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph></Typography>
              <Typography paragraph></Typography>
            </CardContent>
          </Collapse>
          {/* </Card> */}
        </Popup>
      </Marker>
    </>
  );
};

export default MarkerCluster;
