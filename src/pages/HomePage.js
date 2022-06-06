import React from "react";
import { useState } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import { Navbar } from "../components/Navbar";

export const HomePage = () => {
  const [isEncrypted, setIsEncrypted] = useState(false);

  //STATE TO NON ENCRYPTED TEXT
  const [text, setText] = useState("");

  //STATE TO ENCRYPTED TEXT
  const [encryptedText, setEncryptedText] = useState("");

  const downloadNormalFile = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "archivoNormal.txt");
  };

  const downloadEncryptedFile = () => {
    const blob = new Blob([encryptedText], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "archivoEncriptado.txt");
  };

  const readFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();

    fileReader.readAsText(file);

    fileReader.onload = () => {
      setText(fileReader.result);
    };
    fileReader.onerror = () => {
      console.log(fileReader.error);
    };
  };

  const encryptFileText = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rsa/encrypt",
        { text: text }
      );
      setIsEncrypted(true);
      setEncryptedText(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const decryptFileText = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rsa/decrypt",
        { encryptedText: encryptedText }
      );
      setIsEncrypted(false);
      setText(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />

      <div className="App-header">
        <div className="flex flex-col mb-12">
          <h1 className="text-6xl mt-12 mb-6">Cifrado RSA</h1>
          <label className="mb-2">Vista Previa</label>
          <textarea
            cols="30"
            rows="10"
            placeholder="..."
            value={isEncrypted ? encryptedText : text}
            onChange={(e) => setText(e.target.value)}
            className="text-cyan-700"
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label>Seleccione el archivo a cifrar</label>
          <input
            className="input"
            type="file"
            multiple={false}
            onChange={readFile}
          ></input>
        </div>

        <div className="mb-12 flex">
          <button className="btn btn-primary mr-12" onClick={encryptFileText}>
            Cifrar Archivo
          </button>
          <button className="btn btn-secondary" onClick={decryptFileText}>
            Desifrar Archivo
          </button>
        </div>

        <div className="flex mb-12">
          <button
            className="btn btn-download text-base mr-12"
            onClick={downloadNormalFile}
          >
            Descargar Archivo Normal
          </button>
          {encryptedText !== "" && (
            <button
              className="btn btn-download text-base"
              onClick={downloadEncryptedFile}
            >
              Descargar Archivo Encriptado
            </button>
          )}
        </div>
      </div>
    </>
  );
};
