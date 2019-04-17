import React from "react"

import Logo from '../images/logo.svg';
import GithubMark from '../images/github-mark.svg';

import './index.css';

import { Layout, SEO, ButtonPrimary, ButtonSocial } from "../components"

const IndexPage = () => (
  <Layout>
    <SEO
      title="Home"
      keywords={[
        "persian date picker",
        "datepicker",
        "application",
        "react",
        "persian",
      ]}
    />
    <div className="hero">
      <Logo className="hero__logo" />
      <h1 className="hero__title">react-persian-date-picker</h1>
      <h2 className="hero__titleSecondary">
        A lightweight, customizable, Persian date picker for React
      </h2>
      <div className="hero__actionContainer">
        <ButtonPrimary className="hero__actionButton">
          Get Started
        </ButtonPrimary>
        <ButtonSocial className="hero__actionButton">
          <GithubMark className="hero__buttonIcon" />
          <span>Github</span>
        </ButtonSocial>
      </div>
    </div>
    {/* <div className="example">
      <div className="exampleItem">
        <span className="exampleItem__title">Basic Date Picker</span>
        <p className="exampleItem__description">
          Consists of an input element + calendar
        </p>
      </div>
    </div> */}
  </Layout>
)

export default IndexPage
