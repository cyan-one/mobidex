import React, { Component } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { connect } from "react-redux";
import { formatAmountWithDecimals, formatTimestamp } from "../../../utils/display";
import { getTokenByAddress } from "../../../utils/ethereum";
import Row from "../../components/Row";
import MutedText from "../../components/MutedText";

class CancelledItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      makerToken: null,
      takerToken: null,
      ready: false
    };
  }

  async componentDidMount() {
    let [ makerToken, takerToken ] = await Promise.all([
      getTokenByAddress(this.props.web3, this.props.transaction.makerToken),
      getTokenByAddress(this.props.web3, this.props.transaction.takerToken)
    ]);
    
    this.setState({
      makerToken,
      takerToken,
      ready: true
    });
  }

  render() {
    if (!this.state.ready) {
      return null;
    }

    let { cancelledMakerTokenAmount, cancelledTakerTokenAmount, timestamp } = this.props.transaction;
    let { makerToken, takerToken } = this.state;

    return (
      <View>
        <Row>
          <Text>{formatAmountWithDecimals(cancelledMakerTokenAmount, makerToken.decimals)} {makerToken.symbol}</Text>
          <Text> for </Text>
          <Text>{formatAmountWithDecimals(cancelledTakerTokenAmount, takerToken.decimals)} {takerToken.symbol}</Text>
        </Row>
        <MutedText>{formatTimestamp(timestamp)}</MutedText>
      </View>
    );
  }
}

export default connect(state => ({ ...state.wallet, ...state.device.layout }), dispatch => ({ dispatch }))(CancelledItem);
