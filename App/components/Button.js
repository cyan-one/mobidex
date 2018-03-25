import React, { Component } from "react";
import { Button as RNEButton } from "react-native-elements";
import { colors } from "../../styles";

export default class Button extends Component {
  render() {
    let {
      titleStyle,
      buttonStyle,
      ...rest
    } = this.props;
    return (
      <RNEButton
          {...rest}
          titleStyle={[{
            backgroundColor: "transparent",
            color: "white"
          }, titleStyle]}
          buttonStyle={[{
            backgroundColor: colors.grey3,
            borderColor: colors.grey3,
            borderRadius: 0,
            borderWidth: 1,
            marginTop: 5,
            marginRight: 5,
            marginBottom: 5,
            marginLeft: 5
          }, buttonStyle]} />
    );
  }
}