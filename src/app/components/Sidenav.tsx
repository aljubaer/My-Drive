"use client"

import styled from "styled-components";
import { VscAdd } from "react-icons/vsc";
import { PiFileArrowUpBold, PiFolderNotchPlusBold } from "react-icons/pi";

const SideNavStyles = styled.div`
margin: 0;
padding: 0;
width: 250px;
color: #282C35;
background-color: #F8FAFD;
position: fixed;
height: 100%;
overflow: auto;
`;

const CreateFolderButton = styled.button`
margin: 8px;
padding: 20px;
border-radius: 16px;
border: 0px;
font-size: 12px;
font-weight: bold;
background-color: #EDF1FA;
text-transform: uppercase;
box-shadow: 1px 1px 1px 1px #EDF1FA;
&:hover,
&:focus {
    background-color: #E9EEF6;
    cursor: pointer;
    box-shadow: 2px 2px 1px 1px #EDF1FA;
}
`;

export default function SideNav() {
    return <SideNavStyles>
        <CreateFolderButton>
            <VscAdd style={{ strokeWidth: 1 }}/>
            <span style={{marginLeft: 4}}> New </span>
        </CreateFolderButton>
        <CreateFolderButton>
            <PiFolderNotchPlusBold size={16}/>
            <span style={{marginLeft: 4}}> New Folder </span>
        </CreateFolderButton>
        <CreateFolderButton>
            <PiFileArrowUpBold size={16}/>
            <span style={{marginLeft: 4}}> Upload File </span>
        </CreateFolderButton>
    </SideNavStyles>
};