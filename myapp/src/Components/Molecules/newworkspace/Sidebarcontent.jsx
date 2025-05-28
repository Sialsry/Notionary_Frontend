import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Subtitle } from '../../Atoms/ming/Typography'
import { saveData, getworkspaceData } from '../../../API/Workspaceapi'
import { folder, logo, page } from '../../../images'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'


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
    height: 700px;
    padding: 50px;
    padding-top: 10px;
    background-color: #f3f3f3;
    border-radius: 15px;
    box-shadow: 0 0 15 -18;
    box-sizing: border-box;
    position: relative;
    z-index: 1000;

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
     .crossbtn:hover {
        color: #ec4343;
     }
    .crossbtn{
        position: absolute;
        top: 20px;
        right: 35px;
        font-size: 28px; /* Increase this for a bigger × */
        font-weight: bold;
        color: #161616;
        cursor: pointer;
        user-select: none;

    }

 
    form {

        padding: 20px 50px;
        margin: 30px auto;
        width: 600px;
        height: 500px;
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); /* Fixed */
        background-color: #ffffff;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .folderTitle {
            width: 100%;
            /* height: 35px; */
        }
        label {
            font-size: 18px;
            font-weight: 400;
        }
        input{
            height: 45px;
            width: 100%;
            /* margin-top:10px;
            margin-left: 10px; */
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
            /* margin: auto;
            margin-top: 70px; */
            
        }
        
        .selectContent img {
            height: 25px;
        }
        button:hover {
            transform: scale(1.03);
              transition: transform 0.4s ease;
        }
        button {
            width: 90%;
            height: 50px;
            /* float: right; */
            margin-left: 100px;
            border: none;
            background-color: #22168d;
            color: white;
            border-radius: 10px;
            font-size: 18px;
            cursor: pointer;
            transition: transform 0.4s ease;
        }
        .headerContent {
            height: 180px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

}

