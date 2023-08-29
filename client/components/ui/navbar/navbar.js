import { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import UserNav from '../userNav/userNav'
import env from '../../../config/env'
import { BuilderComponent, builder } from '@builder.io/react'
import { useCart } from '../../../lib/hooks/useCart'
import { useThemeUI } from 'theme-ui'
import { Themed } from "@theme-ui/mdx"
import { useUI } from '../context'
import Image from 'next/image'
import Searchbar from '../searchBar/searchBar'
import styles from "./navbar.module.css"
import featuredCatStyles from "../../featuredCat/featuredCat.module.css"

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
    <header className={styles.header}>
      <BuilderComponent
        content={announcement}
        data={{ theme }}
        model="announcement-bar"
      />
      <div className={styles.wrapper}
      >
        <div
          className={styles.logo}
        >
          <div></div>

          <h1
          >
            {logo && logo.image && (
              <Link
                href="/"
              >
                <Image
                  layout="fixed"
                  width={logo.width}
                  height={logo.height}
                  src={logo.image}
                  alt={logo.text}
                ></Image>
              </Link>
            )}
            {logo && logo.text && !logo.image && (
              <Link
                href="/"
              >
                {logo.text}
              </Link>
            )}
          </h1>
          <UserNav />
        </div>
        <nav
          className={styles.container}
        >
          <ul className={styles.navlinks}>
            <li>
              <Searchbar />
            </li>
            {navigationLinks?.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.link}
                  className={featuredCatStyles.link}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header >
  )
}

export default Navbar
