import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IconContext } from 'react-icons'
import { BsGearFill, BsSearch } from 'react-icons/bs'
import { useRecoilState } from 'recoil'
import { styled } from '../lib/stitches'
import { SearchInput, SearchResult, SearchBetaMessage } from './Search'
import { animeSearchActiveState } from '../states/animeSearch'
import HeaderLinks from './HeaderLinks'
import ClassNameLink from './ClassNameLink'
import useWindowSize from '../hooks/useWindowSize'

const RightSideButton = styled('button', { all: 'unset', cursor: 'pointer' })
const RightSideLink = styled('a', {
  marginLeft: '24px',
  cursor: 'pointer',
})

const SearchContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})

const InputContainer = styled('div', {
  position: 'relative',
  minWidth: 300,
  width: '100%',
})

const Header = () => {
  const { width: windowWidth } = useWindowSize()
  const [scrollPosition, setScrollPosition] = useState(0)
  const isScrollDown = scrollPosition > 70

  const [isSearchActive, setSearchActive] = useRecoilState(
    animeSearchActiveState
  )

  const { pathname } = useRouter()
  const [isIconWhite, setIconWhite] = useState(false)
  const TRANSPARENT_PATH = `/anime/[id]/[name]`

  const isHideExtra = isSearchActive && windowWidth <= 576

  const handleScroll = () => {
    setScrollPosition(window.pageYOffset)
  }

  const handleSearchClick = () => {
    setSearchActive(!isSearchActive)
  }

  const handleOutsideClick = (e) => {
    if (!clickRef.current.contains(e.target)) {
      setSearchActive(false)
    }
  }

  const clickRef = useRef(null)

  if (isScrollDown) {
    setSearchActive(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousedown', handleOutsideClick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    if (pathname === TRANSPARENT_PATH) {
      setIconWhite(true)
    } else {
      setIconWhite(false)
    }
  }, [pathname])

  return (
    <>
      <div
        className={`header b-default ${
          pathname === TRANSPARENT_PATH && 'transparent'
        }`}
      >
        <div className="wrapper">
          <div className="container">
            {!isHideExtra && (
              <div className="logo">
                <Link href="/">
                  <a className="link">
                    <>
                      <img
                        className="link-img rounded"
                        src="/images/logo.jpg"
                        alt="Ohys"
                      />
                      <span className="link-text">Schedule</span>
                    </>
                  </a>
                </Link>
              </div>
            )}
            <div className="right-side">
              <IconContext.Provider
                value={{
                  color: isIconWhite ? '#FFF' : '#000',
                }}
              >
                <SearchContainer
                  css={{
                    width: isSearchActive ? '100%' : 'initial',
                    '@sm': {
                      width: 'initial',
                    },
                  }}
                  ref={clickRef}
                >
                  {!isSearchActive && (
                    <>
                      {/* <SearchBetaMessage /> */}
                      <RightSideButton
                        css={{ paddingLeft: 2 }}
                        onClick={handleSearchClick}
                      >
                        <BsSearch />
                      </RightSideButton>
                    </>
                  )}
                  {isSearchActive && (
                    <InputContainer>
                      <>
                        <SearchInput />
                        <SearchResult css={{ marginTop: 8 }} />
                      </>
                    </InputContainer>
                  )}
                </SearchContainer>
                {!isHideExtra && (
                  <div>
                    <ClassNameLink activeClassName="actived" href="/setting">
                      <RightSideLink>
                        <BsGearFill />
                      </RightSideLink>
                    </ClassNameLink>
                  </div>
                )}
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`dayLinks b-default ${isScrollDown ? 'shadow' : ''} ${
          pathname === TRANSPARENT_PATH && 'transparent'
        }`}
      >
        <div className="wrapper">
          <HeaderLinks
            isDisplayColor={pathname !== TRANSPARENT_PATH || isScrollDown}
          />
        </div>
      </div>
      <style jsx>{`
        .b-default {
          background: #ffffff;
          z-index: 3;
          user-select: none;
        }
        .wrapper {
          width: var(--wrapper-size);
          margin: 0 auto;
        }
        .dayLinks {
          border-bottom: 1px solid #ecf0f1
          box-shadow: none;
        }
        .dayLinks.transparent {
          border-bottom: none;
          box-shadow: none;
          transition: box-shadow 0.3s, background 0.1s;
          background: rgba(0, 0, 0, 0);
        }
        .dayLinks.shadow {
          box-shadow: var(--shadow-small);
        }
        .dayLinks.transparent.shadow {
          background: #fff;
        }
        .header a {
          color: var(--sub-text-color);
        }
        .header .wrapper {
          display: flex;
          flex-direction: column;
        }
        .header .container {
          display: flex;
          align-items: center;
          padding: 14px;
          width: 100%;
          height: fit-content;
          z-index: 4;
        }
        .header .logo .link {
          display: flex;
          align-items: center;
          color: ${pathname === TRANSPARENT_PATH ? '#FFF' : '#000'};
          font-weight: bold;
          white-space: nowrap;
        }
        .header .logo .link .link-img {
          width: 40px;
          margin-right: 12px;
        }
        .header .container .right-side {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-left: auto;
        }
        .header .container .right-side .rightSideButton {
          margin-left: 4px;
        }
        .header .container .right-side .actived {
          color: #000000;
        }
        .dayLinks {
          position: sticky;
          top: 0;
        }
        @media screen and (max-width: 1080px) {
          .wrapper {
            width: var(--mobile-wrapper-size);
          }
        }
        @media screen and (max-width: 768px) {
          .header .logo .link .link-text {
            display: none;
          }
          .header .logo .link .link-img {
            margin: 0;
          }
        }
      `}</style>
    </>
  )
}
export default Header
