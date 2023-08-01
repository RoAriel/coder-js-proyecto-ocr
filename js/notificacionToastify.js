function miToastify(customText,customBackground){
    Toastify({
        text: customText,
        style: {
            background: customBackground,
        }
    }).showToast();
}