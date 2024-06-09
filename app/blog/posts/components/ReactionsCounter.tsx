import React from 'react';


import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import MoodBadIcon from "@mui/icons-material/MoodBad";

const stndardStyle: any = {
    // width: '20px',
    //  height: '20px',
    //  padding:"5px"
};

const style: any = {
    0: {
        ...stndardStyle,
        color: "blue"
    },
    1: {
        ...stndardStyle,
        color: "black"
    },
    2: {
        ...stndardStyle,
        color: "red"
    },
    3: {
        ...stndardStyle,
        color: "yellow"
    },
    4: {
        ...stndardStyle,
        color: "orange"
    },
    5: {
        ...stndardStyle,
        color: "green"
    },
    6: {
        color: "gray"
    },
    7: {
        ...stndardStyle,
        color: "brown"
    },
}
export const reactionTypes: { name: string; value: number; icon: any }[]//: { name: string; value: number; icon: any }[]
    = [
    {
        name: "LIKE",
        value: 0,
        icon: <ThumbUpIcon style={style["0"]}/>,
    },
    {
        name: "DISLIKE",
        value: 1,
        icon: <ThumbDownIcon style={style["1"]}/>,
    },
    {
        name: "LOVE",
        value: 2,
        icon: <FavoriteIcon style={style["2"]}/>,
    },
    {
        name: "HATE",
        value: 3,
        icon: <SentimentDissatisfiedIcon style={style["3"]}/>,
    },
    {
        name: "HAHA",
        value: 4,
        icon: <EmojiEmotionsIcon style={style["4"]}/>,
    },
    {
        name: "WOW",
        value: 5,
        icon: <EmojiObjectsIcon style={style["5"]}/>,
    },
    {
        name: "SAD",
        value: 6,
        icon: <SentimentVeryDissatisfiedIcon style={style["6"]}/>,
    },
    {
        name: "ANGRY",
        value: 7,
        icon: <MoodBadIcon style={style["7"]}/>,
    },
];

const ReactionsCounter = ({post}: { post: any, }) => {
    // Calculate reaction counts
    const reactionCounts = post?.reactions?.reduce((acc: any, reaction: any) => {
        acc[reaction.type] = (acc[reaction.type] || 0) + 1;
        return acc;
    }, {});

    return (
        <div style={{display: 'flex', flexDirection: 'row', paddingBlock: "10px"}}>
            {reactionTypes.map((reactionType: any) => {
                const CstIcon = reactionType.icon;
                const count = reactionCounts ? reactionCounts[reactionType.name] : 0;

                if (count > 0) {
                    return (
                        <div key={reactionType.name} style={{display: 'flex', alignItems: 'center', margin: '0 10px',}}>
                            {reactionType.icon

                            }
                            <span>{count}</span>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default ReactionsCounter;
