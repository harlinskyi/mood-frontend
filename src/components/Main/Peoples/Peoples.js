import './Peoples.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";
import http from '../../../http-common';
import customFunc from '../../../utils/customFunc';
import default_photo from "../../../images/default_photo.jpg"
import t from '../../../utils/translations';

class Peoples extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: "",
            loading: false,
            users: []
        };
    }
    async componentDidMount() {
        try {
            const res = await http.post(`get-users`);
            const usersList = res.data.userShortInfos;
            let usersObj = [];
            Object.entries(usersList).forEach(([key, value]) => {
                usersObj[key] = {
                    id: value.id,
                    email: value.email,
                    firstName: value.firstName,
                    lastName: value.lastName,
                    nickname: value.nickname,
                    fileName: value.fileName
                };
                console.log(usersObj[key]);
            });
            this.setState({ users: usersObj });
            console.log(this.state)
        } catch (badresponse) {
            console.log(badresponse)
        }
        this.setState({ loading: false });
    }

    render() {
        const { users } = this.state;
        return (
            <div className="row col-12 peoples-page">
                {users.reverse().map( (user) => {
                    return <User key={user.id} id={user.id} infoUser={user} />
                })}
            </div>
        )
    }
}

export default Peoples;

function User(props) {
    const { id, email, lastName, firstName, nickname, fileName } = props.infoUser
    return (
        <div className="col-2 peoples-user-card mt-5">
            <div className="bg-body rounded-c shadow-sm p-2">
                <div className="mx-auto peoples-user-photo">
                    <img srcalt={fileName} src={fileName ? customFunc.getBaseUrl() + fileName : default_photo} className="rounded mx-auto d-block" alt="Profile" />
                </div>
                <div className="mt-1 fs-5 text-center">
                    <span>{lastName} {firstName}</span>
                </div>
                <div className="fs-6 text-center peoples-user nickname">
                    <span>{nickname && '@' + nickname}</span>
                </div>
                <div className="fs-6 text-center peoples-user nickname">
                    <span><i className="fa fa-envelope-o me-1" aria-hidden="true"></i>{email}</span>
                </div>
                <Link to={`/profile/${id}`} className="mt-1 fs-6 text-center peoples-user-button">{t("View")}</Link>
            </div>
        </div>
    )
}