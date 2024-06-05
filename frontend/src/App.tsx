import React from "react";
import { useState } from "react";
import "./App.css";
import { Toaster, toast } from "sonner";
import { uploadFile } from "./services/upload";
import { type Data } from "./types";
import { Search } from "./steps/Search";

const APP_STATUS = {
  IDLE: "idle",
  ERROR: "error",
  UPLOADING: "uploading",
  READY_UPLOAD: "ready_upload",
  READY_USAGE: "ready_usage",
} as const;

const BUTTON_TEXT = {
  [APP_STATUS.IDLE]: "Subir archivo",
  [APP_STATUS.READY_UPLOAD]: "Subir archivo",
  [APP_STATUS.UPLOADING]: "Subiendo archivo...",
};

type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];

function App() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<Data>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [];
    if (file) {
      setFile(file);
      setAppStatus(APP_STATUS.READY_UPLOAD);
    }
  };

  const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (appStatus != APP_STATUS.READY_UPLOAD || !file) return;
    setAppStatus(APP_STATUS.UPLOADING);
    const [error, newData] = await uploadFile(file);
    if (error) {
      setAppStatus(APP_STATUS.ERROR);
      toast.error(error.message);
    }

    if (newData) {
      setAppStatus(APP_STATUS.READY_USAGE);
      setData(newData);
      toast.info("Archivo subido correctamente");
    }
  };

  const showButton =
    appStatus == APP_STATUS.IDLE ||
    appStatus == APP_STATUS.READY_UPLOAD ||
    appStatus == APP_STATUS.UPLOADING;

  const showInput = appStatus != APP_STATUS.READY_USAGE;
  return (
    <>
      <Toaster />
      <h4>csv-read-and-show</h4>
      {showInput && (
        <form onSubmit={handleSumbit}>
          <label>
            <input
              disabled={appStatus == APP_STATUS.UPLOADING}
              onChange={handleInputChange}
              name="file"
              type="file"
              accept=".csv"
            ></input>
          </label>
          {showButton && (
            <button disabled={appStatus == APP_STATUS.UPLOADING}>
              {BUTTON_TEXT[appStatus]}
            </button>
          )}
        </form>
      )}
      {appStatus == APP_STATUS.READY_USAGE && <Search initialData={data} />}
    </>
  );
}

export default App;
