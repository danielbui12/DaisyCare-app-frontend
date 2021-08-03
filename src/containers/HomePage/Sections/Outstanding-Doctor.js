import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import Slider from "react-slick";
import { LANGUAGES } from '../../../utils'

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctos: []
        }
    }

    componentDidUpdate(prevProps) {
        const { topDoctors } = this.props
        if(prevProps.topDoctors !== topDoctors) {
            this.setState({
                arrDoctos: [...topDoctors]
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctor(8)
    }

    render() {
        const { arrDoctos } = this.state
        const { language } = this.props
        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-sec" ><FormattedMessage id="banner.outstanding-doctors"/></span>
                        <button className="btn-sec">{language === LANGUAGES.VI ? "TÌM KIẾM" : "FIND A DOCTOR"}</button>
                    </div>
                <div className="section-body">
                    <Slider {...this.props.settings}>
                        
                        {arrDoctos && arrDoctos.length > 0 && arrDoctos.map((item, i) => {
                            let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `
                            let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                            let imgBase64 = "";
                            if(item.image) {
                                imgBase64 = new Buffer(item.image, 'base64').toString('binary')
                            }

                            return (<div className="section-customize" key={i}>
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div 
                                            className="bg-img section-outstanding-doctor"
                                            style={{backgroundImage: `url(${imgBase64})`}}
                                        />
                                    </div>
                                    <div className="position text-center">
                                        <div>{language === LANGUAGES.EN ? nameEn : nameVi}</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                            </div>)
                        })}
                    </Slider>
                
                </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctors: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: (limit) => dispatch(actions.fetchTopDoctor(limit))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);