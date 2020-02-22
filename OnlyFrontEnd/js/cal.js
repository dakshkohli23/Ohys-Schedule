// Setup NyaaURL & AnimeJSONList (/releaseJSON)
let nyaaLink = 'https://nyaa.si/user/ohys?f=0&c=0_0&q='
let animeJSON = JSON.parse('{"sun":[{"title":"Healin` Good Precure","time":"08:30 EX"},{"title":"Kiratto Pri-chan","time":"10:00 TX"},{"title":"Rebirth","time":"21:30 MX"},{"title":"Yatogame-chan Kansatsu Nikki Nisatsume","time":"21:54 TVA"},{"title":"Dorohedoro","time":"24:00 BS11"},{"title":"ID Invaded","time":"24:30 BS11"},{"title":"Eizouken ni wa Te o Dasu na!","time":"24:10 NHKG"}],"mon":[{"title":"Heya Camp","time":"20:55 AT-X"},{"title":"Phantasy Star Online 2 the Animation","time":"22:30 MX"},{"title":"pet","time":"23:00 AT-X"},{"title":"Murenase! Seton Gakuen","time":"24:30 BS11"},{"title":"Natsunagu!","time":"25:25 MX"}],"tue":[{"title":"Black Clover","time":"18:25 TX"},{"title":"Majutsushi Orphen Hagure Tabi","time":"23:00 AT-X"},{"title":"Isekai Quartet 2","time":"24:30 MX"},{"title":"Chihayafuru 3","time":"25:59 NTV"}],"wed":[{"title":"Nanatsu no Taizai: Kamigami no Gekirin","time":"17:55 TX"},{"title":"Radiant (2019)","time":"19:25 NHKE"},{"title":"Ahiru no Sora","time":"21:00 AT-X"},{"title":"Itai no wa Iya nano de Bougyoryoku ni Kyokufuri Shitai to Omoimasu.","time":"22:00 AT-X"},{"title":"Re - Zero kara Hajimeru Isekai Seikatsu New edition","time":"22:30 AT-X"},{"title":"Kuutei Dragons","time":"24:55 CX"},{"title":"Plunderer","time":"25:05 MX"}],"thu":[{"title":"Nekopara (2020)","time":"21:00 AT-X"},{"title":"Show by Rock!! Mashumairesh!!","time":"22:30 MX"},{"title":"Infinite Dendrogram","time":"23:00 AT-X"},{"title":"Housekishou Richard-shi no Nazo Kantei","time":"23:30 AT-X"},{"title":"Hatena Illusion","time":"23:30 BSNTV"},{"title":"Somali to Mori no Kamisama","time":"24:30 MX"},{"title":"Oshi ga Budoukan Itte Kuretara Shinu","time":"25:28 TBS"},{"title":"Jibaku Shounen Hanako-kun","time":"25:58 TBS"}],"fri":[{"title":"Koisuru Asteroid","time":"20:30 AT-X"},{"title":"Toaru Kagaku no Railgun T","time":"22:00 AT-X"},{"title":"Darwin`s Game","time":"24:00 AT-X"},{"title":"Rikei ga Koi ni Ochita no de Shoumei Shite Mita.","time":"24:30 AT-X"},{"title":"Haikyuu!! To the Top","time":"25:25 TBS"},{"title":"Kabukichou Sherlock","time":"25:55 TBS"},{"title":"Runway de Waratte","time":"26:25 TBS"}],"sat":[{"title":"Aikatsu on Parade!","time":"10:30 TX"},{"title":"Boku no Hero Academia 4","time":"17:30 NTV"},{"title":"Mairimashita! Iruma-kun","time":"17:35 NHKE"},{"title":"Detective Conan","time":"18:00 NTV"},{"title":"Boku no Tonari ni Ankoku Hakaishin ga Imasu.","time":"21:00 AT-X"},{"title":"Oda Shinamon Nobunaga","time":"21:30 AT-X"},{"title":"Nanabun no Nijuuni","time":"23:00 BS11"},{"title":"Ishuzoku Reviewers","time":"23:00 AT-X"},{"title":"Fate/Grand Order: Zettai Majuu Sensen Babylonia","time":"23:30 BS11"},{"title":"Magia Record: Mahou Shoujo Madoka Magica Gaide","time":"24:00 BS11"},{"title":"Kyokou Suiri","time":"25:30 EX"}],"non":[{"title":"Uchi Tama?! Uchi no Tama Shirimasenka?","time":"24:55 CX"},{"title":"number24","time":"21:00 AT-X"},{"title":"Hulaing Babies Petit","time":"22:50 AT-X"},{"title":"BanG Dream! 3rd Season","time":"23:00 MX"}]}')

window.onload = function () {
    let date = moment()
    let today = date.tz('Asia/Tokyo').day()
    let dayWord = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const dayButton = document.querySelectorAll('.c-day')
    
    dayButton[today].setAttribute('class', 'c-day active')
    animeList.create(dayWord[today])
}

let animeList = {
    create(day) {
        let dayUpper = day.charAt(0).toUpperCase()+day.slice(1)+' '
        const animeLinksWrapper = document.querySelector('.c-animes')
        const animeLinkTemplete = document.querySelector('.templete>.item')

        for (let i = 0; i < animeJSON[day].length; i++) {
            animeLinksWrapper.appendChild(animeLinkTemplete.cloneNode(true))
            document.querySelector('.c-animes>a.item:last-child>div.title').innerHTML = animeJSON[day][i]['title']
            document.querySelector('.c-animes>a.item:last-child>div.time').innerHTML = dayUpper+animeJSON[day][i]['time']
            document.querySelector('.c-animes>a.item:last-child').setAttribute('href', nyaaLink+animeJSON[day][i]['title'])
        }
    },
    remove() {
        let animeListLength = document.querySelectorAll('a.item').length

        for (let i = 0; i < animeListLength; i++) {
            document.querySelector('a.item').remove()
        }
    }
}
function dayClicked(clickedDay) {
    const clickedDayButton = document.querySelector('#'+clickedDay)
    const activedDayButton = document.querySelector('.c-day.active')
    
    animeList.remove()
    animeList.create(clickedDay)
    activedDayButton.setAttribute('class', 'c-day')
    clickedDayButton.setAttribute('class', 'c-day active')
}