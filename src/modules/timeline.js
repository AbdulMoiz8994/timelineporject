import React, { useEffect, useState } from "react";
import Timeline from "react-visjs-timeline";
import moment from "moment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./main.css";
import "react-toastify/dist/ReactToastify.css";
// import "spinkit/css/spinkit.css";
import "font-awesome/css/font-awesome.min.css";
import "./scss/index.css";

// import { Card, CardBody } from "reactstrap";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const options = {
  editable: {
    add: true,
    remove: false,
    updateGroup: false,
    updateTime: true,
  },

  margin: {
    axis: 5,
    item: {
      vertical: 5,
      horizontal: 0,
    },
  },
  orientation: {
    axis: "both",
    item: "top",
  },
  start: moment().format(),
  end: moment().format(),
  stack: false,
  stackSubgroups: false,
  type: "range",
  width: "100%",
  zoomable: true,
  zoomMin: 147600000,
  zoomMax: 51840000000,
};
// const groups = [
//   {
//     id: "a1",
//     content: "Sergei Action Plan",
//   },
//   {
//     id: "a2",
//     content: "316",
//     subgroupOrder: "sborder",
//   },
// ];
// const items = [
//   {
//     start: "2022-04-08T07:59:52.511149",
//     end: moment().format(), // end is optional
//     group: "a2",
//     type: "point",
//   },
// ];

const TimeLine = ({ result, loading }) => {
  // console.log(result);

  // const refData = useRef(null);
  // function realData() {
  //   console.log(refData.current);
  // }

  const [data, setData] = useState(result);
  const [storearr, setStorearr] = useState(null);

  // const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = (props) => {
    // console.log(props);
    setStorearr(props);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  useEffect(() => {
    setData(result);
    // eslint-disable-next-line
  });
  // const showModal = () => {
  //   setState({
  //     visible: true,
  //   });
  // };
  // const hideModal = () => {
  //   setState({
  //     visible: false,
  //   });
  // };
  // console.log(data);
  const getData = data.map((value) => {
    const res = {
      id: value._id,
      content: value.group || "--",
    };
    return res;
  });
  // const
  const setDotData = data.map((value) => {
    const res = {
      start: value.start,
      end: moment().format(),
      group: value._id,
      type: value.type,
      title: `<ul>
      <li>Group: ${value.group}</li>
       <li>user's ID: ${value._id}</li> 
       <li>Score: ${value._score}</li> 
      </ul>`,
    };
    // setStorearr(res);
    return res;
  });
  // console.log(data);
  // console.log(storearr);

  const filterData = data.filter((value, id) => {
    if (storearr == null) {
      return;
    }
    return value._id === storearr.group;
  });
  // console.log(filterData);
  // const clickHandler = (props) => {
  //   console.log(setDotData);
  // };
  return (
    <div>
      {loading ? (
        <h1 style={{ textAlign: "center", marginTop: "16px" }}>loading...</h1>
      ) : result.length === 0 ? (
        <h1 style={{ textAlign: "center", marginTop: "16px" }}>
          There is No Data
        </h1>
      ) : (
        <>
          <Card>
            <CardContent>
              <Timeline
                clickHandler={(props) => {
                  handleOpen(props);
                }}
                options={options}
                items={setDotData}
                groups={getData}
                // ref={refData}
              />
            </CardContent>{" "}
          </Card>
          {!filterData ? (
            <>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    There is no Data
                  </Typography>
                </Box>
              </Modal>
            </>
          ) : (
            filterData.map((value, id) => {
              return (
                <>
                  <div key={id}>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={open}
                      onClose={handleClose}
                    >
                      <Box sx={style}>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={handleClose}
                        >
                          X
                        </Button>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          {value._source.command_code &&
                            `Group: ${value._source.command_code}`}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {value._source.timestamp && value._source.timestamp}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {value._source.application_id &&
                            value._source.application_id}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {value._source.destination_host &&
                            value._source.destination_host}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {value._source.destination_realm &&
                            value._source.destination_realm}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {value._source.end2end && value._source.end2end}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {value._source.exp_result_code &&
                            value._source.exp_result_code}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {value._source.hopbyhop && value._source.hopbyhop}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {value._source.ip_dst && value._source.ip_dst}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {value._source.origin_host &&
                            value._source.origin_host}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {value._source.origin_realm &&
                            value._source.origin_realm}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {value._source.protocol && value._source.protocol}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {value._source.result_code &&
                            value._source.result_code}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {value._source.retransmitted &&
                            value._source.retransmitted}
                        </Typography>
                        <Typography
                          id="modal-modal-description"
                          sx={{ mt: 2 }}
                          style={{ wordBreak: "break-word" }}
                        >
                          {value._source.result_code &&
                            value._source.session_id}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {value._source.user_name && value._source.user_name}
                        </Typography>
                      </Box>
                    </Modal>
                  </div>
                </>
              );
            })
          )}
        </>
      )}
    </div>
  );
};

export default TimeLine;
