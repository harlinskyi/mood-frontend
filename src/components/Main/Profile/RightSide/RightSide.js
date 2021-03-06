import './RightSide.css'
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import http from "../../../../http-common";
import EclipseWidget from "../../../common/eclipse/eclipse.js"
import default_photo from "../../../../images/default_photo.jpg"
import customFunc from '../../../../utils/customFunc';
import t from '../../../../utils/translations';



class RightSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            userId: customFunc.getUserIdFromUrl(),
            errors: ""
        };
    }
    async componentDidMount() {
        const { id } = this.props.match.params
        this.setState({ loading: true, userId: id });
        try {
            const res = await http.post(`get-user-profile?id=${this.state.userId}`);
            if (res.data) {
                const userProfile = res.data;
                this.setState(userProfile)
            }
            else {
                this.props.history.push('/404')
            }
            console.log('navbar', this.state)
        } catch (badresponse) {
            console.log("problem", badresponse);
            this.setState({ errors: badresponse });

        }
        finally {
            this.setState({ loading: false })
        }
    }

    render() {
        const { loading, email, firstName, lastName, sex, birthDay, nickName, location, quote, link, image } = this.state;
        return (
            <div className="RightSide col-3 mb-3">
                <div className="d-flex flex-column p-3 bg-body rounded-c shadow-sm">
                    <div className="m-2 mx-auto RightSide-profile-photo">
                        <img src={image ? customFunc.getBaseUrl() + image : default_photo} className="rounded mx-auto d-block" alt="Profile" />
                    </div>
                    <div className="mt-1 mx-auto fs-4 RightSide-profile-username">
                        <span>{firstName} {lastName}</span>
                    </div>
                    {nickName && <div className="mb-1 mx-auto fs-5 RightSide-profile-nickname">@{nickName}</div>}
                    {quote && <div className="mb-1 mx-auto fs-6 RightSide-profile-quote m-0">{quote && '"' + quote + '"'}</div>}
                    <ul className="RightSide-profile-list-info m-0">
                        {sex &&
                            <li className="mb-1 text-center">
                                {sex === 'Male' && <i className="fa fa-mars" aria-hidden="true"></i>}
                                {sex === 'Female' && <i className="fa fa-venus" aria-hidden="true"></i>}
                            </li>}
                        {email && <li className="mb-1">
                            <i className="fa fa-envelope-o" aria-hidden="true"></i><span>{email}</span>
                        </li>}
                        {!['0001-01-01T00:00:00', undefined].includes(birthDay) && <li className="mb-1">
                            <i className="fa fa-calendar" aria-hidden="true"></i><span>{birthDay.substr(0, 10)}</span>
                        </li>}
                        {location && <li className="mb-1">
                            <i className="fa fa-map-marker" aria-hidden="true"></i><span>{t(location)}</span>
                        </li>}

                        {link && <li className="mb-1">
                            <i className="fa fa-link" aria-hidden="true"></i><span><Link to={{ pathname: link }} target="_blank">{link}</Link></span>
                        </li>}
                    </ul>
                </div>
                {loading && <EclipseWidget />}
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