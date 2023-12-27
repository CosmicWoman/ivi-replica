import React, { FC } from "react";
import './Comment.scss';
import { CommentProps } from "../../../../../../../../types/filmPageTypes";
import Icons from "../../../../../../../Icons/Icons";

const Comment:FC<CommentProps> = ({child}) => {
    return (
        <div className="comment" key={child.id} >

            <div className="comment__left">
                <Icons name="person" size="30" color="gray" className="comment__person"/>
                <div className="comment__text">{child.nickName}</div>
                <div className="comment__text">{ (new Date (child.createdAt)).toLocaleDateString() }</div>  
            </div>

            <div className="comment__right">
                <div className="comment__body">{child.value}</div>
                <div className="comment__like">
                    <Icons name="like" size="18" color="gray" className="comment__svg"/>
                    <span className="comment__likeCounter">{0}</span>
                    <Icons name="dislike" size="18" color="gray" className="comment__svg"/>
                </div>    
            </div>

        </div>
    )
}
export default Comment;