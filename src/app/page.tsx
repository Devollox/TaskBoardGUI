'use client'


import {useEffect, useState} from "react";

export default function Home() {

    useEffect(() => {
        let object = function (obj: any) {
            let size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };

        let block: any = document.getElementById('id1')

        fetch('https://api.github.com/repos/Devollox/TaskBoard/issues')
            .then((response) => {
                return response.json();
            })
            .then((commits) => {
                try {
                    for (let i = 0; i < object(commits); i++) {

                        let getTitleRepos: any = `${commits[i].title}`
                        let textSpecification: any = getTitleRepos.slice(0, getTitleRepos.indexOf(': '))

                        let textColor: any = {
                            'UX/UI': '926df1',
                            'Database': '6fc5f3',
                            'Front-end': 'dbc575',
                            'Back-end': '5B67C2',
                            'Full-stack': '4B0082',
                            'NoBilling': 'c3c3c2',
                            'Development': '3e6f47',
                            'Error': 'B22222'
                        };

                        const regExp = /\*|Full-stack: |Back-end: |Front-end: |NoBilling: |Development: |Database: |UX\/UI: |:\$/g;

                        let handlertTextSpecification = getTitleRepos.replace(regExp, '')
                        let date = commits[i].created_at
                        let options: any = {
                            day: 'numeric',
                        }

                        let optionsMonday: any = {
                            month: 'numeric',
                        }
                        let getDateDay = function (str: any) {
                            let date = new Date(str);
                            return date.toLocaleString('ru', options)
                        }

                        let getDateMonday = function (str: any) {
                            let date = new Date(str);
                            return date.toLocaleString('ru', optionsMonday)
                        }

                        if (textSpecification === 'NoBilling') {
                            textSpecification = 'No Billing'
                        }

                        /*
                        if (text === 'Back-end') {}
                        else if (text === 'Front-end') {}
                        else if (text === 'Full-stack') {}
                        else if (text === 'Database') {}
                        else if (text === 'UX/UI') {}
                        else if (text === 'Development') {}
                        else if (text === 'No Billing') {}
                        else {
                            text = 'Error'
                        }
                        */
                        // Вот эта хуйня страшная ^ - надо думать как красиво сделать


                        let arrSpecification = ['Database', 'Front-end', 'Back-end', 'Full-stack', 'No Billing', 'Development', 'UX/UI',];
                        let elementSpecification = textSpecification


                        let contains = function (arr: any, elem: any) {
                            return arr.indexOf(elem) !== -1;
                        }

                        const specification = (s: any) => s.split(': ').slice(1).join(': ')

                        if (!contains(arrSpecification, elementSpecification)) {
                            textSpecification = 'Error'
                        }

                        const dateMonths: any = {
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

                        if (specification(`${getTitleRepos}`) === '') {
                            textSpecification = 'No Billing'
                        }

                        setInterval(() => {
                            console.log(object(commits))
                        }, 10000)

                        block.insertAdjacentHTML("afterbegin", `
                        <div class="card_two">
                            <div class="card_n">
                                <div class="container_data">
                                    <div class="card_spe">
                                        <div style="background-color: #${textColor[`${textSpecification}`]} " id="cube" class="cube"></div>
                                        <p class="font">${textSpecification}</p>
                                    </div>
                                    <div class="date">
                                        ${getDateDay(date)}
                                        <div class="dateMoth">
                                            ${dateMonths[`${getDateMonday(date)}`]}
                                        </div>
                                    </div>
                                </div>
                                <div class="font_card">
                                    ${handlertTextSpecification}
                                </div>
                                <div class="dis">
                                    <div class="ds">
                                        <img width="30" class="img" src="${commits[i].user.avatar_url}" alt="/">
                                        <div id="progress" class="progress"></div>
                                    </div>
                                    <a class="href_path" href='${commits[i].html_url}'> 
                                        <div class="disblock">
                                            <div id="issue" class="issue">
                                                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                                                         data-view-component="true" class="octicon octicon-comment v-align-middle">
                                                        <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                                                    </svg>
                                            </div>
                                            <p class="data">${commits[i].comments}</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    `)
                        let el: any = document.getElementById('progress')

                        let Random = Math.floor(Math.random() * 100);

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
                    console.log(commits, object(commits))


                } catch (error) {
                    console.log('Error GitHub API')
                }
            });

    }, []);

    return (
        <div className="grid" id="id1"></div>
    )
}
