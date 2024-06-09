import {useSelector} from "react-redux";
import {RootState} from "../../../../lib/store";
import {Chip} from "@mui/material";

const ShowTags = ({tags}: any) => {

    const filtersList = useSelector((state: RootState) => state.filtersList)?.filtersList?.filter((r: any) => r.type == "tags" && tags.includes(r.id)) || [];

    return <div style={{display: "flex", columnGap: "5px", paddingBlock: "15px"}}>
        {filtersList.map((d: any, index: number) => <Chip key={index} label={d?.label}/>)}
    </div>;

}
export default ShowTags;