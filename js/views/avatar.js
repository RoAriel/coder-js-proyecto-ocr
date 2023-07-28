const updateAvatar = (idUsers) => {
    for (const usrId of idUsers) {
        const imgUserID = document.getElementById(`${usrId}`);
        getAvatarPk(usrId)
            .then((data) => {
                imgUserID.setAttribute('src', data);
            })
    }
}


