const initState = {
  userInfo : null,
  // uid: null,
  // nick: null,
  // provider: ""
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return { ...state, userInfo : {uid: payload.uid,
          nick: payload.nick, 
          provider: payload.provider, 
          gender : payload.gender,
          phone : payload.phone,
          dob : payload.dob,
          addr : payload.addr,
          profImg : payload.profImg
        }};


    case "LOGOUT":
      return initState;

    default:
      return state;
  }
};

export default reducer;
