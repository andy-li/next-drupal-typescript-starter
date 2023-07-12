import { Box, type BoxProps, forwardRef } from "@chakra-ui/react"

const Wrapper = forwardRef<BoxProps, "div">((props, ref) => (
  <Box
    ref={ref}
    // border="2px dashed red"
    width="full"
    paddingTop={{ base: "14", lg: "16", xl: "24" }}
    paddingBottom={{ base: "14", lg: "16", xl: "24" }}
    {...props}
  />
))

export default Wrapper
