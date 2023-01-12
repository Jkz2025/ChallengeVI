import './App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import { Update } from "@mui/icons-material";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "Center",
  color: theme.palette.text.secondary,
}));

const App = () => {

  const [show, setShow] = useState(true);
  const [saveButton, setSaveButton] = useState(true);
  const [updateButton, setUpdateButton] = useState(true);
  const [showAlert, setAlert] = useState(false);
  const [showAlertError, setAlertError] = useState(false);
  const [showAlertName, setAlertName] = useState(false);
  const [showAlertCount, setAlertCount] = useState(false);
  const [showAlertValue, setAlertValue] = useState(false);
  const [showAlertYear, setAlertYear] = useState(false);
  const [idautos, setIdAutos] = useState(0);
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [year, setYear] = useState(0);
  const [data, setData] = useState([]);

  const onNameChange = (event) => setName(event.target.value);
  const onYearChange = (event) => setYear(event.target.value);
  const onCountChange = (event) => setCount(event.target.value);
  const onValueChange = (event) => setValue(event.target.value);


  const getData = async () => {
    try {
      const { data: response } = await axios.get(
        "http://localhost:4000/autos"
      );
      setData(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();  

        validateErrorName();
        validateErrorYear();
        validateErrorValue();
        validateErrorCount();
      }, [name, year, value,count]);
 
  const validateErrorName = () => {
    if (name.length > 0) {
      setAlertName(false);
    }
  };

  const validateErrorYear = () => {
    if (year > 0) {
      setAlertYear(false);
    }
  };


  const validateErrorValue = () => {
    if (value > 0) {
      setAlertValue(false);
    }
  };

  const validateErrorCount = () => {
    if (count > 0) {
      setAlertCount(false);
    }
  };

  const showForm = () => {
    if (show) {
      setShow(false);
      setSaveButton(true);
    } 
  };

  const cancel = () => {
    if (!show) {
      setName("");
      setYear(0);
      setValue(0);
      setCount(0);
      setShow(true);
      setAlert(false);
      setAlertError(false);
      setAlertError(false);
      setAlertName(false);
      setAlertYear(false);
      setAlertValue(false);
      setAlertCount(false);
      saveButton(true);
      update(false);
    }
  };


  const showTable = () => {
    if (name === "") {
      setAlertError(true);
      setAlertName(true);
      console.log("Debes llenar el campo name");
    }
    if (year === 0) {
      setAlertError(true);
      setAlertYear(true);
      console.log("Debes llenar el campo year");
    }
    if (value === 0) {
      setAlertError(true);
      setAlertValue(true);
      console.log("Debes llenar el campo value");
    } 
    if (count === 0) {
      setAlertError(true);
      setAlertCount(true);
      console.log("Debes llenar el campo count");
    } else {
      axios
        .post("http://localhost:4000/agregar-autos", {
          name: name,
          year: year,
          value: value,
          count: count, 
        })
        .then((response) => {
          setName("");
          setYear(0);
          setValue(0);
          setCount(0);
          setShow(true);
          setAlert(true);
          setAlertError(false);
          getData();
          setAlertError(false);
          setAlertName(false);
          setAlertYear(false);
          setAlertValue(false);
          setAlertCount(false);
          saveButton(true);
          console.log(response);
        })
        .cathc((error) => {
          console.log(error);
        });
    }
  };

  const showData = (object) => {
    setSaveButton(false);
    setIdAutos(object.idautos);
    setName(object.name); 
    setYear(object.year);
    setValue(object.value);
    setCount(object.count);
    setShow(false);
  };

  const update = () => {
    if (name === "") {
      setAlertError(true);
      setAlertName(true);
      console.log("Debes llenar el campo name");
      return;
    }
    if (year < 1) {
      setAlertError(true);
      setAlertYear(true);
      console.log("Debes llenar el campo year");
      return;
    }

    if (value < 1) {
      setAlertError(true);
      setAlertValue(true);
      console.log("Debes llenar el campo value");
      return; 
    } 
    if (count < 0) {
      setAlertError(true);
      setAlertCount(true);
      console.log("Debes llenar el campo count");
      return;
    }else {
      axios
        .put(`http://localhost:4000/updateauto/${idautos}`, {
          name: name,
          year: year,
          value: value,
          count: count,
        })
        .then(() => {
        setName("");
        setYear(0);
        setCount(0);
        setValue(0);
        setShow(true);
        setAlert(true);
        setAlertError(false);
        setAlertError(false);
        setAlertName(false);
        setAlertYear(false);
        setAlertValue(false);
        setAlertCount(false);
        getData();
      });
    }
};

  return (
    <Box
      sx={{
        width: 1000,
        height: 300,
        p: 2,
        ml: 12,
        flexGrow: 3,
        backgroundColor: "#D4D4D4",
      }}
    >
      {show && (
        <Grid container spacing={2}>
          {showAlert && (
            <Grid item xs={10} sx={{ mb: 2 }}>
              <Alert value={showAlert} variant="filled" severity="success">
                El Carro se creo correctamente
              </Alert>
            </Grid>
          )}
          <Grid item xs={8}>
            <Button
              onClick={() => {
                showForm();
              }}
              variant="contained"
              color="success"
            >
              Agregar Carro
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500, pl: 2 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id Carro</TableCell>
                    <TableCell align="left">Nombre</TableCell>
                    <TableCell align="left">Año</TableCell>
                    <TableCell align="left">Valor</TableCell>
                    <TableCell align="left">Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row.name}
                      onClick={() => showData(row)}
                      sx={{ "&:last-child td, 8:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.idautos}
                      </TableCell>
                      <TableCell align="left">
                        {row.name}
                      </TableCell>
                      
                      <TableCell align="left">
                        {row.year}
                      </TableCell>
                      <TableCell align="left">
                        {row.value}
                      </TableCell>
                      <TableCell align="left">
                        {row.count}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
      {!show && (
        <Box
          component="form"
          noValidate
          autoComplete="off"
          justifyContent="center"
        >
         {
            //showAlertError &&
            <Grid container spacing={2}></  Grid>
          }
          <Grid sx={{ mt: 12 }} container justifyContent="center">
            {showAlertError && (
              <Grid item xs={10} sx={{ mb: 2 }}>
                <Alert value={showAlertError} variant="filled" severity="error">
                  Error: 'Existen campos vacios'.
                </Alert>
              </Grid>
            )}
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                error={showAlertName} 
                onChange={onNameChange}
                value={name}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Año"
                variant="outlined"
                error={showAlertYear}
                onChange={onYearChange}
                value={year}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Valor"
                variant="outlined"
                error={showAlertValue}
                onChange={onValueChange}
                value={value}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Cantidad"
                variant="outlined"
                error={showAlertCount}
                onChange={onCountChange}
                value={count}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mt: 6 }} container justifyContent="center">
            <Grid item sx={{ mr: 2 }}>
              <Button
                onClick={() => {
                  cancel();
                }}
                variant="contained"
                color="error"
              >
                Cancelar
              </Button>
            </Grid>
            {saveButton && (
              <Grid item>
                <Button
                  onClick={() => {
                    showTable();
                  }}
                  variant="contained"
                  color="success"
                >
                  Guardar
                </Button>
              </Grid>
            )}
            {!saveButton && (
              <Grid item>
                <Button
                  onClick={() => {
                    update();
                  }}
                  variant="contained"
                  color="success"
                >
                  Actualizar
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
export default App;
