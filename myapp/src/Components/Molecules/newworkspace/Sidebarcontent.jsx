import React, { useState } from 'react'
import styled from 'styled-components'
import { Subtitle } from '../../Atoms/ming/Typography'
import saveData from '../../../API/Workspaceapi'
import { folder, logo, page } from '../../../images'


const Contentwrap = styled.div`
    width: 210px;
    min-height: 30px;
    border: 1px solid;
    box-sizing: border-box;
/* cursor: pointer; */
`
const Maintitle = styled.div`
    width: 210px;
    position: relative;
    right: 0px;
`
const Maintitlecontent = styled.div`
    
`
const Titlewrap = styled.div`
    width: 199px;
    margin-left: 10px;
    border: 1px solid;
    position: relative;
    box-sizing: border-box;
    /* display: flex; */
    `
const Titlecontent = styled.div`
    cursor: pointer;
    height: 27px;
    width: 199px;
    position: relative;
`

const Content = styled.div`
    margin-left: 10px;
    border: 1px solid;
    cursor: pointer;
    /* display: inline-block; */
    box-sizing: border-box;
`
const Btnwrap = styled.div`
    position: absolute;
    top: 0;
    right: 0px;

`
const Addbtn = styled.button`
    width: 27px;
    height: 27px;
    font-size: 26px;
    border: none;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 3px;
    display: flex;
    justify-content:  center;
    align-items: center;
    &:hover {
        background-color: #bdbdbd;
    }
`


const Addfolder = styled.div`
    top : 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:center;
    align-items: center;
    border: 1px solid;
    position: fixed;
    background-color: #7c7878;
    z-index: 9999;
    
`
const Folderwrap = styled.div`
    width: 1000px;
    height: 650px;
    padding: 50px;
    padding-top: 10px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 0 15 -18;
    box-sizing: border-box;
    position: relative;

    img {
        height: 150px;
        /* margin: 0; */
        padding: 0;
        /* position: absolute; */
    }
    .imgdiv {
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .crossbtn{
        position: absolute;
        top: 20px;
        right: 35px;
        font-size: 28px; /* Increase this for a bigger × */
        font-weight: bold;
        color: #333;
        cursor: pointer;
        user-select: none;

    }

 
    form {

        padding: 50px;
        margin: 30px auto;
        width: 450px;
        height: 400px;
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); /* Fixed */
        /* box-sizing: border-box; */

        .folderTitle {
            width: 100%;
            height: 35px;
        }
        label {
            font-size: 18px;
            font-weight: 400;
        }
        input{
            height: 100%;
            width: 100%;
            margin-top:10px;
            margin-left: 10px;
            padding: 5px;
            box-sizing: border-box;
            outline: none;
            border: 1px solid #cacaca;
            border-radius: 7px;
            font-size: 16px;
        }
        .selectContent {
            width: 200px;
            height: 100px;
            padding: 30px;
            box-shadow: 0 4px 20px rgba(0, 0, 5, 0.05);
            box-sizing: border-box;
            border-radius: 15px;
            margin: auto;
            margin-top: 70px;
            
        }
        
        .selectContent img {
            height: 25px;
        }
        button {
            width: 70%;
            height: 40px;
            float: right;
            margin-top: 110px;
            border: none;
            background-color: #22168d;
            color: white;
            border-radius: 10px;
            font-size: 18px;
            cursor: pointer;
        }

}

`


const Sidebarcontent = () => {
    const Title = '개인 페이지'
    const contents = [{ '팀 워크스페이스': [{ '리액트': ['목표', '일정'] }] }]
    // const [contents, setContents] = useState([]);
    // const contents = [{ '개인 페이지': [] }]
    const [popupfolder, setPopupfolder] = useState()
    const [popupfile, setPopupfile] = useState()
    const [isprivateopen, setIsprivateopen] = useState({})
    const toggleSection = (key) => {

        if (isprivateopen[key]) return (
            setIsprivateopen(prev => ({ ...prev, [key]: false })))
        setIsprivateopen(prev => ({ ...prev, [key]: true }))

    }
    const createFolder = async (e) => {
        e.preventDefault();
        const {value : folderName} = e.target.foldername;
        console.log(folderName)
        const { data } = await saveData('workSpace/newFolder', {folderName})
    }
    const addFolder = async (Filename) => {
        const { data } = await saveData('newFile', Filename)

    }



    console.log(isprivateopen, 'open', popupfile)
    return (<>
        {
            contents.map((item, index) => {
                const [mainTitle, subContent] = Object.entries(item)[0]
                return (
                    < Contentwrap >
                        <Maintitle>
                            <Maintitlecontent>
                                {mainTitle}
                            </Maintitlecontent>
                            <Btnwrap>
                                <Addbtn onClick={(e) => {
                                    e.stopPropagation()
                                    setPopupfolder(true)
                                }}>+</Addbtn>
                            </Btnwrap>
                        </Maintitle>
                        {subContent.map((subitem, subindex) => {
                            const [subTitle, content] = Object.entries(subitem)[0]
                            return (
                                <Titlewrap key={subindex} onClick={() => toggleSection(subindex)}>
                                    <Titlecontent>{subTitle}
                                        <Btnwrap>
                                            <Addbtn onClick={(e) => {
                                                e.stopPropagation()
                                                setPopupfile(true)        
                                            }}>+</Addbtn>
                                        </Btnwrap>
                                    </Titlecontent>
                                    {isprivateopen[subindex] && content.map((entry, entryIndex) => (
                                        <Content onClick={(e) => {
                                            e.stopPropagation()
                                        }}>{entry}</Content>
                                    ))}
                                </Titlewrap>
                            )
                        })}
                    </Contentwrap >
                )
            })}
        {popupfolder ? <Addfolder>
            <Folderwrap>
                <span className='crossbtn' onClick={() => setPopupfolder(false)}>×</span>
                <div className='imgdiv'>
                    <img src={logo} alt="" />

                </div>
                <form action="" onSubmit={(e) => createFolder(e)} >
                    <div className='folderTitle'>
                        <label htmlFor="">워크이스페이스 이름 : </label>
                        <input type="text" name='foldername'/>
                    </div>
                    <div className='selectContent'>
                        <img src={folder} alt="" />
                        <div>New Workspace</div>
                    </div>
                    <button >워크스페이스 생성하기</button>

                </form>
            </Folderwrap>
        </Addfolder> : null}
        {popupfile ? <Addfolder>
            <Folderwrap>
                <span className='crossbtn' onClick={() => setPopupfile(false)}>×</span>
                <div className='imgdiv'>
                    <img src={logo} alt="" />

                </div>
                <form action="" >
                    <div className='folderTitle'>
                        <label htmlFor="">페이지 이름 : </label>
                        <input type="text" />
                    </div>
                    <div className='selectContent'>
                        <img src={page} alt="" />
                        <div>New Page</div>
                    </div>
                    <button>페이지 생성기</button>

                </form>
            </Folderwrap>
        </Addfolder> : null}
    </>
    )
}

export default Sidebarcontent
