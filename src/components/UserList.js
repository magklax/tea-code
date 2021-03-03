import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import FaceIcon from '@material-ui/icons/Face';
import { purple } from '@material-ui/core/colors';

const URL = 'https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const PinkCheckbox = withStyles({
  root: {
    color: purple[400],
    '&$checked': {
      color: purple[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const sortByProperty = (data, property) => {
  return data.sort((a, b) => {
    if (a[property] < b[property]) {
      return -1
    }
    if (a[property] > b[property]) {
      return 1
    }
    return 0;
  });
}

const UserList = ({ search }) => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [filtredUsers, setFiltredUsers] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const responce = await fetch(URL)
        .catch((err) => console.log(err));

      const data = await responce.json();
      const sortData = sortByProperty(data, "last_name");
      setUsers(sortData);
    }
    fetchData();
  }, []);

  const handleToggle = (id) => () => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    if (checked.length > 0) console.log(`Selected IDs: ${checked.join(', ')}`);
  }, [checked]);

  useEffect(() => {
    setFiltredUsers(users.filter((elem) => elem.first_name.toLowerCase().includes(search.toLowerCase())
      || elem.last_name.toLowerCase().includes(search.toLowerCase())))
  }, [search, users]);

  return (
    <List className={classes.root}>

      {filtredUsers.length > 0 && filtredUsers.map((user) => {
        const labelId = `users-list-item-${user.first_name}-label`;

        return (
          <ListItem
            key={user.id}
            role="list-item"
            onClick={handleToggle(user.id)}
            button
          >

            <ListItemIcon>
              <PinkCheckbox
                checked={checked.indexOf(user.id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>

            <ListItemAvatar>
              <Avatar>
                {user.avatar ? <img src={user.avatar} alt={user.last_name} /> : <FaceIcon />}
              </Avatar>
            </ListItemAvatar>


            <ListItemText
              id={labelId}
              primary={`${user.first_name}  ${user.last_name}`}
              secondary={user.email}
            />
          </ListItem>
        )
      })}
    </List >
  )
}

export default UserList;