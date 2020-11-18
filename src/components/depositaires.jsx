import React, { useEffect, useState } from "react";
import {
  Card,
  Icon,
  Dimmer,
  Loader,
  Image,
  Segment,
  Header
} from "semantic-ui-react";
import img from "../img/short-paragraph.png";
import Turf from "turf";

export default function Depositaires(props) {
  const {
    depositaires,
    depositairesUserPosition,
    userPosition,
    readyFlag,
    setReadyFlag
  } = props;

  const [depositairesToDisplay, setDepositairesToDisplay] = useState(
    depositaires
  );
  const [header, setHeader] = useState("");

  useEffect(() => {
    setDepositairesToDisplay(undefined);
    if (depositairesUserPosition !== undefined) {
      console.log("C est quoi", depositairesUserPosition);
      let newDepositaires = [];

      newDepositaires = depositairesUserPosition.map((depositaire) => {
        // Calcule de la distance entre l'user et chaques POIs :
        // From : position de l'user
        let from = Turf.point([userPosition.lat, userPosition.lng]);
        //console.log("From", from);
        // To : position du Dépositaire sur lequel on map
        let to = Turf.point([
          depositaire.position.lat,
          depositaire.position.long
        ]);
        //console.log("To", to);
        const distance = Turf.distance(from, to).toFixed(2);
        console.log(`Distance ${depositaire.name}`, distance);
        return { ...depositaire, distance: distance };
      });
      //console.log("NewDepositaire", newDepositaires);

      setDepositairesToDisplay(
        newDepositaires.filter((depositaire) => depositaire.distance <= 50)
      );
    }
  }, [depositairesUserPosition]);

  useEffect(() => {
    setDepositairesToDisplay(depositaires);
  }, [depositaires]);

  useEffect(() => {
    setReadyFlag(false);
  }, [depositairesToDisplay]);

  useEffect(() => {
    setHeader("");
  }, []);

  return depositairesToDisplay !== undefined ? (
    <React.Fragment>
      <Header as="h2" disabled>
        {" "}
        {header}{" "}
      </Header>
      <div className="container-card">
        {depositairesToDisplay.map((depositaire) => {
          return (
            <Card key={depositaire.id}>
              <Card.Content
                header={
                  depositaire.distance !== undefined
                    ? `${depositaire.name} (${depositaire.distance} km)`
                    : `${depositaire.name}`
                }
              />
              <Card.Content
                description={`${depositaire.street} ${depositaire.number} `}
              />
              <Card.Description>
                {`${depositaire.zip} ${depositaire.city} ${depositaire.country}`}
              </Card.Description>
              <Card.Content extra>
                <Icon name="phone" />
                {depositaire.phone}
              </Card.Content>
            </Card>
          );
        })}
      </div>
    </React.Fragment>
  ) : readyFlag ? (
    <div>
      <Segment>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>

        <Image src={img} />
      </Segment>
    </div>
  ) : (
    ""
  );
}
