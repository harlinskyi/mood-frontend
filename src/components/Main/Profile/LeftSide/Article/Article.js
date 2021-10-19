import './Article.css'
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import default_photo from "../../../../../images/default_photo.jpg"

class Article extends Component {
    render() {
        return (
            <li className="LeftSide-list-article-item py-2 mb-3 bg-body rounded-c shadow-sm container">
                <div className="row py-2 article-item-header">
                    <div className="col-auto">
                    <img src={default_photo} alt="mdo" width="55" height="55"/>
                    </div>
                    <div className="col-auto">
                        <div className="row fs-5 article-item-header-username">Sveta Ivanova</div>
                        <div className="row article-item-header-date">20 min ago</div>
                    </div>
                </div>
                <div className="row py-3 article-item-body">
                    <div className="row-12">Et confirmandus arcesilas magos multarum positum sequuntur igitur optimos callipho disserendo in ciceronem. Sed potius duo redargueret prope philodemum magnarum prope eo positum esse videantur est noster sane cum omnis negare duo nulla sit lustravit. Quidem disserendo nimium etiamsi est ipsum me coercendi erit magnarum tamen tum positum aliud satis rei et odit. Peripateticis voluptate omnis philodemum profuit est dolor virtutem hoc triarius autem erit iste profuit melius etiam nihil modo est vos ipsum necesse autem.</div>
                    <div className="row-12 py-3">
                        <img src="https://s.zagranitsa.com/images/articles/6729/870x486/53d189dfcd54fa9ecae756ddf5a7c2ee.jpg?1530714543" alt="mdo"/>
                    </div>
                </div>
            </li>
        )
    }

}

export default Article;