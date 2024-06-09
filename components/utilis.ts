import axios from "axios";
import {showWarning} from "lib/reducers/warningSlicer";
import moment from "moment";
import {enqueueSnackbar} from "notistack";
import {useDispatch} from "react-redux";


export const isMobile = (): boolean => {
    // Check if the window object is defined (for environments where window is not available)
    {
        if (typeof window !== "undefined") {
            const userAgent = window.navigator.userAgent;
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                userAgent
            );
        }
    }
    // Return false if window is not defined (non-browser environments)
    return false;
};

export function timeAgo(timestamp: Date): string {
    const now = new Date();
    const secondsPast = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

    if (secondsPast < 60) {
        return `${secondsPast} sec${secondsPast !== 1 ? "s" : ""} ago`;
    }

    const minutesPast = Math.floor(secondsPast / 60);
    if (minutesPast < 60) {
        return `${minutesPast} min${minutesPast !== 1 ? "s" : ""} ago`;
    }

    const hoursPast = Math.floor(minutesPast / 60);
    if (hoursPast < 24) {
        return `${hoursPast} hour${hoursPast !== 1 ? "s" : ""} ago`;
    }

    const daysPast = Math.floor(hoursPast / 24);
    if (daysPast < 7) {
        return `${daysPast} day${daysPast !== 1 ? "s" : ""} ago`;
    }

    const weeksPast = Math.floor(daysPast / 7);
    if (weeksPast < 4) {
        return `${weeksPast} week${weeksPast !== 1 ? "s" : ""} ago`;
    }

    const monthsPast = Math.floor(daysPast / 30);
    if (monthsPast < 12) {
        return `${monthsPast} month${monthsPast !== 1 ? "s" : ""} ago`;
    }

    const yearsPast = Math.floor(daysPast / 365);
    return `${yearsPast} year${yearsPast !== 1 ? "s" : ""} ago`;
}

// Usage example
//const someDate = new Date('2023-05-18T12:00:00Z');
//console.log(timeAgo(someDate)); // Output will vary depending on the current date and time

export const useWarningMsg = () => {
    const dispatch = useDispatch();

    const showWarningMsg = (message: string, type = "warning") => {
        dispatch(showWarning({message, type}));
    };

    return {
        showWarningMsg,
    };
};

export const showInformation = (
    message: string,
    type: "info" | "success" | "error" | "warning" | undefined = "info"
) =>
    enqueueSnackbar(`${message || ""}`, {
        variant: type,
    });

export function generateSlug(text: string) {
    // Convert text to lowercase and remove leading/trailing whitespace
    let slug = text?.toLowerCase().trim();

    // Replace special characters with their closest equivalents
    slug = slug.replace(/[^\w\s-]/g, "");

    // Replace spaces with hyphens
    slug = slug.replace(/\s+/g, "-");

    return slug;
}

const isDevelopment = process.env.NODE_ENV === "development";

export const axiosApi = axios.create({
    withCredentials: true,

    baseURL: isDevelopment
        ? process.env.NEXT_PUBLIC_ONLINE_SRV_URI
        : process.env.NEXT_PUBLIC_ONLINE_SRV_URI,
});

export function getMonthAndYear(dateStr: any) {
    const date = moment(dateStr, "DD/MM/YYYY");
    const formattedMonth = date.format("MMMM"); // 'MMMM' will format the month as its full name
    const year = date.year();
    return formattedMonth + " " + year;
}

export function formatDateTime(dateStr: any) {
    const date = moment(new Date(dateStr), "DD/MM/YYYY HH:mm");
    return date.format("DD-MM-YYYY HH:mm"); // Adjust the format as needed
}

export function formatTextDateTime(dateStr: any) {
    const date = moment(new Date(dateStr), "DD/MM/YYYY HH:mm");
    return date.format("MMM DD, YYYY HH:mm"); // Adjust the format as needed
}

export interface Post {
    // Define properties of a Post object
    // For example:
    title: string;
    index: number;
    // Add more properties as needed
}

