import React, { useState } from 'react';

import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: 10,
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    backgroundImage: 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)'
  },
}));

const App = () => {
  const classes = useStyles();

  const [search, setSearch] = useState('');

  const handleChange = (evt) => {
    setSearch(evt.target.value);
  };

  return (
    <>
      <h1 className={classes.title}>Contacts</h1>
      <UserForm onChange={handleChange} search={search} />
      <UserList search={search} />
    </>
  );
}

export default App;
