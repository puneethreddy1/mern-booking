
import { useState } from "react";
import { css } from "@emotion/react";

import ClipLoader from "react-spinners/ClipLoader";


function Loader() {

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
    return (
        <div style={{ margintop: "150px" }}>
            <div className="sweet-loading">

                <ClipLoader color='#000' loading={loading} css='' size={80} />
            </div>
        </div>
    )



}



export default Loader;
