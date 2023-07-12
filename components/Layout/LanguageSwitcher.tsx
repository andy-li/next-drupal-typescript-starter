import { type ChakraComponent, Flex, Link, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { useContentTranslationsContext } from "@/hooks/useContentTranslationsContext"
import { type DrupalContentTranslation } from "@/types/index"

type LanguageSwitcherProps = ChakraComponent<
  "div",
  { color?: string; size?: string }
>

const LanguageSwitcher = (({ color, ...props }) => {
  const { locales, asPath, locale: currentLocale, route } = useRouter()
  const { t } = useTranslation()
  const { contentTranslationsContextState } = useContentTranslationsContext()

  const SwitcherLink = ({ locale, href }: { locale: string; href: string }) => (
    <NextLink locale={locale} href={href} passHref>
      <Link
        textStyle={locale === currentLocale ? "navigationActive" : "navigation"}
        fontSize={props.fontSize}
        color={color}
        _hover={{ textDecoration: "none" }}
      >
        {t(locale)}
      </Link>
    </NextLink>
  )

  const NextjsMode = () => (
    <>
      {locales &&
        locales.map((locale) => (
          <SwitcherLink key={locale} locale={locale} href={asPath} />
        ))}
    </>
  )

  const DrupalMode = () => (
    <>
      {locales &&
        locales.map((locale) => {
          const translationForLocale = contentTranslationsContextState?.filter(
            (translation: DrupalContentTranslation) => {
              return translation.langcode === locale
            }
          )

          if (translationForLocale && translationForLocale.length > 0) {
            return (
              <SwitcherLink
                key={locale}
                locale={locale}
                href={translationForLocale[0]?.path || ""}
              />
            )
          }

          return (
            <Text
              key={locale}
              textStyle={
                locale === currentLocale ? "navigationActive" : "navigation"
              }
              fontSize={props.fontSize}
              color="gray.300"
            >
              {t(locale)}
            </Text>
          )
        })}
    </>
  )

  return (
    <Flex as="nav" direction="row" {...props}>
      {route === "/[...slug]" && contentTranslationsContextState ? (
        <DrupalMode />
      ) : (
        <NextjsMode />
      )}
    </Flex>
  )
}) as LanguageSwitcherProps

export default LanguageSwitcher