`


const Sidebarcontent = ({ contents,setState, setContent }) => {
   
    const [header, setHeader] = useState('');
    const [category, setCategory] = useState({})
    const [subcategory, setSubcategory] = useState({})
    const navigate = useNavigate();
    const [popupfolder, setPopupfolder] = useState()
    const [popupfile, setPopupfile] = useState()
    const [isprivateopen, setIsprivateopen] = useState({})
    const [toggleindex, settoggleIndex] = useState()



    const toggleSection = (key) => {
        if (isprivateopen[key]) return (
            setIsprivateopen(prev => ({ ...prev, [key]: false })))
        setIsprivateopen(prev => ({ ...prev, [key]: true }))

    }
    // const contents = [{ '팀 워크스페이스': [] }]
    const createFolder = async (e) => {
        e.preventDefault();
        const { value: folderName } = e.target.foldername;
        console.log(folderName, 'folderName')
        setContent(prev => prev.map((obj) => {
            const key = Object.keys(obj)[0]
            console.log(key, 'kkkkk', folderName)
            setCategory({workSpace : key, folderName})
            return { ...obj, [key]: [...obj[key], { [folderName]: [] }] }
        }))
        // const { data } = await saveData('workSpace/newFolder', { data : contents })
        alert('successful')
    }
    const createFile = async (e) => {
        e.preventDefault();
        const { value: fileName } = e.target.filename;
        setContent(prev => prev.map((obj, index) => {
            const mainkey = Object.keys(obj)[0];
            // if (index !== selectedMainIndex) return obj;
            const updatedsub = obj[mainkey].map((subObj, subindex) => {
                const subkey = Object.keys(subObj)[0];
                // if (subindex !== selectedSubIndex) return subObj;
                console.log(mainkey, subkey, 'subkey', fileName)
                // toggleSection(index)
                setSubcategory({workSpace : mainkey, folderName : subkey, fileName})
                return { ...subObj, [subkey]: [...subObj[subkey], fileName] }
            })
            return { ...obj, [mainkey]: updatedsub }
        }))

    }
    useEffect(() => {
        console.log(category, 'category', contents, )
        const Run = async () => {
            await saveData('workSpace/newFolder', { data : category })
        }
        Run()
    }, [category])

    useEffect(() => {
        console.log(subcategory, 'category1111', contents, )
        const Run = async () => {
            await saveData('workSpace/newPage', { data : subcategory })
        }
        Run()
    }, [subcategory])

    // useEffect(() => {
    //     console.log(toggleindex,'toggleinx  ')
    //     toggleSection(toggleindex)
    // },) 
    const Openworkspace = async (mainTitle) => {
        // const { data } = await getworkspaceData(`workSpace/selectspace/${mainTitle}`)
        // console.log(data)
    }

    console.log(contents, 'open', popupfile)
    return (<>
        {
            contents.map((item, index) => {
                // console.log(outeritem)
                // const item = outeritem[0]
                // if(!outeritem) return null;
                const [mainTitle, subContent] = Object.entries(item)[0]
                console.log(mainTitle,'asdf', subContent,'submanim', item[0], item,'outer')
                return (
                    < Contentwrap >
                        <Maintitle>
                            <Maintitlecontent onClick={() => {
                                Openworkspace(mainTitle);
                                navigate(`/workspace/selectspace/${mainTitle}`);
                            }}>
                                {mainTitle}
                            </Maintitlecontent>
                            <Btnwrap>
                                <Addbtn onClick={(e) => {
                                    e.stopPropagation()
                                    setPopupfolder(true)
                                    setHeader(mainTitle)
                                }}>+</Addbtn>
                            </Btnwrap>
                        </Maintitle>
                        {subContent ? subContent.map((subitem, subindex) => {
                            const [folderTitle, pageTitle] = Object.entries(subitem)[0]
                            return (
                                <Titlewrap key={subindex} onClick={() => {
                                    toggleSection(subindex)
                                    settoggleIndex(subindex)
                                    // navigate(`/workspace/selectspace/${mainTitle}/${folderTitle}`);
                                }

                                }>
                                    <Titlecontent >{folderTitle}
                                        <Btnwrap>
                                            <Addbtn onClick={(e) => {
                                                // setSelectedMainIndex(index);       // Track main section
                                                // setSelectedSubIndex(subindex);
                                                e.stopPropagation()
                                                setPopupfile(true)

                                            }}>+</Addbtn>
                                        </Btnwrap>
                                    </Titlecontent>
                                    {!isprivateopen[subindex] && pageTitle.map((entry, entryIndex) => (
                                        <Content onClick={(e) => {
                                            e.stopPropagation()
                                            navigate(`/workspace/selectspace/${mainTitle}/${folderTitle}/${pageTitle}`);
                                        }}>{entry}</Content>
                                    ))}
                                </Titlewrap>
                            )
                        }) : null}
                    </Contentwrap >
                )
            })}
        {popupfolder ? <Addfolder>
            <Folderwrap>
                <span className='crossbtn' onClick={() => {
                    setPopupfolder(false)
                    setState(true)
                    }}>×</span>
                <div className='imgdiv'>
                    <img src={logo} alt="" />

                </div>
                <form action="" onSubmit={(e) => createFolder(e)} >
                    <div className='headerContent'>

                        <h2>{header} </h2>
                        <div className='folderTitle'>
                            <label htmlFor="">워크이스페이스 이름 : </label>
                            <input type="text" name='foldername' required />
                        </div>
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
                <span className='crossbtn' onClick={() => {
                    setPopupfile(false)
                    setState(true)
                    }}>×</span>
                <div className='imgdiv'>
                    <img src={logo} alt="" />

                </div>
                <form action="" onSubmit={(e) => {
                    createFile(e)

                }}>
                    <div className='headerContent'>

                        <h2>페이지 생성하기</h2>
                        <div className='folderTitle'>
                            <label htmlFor="">페이지 이름 : </label>
                            <input type="text" name='filename' required />
                        </div>
                    </div>

                    <div className='selectContent'>
                        <img src={page} alt="" />
                        <div>New Page</div>
                    </div>
                    <button>페이지 생성성기</button>

                </form>
            </Folderwrap>
        </Addfolder> : null}
    </>
    )
}

export default Sidebarcontent
