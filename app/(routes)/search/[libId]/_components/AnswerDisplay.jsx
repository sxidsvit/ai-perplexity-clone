import Image from 'next/image';
import React from 'react'
import SourceList from './SourceList';
import DisplaySummery from './DisplaySummery';

function AnswerDisplay({ chat, loadingSearch }) {

    return (
        <div>
            <SourceList webResult={chat?.searchResult} loadingSearch={loadingSearch} />
            <DisplaySummery aiResp={chat?.aiResp} />
        </div>
    )
}

export default AnswerDisplay