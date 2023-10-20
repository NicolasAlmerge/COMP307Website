import { useState } from "react";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";

const StarRating = ({onStarSet}: {onStarSet: any}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className={"star-rating star-rating-value-" + hover}>
            {
                [1, 2, 3, 4, 5].map(index =>
                    <button
                        type="button"
                        key={index}
                        onClick={() => {setRating(index); onStarSet(index);}}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        {
                            index <= (hover || rating)?
                            <Star className={"starIcon starIcon-value-" + hover}/>:
                            <StarBorder className={"starIcon starIcon-value-" + hover}/>
                        }
                    </button>
                )
            }
            <div style={{textAlign: "center"}}>
                {
                    hover === 1? "Awful":
                    hover === 2? "OK":
                    hover === 3? "Good":
                    hover === 4? "Great":
                    hover === 5? "Awesome!":
                    <>&nbsp;</>
                }
            </div>
        </div>
    );
};

export default StarRating;
