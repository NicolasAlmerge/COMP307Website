import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import React from "react";
import { Modal } from "react-bootstrap";
import "../../style/userTable.css";
import { FileDownload } from "@mui/icons-material";

function ImportForm({ taskName, uploadUrl }: { taskName: string, uploadUrl: string }) {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(false);
    const formData = new FormData();
    formData.append('csvFile', file);
    try {
      // CAUTION: Do not hard code the URLs, rather use routers
      console.log(uploadUrl);
      const res = await fetch(uploadUrl, {
        method: "POST",
        body: formData
      });

      if (res.status === 200) {
        const data = await res.json();
      } else {
        alert("Error while adding user.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="ta-review-modal">
      <button className="courses" onClick={() => setShow(true)}>
        <FileDownload/> Import
      </button>

      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-md" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">{`Import ${taskName}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload File Here</Form.Label>
              <Form.Control required type="file" name="csvFile" onChange={(e) => handleChange(e)} />
            </Form.Group>

            <Button variant="outline-secondary" type="submit">
              Upload
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ImportForm;
