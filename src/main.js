let options = JSON.parse(localStorage.getItem('history'));
let optionsObj = options || [{ 'logo': 'A', 'logoType': 'text', 'url': 'http://www.acfun.cn', 'index': '0' },
{ 'logo': 'B', 'logoType': 'text', 'url': 'http://www.bilibili.com', 'index': '1' }]


const render = () => {
    let optionsHtml = '';
    optionsObj.forEach((element, index) => {
        optionsHtml += `
            <li>
                <a href="${element.url}">
                    <div class="site">
                        <div class="logo">${element.logo}</div>
                        <div class="link">${simplifyUrl(element.url)}</div>
                        <div class="del" data-index="${index}">
                            <svg class="icon">
                                <use xlink:href="#icon-del"></use>
                            </svg>
                        </div>
                    </div>
                </a>
            </li>      
        `;
    });
    $('.options-list li:not(.last)').remove();
    $('.last').before(optionsHtml);
}

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/com\/.*/, 'com');
}

render();


$('.addSite').on('click', () => {
    let url = window.prompt('请输入网址');
    let simpleUrl = "";
    if (url.indexOf('http') > -1 || url.indexOf('www') > -1) {
        simpleUrl = simplifyUrl(url);
    } else {
        simpleUrl = url;
    }
    url = 'https://' + simpleUrl;
    optionsObj.push({
        'logo': simpleUrl[0],
        'logoType': 'text',
        'url': url,
        'index': $('.options-list li:not(.last)').length + 1
    });
    render();
})

$(document).on('click', 'li .del', (e) => {
    let index = $(e.currentTarget).attr('data-index');
    optionsObj.splice(index, 1);
    render();
    e.stopPropagation();
    return false;
})

$(document).on('keypress', (e) => {
    const { key } = e;
    optionsObj.forEach((element, index) => {
        if (element.logo.toLowerCase() === key) {
            window.open(element.url);
        }
    });
})



window.onbeforeunload = () => {
    localStorage.setItem('history', JSON.stringify(optionsObj));
}