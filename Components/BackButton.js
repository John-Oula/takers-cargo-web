import React from 'react';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {useRouter} from 'next/router'
import {ChevronLeftIcon} from '../icons/dist/cjs'

function BackButton() {
    let router = useRouter();
    return (
        <ChevronLeftIcon onClick={() => router.back()} color={`#000`} cursor={'pointer'}/>

    );
}

export default BackButton;