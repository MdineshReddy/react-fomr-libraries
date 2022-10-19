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
import { Formik } from "formik";
import pizzaTypes from "../pizzaTypes";

const asyncCheck = (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name === "dinesh") {
        reject();
      } else {
        resolve();
      }
    }, 1000);
  });
};

const UsingFormik = () => {
  return (
    <Container>
      <CssBaseline />
      <Typography variant="h4">
        Your best pies are always at Fry's Pizza.
      </Typography>
      <Formik
        initialValues={{
          name: "Dinesh",
          phone: "9123456789",
          pizza: "Pepperoni",
        }}
        validate={async (values) => {
          const errors = {};
          if (values.name.trim().length < 1) {
            errors.name = "Required";
          }

          // perform async validation
          await asyncCheck(values.name).catch(() => {
            errors.name = "Name already Taken";
          });

          if (!/^[6-9]\d{9}$/.test(values.phone)) {
            errors.phone = "Valid Phone Number Required";
          }

          return errors;
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Your Name"
              value={values.name}
              error={errors.name && touched.name}
              onChange={handleChange}
              onBlur={handleBlur}
              type="name"
              name="name"
              helperText={errors.name ? errors.name : ""}
              fullWidth
              variant="outlined"
              sx={{
                marginTop: "1rem",
              }}
            ></TextField>
            <TextField
              label="Your Phone"
              value={values.phone}
              error={errors.phone && touched.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              type="phone"
              name="phone"
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
                  type="pizza"
                  name="pizza"
                  value={values.pizza}
                  onChange={(e) => {
                    setFieldValue(
                      "pizza",
                      pizzaTypes.find(({ name }) => name === e.target.value)
                        .name
                    );
                  }}
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
                <img
                  src={`/${
                    pizzaTypes.find(({ name }) => name === values.pizza).image
                  }`}
                  alt=""
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              type="submit"
              disabled={Boolean(errors.name) || Boolean(errors.phone)}
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
      </Formik>
    </Container>
  );
};

export default UsingFormik;
