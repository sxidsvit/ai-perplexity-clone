import { Loader2Icon, LucideImage, LucideList, LucideSparkles, LucideVideo, Send } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import AnswerDisplay from './AnswerDisplay';
import axios from 'axios';
import { SEARCH_RESULT, formattedSearchResp } from '@/services/Shared';
import { supabase } from '@/services/supabase';
import { useParams } from 'next/navigation';
import ImageListTab from './ImageListTab';
import SourceList from './SourceList';
import SourceListTab from './SourceListTab';
import VideoListTab from './VideoListTab';
import { Button } from '@/components/ui/button';
const tabs = [
    { label: 'Answer', icon: LucideSparkles },
    { label: 'Images', icon: LucideImage },
    { label: 'Videos', icon: LucideVideo },
    { label: 'Sources', icon: LucideList, badge: true },
];


function DisplayResult({ searchInputRecord }) {

    const [activeTab, setActiveTab] = useState('Answer')
    const [searchResult, setSearchResult] = useState(searchInputRecord);
    const { libId } = useParams();
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [userInput, setUserInput] = useState();
    useEffect(() => {
        // Update this method
        searchInputRecord?.Chats?.length == 0 ? GetSearchApiResult() : GetSearchRecords();
        setSearchResult(searchInputRecord)
        // console.log('Chats: ', searchInputRecord?.Chats)
    }, [searchInputRecord])

    const GetSearchApiResult = async () => {
        setLoadingSearch(true);
        const result = await axios.post('/api/brave-search-api', {
            searchInput: userInput ?? searchInputRecord?.searchInput,
            searchType: searchInputRecord?.type ?? 'Search'
        });
        const searchResp = result.data;

        // const searchResp = SEARCH_RESULT
        // //Save to DB
        const formattedSearchResp = searchResp?.web?.results?.map((item, index) => (
            {
                title: item?.title,
                description: item?.description,
                long_name: item?.profile?.long_name,
                img: item?.profile.img,
                url: item?.url,
                thumbnail: item?.thumbnail?.src,
                original: item?.thumbnail?.original
            }
        ))

        const formattedVideoSearchResp = searchResp?.videos?.results?.map((item, index) => (
            {
                url: item?.url,
                title: item?.title,
                description: item?.description,
                thumbnail: item?.thumbnail?.src,
            }
        ))

        const { data, error } = await supabase
            .from('Chats')
            .insert([
                {
                    libId: libId,
                    searchResult: formattedSearchResp,
                    searchVideoResult: formattedVideoSearchResp,
                    userSearchInput: searchInputRecord?.searchInput
                },
            ])
            .select()

        setUserInput('')
        await GetSearchRecords();
        setLoadingSearch(false);
        await GenerateAIResp(formattedSearchResp, data[0].id)
        // Pass to LLM Model
    }

    const GenerateAIResp = async (formattedSearchResp, recordId) => {
        const result = await axios.post('/api/llm-model', {
            searchInput: searchInputRecord?.searchInput,
            searchResult: formattedSearchResp,
            recordId: recordId
        });

        const runId = result.data

        const interval = setInterval(async () => {
            const runResp = await axios.post('/api/get-inngest-status', {
                runId: runId
            });

            if (runResp?.data?.data[0]?.status == 'Completed') {
                console.log('Completed!!!')
                await GetSearchRecords();
                clearInterval(interval);
                // Get Updated Data from DB
            }
        }, 1000)
    }

    const GetSearchRecords = async () => {
        let { data: Library, error } = await supabase
            .from('Library')
            .select('*,Chats(*)')
            .eq('libId', libId)
            .order('id', { foreignTable: 'Chats', ascending: true })
        if (error) {
            console.error('Supabase GetSearchRecords() error:', error);
        }
        setSearchResult(Library[0])
    }

    return (
        <div className='mt-7 flex flex-wrap'>
            {!searchResult?.Chats &&
                <div>
                    <div className='w-full h-5 bg-accent animate-pulse rounded-md'></div>
                    <div className='w-1/2 mt-2 h-5 bg-accent animate-pulse rounded-md'></div>
                    <div className='w-[70%] mt-2 h-5 bg-accent animate-pulse rounded-md'></div>

                </div>}
            {searchResult?.Chats?.map((chat, index) => (
                <div key={index} className='mt-7'>
                    <h2 className='font-bold text-4xl text-gray-600'>{index == 0 ? chat?.userSearchInput : chat?.searchResult[0].title}</h2>
                    <div className="flex items-center space-x-6 border-b border-gray-200 pb-2 mt-6">
                        {tabs.map(({ label, icon: Icon, badge }) => (
                            <button
                                key={label}
                                onClick={() => setActiveTab(label)}
                                className={`flex items-center gap-1 relative text-sm font-medium text-gray-700 hover:text-black ${activeTab === label ? 'text-black' : ''
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                                {badge && (
                                    <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                                        {chat?.searchResult.length}
                                    </span>
                                )}
                                {activeTab === label && (
                                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-black rounded"></span>
                                )}
                            </button>
                        ))}
                        <div className="ml-auto text-sm text-gray-500">
                            1 task <span className="ml-1">↗</span>
                        </div>
                    </div>

                    <div>
                        {activeTab == 'Answer' ?
                            <AnswerDisplay chat={chat} loadingSearch={loadingSearch} /> :
                            activeTab == 'Images' ?
                                <ImageListTab chat={chat} /> :
                                activeTab == 'Videos' ?
                                    <VideoListTab chat={chat} /> :
                                    activeTab == 'Sources' ?
                                        <SourceListTab chat={chat} /> :
                                        null
                        }
                    </div>
                    <hr className='my-5' />

                </div>
            ))}
            <div className='h-[200px]'>
            </div>
            <div className='bg-white w-full border rounded-lg 
            shadow-md p-3 px-5 flex justify-between fixed bottom-6 max-w-md lg:max-w-xl xl:max-w-3xl'>
                <input placeholder='Type Anything...' className='outline-none w-full'
                    onChange={(e) => setUserInput(e.target.value)} value={userInput}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            GetSearchApiResult(); // replace this with your actual function
                        }
                    }} />
                {userInput && <Button onClick={GetSearchApiResult} disabled={loadingSearch}>
                    {loadingSearch ? <Loader2Icon className='animate-spin' /> : <Send />}</Button>}
            </div>
        </div>
    )
}

export default DisplayResult