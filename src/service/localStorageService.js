function setToken(token){
    localStorage.setItem("accesstoken",token);

}

function getToken(){
    return localStorage.getItem("accesstoken");
}

function removeToken(){
    localStorage.removeItem("accesstoken");
}

function getRole() {
    if(getToken()){
        return 'user';
    }
    return 'guest';
}

export default {
    setToken,
    getToken,
    removeToken,
    getRole
}