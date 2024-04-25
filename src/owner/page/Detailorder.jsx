// import React from "react";
// import "./css/detailorder.css";
// import Menufooter from "./Menubar";
// import { Link } from "react-router-dom";
// import { GrDocumentText } from "react-icons/gr";
// import { LuChefHat } from "react-icons/lu";
// import { BiSolidDish } from "react-icons/bi";
// import { IoIosArrowBack } from "react-icons/io";

// function Detailorder() {
//   return (
//     <div className="detailorder_box_container">
//       <div className="detailorder_box_container">
//         <div className="title_header_orderBox">
//           <Link to="/manageorder" className="back_orderBox">
//             <IoIosArrowBack className="icon_closeReviwe" />
//             Back
//           </Link>
//           <h3>Order</h3>
//         </div>
//         <div className="box_firstorder_content">
//           <h4>Track your Order</h4>
//           <div className="detailorder_status">
//             <div className="name-textorder">
//               <div className="numberIddetailorder">
//                 <p>No:1</p>
//                 <p>ID:1</p>
//                 <p>Name:1</p>
//               </div>
//               <div>
//                 <p>Table 1</p>
//               </div>
//             </div>
//             <div className="boxstatus_detailorder">
//               <div className="group-icon-order">
//                 <div className="icon_status-order iconactive">
//                   <GrDocumentText />
//                 </div>
//                 <h4>Order</h4>
//               </div>

//               <div className="group-icon-cook">
//                 <div className="icon_status-order iconactive">
//                   <LuChefHat />
//                 </div>
//                 <h4>Cooking</h4>
//               </div>
//               <div className="group-icon-done">
//                 <div className="icon_status-order ">
//                   <BiSolidDish />
//                 </div>
//                 <h4>Done</h4>
//               </div>
//               <div className="spanboxinline1"></div>
//               <div className="spanboxinline2"></div>
//             </div>
//             <p className="ssdasdsa">Your order has been received</p>
//           </div>
//         </div>
//         <div className="order_content-detailorder">
//           <h3>Menu</h3>
//           <div className="order_content-Item">
//             <div>
//               <h4>Name</h4>
//               <div className="box-Grouptxtintro box-ofnamefood">
//                 <p>Name...</p>
//                 <p>Name...</p>
//                 <p>Name...</p>
//               </div>
//             </div>
//             <div>
//               <h4>Price</h4>
//               <div className="box-Grouptxtintro box-ofpricefood">
//                 <p>12,000</p>
//                 <p>12,000</p>
//                 <p>12,000</p>
//               </div>
//             </div>
//             <div className="box-amount">
//               <h4>Amount</h4>
//               <div className="box-Grouptxtintro box-ofamountfood">
//                 <p>1</p>
//                 <p>1</p>
//                 <p>1</p>
//               </div>
//             </div>
//           </div>
//           <div className="box-groupPrice">
//             <h4>TOTAL:</h4>
//             <h4>76,000</h4>
//           </div>
//           <div className="box-groupLastfoot">
//             <p>Place on: 15/09/2023</p>
//             <p>Payment method: MasterCard</p>
//           </div>
//         </div>
//       </div>
//       <div className="button-active">
//         <div className="btn-pending">
//           <Link to="/detailorder" className="btn-pending">
//             Pending
//           </Link>
//         </div>
//         <div className="btn-done">
//           <Link to="/detailorder" className="btn-done">
//             Done
//           </Link>
//         </div>
//         <div className="btn-active">
//           <Link to="/detailorder" className="btn-active">
//             Active
//           </Link>
//         </div>
//       </div>
//       <Menufooter />
//     </div>
//   );
// }

// export default Detailorder;

import React from "react";
import "./css/detailorder.css";
import Menufooter from "./Menubar";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CheckCircle } from "@mui/icons-material";

function Detailorder() {
  const steps = ["Order", "Cooking", "Done"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    window.location.href = "/manageorder";
  };
  return (
    <div className="detailorder_box_container">
      <div className="title_header_orderBox">
        <Link to="/manageorder" className="back_orderBox">
          <IoIosArrowBack className="icon_closeReviwe" />
          Back
        </Link>
        <h3>Order</h3>
      </div>
      <div className="continer-box">
        <div className="box_firstorder_content">
          <h4>Track your Order</h4>
          <div className="detailorder_status">
            <div className="name-textorder">
              <div className="numberIddetailorder">
                <p>No:1</p>
                <p>ID:1</p>
                <p>Name:1</p>
              </div>
              <div>
                <p>Table 1</p>
              </div>
            </div>
            <div className="boxstatus_detailorder">
              <Box sx={{ width: "100%" }}>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                      labelProps.optional = (
                        <Typography variant="caption"></Typography>
                      );
                    }
                    if (isStepSkipped(index)) {
                      stepProps.completed = true;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel
                          {...labelProps}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          {label}
                        </StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Box>
            </div>
            <p className="ssdasdsa">Your order has been received</p>
          </div>
        </div>
        <div className="order_content-detailorder">
          <h3>Menu</h3>
          <div className="order_content-Item">
            <div>
              <h4>Name</h4>
              <div className="box-Grouptxtintro box-ofnamefood">
                <p>Name...</p>
                <p>Name...</p>
                <p>Name...</p>
              </div>
            </div>
            <div>
              <h4>Price</h4>
              <div className="box-Grouptxtintro box-ofpricefood">
                <p>12,000</p>
                <p>12,000</p>
                <p>12,000</p>
              </div>
            </div>
            <div className="box-amount">
              <h4>Amount</h4>
              <div className="box-Grouptxtintro box-ofamountfood">
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </div>
            </div>
          </div>
          <div className="box-groupPrice">
            <h4>TOTAL:</h4>
            <h4>76,000</h4>
          </div>
          <div className="box-groupLastfoot">
            <p>Place on: 15/09/2023</p>
            <p>Payment method: MasterCard</p>
          </div>
        </div>
      </div>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography
            sx={{
              mt: 2,
              mb: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center", // Center horizontally
              textAlign: "center", // Center text
            }}
          >
            <CheckCircle sx={{ color: "green", mr: 1 }} />{" "}
            <span>All this order is completed</span>
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pt: 2,
        }}
      >
        <Box sx={{ flex: "1 1 auto" }} />

        <div className="button-active">
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ justifyContent: "center" }}
          >
            Back
          </Button>

          <div className="btn-pending">
            {activeStep === 0 && (
              <Link
                to="/detailorder"
                className="btn-pending"
                onClick={handleNext}
              >
                Pending
              </Link>
            )}
          </div>
          <div className="btn-done">
            {activeStep === 1 && (
              <Link to="/detailorder" className="btn-done" onClick={handleNext}>
                Done
              </Link>
            )}
          </div>
          <div className="btn-active">
            {activeStep === 2 && (
              <Link
                to="/detailorder"
                className="btn-active"
                onClick={handleNext}
              >
                Active
              </Link>
            )}
          </div>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset} disabled={activeStep !== 3}>
              Finish
            </Button>
          </Box>
        </div>
      </Box>
      <Menufooter />
    </div>
  );
}

export default Detailorder;
