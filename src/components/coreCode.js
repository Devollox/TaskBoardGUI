fetch(`https://api.github.com/orgs/CursedNet/repos`)
    .then((response) => {
        return response.json();
    })
    .then((resultsOne) => {
        const objectLength = Object.keys(resultsOne).length;
        for (let k = 0; k < objectLength; k++) {
            fetch(`https://api.github.com/repos/CursedNet/${resultsOne[k].name}/issues`)
                .then((response) => {
                    return response.json();
                })
                .then((results) => {
                    const objectLength = Object.keys(results).length;
                    for (let p = 0; p < objectLength; p++) {
                        let block = document.getElementById('card_block')
                        let apiText = results[p].labels
                        if (apiText[0] === undefined) apiText[0] = {color: 'fff', name: 'Offtop'}

                        let date = results[p].created_at

                        let optionsTime = {
                            optionsDay: {
                                day: 'numeric',
                            },
                            optionsMonth: {
                                month: 'numeric'
                            }
                        }
                        let getDate = function (str) {
                            let date = new Date(str);
                            return [date.toLocaleString('ru', optionsTime.optionsMonth), date.toLocaleString('ru', optionsTime.optionsDay)]
                        }

                        const dateMonths = {
                            1: 'Jan',
                            2: 'Feb',
                            3: 'Mar',
                            4: 'Apr',
                            5: 'May',
                            6: 'Jun',
                            7: 'Jul',
                            8: 'Aug',
                            9: 'Sep',
                            10: 'Oct',
                            11: 'Nov',
                            12: 'Dec'
                        }

                        let upperCase = apiText[0].name.replace(apiText[0].name[0], apiText[0].name[0].toUpperCase())

                        block.insertAdjacentHTML("afterbegin", `
                                <div class="card_container">
                                    <div class="card">
                                        <div class="date_container">
                                            <div class="card_specification">
                                                <div style="background-color: #${apiText[0].color} " id="cube" class="cube"></div>
                                                <p class="font">${upperCase}</p>
                                            </div>
                                            <div class="date_container_time">
                                                ${getDate(date)[1]}
                                                <div class="dateMonth">
                                                    ${dateMonths[getDate(date)[0]]}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="font_card">
                                            ${results[p].title}
                                        </div>
                                        <div class="title_info">
                                            <div class="info_user_progress">
                                                <img width="30" class="img" src="${results[p].user.avatar_url}" alt="/">
                                                    <div id="progress" class="progress"></div>
                                            </div>
                                            <a class="href_path" href='${results[p].html_url}'>
                                                <div class="data_container">
                                                    <div id="issue" class="issue">
                                                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16"
                                                             data-view-component="true" class="octicon octicon_comment v-align-middle">
                                                            <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                                                        </svg>
                                                    </div>
                                                    <p class="data_comments">${results[p].comments}</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                   `)
                        let el = document.getElementById('progress')
                        let Random = Math.floor(Math.random() * 100)

                        el.animate(
                            [
                                {width: '0%'},
                                {width: `${Random}%`},
                            ],
                            {
                                fill: "both",
                                duration: 1,
                            },
                        );
                    }
                })
        }
    })
    .catch(function (err) {
        console.log('API GITHUB ERROR!', {err})
    })