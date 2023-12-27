import React, { FC } from "react";
import './Review.scss';
import { ReviewProps } from "../../../../../../../../types/filmPageTypes";

import Icons from "../../../../../../../Icons/Icons";
import Button from "../../../../../../../UI/Buttons/Button/Button";

const Review:FC <ReviewProps> = ({review, openCreateComment}) => {
    return (
        <div className="review" >

            <div className="review__left">
                <Icons name="person" size="60" color="gray" />
                <div className="review__text">{review.nickName}</div>
                <div className="review__text">{ (new Date (review.createdAt)).toLocaleDateString() }</div>        
            </div>

            <div className="review__right">

                <div className="review__top">
                    <div className="review__header">{review.header}</div>
                    <div className="review__body">{review.value}</div>
                </div>

                <div className="review__bottom">
                    
                    <div className="review__like">
                        <Icons name="like" size="18" color="gray" className="review__svg"/>
                        <span className="review__likeCounter">{36}</span>
                        <Icons name="dislike" size="18" color="gray" className="review__svg"/>
                    </div>
                    <div className="review__btn review__btn_big" onClick={openCreateComment}>
                        <Button title={['internalPage.commentsCreatingBlock.comment']} color="transparent" />
                    </div>
                    <div className="review__btn review__btn_small" onClick={openCreateComment}>
                        <Icons name="comment" size="24" color="gray" />
                    </div>
                    <div className="review__parentID">{review.id}</div>

                </div>
                
            </div>

        </div>
    );
};

export default Review;

