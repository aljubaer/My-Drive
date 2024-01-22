"use client"

import styled from "styled-components";
import { VscAdd } from "react-icons/vsc";
import { PiFileArrowUpBold, PiFolderNotchPlusBold } from "react-icons/pi";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useFileContext } from "../contexts/FilesContext";
import { usePathname } from "next/navigation";

const SideNavStyles = styled.div`
margin: 0;
width: 25%;
color: #282C35;
background-color: #F8FAFD;
min-height: 100vh;
overflow: auto;
display: flex;
flex-direction: column;
`;

const CreateFolderButton = styled.div`
padding: 12px;
border: 0px;
width: 100%;
margin: 2px;
font-size: 12px;
font-weight: bold;
background-color: #FFF;
text-transform: uppercase;
box-shadow: 1px 1px 1px 1px #EDF1FA;
&:hover,
&:focus {
    background-color: #E9EEF6;
    cursor: pointer;
    box-shadow: 2px 2px 1px 1px #EDF1FA;
}
`;

const ModalWrapper = styled.div`
background-color: rgb(0,0,0);
background-color: rgba(0,0,0,0.4);
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
width: 300px; 
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

const FileInput = styled.input`
&::-webkit-file-upload-button {
    visibility: hidden;
  }
&:before {
    content: 'Upload a file';
    display: inline-block;
    width:100%;
    margin: 2px;
    cursor: pointer;
    padding: 12px;
    border: 0px;
    font-size: 12px;
    font-weight: bold;
    background-color: #fff;
    text-transform: uppercase;
    box-shadow: 1px 1px 1px 1px #EDF1FA;
    &:hover,
    &:focus {
        background-color: #E9EEF6;
        cursor: pointer;
        box-shadow: 2px 2px 1px 1px #EDF1FA;
    }
  }
&:hover::before {
    background-color: #E9EEF6;
    border-color: black;
  }
&:active::before {
    background-color: #E9EEF6;
    box-shadow: 2px 2px 1px 1px #EDF1FA;
  }
`;

export default function SideNav() {

    const pathname = usePathname();

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
            // console.log(pathname);
            addFile({ name: currValue, path: pathname, type: 'Folder' });
        }
        closeModal();
    }

    const handleFileUpload = (e: FormEvent<HTMLInputElement> | any) => {
        console.log(e.target.files[0]);
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
            {/* <CreateFolderButton>
                <PiFileArrowUpBold size={16} />
                <span style={{ marginLeft: 4 }}> Upload File </span>
            </CreateFolderButton> */}
            <FileInput type="file" id="file" onChange={handleFileUpload} />
        </SideNavStyles>
    </>
};