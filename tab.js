const tabCon = {
    'title': [{
            id: 0,
            name: '1'
        },
        {
            id: 1,
            name: '2'
        },
        {
            id: 2,
            name: '3'
        }
    ],
    'content': [{
            id: 0,
            text: 'one'
        },
        {
            id: 1,
            text: 'two'
        },
        {
            id: 2,
            text: 'three'
        }
    ]
};
class RenderTab {
    constructor(opt = {}) {
        const { title, content } = opt.tabs;
        this.title = title;
        this.content = content;
        this.defaultIndex = (opt.defaultShow >= (title.length - 1)) ? 0 : opt.defaultShow;
        this.ele = document.getElementById(opt.ele) || document.body;
        this.cb = opt.success;
        this.init();
    }
    init() {
        this.RenderTit();
        this.RenderContent();
    }
    RenderTit() {
        let that = this;
        let src = '';
        let titBox = document.createElement('div');
        titBox.className = 'nav';
        this.title.map((v, i) => {
            src += `<span data-id="${v.id}" class="${(i===this.defaultIndex)?'bg':''}">${v.name}</span>`;
        });
        titBox.innerHTML = src;
        this.ele.appendChild(titBox);
        let spans = titBox.getElementsByTagName('span');
        [...spans].map((tit, ind) => {
            tit.addEventListener('click', function() {
                that.changeTab(ind, titBox);
            }, false);
        });
    }
    RenderContent() {
        let src = '';
        let contentBox = document.createElement('div');
        contentBox.id = 'contbox';
        this.content.map((v, i) => {
            src += `<div class="boxCont ${(i===this.defaultIndex)?'show':''}">${v.text}</div>`;
        });
        contentBox.innerHTML = src;
        this.ele.appendChild(contentBox);
    }
    changeTab(index, titBox) {
        const divs = document.getElementById('contbox').childNodes;
        const spans = titBox.getElementsByTagName('span');
        [...spans].map((spa, inds) => {
            spa.className = '';
            if (inds === index) {
                spa.className = 'bg';
            }
        });
        [...divs].map((div, i) => {
            div.className = 'boxCont';
            if (i === index) {
                [...divs][index].className += 'show';
            }
        });
        this.cb();
    }
}
let tabApp = new RenderTab({
    ele: 'tab',
    tabs: tabCon,
    defaultShow: 0,
    success() {
        console.log('changed');
    }
})