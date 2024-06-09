import * as React from "react";
import Box from "@mui/material/Box";
import {RichTreeView} from "@mui/x-tree-view/RichTreeView";
import {Typography} from "@mui/material";


export default function PostSummary(props: { htmlContent: any; }) {
    // @ts-ignore
    const extractHeaders = (html: any) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const headers = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));


        return headers.map(header => ({
            // @ts-ignore
            id: header.id,
            tagName: header.tagName,
            // @ts-ignore
            label: header.innerText,

        }));
    };

// Function to generate hierarchical structure from headers
    const generateHierarchy = (headers: any) => {
        const hierarchy: any[] = [];
        const stack: any[] = [];

        headers.forEach((header: any) => {
            const level = parseInt(header.tagName[1], 10);

            const item = {...header, children: []};

            if (stack.length === 0) {
                hierarchy.push(item);
                stack.push(item);
            } else {
                while (stack.length && parseInt(stack[stack.length - 1].tagName[1], 10) >= level) {
                    stack.pop();
                }

                if (stack.length) {
                    stack[stack.length - 1].children.push(item);
                } else {
                    hierarchy.push(item);
                }
                stack.push(item);
            }
        });

        return hierarchy;
    };
    const headers = extractHeaders(props?.htmlContent);
    const hierarchy = generateHierarchy(headers);

    function scrollToId(id: string) {
        const commentsSection = document.getElementById("" + id);
        // alert(id)
        if (commentsSection) {
            commentsSection.scrollIntoView({behavior: "smooth"});
        }
    }

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 400}}>
            <Typography fontWeight={600} p={"15px"} fontSize={18}>Table of content</Typography>
            <RichTreeView defaultChecked={true}
                          items={hierarchy}
                          onItemFocus={(e: any, id: any) => {
                              //      alert(id);
                              scrollToId(id)

                          }}
                // expandedItems={hierarchy.map((d) => d.id)}
            />
        </Box>
    );
}

