import React, { useState } from "react";
import useGoogle from "../Services/useGoogle";

export default function useDriveService() {
  const { token, authorize, revoke } = useGoogle();
  const [files, setFiles] = useState([]);
  const [processed, setProcessed] = useState([]);

  async function upload(file) {
    const form = new FormData();
    form.append(
      "metadata",
      new Blob(
        [
          JSON.stringify({
            name: file.name,
            mimeType: file.type,
            parents: ["1bTniD9BKHkhRyDBQaKt0cQygnpBptguj"],
          }),
        ],
        { type: "application/json" }
      )
    );
    form.append("file", file);
    const res = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=name,webViewLink,id,mimeType",
      {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        body: form,
      }
    );
    return await res.json();
  }

  const UploadFiles = async newFiles => {
    if (!token) {
      await authorize();
    }
    alert(newFiles.length);
    let uploadRes = await Promise.all(newFiles.map(upload));
    console.log(uploadRes);
    let shareFilesRes = await shareFiles(uploadRes);
    console.log(shareFilesRes);
    return await shareFilesRes.map(toProcessed);
  };

  async function shareFiles(files) {
    await Promise.all(
      files.map(({ id }) =>
        window.gapi.client.drive.permissions.create({
          fileId: id,
          fields: "id",
          resource: {
            role: "commenter",
            type: "anyone",
          },
        })
      )
    );
    return files;
  }

  function toProcessed(file) {
    console.log("toProcessed");
    return {
      name: file.name,
      url: file.webViewLink,
      id: file.id,
      mimeType: file.mimeType,
    };
  }

  return {
    UploadFiles,
  };
}
