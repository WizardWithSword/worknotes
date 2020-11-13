// 无头浏览器的使用
// 功能：抓取杭州相关事业单位公开招聘信息
// 设计思路：每天抓取一次信息，存入数据库，另外发布网站阅读。区分公告和公示
// npm install puppeteer --save

console.log('progrem start')

const puppeteer = require('puppeteer');
const fs = require('fs')

puppeteer.launch().then(async browser => {
    // const page = await browser.newPage();
    // // 浙江省人力资源和社会保障网 事业（省属国企）公开招聘
    // const url1 = 'http://rlsbt.zj.gov.cn/col/col1443681/index.html'
    // await page.goto(url1);
    // let res = []

    // page.select('.default_pgPerPage', '40')
    // // await page.click('.default_pgPerPage option:last-child')
    // await page.waitFor(5000);

    // const block = await page.$('.default_pgContainer')
    // // console.log('block', block)
    // let t =await block.$$eval('li', nodes => {
    //     return nodes.map(n => n.querySelector('a').getAttribute('href') + '\n' +n.innerText)
    // });
    // res = res.concat(t);

    // console.log('nodes txt1', res);
    // saveInfo(res)


    // 杭州市人力资源和社会保障局 事业单位招聘
    const url2 = 'http://hrss.hangzhou.gov.cn/col/col1229125915/index.html'
    const page2 = await browser.newPage();
    await page2.goto(url2);
    await page2.waitFor(1000);
    const list2 = await page2.$('.tsjp_nr');
    if (list2) {
        // console.log('nodes list2', list2);
        let t2 = await list2.$$eval('tr', nodes => {
            // return nodes.map(n => n.innerText)
            return nodes.map(n => {
                if(n.children.length > 0) {
                    let a = n.children[1].innerHTML
                    if (a.indexOf('href') !== -1) { // 去除标题头
                        return [n.children[1].children[0].getAttribute('href'), n.children[1].children[0].getAttribute('title'), n.children[2].innerText]
                    } else {
                        return ['', '', '']
                    }
                } else{
                    return n.innerText
                }
            })
        })
        // console.log('nodes txt2', t2);
        saveInfo(t2)
    } else {
        console.log('未选中任何元素，检测插件是否需要升级')
    }


    // 浙江人事考试网 - 事业单位公开招聘
    const url3 = 'http://www.zjks.com/showInfo/MoreLmshow.aspx?plmid=279'
    await browser.close();
  });

function saveInfo(info) {
    let res = {}
    info.map(item =>{
        let arr = []
        if(typeof item == 'string') {
            arr = item.split('\n')
        } else {
            arr =item
        }
        const obj = {}
        obj.href = arr[0]
        obj.title = arr[1]
        obj.date = arr[2]
        res[arr[1]+arr[0]+arr[2]] = obj
        return obj
    })
    var old = fs.readFileSync('./info.txt')
    // console.log('old', old.toString())
    var end = Object.assign(res, JSON.parse(old))
    // console.log('end', end)
    fs.writeFileSync('./info.txt', JSON.stringify(end))
}

console.log('progrem end-----')

