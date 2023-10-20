import { useState } from "react";
import { Form } from "react-bootstrap";

const Comment = ({onCommentSet}: {onCommentSet: any}) => {
    // Maximum character limit
    const MAX_CHARS = 140;

    // Number of remaining characters become red when crossing this limit
    const LIMIT_RED = 30;

    // Keep track of the comment
    const [comment, setComment] = useState("");

    return (
        <>
            <Form.Control
                value={comment}
                placeholder="Additional Comment"
                maxLength={MAX_CHARS}
                as="textarea"
                rows={2}
                onChange={e => {setComment(e.target.value); onCommentSet(e.target.value);}}
            />
            <div className={(comment.length >= MAX_CHARS-LIMIT_RED)? "rate-ta-chars-remaining rate-ta-chars-remaining-low": "rate-ta-chars-remaining"}>
                {MAX_CHARS-comment.length} {(comment.length < MAX_CHARS-1)? "characters": "character"} remaining
            </div>
        </>
    );
};

export default Comment;
