import './RightSide.css'
import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import http from "../../../../http-common";
import store from "../../../../store" 
import EclipseWidget from "../../../common/eclipse/eclipse.js"
import default_photo from "../../../../images/default_photo.jpg"
import getUserIdFromUrl from '../../../../utils/getUserIdFromUrl';


class RightSide extends Component {

    constructor(props) {
        super(props);
        this.state = {
          posts: [],
          userId: getUserIdFromUrl(window.location.pathname),
          errors: ""
        };
      }

    async componentDidMount() {
        const { id } = this.props.match.params
        this.setState({ loading: true, userId: id });
        try {
            const response = await http.post(`get-user-profile?id=${this.state.userId}`);
            const userProfile = response.data;
            this.setState(userProfile)
        } catch (badresponse) {
            console.log("problem", badresponse);
            this.setState({ errors: badresponse });
        }
        finally {
            this.setState({ loading: false })
        }
    }

   async componentDidUpdate(prevProps) {}

    render() {
        const { loading, email, firstName, lastName, sex, bithDay, nickName, location, quote, link } = this.state;
        return (
            <div className="RightSide col-3 mb-3">
                <div className="d-flex flex-column p-3 bg-body rounded-c shadow-sm">
                    <div className="m-2 mx-auto RightSide-profile-photo">
                        <img src={default_photo} className="rounded mx-auto d-block" alt="Profile"/>
                    </div>
                    <div className="mt-1 mx-auto fs-4 RightSide-profile-username">
                        <span>{firstName} {lastName}</span>
                    </div>
                    {nickName && <div className="mb-1 mx-auto fs-5 RightSide-profile-nickname">@{nickName}</div> }
                    {quote && <div className="mb-1 mx-auto fs-6 RightSide-profile-quote">{quote}</div> }
                    <ul className="RightSide-profile-list-info">
                        {email && <li className="mb-1">
                            <i className="fa fa-envelope-o" aria-hidden="true"></i><span>{email}</span>
                        </li> }
                        {bithDay &&<li className="mb-1">
                            <i className="fa fa-calendar" aria-hidden="true"></i><span>{bithDay.substr(0, 10)}</span>
                        </li> }
                        {location && <li className="mb-1">
                            <i className="fa fa-map-marker" aria-hidden="true"></i><span>{location}</span>
                        </li> }

                        {link && <li className="mb-1">
                            <i className="fa fa-link" aria-hidden="true"></i><span><Link to={link}>{link}</Link></span>
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