export const defultTabList: Post[] = [
    {title: "All", index: 0},
    {title: "Dev", index: 1},
    {title: "Dev 1", index: 2},
    {title: "Dev 2", index: 3},
    {title: "Dev 3", index: 4},
    {title: "Ux/Ui design", index: 5},
];
export const myDefaultProfile = {
    lastName: "Benayache",
    firstName: "Ayoub",
    titles: [
        "Software engineer",
        "Full stack developer",
        "backend developer",
        "Frontend developer",
    ],
    aboutme: `Hey there! Glad to have you on my personal website. I'm BENAYACHE Ayoub, a Computer Science PhD with a knack for web/software development, network/systems administration, and DEVOPS. I'm all about tackling challenges head-on and staying updated with the latest tech trends to cook up some truly inventive solutions. Let's dive in and explore the world of innovation together!
    `,

    lastUpdate: "",
   mobile: ["+33767109891"],
    emails: ["ayb.benayache@gmail.com", "ayoub.inf30@gmail.com"],
    addresses: ["46 cours du 14 juillet, 47000 Agen, France"],
    status: {
        title: "Available",
        isVisible: true,
    },
    educations: [
        {
            title: "Computer systems and networks.",
            schools: "Batna 2 university + Colmar IUT",
            deploma: "PhD degree",
            timeline: {
                start: "10/01/2015",
                end: "27/01/2021",
            },
            descriptions: [
                "A middleware approach for the integration of Wireless Sensor Networks (WSN) in the Internet of Things (IoT)",
                "IoT development and simulation",
            ],
            file: "",
        },
        {
            title: "System and network architecture",
            schools: "Batna 2 university",
            deploma: "Master's degree",
            timeline: {
                start: "01/09/2012",
                end: "02/07/2014",
            },
            descriptions: [
                "system and network administration",
                "software and web development",
                "simulation and IoT prototyping",
                "data engineering",
            ],
            file: "",
        },
        {
            title: "Cloud developer",
            schools: "Udacity nanodegree",
            deploma: "nanodegree",
            timeline: {
                start: "01/10/2022",
                end: "14/02/2023",
            },
            descriptions: [
                "full stack web developement on aws",
                "microservices and monolith architecture",
                "deploy serverless application",
            ],
            file: "https://www.udacity.com/certificate/YY7QK6XE",
        },
    ],
    experiences: [
        {
            title: "Full stack developer and R&d engineer",
            company: "Nexcellis",
            deploma: "CDI",
            timeline: {
                start: "01/11/2020",
                end: "12/01/2024",
            },
            descriptions: [
                "Orchestrated the system design and actively participated in UX/UI enhancements.",
                "Developed a robust web and desktop application with advanced security features.",
                "mitigated security risks, ensuring compliance with industry standards and protecting user data.",
                "Integrated Computer Vision for some functionalities.",
                "managed securely the cloud platform.",
                "deployed the solution (ci/cd).",
            ],
            projects: [
                "Epsano is an innovative all-in-one rehabilitation software designed to simplify patient evaluation, prescription, and tracking, both in-person and remotely. Crafted by healthcare professionals, it streamlines patient monitoring and movement analysis for seamless care.",
            ],
            techs: [
                "Javascript",
                "Nodejs",
                "ExpressJs",
                "ReactJs",
                "ElectronJS",
                "MongoDB",
                "Sqlite",
                "OvhCloud",
                "python",
                "docker",
            ],
            file: "www.epsano.fr",
        },
        {
            title: "Phd thesis",
            company: "Batna 2 unversity and Colmar IUT",
            deploma: "Phd Thesis",
            timeline: {
                start: "10/01/2015",
                end: "27/01/2021",
            },
            descriptions: [
                "Proposed new middleware solution to integrate WSN into IoT",
                "Developed a platform to create IoT applications based on the proposed middleware",
                "Implemented new routing attack and how to prevent it",
                "Developed an industrial solution for prognostics",
            ],
            projects: ["More details in the publications section."],
            techs: [
                "Javascript",
                "python",
                "C",
                "nodejs",
                "django",
                "flask",
                "blockly",
                "sqlite",
                "mysql",
                "mqtt",
                "IoT",
                "WSN",
                "m2m communication",
            ],
            file: "",
        },
        {
            title: "Full stack developer",
            company: "Freelance (missions of 4 to 8 months)",
            deploma: "Freelance",
            timeline: {
                start: "01/08/2013",
                end: "Today",
            },
            descriptions: [
                "Developed, reviewed and maintained several web, mobile, and software solutions",
                "helped to design architecture and user interfaces.",
                "collaborated to deploy the applications",
            ],
            projects: [
                "Android application: sms encryption and decryption by AES and RSA.",
                "Android application: kids tracking.",
                "Web and Mobile application: control trucks accidents remotely.",
                "Software to enhance MCU multi-server streaming and load management.",
                "Web application: AutoRES, ( rental, sale and exchange of vehicles) .",
                "Web application: online e-learning platform for kids.",
            ],
            techs: [
                "php",
                "jqury",
                "bootstrap",
                "arduino",
                "raspberypi",
                "mqtt",
                "Javascript",
                "reactjs",
                "nodejs",
                "expressjs",
                "python",
                "nodejs",
                "django",
                "flask",
                "m2m communication",
            ],
            file: "",
        },
    ],
    skills: [
        {
            title: "JavaScript",
            level: 5,
        },
        {
            title: "python",
            level: 3,
        },
        {
            title: "docker",
            level: 4,
        },
        {
            title: "nodejs",
            level: 3,
        },
        {
            title: "expressjs",
            level: 3,
        },
        {
            title: "mongodb",
            level: 1,
        },
        {
            title: "reactjs",
            level: 5,
        },
        {
            title: "web developement and testing",
            level: 5,
        },
        {
            title: "reactjs",
            level: 5,
        },
    ],
    languages: [
        {
            title: "English",
            level: 4,
        },
        {
            title: "French",
            level: 4,
        },
    ],
    publications: {
        scholarLink: "https://scholar.google.com/citations?user=86Dwj4UAAAAJ",
        articles: [
            "MsM: A microservice middleware for smart WSN-based IoT application",
            "MQTT-Based QoS Model for IoT-M2M Critical Applications",
            "RPL rank based‐attack mitigation scheme in IoT environment",
            "Divide and conquer-based attack against RPL routing protocol",
            "Industrial IoT middleware using a multi-agent system for consistency-based diagnostic in cement factory",
        ],
    },
    moreDetails: [
        {
            title: "Problem-solving",
            description:
                "Excels at tackling complex problems head-on, using analytical skills and technical expertise to identify efficient solutions. Thrives on overcoming challenges and delivering optimal outcomes.",
        },
        {
            title: "Continuous Learning",
            description:
                "Passionate about staying updated with the latest technologies and industry trends. Engages in self-directed learning and seeks opportunities to expand knowledge base for driving innovation.",
        },
        {
            title: "Adaptability",
            description:
                "Embraces change as an opportunity for growth. Quickly adjusts to new situations with flexibility and resilience, whether it involves learning a new framework or adapting to evolving project requirements.",
        },
        {
            title: "Critical Thinking",
            description:
                "Possesses strong critical thinking skills for evaluating complex problems, analyzing different approaches, and making informed decisions. Ensures that solutions are well-thought-out and effective.",
        },
        {
            title: "Attention to Detail",
            description:
                "Demonstrates keen attention to detail to ensure excellence in every project. Maintains high standards of quality and precision, whether it's writing clean code or designing user-friendly interfaces.",
        },
        {
            title: "Curiosity",
            description:
                "Naturally curious and driven to explore new technologies and methodologies. Uses curiosity to push boundaries, experiment with innovative ideas, and continuously seek opportunities for learning and growth.",
        },
        {
            title: "Leadership",
            description:
                "Leads by example and inspires others to excel. Provides guidance on technical solutions, facilitates collaboration, and empowers team members to achieve their full potential.",
        },
        {
            title: "Rigerous",
            description:
                "Approaches every task with rigor and discipline, ensuring high standards of quality and consistency. Adheres to rigorous standards and practices to deliver reliable and robust solutions.",
        },
        {
            title: "Seriousness",
            description:
                "Demonstrates a strong commitment to delivering results and meeting deadlines. Maintains a disciplined work ethic and focuses on accountability to drive project success.",
        },
    ],
    interests: ["Robotics", "Mechanics", "Electronics", "Astronomy", "Reading"],
};
