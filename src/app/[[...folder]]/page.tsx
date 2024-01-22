"use client"
import { usePathname } from "next/navigation";
import { FaFolder } from "react-icons/fa";

import { useFileContext } from "../contexts/FilesContext";
import Link from "next/link";
import styled from "styled-components";

export default function Home({ params }: { params: { folder: string[] } }) {
    const { files } = useFileContext();

    const pathname = usePathname();

    console.log(pathname);

    console.log(params.folder);

    const Content = styled.div`
    padding: 12px;
    background-color: #E9EEF6;
    width: 150px;
    `;

    return (
        <main style={{maxWidth: '60%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', height: '100%'}}>
            {files.map(file => (
                <div style={{padding: '0px 10px'}}>
                    <Content>
                        <FaFolder style={{ marginRight: 10 }} />
                        <Link href={`/${file.name}`} as={`/${file.name}`}>
                            {file.name}
                        </Link>
                    </Content>
                    <br />
                </div>
            ))}
        </main>
    );
}