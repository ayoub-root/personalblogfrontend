// components/Layout.js

import React from "react";

const CustomLayout = (props: {
    title: any;
    slug: any;
    description: any;
    image: any;
    url: any;
    children: React.ReactNode;
}): React.ReactNode => (
    <>
        <head>
            <title>{props.title}</title>
            <meta property="og:title" content={props?.title}/>
            <meta property="og:description" content={props?.description}/>
            <meta
                property="og:image"
                content={
                    process.env.NEXT_PUBLIC_ONLINE_WS_URI +
                    "/images/posts/" +
                    props?.image
                }
            />
            <meta property="og:url" content={props?.url}/>
        </head>

        {props?.children}
    </>
);

export default CustomLayout;
