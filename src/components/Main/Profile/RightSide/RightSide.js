import './RightSide.css'
import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import http from "../../../../http-common";
import store from "../../../../store" 
import EclipseWidget from "../../../common/eclipse/eclipse.js"


class RightSide extends Component {
    
    state = {
        loading: true
    }

    async componentDidMount() {
        console.log(this.state.loading)
        const { userId } = store.getState().auth;
        try {
            const response = await http.post(`get-user-profile?id=${userId}`);
            const userProfile = response.data;
            console.log(userProfile)
            console.log(this.state.loading)
            this.setState(userProfile)

        } catch (badresponse) {
            console.log("problem", badresponse.response);
            // if(badresponse.response.status===401) {
            //     this.props.history.push("/login");
            // }
        }
        this.setState({ loading: false })
    }

    render() {
        const { loading, id, firstName, lastName, isMale, bithDay, nickName, location, quote, link} = this.state;
        return (
            <div className="RightSide col-3 mb-3">
                <div className="d-flex flex-column p-3 bg-body rounded-c shadow-sm">
                    <div className="m-2 mx-auto RightSide-profile-photo">
                        <img src="https://cdn.popcake.tv/wp-content/uploads/2020/09/pokrov90_118863382_963425367814685_6603924445247511753_n.jpg" className="rounded mx-auto d-block" alt="Profile"/>
                    </div>
                    <div className="mt-1 mx-auto fs-4 RightSide-profile-username">
                        <span>{firstName} {lastName}</span>
                    </div>
                    {nickName && <div className="mb-1 mx-auto fs-5 RightSide-profile-nickname">@{nickName}</div> }
                    {quote && <div className="mb-1 mx-auto fs-6 RightSide-profile-quote">{quote}</div> }
                    <ul className="RightSide-profile-list-info">
                        {bithDay && <li className="mb-1">
                            <i className="fa fa-calendar" aria-hidden="true"></i><span>{bithDay}</span>
                        </li> }
                        {location && <li className="mb-1">
                            <i className="fa fa-map-marker" aria-hidden="true"></i><span>{location}</span>
                        </li> }
                        {link && <li className="mb-1">
                            <i className="fa fa-link" aria-hidden="true"></i><span>{link}</span>
                        </li> }
                    </ul>
                </div>
                { loading && <EclipseWidget /> }
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        userId: state.auth.userId
    };
}

export default connect(mapStateToProps)(RightSide);