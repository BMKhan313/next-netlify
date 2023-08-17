import checkPropTypes from "check-prop-types"
// import PropTypes from "prop-types";
import React from "react"

export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    "props",
    component.name
  )
  return propsErr
}