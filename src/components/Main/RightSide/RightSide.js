import './RightSide.css'
import React, { Component } from "react";
import { Link } from 'react-router-dom'

class RightSide extends Component {
    render() {
        return (
            <div className="col-3">
                <div className="d-flex flex-column p-3 bg-body rounded-c shadow-sm">
                    <div className="m-2 mx-auto RightSide-profile-photo">
                        <img src="https://cdn.popcake.tv/wp-content/uploads/2020/09/pokrov90_118863382_963425367814685_6603924445247511753_n.jpg" className="rounded mx-auto d-block" alt="Profile"/>
                    </div>
                    <div className="mt-1 mx-auto fs-4 RightSide-profile-username">
                        <Link to="#" >Sveta Ivanova</Link>
                    </div>
                    <div className="mb-1 mx-auto fs-5 RightSide-profile-nickname">@sveta_666</div>
                    <div className="mb-1 mx-auto fs-6 RightSide-profile-quote">Eius quis inflammat in illis sensus et prope quamquam doloris virtutes quidem credo hos confirmandus cum.</div>
                    <ul className="RightSide-profile-list-info">
                        <li className="mb-1">
                            <i class="fa fa-map-marker" aria-hidden="true"></i><span>Ukraine</span>
                        </li>
                        <li className="mb-1">
                            <i class="fa fa-envelope-o" aria-hidden="true"></i><span>sveta.666@gmail.com</span>
                        </li>
                        <li className="mb-1">
                            <i class="fa fa-link" aria-hidden="true"></i><span>linkedin.com/sveta_666</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

}

export default RightSide;