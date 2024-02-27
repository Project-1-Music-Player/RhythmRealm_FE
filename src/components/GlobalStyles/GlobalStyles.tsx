import React from "react"
import './GlobalStyles.scss'

type GlobalStylesProps = {
    children: React.ReactElement
}

function GlobalStyles(props: GlobalStylesProps) {
    return props.children
}

export default GlobalStyles