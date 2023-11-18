'use client'

import './page.sass'

import {useEffect} from "react";
import axios from "axios";

export default function Home() {

    useEffect(() => {
        function getTaskBoard() {
            return axios.get('https://api.github.com/repos/Devollox/TaskBoard/issues');
        }

        function getCursedWeb() {
            return axios.get('https://api.github.com/repos/CursedNet/CursedWeb/issues');
        }

        function getCursedNet() {
            return axios.get('https://api.github.com/orgs/CursedNet/repos');
        }

        /*
                Promise.all([getCursedNet()])
                    .then(function (results: any) {
                        for (let k = 0; k < 3; k++) {
                            console.log(results[0].data[k].name)

                            fetch(`https://api.github.com/repos/CursedNet/${results[0].data[k].name}/issues`)
                                .then((response) => {
                                    return response.json();
                                })
                                .catch(() => {console.log(error)})
                                .then((results) => {
                                    console.log(results[k].title)
                                    console.log(results[k])
                                })
                        }
                    })
         */

        Promise.all([getTaskBoard(), getCursedWeb()])
            .then(function (results) {

                let block: any = document.getElementById('id2')

                for (let v = 0; v < results.length; v++) {
                    for (let c = 0; c < results[v].data.length; c++) {

                        let getTitleRepos: any = `${results[v].data[c].title}`
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
                        let date = results[0].data[c].created_at
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

                        block.insertAdjacentHTML("afterbegin", `
                            <div class="card_container">
                                <div class="card">
                                    <div class="date_container">
                                        <div class="card_specification">
                                            <div style="background-color: #${textColor[`${textSpecification}`]} " id="cube" class="cube"></div>
                                            <p class="font">${textSpecification}</p>
                                        </div>
                                        <div class="date_container_time">
                                            ${getDateDay(date)}
                                            <div class="dateMonth">
                                                ${dateMonths[`${getDateMonday(date)}`]}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="font_card">
                                        ${handlertTextSpecification}
                                    </div>
                                    <div class="title_info">
                                        <div class="info_user_progress">
                                            <img width="30" class="img" src="${results[v].data[c].user.avatar_url}" alt="/">
                                            <div id="progress" class="progress"></div>
                                        </div>
                                        <a class="href_path" href='${results[v].data[c].html_url}'>
                                            <div class="data_container">
                                                <div id="issue" class="issue">
                                                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                                                             data-view-component="true" class="octicon octicon_comment v-align-middle">
                                                            <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                                                        </svg>
                                                </div>
                                                <p class="data_comments">${results[v].data[c].comments}</p>
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

                }

            });

    }, []);


    return (
        <div className="grid">
            <div id="id1"></div>

            <div className="grid" id='id2'></div>
        </div>
    )
}