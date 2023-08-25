import { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import UserNav from '../userNav/userNav'
import env from '../../../config/env'
import { BuilderComponent, builder } from '@builder.io/react'
import { useCart } from '@/lib/hooks/useCart'
import { jsx, useThemeUI } from 'theme-ui'
import { useUI } from '../context'
import Image from 'next/image'
import Searchbar from '../searchBar/searchBar'
import styles from "./navbar.module.css"

const Navbar = () => {
  const [announcement, setAnnouncement] = useState()
  const { theme } = useThemeUI()
  const { navigationLinks, logo } = useUI()
  const cart = useCart()

  useEffect(() => {
    async function fetchContent() {
      const items = cart?.items || []
      const anouncementContent = await builder
        .get('announcement-bar', {
          cachebust: env.isDev,
          userAttributes: {
            itemInCart: items.map((item) => item.product.slug),
          },
        })
        .toPromise()
      setAnnouncement(anouncementContent)
    }
    fetchContent()
  }, [cart?.items])
  return (
    <Fragment>
      <BuilderComponent
        content={announcement}
        // data={{ theme }}
        model="announcement-bar"
      />
      <div className={styles.wrapper}
        as="header"
      >
        <div
          className={styles.container}
        >
          {navigationLinks?.map((link, index) => (
            <a
              key={index}
              sx={{ padding: 10, minWidth: 90 }}
              as={Link}
              href={link.link}
            >
              {link.title}
            </a>
          ))}
        </div>
        <div
          className={styles.div}
        >
          <h1
            sx={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            {logo && logo.image && (
              <a
                as={Link}
                href="/"
                sx={{
                  letterSpacing: -1,
                  textDecoration: `none`,
                  paddingLeft: '5px',
                }}
              >
                <Image
                  layout="fixed"
                  width={logo.width}
                  height={logo.height}
                  src={logo.image}
                  alt={logo.text}
                ></Image>
              </a>
            )}
            {logo && logo.text && !logo.image && (
              <a
                as={Link}
                href="/"
                sx={{
                  letterSpacing: -1,
                  textDecoration: `none`,
                  paddingLeft: '5px',
                }}
              >
                {logo.text}
              </a>
            )}
          </h1>
        </div>
        <div
          className={styles.small}
        >
          <Searchbar />
          <UserNav />
        </div>
      </div>
    </Fragment>
  )
}

export default Navbar
