# react-modern-calendar-datepicker
![npm](https://img.shields.io/npm/v/@sentisso/react-modern-calendar-datepicker)
[![npm downloads](https://img.shields.io/npm/dm/@sentisso/react-modern-calendar-datepicker.svg)](https://npmjs.com/package/@sentisso/react-modern-calendar-datepicker)

A modern, beautiful, customizable date picker for React.

This is a modified version of the original [Kiarash-Z/react-modern-calendar-datepicker](https://github.com/Kiarash-Z/react-modern-calendar-datepicker) _(because it seems that it is no longer maintained)_, with some of my improvements (see below) merged with [HassanMojab/react-modern-calendar-datepicker](https://github.com/hassanmojab/react-modern-calendar-datepicker).

## New features
- Possibility to disable a specific week day _(for example a shop is closed on every saturday and sunday)_.
- Possibility to forcely enable a day, even though it was disabled before via `disabledDays` or `disabledWeekDays` etc... _(for example there's an exception that a shop is opened on one specific saturday)_

#### Usage:
```jsx
<DatePicker
    disabledWeekDays={[0,3]} // this will disable every monday and thursday in every week

    // just like disabledDays but it's just the opposite
    enabledDays={[
        { year: 2021, month: 2, day: 18 } // this day will be enabled, even though it is disabled via disabledWeekDays (this is a thursday)
    ]}
/>
```

- `disabledWeekDays`: an array of numeric values in the range of 0 to 6, where 0 is a Monday and 6 is a Sunday.
- `enabledDays`: an array of `Day` objects. These days will be enabled eve.

## Installation 🚀
```bash
npm i @sentisso/react-modern-calendar-datepicker

# or if you prefer Yarn:
yarn add @sentisso/react-modern-calendar-datepicker
```

## Documentation 📄
You can find documentation on [the official website.](https://kiarash-z.github.io/react-modern-calendar-datepicker/)

The documentation is divided into several sections:
- [Getting Started](https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/getting-started)
- [Core Concepts](https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/core-concepts)
- [Default Values](https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/default-values)
- [Minimum & Maximum Date](https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/minimum-maximum-date)
- [Disabled Days](https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/disabled-days)
- [Customization](https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/customization)
- [Responsive Guide](https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/responsive-guide)
- [Utilities](https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/utilities)
- [Different Locales](https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/different-locales)
- [TypeScript](https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/typescript)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Kiarash-Z"><img src="https://avatars0.githubusercontent.com/u/20098648?v=4" width="100px;" alt=""/><br /><sub><b>Kiarash Zarinmehr</b></sub></a><br /><a href="https://github.com/Kiarash Zarinmehr/react-modern-calendar-datepicker/commits?author=Kiarash-Z" title="Code">💻</a> <a href="https://github.com/Kiarash Zarinmehr/react-modern-calendar-datepicker/commits?author=Kiarash-Z" title="Documentation">📖</a> <a href="https://github.com/Kiarash Zarinmehr/react-modern-calendar-datepicker/commits?author=Kiarash-Z" title="Tests">⚠️</a> <a href="https://github.com/Kiarash Zarinmehr/react-modern-calendar-datepicker/issues?q=author%3AKiarash-Z" title="Bug reports">🐛</a> <a href="#ideas-Kiarash-Z" title="Ideas, Planning, & Feedback">🤔</a> <a href="#a11y-Kiarash-Z" title="Accessibility">️️️️♿️</a> <a href="#infra-Kiarash-Z" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Kiarash Zarinmehr/react-modern-calendar-datepicker/pulls?q=is%3Apr+reviewed-by%3AKiarash-Z" title="Reviewed Pull Requests">👀</a> <a href="#question-Kiarash-Z" title="Answering Questions">💬</a> <a href="#tutorial-Kiarash-Z" title="Tutorials">✅</a></td>
    <td align="center"><a href="http://Dribbble.com/Armanrokni"><img src="https://avatars3.githubusercontent.com/u/43547854?v=4" width="100px;" alt=""/><br /><sub><b>Arman Rokni</b></sub></a><br /><a href="#design-armanrokni" title="Design">🎨</a></td>
    <td align="center"><a href="http://twitter.com/thebrodmann"><img src="https://avatars3.githubusercontent.com/u/20781126?v=4" width="100px;" alt=""/><br /><sub><b>Mohammad Hasani</b></sub></a><br /><a href="https://github.com/Kiarash Zarinmehr/react-modern-calendar-datepicker/commits?author=thebrodmann" title="Code">💻</a> <a href="https://github.com/Kiarash Zarinmehr/react-modern-calendar-datepicker/issues?q=author%3Athebrodmann" title="Bug reports">🐛</a> <a href="https://github.com/Kiarash Zarinmehr/react-modern-calendar-datepicker/commits?author=thebrodmann" title="Documentation">📖</a> <a href="#tutorial-thebrodmann" title="Tutorials">✅</a> <a href="#ideas-thebrodmann" title="Ideas, Planning, & Feedback">🤔</a> <a href="#question-thebrodmann" title="Answering Questions">💬</a> <a href="https://github.com/Kiarash Zarinmehr/react-modern-calendar-datepicker/pulls?q=is%3Apr+reviewed-by%3Athebrodmann" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/AmirTahani"><img src="https://avatars3.githubusercontent.com/u/21058227?v=4" width="100px;" alt=""/><br /><sub><b>Amir Tahani</b></sub></a><br /><a href="https://github.com/Kiarash Zarinmehr/react-modern-calendar-datepicker/commits?author=AmirTahani" title="Code">💻</a> <a href="#a11y-AmirTahani" title="Accessibility">️️️️♿️</a></td>
    <td align="center"><a href="http://mzed.ir"><img src="https://avatars3.githubusercontent.com/u/53334880?v=4" width="100px;" alt=""/><br /><sub><b>Mohammadreza Ziadzadeh</b></sub></a><br /><a href="https://github.com/Kiarash Zarinmehr/react-modern-calendar-datepicker/commits?author=themzed" title="Code">💻</a> <a href="#ideas-themzed" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## LICENSE

[MIT](LICENSE)
