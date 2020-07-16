import React, { useEffect, useState } from "react";
import line from 'next/dynamic'
import pie from 'next/dynamic'
import API from '../../lib/api'
const Line = line(
    () => import('@ant-design/charts').then((mod) => mod.Line),
    { ssr: false }
)
const Pie = pie(
    () => import('@ant-design/charts').then((mod) => mod.Pie),
    { ssr: false }
)

function DashBoard() {
    const lineConfigMaster = {
        title: {
            visible: true,
            text: 'Course Counts Overview',
        },
        description: {
            visible: true,
            text: 'Course counts summary over a period',
        },
        padding: 'auto',
        forceFit: true,
        label: {
            visible: true,
            type: 'point',
        },
        point: {
            visible: true,
            size: 5,
            shape: 'diamond',
            style: {
                fill: 'white',
                stroke: '#2593fc',
                lineWidth: 2,
            },
        },
        xField: 'course_date',
        yField: 'course_count',
    };

    const [lineConfig, setLineConfig] = useState()
    useEffect(() => {
        API.getStatCourseDate().then((res) => {
            let success = API.CheckAPIResult(res);
            if (!success) {
                return;
            }

            setLineConfig({
                ...lineConfigMaster,
                data: res.data.datas
            })
        })
    }, []);

    const pieConfigMaster = {
        forceFit: true,
        title: {
            visible: true,
            text: 'Course Enrolment Pie',
        },
        description: {
            visible: true,
            text:
                'Summary of the enrolment counts of each course',
        },
        radius: 0.8,
        angleField: 'course_count',
        colorField: 'name',
        label: {
            visible: true,
            type: 'inner',
        },
    };
    const [pieConfig, setPieConfig] = useState()
    useEffect(() => {
        API.getStatCoursePie().then((res) => {
            let success = API.CheckAPIResult(res);
            if (!success) {
                return;
            }

            setPieConfig({
                ...pieConfigMaster,
                data: res.data.datas
            })
        })
    }, []);

    return (
        <React.Fragment>
            <Line {...lineConfig} />
            <Pie {...pieConfig} />
        </React.Fragment>
    )
}

export default DashBoard