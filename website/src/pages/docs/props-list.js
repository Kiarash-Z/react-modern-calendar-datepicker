import React from 'react';

import Docs from '../../containers/docs';
import { Table } from '../../components';
import { PROPS_TABLE_HEADERS, PROPS_TABLE_CALENDAR_ROWS, PROPS_TABLE_PICKER_ROWS } from '../../constants/docsConstants';

const DefaultValues = () => {

  return (
    <Docs title="Props List">
      <p className="Docs__paragraph">
        Here&#39;s the full list of available props:
      </p>
      <h2 className="Docs__titleSecondary">
        <code className="custom-code">{`<Calendar />`}</code> props
      </h2>

      <Table
        headers={PROPS_TABLE_HEADERS}
        rows={PROPS_TABLE_CALENDAR_ROWS}
      />

      <h2 className="Docs__titleSecondary">
        <code className="custom-code">{`<DatePicker />`}</code> props
      </h2>

      <Table
        headers={PROPS_TABLE_HEADERS}
        rows={PROPS_TABLE_PICKER_ROWS}
      />

      <p className="Docs__paragraph -marginTop">
        <strong>Note: </strong> You can pass
        all <code className="custom-code">{`<Calendar />`}</code> props
        via <code className="custom-code">{`<DatePicker />`}</code> props as well.
      </p>
    </Docs>
  );
};

export default DefaultValues;
