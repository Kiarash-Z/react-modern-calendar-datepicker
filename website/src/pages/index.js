import React from "react"

import Logo from '../images/logo.svg';
import GithubMark from '../images/github-mark.svg';

import './index.css';

import { Layout, SEO, ButtonPrimary, ButtonSocial } from "../components"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <section className="hero">
      <Logo className="hero__logo" />
      <h1 className="hero__title">react-persian-date-picker</h1>
      <h2 className="hero__titleSecondary">
        A lightweight, customizable, Persian date picker for React
      </h2>
      <div className="hero__actionContainer">
        <ButtonPrimary className="hero__actionButton">Get Started</ButtonPrimary>
        <ButtonSocial className="hero__actionButton">
          <GithubMark className="hero__buttonIcon" />
          <span>Github</span>
        </ButtonSocial>
      </div>
    </section>
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */}
  </Layout>
)

export default IndexPage
