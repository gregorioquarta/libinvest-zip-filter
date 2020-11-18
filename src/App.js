import React, { useState, useEffect } from "react";
import Axios from "axios";
import DepositairesSearch from "./components/depositairesList";
import Depositaires from "./components/depositaires";
import "./styles.css";

export default function App() {
  const [idZip, setIdZip] = useState(undefined);
  const [depositairesFromZip, setDepositairesFromZip] = useState([]);
  const [depositaires, setDepositaires] = useState(undefined);
  const [userPosition, setUserPosition] = useState({});
  const [readyFlag, setReadyFlag] = useState(false);
  console.log("FLAG", readyFlag);
  //console.log("UserPosition", userPosition);
  //console.log("RESULTAT FROM ZIP :", depositairesFromZip);

  async function loadProvince(url) {
    try {
      const response = await Axios.get(url);
      console.log("Response Axios", response);
      setDepositairesFromZip(response.data.depositaires);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadDepositaireFromUserPosition(url) {
    try {
      const response = await Axios.get(url);
      //console.log("Response Axios", response.data);
      setDepositaires(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (idZip !== undefined) {
      console.log(` Detecte le changement idZIP & Fetch the datas`);
      loadProvince(
        "https://5usnr.sse.codesandbox.io/zip-depositaires/" + idZip
      );
    } else {
      console.log("Le code postal n est pas connu");
    }
  }, [idZip]);

  useEffect(() => {
    loadDepositaireFromUserPosition(
      "https://5usnr.sse.codesandbox.io/depositaires/"
    );

    //console.log("DEPOSITAIRES ALL", depositaires);
  }, [userPosition]);

  return (
    <div className="App">
      <h1>Dépositaires </h1>
      <h2>Votre beauté, notre métier</h2>
      <DepositairesSearch
        setIdZip={setIdZip}
        setUserPosition={setUserPosition}
        setReadyFlag={setReadyFlag}
      />
      <Depositaires
        depositaires={depositairesFromZip}
        depositairesUserPosition={depositaires}
        userPosition={userPosition}
        readyFlag={readyFlag}
        setReadyFlag={setReadyFlag}
      />
    </div>
  );
}
