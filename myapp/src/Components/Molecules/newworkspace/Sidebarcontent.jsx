import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Subtitle } from "../../Atoms/ming/Typography";
import {
  saveData,
  getworkspaceData,
  DelWorkspace,
  DelWorkspacepage,
} from "../../../API/Workspaceapi";
import {
  folder,
  homeicon,
  logo,
  page,
  Pagesicon,
  workspaceicon,
} from "../../../images";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { deletebtn } from "../../../images";
import Popup from "./Popup";

const Contentwrap = styled.div`
  margin-top: 30px;
  width: 210px;
  min-height: 30px;
  /* border: 1px solid; */
  box-sizing: border-box;
  /* cursor: pointer; */
`;
const Maintitle = styled.div`
  padding: 3px 10px;
  background-color: #1e1a4d;
  color: white;
  width: 210px;
  position: relative;
  right: 0px;
  box-sizing: border-box;
  border-radius: 7px;
`;
const Maintitlecontent = styled.div`
  display: flex;
  align-items: center;
  height: 27px;
  box-sizing: border-box;
`;
const Titlewrap = styled.div`
  width: 199px;
  margin-left: 10px;
  /* border: 1px solid; */
  position: relative;
  box-sizing: border-box;
  /* background-color: #dddddd; */
  /* display: flex; */
`;
const Titlecontent = styled.div`
  cursor: pointer;
  height: 27px;
  width: 199px;
  position: relative;
  background-color: #443080;
  color: white;
  display: flex;
  /* padding : 3px 10px; */
  margin: 3px 0px 3px 0px;

  border-radius: 11px;
  box-sizing: border-box;
  .Tcontent {
    padding: 3px 10px;
    font-size: 16px;
    width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .Wspaceicon {
  }
`;

const Content = styled.div`
  padding: 3px 10px;
  margin: 3px 0px 3px 12px;
  height: 27px;
  border-radius: 15px;
  cursor: pointer;
  background-color: #5e38b4;
  color: white;
  /* display: inline-block; */
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  .Pagename {
    width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .threedots {
  }
`;
const Btnwrap = styled.div`
  position: absolute;
  top: 0;
  right: 0px;
`;
const AddbtnOne = styled.button`
  width: 27px;
  font-size: 26px;

  border: none;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e1a4d;
  color: #e7e7e7;
  &:hover {
    background-color: #746892;
  }
`;
const Addbtn = styled.button`
  width: 27px;
  height: 27px;
  font-size: 26px;

  border: none;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #443080;
  color: #e7e7e7;
  &:hover {
    background-color: #715da0;
  }
`;

const Addfolder = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  position: fixed;
  background-color: #7c7878;
  z-index: 9999;
`;
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
  .crossbtn {
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
    input {
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
`;
const Delbtn = styled.span`
  position: absolute;
  display: inline-block;
  top: 0;
  right: 30px;
  &:hover {
    background-color: #715da0;
    border-radius: 3px;
  }
`;
const Delbtntwo = styled.span`
  position: absolute;
  display: inline-block;
  line-height: 1;
  right: 10px;
  &:hover {
    background-color: #715da0;
    border-radius: 3px;
  }
`;

const Popwrap = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  backdrop-filter: blur(3px);

  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popupbodyone = styled.div`
  border: 1px solid #b4b4b4;
  width: 500px;
  height: 300px;
  background-color: white;
  color: black;
  box-shadow: 0 0 18px -10px;
  border-radius: 10px;
  padding: 50px;
  gap: 80px;
  font-size: 22px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    width: 170px;
    height: 50px;
    margin: 0 10px;
    font-size: 18px;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }
  .submitbtn {
    background-color: green;
    color: white;
  }
  .submitbtn:hover {
    background-color: #079107;
  }
  .cancelbtn:hover {
    background-color: #da3636;
  }
  .cancelbtn {
    background-color: #c41b1b;
  }
`;

const Popupbody = styled.div`
  border: 1px solid #b4b4b4;
  width: 500px;
  height: 300px;
  background-color: white;
  color: black;
  box-shadow: 0 0 18px -10px;
  border-radius: 10px;
  padding: 50px;
  gap: 80px;
  font-size: 22px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    width: 170px;
    height: 50px;
    margin: 0 10px;
    font-size: 18px;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }
  .submitbtn {
    background-color: green;
    color: white;
  }
  .submitbtn:hover {
    background-color: #079107;
  }
  .cancelbtn:hover {
    background-color: #da3636;
  }
  .cancelbtn {
    background-color: #c41b1b;
  }
`;

