import { useState } from 'react'
import Breakpoints from '../query'
import { useMediaQuery } from 'react-responsive'
import App_Desktop from './App_desktop'
import App_mobile from './App_mobile'

export default function App(props) {

  const isMobile = useMediaQuery({
    query: Breakpoints.sm
  })

  const isDesktop = useMediaQuery({
    query: Breakpoints.lg
  })


  return (
    <>
     {
      isMobile ?
      <App_Desktop />
      :
      <App_mobile/>
     }
    </>
  )
}