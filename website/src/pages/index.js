import React, { useState } from 'react';
import { Link } from 'gatsby';
import DatePicker, { Calendar } from 'react-modern-calendar-datepicker';

import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as LogoBackground } from '../images/logo-background.svg';
import { ReactComponent as GithubMark } from '../images/github-mark.svg';

import './index.css';

import { Layout, SEO } from '../components';

const SELECTED_DAY_RANGE_1 = {
  from: {
    year: 2019,
    month: 3,
    day: 12,
  },
  to: {
    year: 2019,
    month: 3,
    day: 21,
  },
};

const SELECTED_DAY_RANGE_2 = {
  from: {
    year: 2019,
    month: 3,
    day: 6,
  },
  to: {
    year: 2019,
    month: 3,
    day: 15,
  },
};

const SELECTED_MULTIPLE_DAYS = [
  {
    year: 2019,
    month: 10,
    day: 2,
  },
  {
    year: 2019,
    month: 10,
    day: 10,
  },
  {
    year: 2019,
    month: 10,
    day: 15,
  },
  {
    year: 2019,
    month: 10,
    day: 30,
  },
];

const IndexPage = () => {
  const [selectedDay1, setValue1] = useState(null);
  const [selectedDay2, setValue2] = useState({
    year: 2001,
    month: 10,
    day: 18,
  });
  const [selectedDay3, setValue3] = useState(SELECTED_MULTIPLE_DAYS);
  const [selectedDay4, setValue4] = useState(null);
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
          'react',
          'modern',
          'calendar',
          'datepicker',
          'datepicker range',
          'datepicker component',
          'beautiful',
          'animated',
          'javascript',
          'persian',
        ]}
      />
      <div className="hero">
        <Logo className="hero__logo" />
        <LogoBackground className="hero__logoBackground" />
        <h1 className="hero__title">react-modern-calendar-datepicker</h1>
        <h2 className="hero__titleSecondary">
          A modern, beautiful, customizable date picker for React
        </h2>
        <div className="hero__actionContainer">
          <Link
            className="hero__actionButton -primary"
            to="/docs/getting-started"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/Kiarash-Z/react-modern-calendar-datepicker"
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
              value={selectedDay1}
              onChange={setValue1}
              wrapperClassName="fontWrapper -aboveAll"
              calendarClassName="fontWrapper"
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
              calendarClassName="fontWrapper"
              value={selectedDay2}
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
              value={selectedDayRange1}
              onChange={setSelectedDayRange1}
              calendarClassName="fontWrapper"
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
              value={selectedDayRange2}
              onChange={setSelectedDayRange2}
              colorPrimary="#0fbcf9"
              colorPrimaryLight="rgba(75, 207, 250, 0.4)"
              calendarTodayClassName="exampleItem__customTodayCalendar"
              calendarRangeBetweenClassName="exampleItem__customRangeCalendar"
              calendarRangeStartClassName="exampleItem__customRangeCalendar"
              calendarRangeEndClassName="exampleItem__customRangeCalendar"
              shouldHighlightWeekends
              calendarClassName="fontWrapper"
              customDaysClassName={[
                { year: 2019, month: 3, day: 4, className: 'purpleDay' },
              ]}
              renderFooter={() => (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 2rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDayRange2({
                        from: {
                          year: 2019,
                          month: 3,
                          day: 20,
                        },
                        to: {
                          year: 2019,
                          month: 3,
                          day: 22,
                        }
                      })
                    }}
                    style={{
                      background: '#0fbcf9',
                      color: '#fff',
                      borderRadius: '0.5rem',
                      padding: '1rem 2rem',
                    }}
                  >
                    Custom Button!
                  </button>
                </div>
              )}
            />
          </div>
        </div>
        <div className="exampleItem">
          <div className="exampleItem__subContainer">
            <span className="exampleItem__title">Multiple Date Selection</span>
            <p className="exampleItem__description">
              Select multiple dates by using the simple and rich API of the
              component.
            </p>
            <Calendar
              value={selectedDay3}
              onChange={setValue3}
              shouldHighlightWeekends
              wrapperClassName="fontWrapper"
              calendarClassName="fontWrapper"
            />
          </div>
        </div>

        <div className="exampleItem">
          <div className="exampleItem__subContainer">
            <span className="exampleItem__title">
              Supports Different Locales Calendar
            </span>
            <p className="exampleItem__description">
              Use all the features of the calendar existing in default mode, in
              your locale!
            </p>
            <Calendar
              value={selectedDay4}
              onChange={setValue4}
              calendarClassName="fontWrapper -persian"
              shouldHighlightWeekends
              locale="fa"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
