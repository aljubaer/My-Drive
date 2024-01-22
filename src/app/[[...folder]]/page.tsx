"use client"
import { usePathname } from "next/navigation";
import { FaFolder, FaFile } from "react-icons/fa";

import { useFileContext } from "../contexts/FilesContext";
import Link from "next/link";
import styled from "styled-components";

export default function Home({ params }: { params: { folder: string[] } }) {
    const { getFiles } = useFileContext();

    const pathname = usePathname();
    
    const files: File[] = getFiles(pathname);

    const _path = pathname === '/' ? '' : pathname;

    const Content = styled.div`
    padding: 12px;
    background-color: #E9EEF6;
    width: 150px;
    `;

    return (
        <main style={{ margin: '40px 20px', maxWidth: '60%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', height: '100%' }}>
            {files.map(file => (
                <div style={{ padding: '0px 10px' }}>
                    {file.type === 'Folder' ? <Content>
                        <FaFolder style={{ marginRight: 10 }} />
                        <Link href={`${_path}/${file.name}`} as={`${_path}/${file.name}`}>
                            {file.name}
                        </Link>
                    </Content> :
                        <Content>
                            <FaFile style={{ marginRight: 10 }} />
                            {file.name}
                        </Content>
                    }
                    <br />
                </div>
            ))}
        </main>
    );
}