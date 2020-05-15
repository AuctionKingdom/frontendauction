export const signup = async(user) => {
    //console.log(`${process.env.rest_url}/signup`)
    return await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: {
            Accept:"application/json",
            "content-type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const signin = async(user) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: "POST",
        headers: {
            Accept:"application/json",
            "content-type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const authenticate =  (jwt,next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt))
        next()
    }

}
