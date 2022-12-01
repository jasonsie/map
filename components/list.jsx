import React, { useContext } from 'react';
// mui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
// css
import css from '../styles/All.module.scss';
// context
import { Context } from '../utilis/context';

const Ls = (props) => {
  const { data } = props;
  const [openId, setOpenId] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(undefined);
  const { state, dispatch } = useContext(Context);

  function handleOpen(id) {
    const isRepeated = openId.some((each) => each == id);
    isRepeated
      ? setOpenId((pre) => pre.filter((each) => each !== id))
      : setOpenId((pre) => [...pre, id]);
    setSelectedId((pre) => (pre === id ? undefined : id));
  }

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        flex: 4,
        overflowY: 'scroll',
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {data.map((each) => {
        const keyCtg = Object.keys(each)[0];
        const ctgLs = each[keyCtg];
        const id = data.indexOf(each);
        const isOpen = openId.some((each) => each == id);
        const singleOpen = data.indexOf(each) === selectedId;
        return (
          <>
            <ListItemButton onClick={() => handleOpen(id)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={keyCtg} />
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {ctgLs.map((entrance) => (
              <>
                <Collapse in={singleOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => dispatch({ type: 'setCrtDot', payload: entrance })}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={entrance[0]} />
                    </ListItemButton>
                  </List>
                </Collapse>
              </>
            ))}
          </>
        );
      })}
    </List>
  );
};

export default Ls;
