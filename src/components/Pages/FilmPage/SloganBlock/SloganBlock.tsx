import React, { FC } from "react";
import './SloganBlock.scss'
import Icons from "../../../Icons/Icons";

interface SloganBlockProps {
    slogan: string | undefined;
}

const SloganBlock:FC<SloganBlockProps> = ({slogan}) => {
    return (
        <div>
            {(slogan) && <div className="sloganBlock">
                <Icons name="slogan-open" color="white" size="70" strokeWidth="0"/>
                {/* <img src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/laurelBranchLeft.svg" /> */}
                <p className="sloganBlock__text">{slogan}</p>
                {/* <img src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/laurelBranchRight.svg"/> */}
                <Icons name="slogan-close" color="white" size="70" strokeWidth="0"/>   
            </div>}
        </div>
    )
}

export default SloganBlock;

