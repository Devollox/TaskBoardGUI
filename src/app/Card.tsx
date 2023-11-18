import Image from "next/image";

export default function Card(props: any) {
    return (
        <div className="card_container">
            <div className="card">
                <div className="date_container">
                    <div className="card_specification">
                        <div style={{background: `#{props.color}`}} id="cube" className="cube"></div>
                        <p className="font">{props.textSpecification}</p>
                    </div>
                    <div className="date_container_time">
                        {props.getDateDay}
                        <div className="dateMonth">
                            {props.dateMonths}
                        </div>
                    </div>
                </div>
                <div className="font_card">
                    {props.handlertTextSpecification}
                </div>
                <div className="title_info">
                    <div className="info_user_progress">
                        <img width="30"  className="img" src={props.avatar} alt=""/>
                            <div id="progress" className="progress"></div>
                    </div>
                    <a className="href_path" href={props.href_url}>
                        <div className="data_container">
                            <div id="issue" className="issue">
                                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                                     data-view-component="true" className="octicon octicon_comment v-align-middle">
                                    <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                                </svg>
                            </div>
                            <p className="data_comments">{props.commits}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}