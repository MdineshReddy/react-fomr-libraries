import React, { useState } from "react";
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
import { useForm, Controller } from "react-hook-form";

const UsingRHF = () => {
  const [selectedPizza, setSelectedPizza] = useState("Pepperoni");
  const {
    register,
    control,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "Dinesh",
      phone: "9123456789",
      pizza: "Pepperoni",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h4">
        Your best pies are always at Fry's Pizza.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Your Name"
              error={"name" in errors}
              fullWidth
              variant="outlined"
              sx={{
                marginTop: "1rem",
              }}
            ></TextField>
          )}
        />
        <Controller
          name="phone"
          control={control}
          rules={{ required: true, pattern: /^[6-9]\d{9}$/ }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Your Phone"
              error={"phone" in errors}
              fullWidth
              variant="outlined"
              sx={{
                marginTop: "1rem",
              }}
            ></TextField>
          )}
        />
        <Grid container>
          <Grid item xs={3}>
            <Controller
              name="pizza"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} aria-label="Pizza Type">
                  {pizzaTypes.map((pizza) => (
                    <FormControlLabel
                      value={pizza.name}
                      control={<Radio />}
                      label={pizza.name}
                      key={pizza.name}
                      onClick={() => setSelectedPizza(pizza.name)}
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </Grid>
          <Grid item xs={9} sx={{ "> img": { width: "100%" } }}>
            <img
              src={`/${
                pizzaTypes.find((pizza) => pizza.name === selectedPizza).image
              }`}
              alt=""
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          disabled={"name" in errors || "phone" in errors}
          sx={{
            display: "block",
            margin: "1rem auto",
          }}
        >
          Order
        </Button>
      </form>
    </Container>
  );
};

export default UsingRHF;
