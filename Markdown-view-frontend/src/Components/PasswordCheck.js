import React from 'react'

export default function PasswordCheck({value, text}) {
  const styles = {
    color: value ? "#0096FF" : "#D3D3D3"
  }
  return (
    <div style = {styles}>
        <li>{text}</li>
    </div>
  )
}
