"use client"

import styled from "styled-components";
import { VscAdd } from "react-icons/vsc";
import { PiFileArrowUpBold, PiFolderNotchPlusBold } from "react-icons/pi";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useFileContext } from "../contexts/FilesContext";

const SideNavStyles = styled.div`
margin: 0;
padding: 0;
width: 250px;
color: #282C35;
background-color: #F8FAFD;
position: fixed;
height: 100vh;
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

const Modal = styled.div`
display: none;
position: fixed;
z-index: 1;
padding-top: 100px;
left: 0;
top: 0;
width: 100%;
height: 100%;
overflow: auto;
background-color: rgb(0,0,0);
background-color: rgba(0,0,0,0.4);
`;

const ModalContent = styled.div`
background-color: #fefefe;
margin: auto;
padding: 20px;
border: 1px solid #888;
width: 80%; 
`;

const CloseButton = styled.span`
color: #aaaaaa;
float: right;
font-size: 28px;
font-weight: bold;
&:hover,
&:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}
`;

export default function SideNav() {

    const modalRef = useRef(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const { addFile } = useFileContext();

    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        window.onclick = (event) => {
          if (event.target === modalRef.current) {
            if (isModalVisible) closeModal();   
          }
        }
    }, [isModalVisible]);

    const closeModal = () => {
        setModalVisible(false);
    }

    const openModal = () => {
        setModalVisible(true);
    }

    const handleInput = (e: FormEvent<HTMLInputElement> | any) => {
        const currValue = inputRef.current?.value;
        if (currValue) {
            addFile( {name: currValue, path: currValue, type: 'Folder'} );
        }
        closeModal();
    }

    return <>
        <Modal ref={modalRef} style={{ display: isModalVisible ? 'block' : 'none' }}>
            <ModalContent>
                <CloseButton onClick={closeModal}> &times; </CloseButton>
                <input ref={inputRef} />
                <button onClick={handleInput}>Create New Folder</button>
            </ModalContent>
        </Modal>

        <SideNavStyles>
            <CreateFolderButton>
                <VscAdd style={{ strokeWidth: 1 }} />
                <span style={{ marginLeft: 4 }}> New </span>
            </CreateFolderButton>
            <CreateFolderButton onClick={openModal}>
                <PiFolderNotchPlusBold size={16} />
                <span style={{ marginLeft: 4 }}> New Folder </span>
            </CreateFolderButton>
            <CreateFolderButton>
                <PiFileArrowUpBold size={16} />
                <span style={{ marginLeft: 4 }}> Upload File </span>
            </CreateFolderButton>
        </SideNavStyles>
    </>
};