import React, { useState } from "react";
import { Input, Label, Divider, Segment, Grid } from "semantic-ui-react";

export default function DepositairesList(props) {
  const { setIdZip, setUserPosition, setReadyFlag } = props;
  const [zip, setZip] = useState("");
  //console.log("ZIP", zip);

  // Helper for Provinces
  const provinces = [
    {
      id: 3,
      name: "Région de Bruxelles-Capitale",
      zipStart: 1000,
      zipEnd: 1299
    },
    {
      id: 2,
      name: "Province de Hainaut (2)",
      zipStart: 7000,
      zipEnd: 7999
    },
    {
      id: 1,
      name: "Province de Liège",
      zipStart: 4000,
      zipEnd: 4999
    }
  ];

  // Setting the Zip code
  const handleZipChange = (ev) => {
    setZip(ev.currentTarget.value);
  };

  const searchProv = (element) => {
    if (element >= 1000 && element <= 9999) {
      console.log("***ZIP***", element);
      let provResult = provinces.find(
        (province) => province.zipEnd >= element && province.zipStart <= element
      );
      console.log("ID", provResult);

      if (provResult !== undefined) {
        setIdZip(provResult.id);
      } else {
        console.log("error Provresult");
      }
    } else {
      console.log("error Zipcode Belgium");
    }
  };

  const hansleSearchZip = () => {
    setReadyFlag(true);
    console.log("detect");
    searchProv(zip);
  };

  const handleUserPosition = () => {
    setZip("");
    setReadyFlag(true);
    if (navigator.geolocation) {
      var options = {
        enableHightAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      function success(pos) {
        var crd = pos.coords;
        setUserPosition({ lat: crd.latitude, lng: crd.longitude });
      }

      function error(err) {
        console.warn(`ERREUR (${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  };
  return (
    <React.Fragment>
      <Segment>
        <Grid columns={2} relaxed="very">
          <Grid.Column>
            <Label pointing="right" basic color="olive">
              Code Postal
              <Input
                placeholder="Ex: 7130"
                onChange={handleZipChange}
                value={zip}
              />
            </Label>
            <button onClick={() => hansleSearchZip()}>
              Rechercher par province
            </button>
          </Grid.Column>
          <Grid.Column>
            <button onClick={() => handleUserPosition()}>
              Détecter ma posistion
            </button>
          </Grid.Column>
        </Grid>
        <Divider vertical>ou</Divider>
      </Segment>
    </React.Fragment>
  );
}
