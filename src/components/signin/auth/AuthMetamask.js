import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from 'actions'
import theme from './theme.css'
import Logo from 'components/common/icons/AdexIconTxt'
import { Button } from 'react-toolbox/lib/button'
import { withReactRouterLink } from 'components/common/rr_hoc/RRHoc.js'
import Translate from 'components/translate/Translate'
import { getWeb3 } from 'services/smart-contracts/ADX'
import SideSelect from 'components/signin/side-select/SideSelect'
import { signToken } from 'services/adex-node/actions'
import scActions from 'services/smart-contracts/actions'
import { exchange as EXCHANGE_CONSTANTS } from 'adex-constants'
import { addSig, getSig } from 'services/auth/auth'
import { checkAuth } from 'services/adex-node/actions'

const { signAuthTokenMetamask, signAuthToken, getAccountMetamask } = scActions

const RRButton = withReactRouterLink(Button)

class AuthMetamask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            method: '',
            sideSelect: false
        }
    }

    componentDidMount() {
        // this.checkMetamask()
    }

    authOnServer = () => {
        let signature = null
        let addr = this.props.account._addr
        // let authToken = 'someAuthTOken'
        let mode = EXCHANGE_CONSTANTS.SIGN_TYPES.Eip.id // TEMP?

        signAuthTokenMetamask({ userAddr: addr })
            .then(({ sig, sig_mode, authToken, typedData }) => {
                signature = sig
                return signToken({ userid: addr, signature: signature, authToken: authToken, mode: mode, typedData: typedData })
            })
            .then((res) => {
                // TEMP
                // TODO: keep it here or make it on login?
                // TODO: catch
                if (res.status === 'OK') {
                    addSig({ addr: addr, sig: signature, mode: mode, expiryTime: res.expiryTime })

                    this.props.actions.updateAccount({ ownProps: { addr: addr, authMode: mode, authSig: signature } })
                } else {
                    this.props.actions.resetAccount()
                }
            })
    }

    // TODO: Make it some common function if needed or make timeout as metamask way 
    // TODO: Keep signature expire time, and check again on the node for session 
    checkMetamask = () => {
        // TODO: make it better
        let sig = null
        let userAddr = null
        let sigMode = null
        let t = this.props.t
        getAccountMetamask()
            .then(({ addr, mode }) => {
                sigMode = mode
                if (!addr) {
                    this.props.actions.resetAccount()
                    this.props.actions.addToast({ type: 'warning', action: 'X', label: t('AUTH_WARN_NO_METAMASK_ADDR'), timeout: 5000 })
                } else {
                    userAddr = addr
                    let authSig = getSig({ addr: addr, mode: mode })
                    return authSig
                }
            })
            .then((authSig) => {
                if (authSig) {
                    sig = authSig
                    return checkAuth({ authSig })
                } else {
                    this.props.actions.updateAccount({ ownProps: { addr: userAddr, authMode: sigMode, authSig: null } })
                    return false
                }
            })
            .then((res) => {
                if (res) {
                    this.props.actions.updateAccount({ ownProps: { addr: userAddr, authMode: sigMode, authSig: getSig({ addr: userAddr, mode: sigMode }) } })
                }
            })
            .catch((err) => {
                this.props.actions.updateAccount({ ownProps: { addr: userAddr, authMode: sigMode, authSig: null } })
                this.props.actions.addToast({ type: 'cancel', action: 'X', label: t('AUTH_ERR_METAMASK', { args: [err] }), timeout: 5000 })
            })
    }

    render() {
        let t = this.props.t
        let userAddr = this.props.account._addr
        let authMode = this.props.account._authMode

        return (
            <div >
                <h3>
                    How to work with metamask here:
                </h3>
                {userAddr ?
                    <Button onClick={this.authOnServer} label={t('AUTH_WITH_METAMASK', { args: [userAddr] })} raised accent />
                    :
                    <Button onClick={this.checkMetamask} label={t('AUTH_CONNECT_WITH_METAMASK')} raised accent />
                }
            </div>
        )
    }
}

AuthMetamask.propTypes = {
    actions: PropTypes.object.isRequired,
}

// 
function mapStateToProps(state) {
    let persist = state.persist
    // let memory = state.memory
    return {
        account: persist.account
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Translate(AuthMetamask))