import React, { useState } from 'react';
import { Bar, Line, Pie, Radar, Doughnut, PolarArea, Bubble, Scatter } from 'react-chartjs-2';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    ArcElement,
    RadialLinearScale,
} from 'chart.js';
import { Grid } from '@mui/material';

// Register the required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement,
    RadialLinearScale
);

const generateFakeData = () => {
    const fakePosts = Array.from({ length: 10 }, (_, index) => ({
        title: `Post ${index + 1}`,
        views: Math.floor(Math.random() * 1000),
    }));

    const fakeMessages = Array.from({ length: 10 }, (_, index) => ({
        user: { name: `User ${index + 1}` },
        count: Math.floor(Math.random() * 100),
    }));

    const fakeUsers = Array.from({ length: 10 }, (_, index) => ({
        name: `User ${index + 1}`,
        postsCount: Math.floor(Math.random() * 50),
    }));

    return { fakePosts, fakeMessages, fakeUsers };
};

const DashboardPage = (props: any) => {
    const { fakePosts, fakeMessages, fakeUsers } = generateFakeData();

    const [posts, setPosts] = useState(props.posts || fakePosts);
    const [messages, setMessages] = useState(props.messages || fakeMessages);
    const [users, setUsers] = useState(props.users || fakeUsers);

    const postsData = {
        labels: posts.map((post: any) => post?.title),
        datasets: [
            {
                label: 'Posts',
                data: posts.map((post: any) => post.views),
                backgroundColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const messagesData = {
        labels: messages.map((msg: any) => msg.user.name),
        datasets: [
            {
                label: 'Messages',
                data: messages.map((msg: any) => msg.count),
                backgroundColor: 'rgba(153,102,255,1)',
            },
        ],
    };

    const usersData = {
        labels: users.map((user: any) => user.name),
        datasets: [
            {
                label: 'Users',
                data: users.map((user: any) => user.postsCount),
                backgroundColor: 'rgba(255,159,64,1)',
            },
        ],
    };

    const pieData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Colors',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const radarData = {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [65, 59, 90, 81, 56, 55, 40],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'My Second Dataset',
                data: [28, 48, 40, 19, 96, 27, 100],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)',
            },
        ],
    };

    const doughnutData = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                hoverOffset: 4,
            },
        ],
    };

    const polarData = {
        labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
        datasets: [
            {
                label: 'My Dataset',
                data: [11, 16, 7, 3, 14],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(201, 203, 207, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)', 'rgb(255, 206, 86)', 'rgb(201, 203, 207)', 'rgb(54, 162, 235)'],
                borderWidth: 1,
            },
        ],
    };

    const bubbleData = {
        datasets: [
            {
                label: 'First Dataset',
                data: [
                    { x: 20, y: 30, r: 15 },
                    { x: 40, y: 10, r: 10 },
                    { x: 25, y: 15, r: 20 },
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const scatterData = {
        datasets: [
            {
                label: 'Scatter Dataset',
                data: [
                    { x: -10, y: 0 },
                    { x: 0, y: 10 },
                    { x: 10, y: 5 },
                    { x: 0.5, y: 5.5 },
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <Grid container spacing={3} p={2} rowGap={"30px"} >
            <Grid item xs={12}>
                <h1>Dashboard (fake data)</h1>
            </Grid>


            <Grid item xs={6} sm={4}>
                <h2>Posts Overview</h2>
                <Bar data={postsData} />
            </Grid>

            <Grid item xs={6} sm={4}>
                <h2>Messages Overview</h2>
                <Line data={messagesData} />
            </Grid>

            <Grid item xs={6} sm={4}>
                <h2>Users Overview</h2>
                <Bar data={usersData} />
            </Grid>

            <Grid item xs={6} sm={4}>
                <h2>Colors Distribution</h2>
                <Pie data={pieData} />
            </Grid>

            <Grid item xs={6} sm={4}>
                <h2>Activity Radar</h2>
                <Radar data={radarData} />
            </Grid>

            <Grid item xs={6} sm={4}>
                <h2>Colors Doughnut</h2>
                <Doughnut data={doughnutData} />
            </Grid>

            <Grid item xs={6} sm={4}>
                <h2>Polar Area Chart</h2>
                <PolarArea data={polarData} />
            </Grid>

            <Grid item xs={6} sm={4}>
                <h2>Bubble Chart</h2>
                <Bubble data={bubbleData} />
            </Grid>

            <Grid item xs={6} sm={4}>
                <h2>Scatter Chart</h2>
                <Scatter data={scatterData} />
            </Grid>
        </Grid>
    );
};

export default DashboardPage;
