import React, { useState } from 'react';
import DatePicker, { Calendar } from 'react-persian-calendar-date-picker';
import { Link } from 'gatsby';

import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as LogoBackground } from '../images/logo-background.svg';
import { ReactComponent as GithubMark }  from '../images/github-mark.svg';

import './index.css';

import { Layout, SEO } from '../components';

const SELECTED_DAY_RANGE_1 = {
  from: {
    year: 1398,
    month: 1,
    day: 12,
  },
  to: {
    year: 1398,
    month: 1,
    day: 21,
  },
};

const SELECTED_DAY_RANGE_2 = {
  from: {
    year: 1398,
    month: 1,
    day: 6,
  },
  to: {
    year: 1398,
    month: 1,
    day: 15,
  },
};

const IndexPage = () => {
  const [selectedDay1, setValue1] = useState(null);
  const [selectedDay2, setValue2] = useState({ year: 1380, month: 7, day: 26 });
  const [selectedDayRange1, setSelectedDayRange1] = useState(
    SELECTED_DAY_RANGE_1,
  );
  const [selectedDayRange2, setSelectedDayRange2] = useState(
    SELECTED_DAY_RANGE_2,
  );
  return (
    <Layout>
      <SEO
        title="Home"
        keywords={[
          'persian date picker',
          'datepicker',
          'application',
          'react',
          'persian',
        ]}
      />
      <div className="hero">
        <Logo className="hero__logo" />
        <LogoBackground className="hero__logoBackground" />
        <h1 className="hero__title">react-persian-calendar-date-picker</h1>
        <h2 className="hero__titleSecondary">
          A lightweight, customizable, Persian date picker for React
        </h2>
        <div className="hero__actionContainer">
          <Link className="hero__actionButton -primary" to="/docs/getting-started">
            Get Started
          </Link>
          <a
            href="https://github.com/Kiarash-Z/react-persian-calendar-date-picker"
            rel="noopener noreferrer"
            target="_blank"
            className="hero__actionButton -social"
          >
            <GithubMark className="hero__buttonIcon" />
            <span>Github</span>
          </a>
        </div>
      </div>

      <div className="exampleList">
        <div className="exampleItem">
          <div className="exampleItem__subContainer">
            <span className="exampleItem__title">Basic Date Picker</span>
            <p className="exampleItem__description">
              Functions using an input and a calendar. A single day is
              selectable.
            </p>
            <DatePicker
              selectedDay={selectedDay1}
              onChange={setValue1}
              wrapperClassName="persianFontWrapper -aboveAll"
              calendarClassName="persianFontWrapper"
            />
          </div>
        </div>

        <div className="exampleItem">
          <div className="exampleItem__subContainer">
            <span className="exampleItem__title">
              Use Standalone Calendar Component
            </span>
            <p className="exampleItem__description">
              No input needed? No problem. You can use Calendar component
              itself.
            </p>
            <Calendar
              calendarClassName="persianFontWrapper"
              selectedDay={selectedDay2}
              onChange={setValue2}
            />
          </div>
        </div>

        <div className="exampleItem">
          <div className="exampleItem__subContainer">
            <span className="exampleItem__title">Select a Range of Days</span>
            <p className="exampleItem__description">
              Select a range of days by specifying a starting and an ending day.
            </p>
            <Calendar
              selectedDayRange={selectedDayRange1}
              onChange={setSelectedDayRange1}
              calendarClassName="persianFontWrapper"
              isDayRange
            />
          </div>
        </div>

        <div className="exampleItem">
          <div className="exampleItem__subContainer">
            <span className="exampleItem__title">
              Customize According to Your Preferences
            </span>
            <p className="exampleItem__description">
              Many props are available for you to customize your date picker as
              you wish.
            </p>
            <Calendar
              selectedDayRange={selectedDayRange2}
              onChange={setSelectedDayRange2}
              colorPrimary="#0fbcf9"
              colorPrimaryLight="rgba(75, 207, 250, 0.4)"
              calendarTodayClassName="exampleItem__customTodayCalendar"
              calendarRangeBetweenClassName="exampleItem__customRangeCalendar"
              calendarRangeStartClassName="exampleItem__customRangeCalendar"
              calendarRangeEndClassName="exampleItem__customRangeCalendar"
              calendarClassName="persianFontWrapper"
              isDayRange
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
