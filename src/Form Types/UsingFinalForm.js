import React from "react";
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
import { Form, Field } from "react-final-form";

const required = (value) => (value ? undefined : "Redifined");
const validatePhone = (value) =>
  /^[6-9]\d{9}$/.test(value) ? undefined : "Invalid Phone";

const RadioFormField = ({
  input: { checked, value, name, onChange, ...otherInput },
  meta,
  ...other
}) => (
  <Radio
    {...other}
    name={name}
    value={value}
    checked={checked}
    onChange={onChange}
    inputProps={otherInput}
  />
);

const UsingFinalForm = () => {
  return (
    <Container>
      <CssBaseline />
      <Typography variant="h4">
        Your best pies are always at Fry's Pizza.
      </Typography>
      <Form
        onSubmit={() => {}}
        initialValues={{
          name: "Dinesh",
          phone: "9123456789",
          pizza: "Pepperoni",
        }}
        render={({ handleSubmit, values, valid }) => (
          <form onSubmit={handleSubmit}>
            <Field name="name" validate={required}>
              {({ input, meta }) => (
                <TextField
                  error={meta.error !== undefined}
                  label="Your name"
                  variant="outlined"
                  fullWidth
                  sx={{
                    marginTop: "1rem",
                  }}
                  {...input}
                />
              )}
            </Field>

            <Field name="phone" validate={validatePhone}>
              {({ input, meta }) => (
                <TextField
                  error={meta.error !== undefined}
                  label="Your phone"
                  variant="outlined"
                  fullWidth
                  sx={{
                    marginTop: "1rem",
                  }}
                  {...input}
                />
              )}
            </Field>
            <Grid container>
              <Grid item xs={3}>
                <RadioGroup
                  aria-label="Pizza type"
                  name="pizza"
                  value={values.pizza.name}
                >
                  {pizzaTypes.map((pizza) => (
                    <FormControlLabel
                      value={pizza.name}
                      control={
                        <Field
                          type="radio"
                          name="pizza"
                          value={pizza.name}
                          component={RadioFormField}
                        />
                      }
                      label={pizza.name}
                      key={pizza.name}
                    />
                  ))}
                </RadioGroup>
              </Grid>
              <Grid item xs={9}>
                <img
                  src={`/${
                    pizzaTypes.find(({ name }) => name === values.pizza).image
                  }`}
                  alt={`${values.pizza} pizza`}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              disabled={!valid}
              sx={{
                display: "block",
                margin: "1rem auto",
              }}
            >
              Order
            </Button>

            <div>{JSON.stringify(values)}</div>
          </form>
        )}
      ></Form>
    </Container>
  );
};

export default UsingFinalForm;