const Sidebarcontent = ({ contents, setState, setContent }) => {
  const [header, setHeader] = useState("");
  const [category, setCategory] = useState({});
  const [subcategory, setSubcategory] = useState({});
  const navigate = useNavigate();
  const [popupfolder, setPopupfolder] = useState();
  const [popupfile, setPopupfile] = useState();
  const [isprivateopen, setIsprivateopen] = useState({});
  const [toggleindex, settoggleIndex] = useState();
  const [dispatchstate, setDispatchstate] = useState(false);
  const [popupwrap, setPopupwrap] = useState(false);
  const [popupwrapfolder, setPopupwrapfolder] = useState(false);
  const [delfolder, setDelfolder] = useState();
  const [delfile, setDelfile] = useState();
  const dispatch = useDispatch();

  console.log(delfolder, "delfolder");
  console.log(delfile, "delfile");

  const toggleSection = (key) => {
    if (isprivateopen[key])
      return setIsprivateopen((prev) => ({ ...prev, [key]: false }));
    setIsprivateopen((prev) => ({ ...prev, [key]: true }));
  };
  const createFolder = async (e) => {
    e.preventDefault();
    const { value: folderName } = e.target.foldername;
    // console.log(folderName, "folderName");
    setContent((prev) =>
      prev.map((obj) => {
        const key = Object.keys(obj)[0];
        // console.log(key, "kkkkk", folderName);
        setCategory({ workSpace: key, folderName });
        return { ...obj, [key]: [...obj[key], { [folderName]: [] }] };
      })
    );
    setPopupfolder(false);
    // alert("successful");
  };

  useEffect(() => {
    console.log(contents, "contents");
  }, [popupfolder]);

  const createFile = async (e) => {
    e.preventDefault();
    const { value: fileName } = e.target.filename;
    // console.log(fileName, "filename");
    setContent((prev) =>
      prev.map((obj, index) => {
        const mainkey = Object.keys(obj)[0];
        const updatedsub = obj[mainkey].map((subObj, subindex) => {
          const subkey = Object.keys(subObj)[0];
          console.log(mainkey, subkey, "subkey", fileName);
          if (subcategory === subkey) {
            setSubcategory({
              workSpace: mainkey,
              folderName: subkey,
              fileName,
            });

            return { ...subObj, [subkey]: [...subObj[subkey], fileName] };
          }
          return { ...subObj, [subkey]: [...subObj[subkey]] };
          // else {return}
        });
        setPopupfile(false);
        setIsprivateopen((prev) => prev);
        return { ...obj, [mainkey]: updatedsub };
      })
    );
  };

  const deleteFolder = (foldername) => {
    setContent((prev) =>
      prev.map((obj, index) => {
        const mainkey = Object.keys(obj)[0];
        const deletedsub = obj;
      })
    );
  };
  useEffect(() => {
    const Run = async () => {
      const data = await saveData("workSpace/newFolder", { data: category });
    };
    Run();
  }, [category]);

  useEffect(() => {
    const Run = async () => {
      await saveData("workSpace/newPage", { data: subcategory });
    };
    Run();
  }, [subcategory]);

  // useEffect(() => {
  //   // console.log(dispatchstate, 'dispatchstate')
  //   if(dispatchstate) {

  //     dispatch({ type: "True" });
  //     setDispatchstate(false)
  //   }
  // }, [dispatchstate])

  const pagenavigate = (mainTitle, folderTitle, pageTitle, entryIndex) => {
    navigate(
      `/workspace/selectspace/${mainTitle}/${folderTitle}/${pageTitle[entryIndex]}`
    );
    console.log(1234);
    dispatch({ type: "True" });
  };

  return (
    <>
      {contents.map((item, index) => {
        const [mainTitle, subContent] = Object.entries(item)[0];
        return (
          <Contentwrap>
            <Maintitle>
              <Maintitlecontent>
                <div>
                  <img src={homeicon} alt="" />
                </div>
                <div>{mainTitle}</div>
              </Maintitlecontent>
              <Btnwrap>
                <AddbtnOne
                  onClick={(e) => {
                    e.stopPropagation();
                    setPopupfolder(true);
                    setHeader(mainTitle);
                  }}
                >
                  +
                </AddbtnOne>
              </Btnwrap>
            </Maintitle>
            {subContent
              ? subContent.map((subitem, subindex) => {
                  const [folderTitle, pageTitle] = Object.entries(subitem)[0];
                  return (
                    <Titlewrap
                      key={subindex}
                      onClick={() => {
                        toggleSection(subindex);
                        settoggleIndex(subindex);
                      }}
                    >
                      <Titlecontent>
                        <div className="Wspaceicon">
                          <img src={workspaceicon} alt="" />
                        </div>
                        <div className="Tcontent">{folderTitle}</div>
                        <Delbtn
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <img
                            src={deletebtn}
                            alt=""
                            onClick={(e) => {
                              e.stopPropagation();
                              setDelfolder({
                                ...delfolder,
                                mainTitle,
                                folderTitle,
                              });
                              setPopupwrapfolder(true);
                            }}
                          />
                        </Delbtn>
                        {popupwrapfolder ? (
                          <Popwrap>
                            <Popupbody>
                              <div>삭제하시겠습니까 ?</div>
                              <div>
                                <button
                                  className="cancelbtn"
                                  onClick={(e) => {
                                    setPopupwrap(false);
                                  }}
                                >
                                  취소
                                </button>
                                <button
                                  className="submitbtn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    DelWorkspace(
                                      delfolder.mainTitle,
                                      delfolder.folderTitle
                                    );
                                    setState(true);
                                    setPopupwrapfolder(false);
                                    navigate("/main");
                                  }}
                                >
                                  완료
                                </button>
                              </div>
                            </Popupbody>
                          </Popwrap>
                        ) : null}

                        <Btnwrap>
                          <Addbtn
                            onClick={(e) => {
                              e.stopPropagation();
                              setPopupfile(true);
                              setSubcategory(folderTitle);
                            }}
                          >
                            +
                          </Addbtn>
                        </Btnwrap>
                      </Titlecontent>
                      {isprivateopen[subindex] &&
                        pageTitle.map((entry, entryIndex) => (
                          <Content
                            onClick={(e) => {
                              e.stopPropagation();
                              pagenavigate(
                                mainTitle,
                                folderTitle,
                                pageTitle,
                                entryIndex
                              );
                              setIsprivateopen((prev) => prev);
                            }}
                          >
                            <div>
                              <img src={Pagesicon} alt="" />
                            </div>
                            <div className="Pagename">{entry}</div>
                            <Delbtntwo>
                              <img
                                src={deletebtn}
                                alt=""
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDelfile({
                                    ...delfile,
                                    mainTitle,
                                    folderTitle,
                                    entry,
                                  });
                                  setPopupwrap(true);
                                }}
                              />
                            </Delbtntwo>
                            {popupwrap ? (
                              <Popwrap>
                                <Popupbodyone>
                                  <div>삭제하시겠습니까 ?</div>
                                  <div>
                                    <button
                                      className="cancelbtn"
                                      onClick={(e) => {
                                        setPopupwrap(false);
                                      }}
                                    >
                                      취소
                                    </button>
                                    <button
                                      className="submitbtn"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        DelWorkspacepage(
                                          delfile.mainTitle,
                                          delfile.folderTitle,
                                          delfile.entry
                                        );
                                        setState(true);
                                        setPopupwrap(false);
                                        navigate("/main");
                                      }}
                                    >
                                      완료
                                    </button>
                                  </div>
                                </Popupbodyone>
                              </Popwrap>
                            ) : null}
                          </Content>
                        ))}
                    </Titlewrap>
                  );
                })
              : null}
          </Contentwrap>
        );
      })}
      {popupfolder ? (
        <Addfolder>
          <Folderwrap>
            <span
              className="crossbtn"
              onClick={() => {
                setPopupfolder(false);
                setState(true);
              }}
            >
              ×
            </span>
            <div className="imgdiv">
              <img src={logo} alt="" />
            </div>
            <form
              action=""
              onSubmit={(e) => {
                createFolder(e);
                setState(true);
              }}
            >
              <div className="headerContent">
                <h2>{header} </h2>
                <div className="folderTitle">
                  <label htmlFor="">워크스페이스 이름 : </label>
                  <input type="text" name="foldername" required />
                </div>
              </div>
              <div className="selectContent">
                <img src={folder} alt="" />
                <div>New Workspace</div>
              </div>
              <button>워크스페이스 생성</button>
            </form>
          </Folderwrap>
        </Addfolder>
      ) : null}
      {popupfile ? (
        <Addfolder>
          <Folderwrap>
            <span
              className="crossbtn"
              onClick={() => {
                setPopupfile(false);
                setState(true);
              }}
            >
              ×
            </span>
            <div className="imgdiv">
              <img src={logo} alt="" />
            </div>
            <form
              action=""
              onSubmit={(e) => {
                createFile(e);
                setState(true);
              }}
            >
              <div className="headerContent">
                <h2>페이지 생성하기</h2>
                <div className="folderTitle">
                  <label htmlFor="">페이지 이름 : </label>
                  <input type="text" name="filename" required />
                </div>
              </div>

              <div className="selectContent">
                <img src={page} alt="" />
                <div>New Page</div>
              </div>
              <button>페이지 생성</button>
            </form>
          </Folderwrap>
        </Addfolder>
      ) : null}
    </>
  );
};

export default Sidebarcontent;
