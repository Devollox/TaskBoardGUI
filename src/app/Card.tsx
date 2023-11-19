import Image from "next/image";
import {Home} from "lucide-react";

export default function Card(props: any) {
    return (
        <li className='list'>
            <div className='content_list'>
                <img src={props.image} width="30" alt='/'/>
                <div className='font_sidebar'>
                    &nbsp;&nbsp;{props.name}
                </div>
            </div>
        </li>
    )
}