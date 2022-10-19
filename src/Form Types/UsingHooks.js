import React, { useReducer } from "react";
import {
  Button,
  TextField,
  Container,
  CssBaseline,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import pizzaTypes from "../pizzaTypes";

const validate = (state) => {
  const validName = state.name.trim().length > 0;
  const validPhone = /^[6-9]\d{9}$/.test(state.phone);

  return {
    ...state,
    validName,
    validPhone,
    valid: validName && validPhone,
  };
};

const UsingHooks = () => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "setName":
          return validate({
            ...state,
            ...action.payload,
          });
        case "setPhone":
          return validate({
            ...state,
            ...action.payload,
          });
        case "setPizza":
          return validate({
            ...state,
            ...action.payload,
          });
        default:
          return state;
      }
    },
    validate({
      name: "Dinesh",
      phone: "9123456789",
      pizza: pizzaTypes.find(({ name }) => name === "Pepperoni"),
    })
  );

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h4">
        Your best pies are always at Fry's Pizza.
      </Typography>
      <TextField
        label="Your Name"
        value={state.name}
        error={!state.validName}
        onChange={(e) =>
          dispatch({ type: "setName", payload: { name: e.target.value } })
        }
        fullWidth
        variant="outlined"
        sx={{
          marginTop: "1rem",
        }}
      ></TextField>
      <TextField
        label="Your Phone"
        value={state.phone}
        error={!state.validPhone}
        onChange={(e) =>
          dispatch({ type: "setPhone", payload: { phone: e.target.value } })
        }
        fullWidth
        variant="outlined"
        sx={{
          marginTop: "1rem",
        }}
      ></TextField>
      <Grid container>
        <Grid item xs={3}>
          <RadioGroup
            aria-label="Pizza Type"
            name="pizza"
            value={state.pizza.name}
            onChange={(e) =>
              dispatch({
                type: "setPizza",
                payload: {
                  pizza: pizzaTypes.find(({ name }) => name === e.target.value),
                },
              })
            }
          >
            {pizzaTypes.map((pizza) => (
              <FormControlLabel
                value={pizza.name}
                control={<Radio />}
                label={pizza.name}
                key={pizza.name}
              />
            ))}
          </RadioGroup>
        </Grid>
        <Grid item xs={9} sx={{ "> img": { width: "100%" } }}>
          <img src={`/${state.pizza.image}`} alt="" />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        disabled={!state.valid}
        sx={{
          display: "block",
          margin: "1rem auto",
        }}
      >
        Order
      </Button>
      <div>{JSON.stringify(state)}</div>
    </Container>
  );
};

export default UsingHooks;
