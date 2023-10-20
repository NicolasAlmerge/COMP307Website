import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Comment from "./Comment";
import StarRating from "./StarRating";

const RatingTAPopup = (
    {taName, unsetTa, onClick, submitRating}:
    {
        taName: string, unsetTa: () => void, onClick: () => void
        submitRating: (rating: number, comment: string) => Promise<void>,
    }
) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [show, setShow] = useState(true);

    return (
        <Modal show={show} onHide={() => {unsetTa(); setShow(false)}} dialogClassName="modal-lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Rate {taName}</Modal.Title>
            </Modal.Header>

            <Form onSubmit={async (e) => {e.preventDefault(); await submitRating(rating, comment)}}>
                <Modal.Body>
                    <Row>
                        <Col lg>
                            <center>
                                <StarRating onStarSet={(index: number) => setRating(index)}/>
                            </center>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg>
                            <Comment onCommentSet={(newComment: string) => setComment(newComment)}/>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="mt-3" type="submit" disabled={!rating}>
                        Submit Rating
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default RatingTAPopup;
