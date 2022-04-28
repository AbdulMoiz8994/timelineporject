import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import axios from "axios";

// import DatePicker from "@mui/lab/DatePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import "./main.css";
import TimeLine from "./timeline";
import Checkbox from "@mui/material/Checkbox";

export const From = () => {
  var twoWeeks = 1000 * 60 * 60 * 24 * 14;
  // var twoWeeksTime = new Date(new Date().getTime() - twoWeeks);

  const [username, setUsername] = useState("");
  const [msisid, setMsisid] = useState("");
  const [value, setValue] = React.useState(new Date());
  const [secondvalue, setSecondValue] = React.useState(new Date());
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  // console.log(value.getTime());
  // console.log(secondvalue.getTime());

  // 334140017001046 525586500046
  const onSubmitFunc = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {
        data: { data },
      } = await axios.get(
        `https://api.ahdustraders.com/search-s6a-imsi-msisdn?username=${username}&msisdn=${msisid}&gte=${value
          .getTime()
          .toString()
          .slice(0, -3)}&lte=${secondvalue.getTime().toString().slice(0, -3)}`
      );
      // console.log(data);
      setLoading(false);
      setResult(data);
    } catch (err) {
      console.log(err);
    }
  };

  // const resultdata = [
  //   ...new Set(
  //     result.map((value) => {
  //       return value.group;
  //     })
  //   ),
  // ];

  useEffect(() => {
    onSubmitFunc();
    // eslint-disable-next-line
  }, []);

  // console.log(resultdata);
  // console.log(date);

  function filterData(values) {
    const resultFilter = result.filter((value) => {
      return value.group === values;
    });
    // console.log(resultFilter);
    setResult(resultFilter);
  }

  return (
    <div style={{ height: "auto" }}>
      <form onSubmit={onSubmitFunc} className="form">
        <TextField
          id="outlined-name"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
          required
        />
        <TextField
          id="outlined-uncontrolled"
          label="Msisdn"
          value={msisid}
          onChange={(e) => setMsisid(e.target.value)}
          className="input"
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "12px" }}
          >
            {/* <Grid container> */}
            <DesktopDatePicker
              disableToolbar
              variant="inline"
              inputFormat="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              value={value}
              className="date"
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={null}
                  id="standard-search"
                  variant="standard"
                />
              )}
            />
            <DesktopDatePicker
              // disableToolbar
              variant="inline"
              inputFormat="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              value={secondvalue}
              className="date"
              onChange={(newValue) => {
                setSecondValue(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={null}
                  id="standard-search"
                  variant="standard"
                />
              )}
            />
          </div>
          {/* </Grid> */}
        </LocalizationProvider>
        <Button
          disabled={username === ""}
          type="submit"
          variant="outlined"
          className="submit"
        >
          Submit
        </Button>
      </form>
      {
        result.length === 0 ? "" : ""
        // resultdata.map((values, id) => {
        //     return (
        //       <div>
        //         <button onClick={() => filterData(values)} key={id}>
        //           <Checkbox
        //             checked={checked}
        //             onChange={handleChange}
        //             inputProps={{ "aria-label": "controlled" }}
        //           />{" "}
        //           {values}
        //         </button>
        //       </div>
        //     );
        //   })
      }
      {/* <button onClick={filterData}>316</button> */}

      <TimeLine result={result} loading={loading} />
    </div>
  );
};

// var twoWeeks = 1000 * 60 * 60 * 24 * 14;
// var twoWeeksTime = new Date(new Date().getTime() - twoWeeks);
// console.log(two);
// console.log(new Date());
// console.log(twoWeeksTime.getTime());
// console.log(twoWeeksTime);
// console.log(new Date(new Date().getTime()));
// var formattedDate =
//   twoWeeksTime.getDate() +
//   "/" +
//   (twoWeeksTime.getMonth() + 1) +
//   "/" +
//   twoWeeksTime.getFullYear();
// console.log(formattedDate);
// var currentTime = new Date();
// console.log(currentTime);
