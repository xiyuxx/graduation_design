function getRandomColor(): string {
    const colors: string[] = [
        '#5e78cc', '#D3D3D3', '#4c868c', '#939355', '#E6E6FA',
        '#b0626f', '#8c7653', '#a48a58', '#649b9b', '#B0C4DE'
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex].replace('#','');
}

const url = "https://ui-avatars.com/api"

// 发送 GET 请求

const fetchAvatar = (name:string) => {
    return url + "?rounded=true&background="+ getRandomColor()+"&color=ffffff&name=" + name

}

export {fetchAvatar}