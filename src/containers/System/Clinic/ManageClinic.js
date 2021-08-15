import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils/constant';
import './ManageClinic.scss'
import { FormattedMessage } from 'react-intl'
//import markdonw
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
//
import { CommonUtils } from '../../../utils'
import { createNewClinic } from '../../../services/userService'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nameVi: "",
            nameEn: "",
            image: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
            address: ""
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }

    handleChangeText = (e) => {
        const { value, name } = e.target
        let copyState = this.state
        copyState[name] = value
        this.setState({ ...copyState })
    }

    handleChangeImg = async (files) => {
        if (files) {
            let file = files[0]

            //encode user image
            let b64 = await CommonUtils.getBase64(file)
            //to preview img //
            // let imgUrl = URL.createObjectURL(file)
            this.setState({
                image: b64
            })
        }
    }

    handleSubmit = async () => {
        let res = await createNewClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success(res.message)
            this.setState({
                nameVi: "",
                nameEn: "",
                image: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
                address: ''
            })
        }
        else
            toast.error(res.errMessage)
    }

    render() {
        const { descriptionMarkdown, nameVi, nameEn, address } = this.state

        return (
            <div className="manage-specialty-container">
                <div className="ms-title">

                </div>

                <div className="add-new-specialty row">
                    <div className="col-3 form-group">
                        <label>
                            Tên phòng khám
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="nameVi"
                            value={nameVi}
                            onChange={this.handleChangeText}
                        />
                    </div>

                    <div className="col-3 form-group">
                        <label>
                            Clinic's name
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="nameEn"
                            value={nameEn}
                            onChange={this.handleChangeText}
                        />
                    </div>

                    <div className="col-6">
                        <FormattedMessage id="manage-specialty.specialty-img" />
                        <input
                            className="form-control-file"
                            type="file"
                            onChange={(e) => this.handleChangeImg(e.target.files)}
                        />
                    </div>

                    <div className="col-6 form-group">
                        <FormattedMessage id="manage-specialty.address" />
                        <input
                            className="form-control"
                            type="text"
                            name="address"
                            value={address}
                            onChange={this.handleChangeText}
                        />                  </div>

                    <div className="col-12">
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={descriptionMarkdown}
                        />
                    </div>

                    <div className="col-12">
                        <button className="btn-save-specialty" onClick={this.handleSubmit}>
                            <FormattedMessage id="manage-specialty.save" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
