import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {

  },
}));

const UserForm = ({ search, onChange }) => {
  const classes = useStyles();

  return (
    <FormControl
      className={classes.root}
      noValidate
      autoComplete="off"
      fullWidth={true}
    >
      <TextField
        id="search"
        label="Search"
        variant="filled"
        value={search}
        onChange={onChange}
      />
    </FormControl>
  );
}

export default UserForm;