import React from "react";
import { Select, Row, Col } from "antd";

function CalenderHeader(props) {
    const {value, onChange, keepModalClosed} = props;
    const start = 0;
    const end = 12;
    const monthOptions = [];

    const current = value.clone();
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
      current.month(i);
      months.push(localeData.monthsShort(current));
    }

    for (let index = start; index < end; index++) {
      monthOptions.push(
        <Select.Option key={`${index}`}>{months[index]}</Select.Option>
      );
    }
    const month = value.month();

    const year = value.year();
    const options = [];
    for (let i = year - 10; i < year + 10; i += 1) {
      options.push(
        <Select.Option key={i} value={i}>
          {i}
        </Select.Option>
      );
    }
    return (
      <div style={{ padding: 8 }}>
        <Row justify="end" gutter={8}>
          <Col>
            <Select
              size="small"
              dropdownMatchSelectWidth={false}
              onChange={(newYear) => {
                // Set a global bool in parent component to prevent modal from opening when year changes
                keepModalClosed();

                const now = value.clone().year(newYear);
                onChange(now);
              }}
              value={String(year)}
            >
              {options}
            </Select>
          </Col>
          <Col>
            <Select
              size="small"
              dropdownMatchSelectWidth={false}
              value={String(month)}
              onChange={(selectedMonth) => {
                // Set a global bool in parent component to prevent modal from opening when year changes
                keepModalClosed();

                const newValue = value.clone();
                newValue.month(parseInt(selectedMonth, 10));
                onChange(newValue);
              }}
            >
              {monthOptions}
            </Select>
          </Col>
        </Row>
      </div>
    );
}

export default CalenderHeader