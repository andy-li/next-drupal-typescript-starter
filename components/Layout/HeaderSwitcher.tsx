import { useBreakpointValue } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const HeaderDesktop = dynamic(() => import("@/components/Layout/HeaderDesktop"))
const HeaderMobile = dynamic(() => import("@/components/Layout/HeaderMobile"))

const HeaderSwitcher = () => {
  const mobileHeader = useBreakpointValue({ base: true, xl: false })
  const [header, setHeader] = useState(<HeaderMobile />)

  useEffect(() => {
    mobileHeader && setHeader(<HeaderMobile />)
    !mobileHeader && setHeader(<HeaderDesktop />)
  }, [mobileHeader])

  return header
}

export default HeaderSwitcher
