import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

import './BigPlayer.scss';
import Icons from "../../../../Icons/Icons";
import ReactPlayer from "react-player";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { bigPlayerFalse } from "../../../../../store/reducers/bigPlayerReducer";
import { on } from "stream";


interface BigPlayerProps {
    trailer: string;
}

const BigPlayer:FC <BigPlayerProps> = ({trailer}) => {
    const bigPlayer = document.querySelector('#big-player');
    const dispatch = useDispatch();

    const {bigPlayerStatus} = useTypedSelector( state => state.bigPlayer);

    const onDecrement = () => {
        dispatch(bigPlayerFalse());
        bigPlayer?.classList.add('bigPlayer__hidden');
    }

    useEffect(() => {

        if (bigPlayerStatus) {
            bigPlayer?.classList.remove('bigPlayer__hidden');
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            document.body.style.overflow = 'hidden'
        } else {
            bigPlayer?.classList.add('bigPlayer__hidden');
            document.body.style.overflow = ''
        }
        
    },[bigPlayerStatus])

    return (
        <div className="bigPlayer bigPlayer__hidden" id="big-player">

            <div className="bigPlayer__close" onClick={onDecrement}>
                <Icons className="bigPlayer__svg" name="cross" size="30" />    
            </div>

            <div className="bigPlayer__video">
                <ReactPlayer
                    url={trailer}
                    className = 'bigPlayer__videoPlayer'
                    width={'auto'}
                    height={'auto'}
                    controls
                />
            </div>

        </div>
    );
};

export default BigPlayer;