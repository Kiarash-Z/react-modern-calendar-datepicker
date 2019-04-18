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

    <div className="installation">


    </div>

    <div className="exampleList">
      <div className="exampleItem">
        <div>
          <span className="exampleItem__title">Basic Date Picker</span>
          <p className="exampleItem__description">
            Functions using an input and a calendar. Only one day is selectable.
          </p>
        </div>
      </div>

      <div className="exampleItem">
        <div>
          <span className="exampleItem__title">Select a Range of Days</span>
          <p className="exampleItem__description">
            Select a range of days by specifying a starting and an ending day.
          </p>
        </div>
      </div>

      <div className="exampleItem">
        <div>
          <span className="exampleItem__title">
            Use Standalone Calendar Component
          </span>
          <p className="exampleItem__description">
            No input needed? No problem. You can use Calendar component itself.
          </p>
        </div>
      </div>

      <div className="exampleItem">
        <div>
          <span className="exampleItem__title">
            Customize According to Your Styles
          </span>
          <p className="exampleItem__description">
            Functions using an input and a calendar. Only one day is selectable.
          </p>
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
