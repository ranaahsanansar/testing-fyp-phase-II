import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Alert
} from "@mui/material";
import React, { useEffect, useState } from "react";

import landInspectorContract from "../../artifacts/contracts/LandInspector.sol/LandInspector.json";
import { ethers } from "ethers";
import { landInspectorContractAddress, ownerShipAddress } from "../../dataVariables";


const ApproveTransaction = () => {


  const [etherScanAlert, setEtherScanAlert] = useState({
    status: false,
    msg: "",
    url: "",
    type: ""
  });

  const [lockContractAddress, setLockContractAddress] = useState("");
  const [areaContractAddress, setAreaContractAddress] = useState("");
  const [distric, setDistric] = useState('lahore');
  const [province, setProvince] = useState('punjab');
  const [society, setSociety] = useState('none');
  const [block, setBlock] = useState('park-view');

  const [propertyId, setPropertyId] = useState("")
  const [selletCnic, setSellerCnic] = useState("")
  const [buyerCnic, setbuyerCnic] = useState("")
  const [requestNum, setRequestNum] = useState("")

  const [alert, setAlert] = useState({
    status: false,
    msg: "",
    type: ""
  });

  useEffect(() => {
    if (alert.status === true) {
      setTimeout(() => {

        setAlert({
          status: false,
          msg: "",
          type: ""
        })
      }, 5000);
    }

    if (etherScanAlert.status === true) {
      setTimeout(() => {
        setEtherScanAlert({
          status: false,
          msg: "",
          url: "",
          type: ""
        })
      }, 600000)
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = new FormData(e.currentTarget);

    const actualData = {
      id: propertyId,
      sellerCnic: selletCnic,
      buyerCnic: buyerCnic,
      requestNumber: requestNum
    }

    let confirm = window.confirm("Are you sure want to Submit?");
    if (confirm) {


      const { ethereum } = window;

      let contractAddress = lockContractAddress;
      let areaContract = areaContractAddress;

      const walletProvider = new ethers.providers.Web3Provider(
        ethereum
      )

      const signer = walletProvider.getSigner();
      const sendTx = new ethers.Contract(
        contractAddress,
        landInspectorContract.abi,
        signer
      )

      const dataResult = await sendTx.approveTransferRequest(
        areaContract,
        actualData.id,
        actualData.requestNumber,
        actualData.sellerCnic,
        actualData.buyerCnic,
        {gasLimit: 5000000}
      );

      let txHash = dataResult.hash
      let scanUrl = "https://sepolia.etherscan.io/tx/" + txHash;

      setEtherScanAlert(
        {
          status: true,
          msg: "View Transaction on EtherScan",
          url: scanUrl,
          type: "success"
        }
      )


      setAlert({
        status: true,
        msg: "Submitted Successfuly!",
        type: "success"
      });
    }

  };


  const handleChangeProvience = (event) => {
    setProvince(event.target.value);
  };
  const handleChangeDistric = (event) => {
    setDistric(event.target.value);
  };
  const handleChangeSociety = (event) => {
    setSociety(event.target.value);
  };
  const handleChangeBlock = (event) => {
    setBlock(event.target.value);
    setLockContractAddress(landInspectorContractAddress);
    setAreaContractAddress(ownerShipAddress);
  };

  const handleChangeId = (e) => {
    setPropertyId(e.target.value)
  }
  const handleChangeSellerCnic = (e) => {
    setSellerCnic(e.target.value)
  }
  const handleChangeBuyerCnic = (e) => {
    setbuyerCnic(e.target.value);
  }
  const handleChangeReqNum = (e) => {
    setRequestNum(e.target.value);
  }
  return (
    <Box width='100%' sx={{
      border: '2px solid gray', padding: 2, borderRadius: '15px', backgroundColor: '#f2f2f2'
    }} >
      <Typography variant="h4" fontSize='25px' fontWeight='bold' color='primary'>Approve Ownership Transaction Request</Typography>
      <Divider />
      <Box mt={3} >
        <Box
          component='form'
          id="addProperty-form"
        >
          <Grid container spacing={2} >

            <Grid item lg={4} md={4} sm={4} >
              <FormControl fullWidth>
                <InputLabel id="province-label">Province</InputLabel>

                <Select
                  fullWidth
                  required
                  labelId="province-label"
                  id="province"
                  value={province}
                  label="province"
                  onChange={handleChangeProvience}
                >
                  <MenuItem value="punjab">punjab</MenuItem>
                  <MenuItem value="sindh">Karachi</MenuItem>
                  <MenuItem value="balochistan">Sialkot</MenuItem>
                  <MenuItem value="KPK">KPK</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={4} md={4} sm={4} >
              <FormControl fullWidth>
                <InputLabel id="distric-label">Distric</InputLabel>

                <Select
                  fullWidth
                  required
                  labelId="distric-label"
                  id="distric"
                  value={distric}
                  label="Distric"
                  onChange={handleChangeDistric}
                >
                  <MenuItem value="lahore">Lahore</MenuItem>
                  <MenuItem value="karachi">Karachi</MenuItem>
                  <MenuItem value="sialkot">Sialkot</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={4} md={4} sm={4} >
              <FormControl fullWidth>
                <InputLabel id="society-label">Society</InputLabel>

                <Select
                  fullWidth
                  required
                  labelId="society-label"
                  id="society"
                  value={society}
                  label="society"
                  onChange={handleChangeSociety}
                >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="park-view">Park View</MenuItem>
                  <MenuItem value="bahria">Bahria</MenuItem>
                  <MenuItem value="rehman-garden">Rehman Garden</MenuItem>
                  <MenuItem value="iqbal-town">Iqbal Town</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={4} md={4} sm={4} >
              <FormControl fullWidth>
                <InputLabel id="block-label">Block</InputLabel>

                <Select
                  fullWidth
                  required
                  labelId="block-label"
                  id="block"
                  value={block}
                  label="block"
                  onChange={handleChangeBlock}
                >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="park-view">A Block</MenuItem>
                  <MenuItem value="bahria">B Block</MenuItem>
                  <MenuItem value="rehman-garden">X Block</MenuItem>
                  <MenuItem value="iqbal-town">Y Block</MenuItem>
                </Select>
              </FormControl>
            </Grid>



            {/* <Grid item lg={4} md={4} sm={4} >
              <TextField fullWidth id="propertyTitle" name="propertyTitle" label="Property Title" variant="outlined" />

            </Grid> */}

            <Grid item lg={4} md={4} sm={4} >
              <TextField fullWidth id="propertyId" onChange={handleChangeId} type="number" name="propertyId" label="Property ID" variant="outlined" />

            </Grid>

            <Grid item lg={4} md={4} sm={4} >
              <TextField fullWidth id="sellerCnic" onChange={handleChangeSellerCnic} type="number" name="sellerCnic" label="Seller CNIC" variant="outlined" />

            </Grid>

            <Grid item lg={4} md={4} sm={4} >
              <TextField fullWidth id="buyerCNIC" onChange={handleChangeBuyerCnic} type="number" name="buyerCNIC" label="Buyer CNIC" variant="outlined" />

            </Grid>

            <Grid item lg={4} md={4} sm={4} >
              <TextField fullWidth id="requestNum" onChange={handleChangeReqNum} type="number" name="requestNum" label="Request Number" variant="outlined" />

            </Grid>

          </Grid>
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
              onClick={handleSubmit}
            >
              Trasnfer
            </Button>
          </Box>
          {alert.status ? <Alert severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}
          {etherScanAlert.status ? <><Alert severity={etherScanAlert.type} sx={{ mt: 3 }}>{etherScanAlert.msg}<a href={etherScanAlert.url} target="_blank" > Click Me</a> </Alert>  </> : ''}



        </Box>
      </Box>
    </Box>
  );
}

export default ApproveTransaction