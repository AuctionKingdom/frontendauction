export const jwtChange = async() =>{

    let currentJwt = localStorage.getItem('jwt')

    if(currentJwt){
        setInterval = (()=>{

            let changedjwt = localStorage.getItem('jwt');

            if(currentJwt !== changedjwt){
                window.close();
            }

        },2000);
   }

}
