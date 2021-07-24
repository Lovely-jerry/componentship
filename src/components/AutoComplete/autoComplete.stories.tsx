import React from 'react'
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import AutoComplete, { DataSourceType } from './autoComplete'

interface LakerPlayerProps {
    value: string;
    number: number;
}
interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}

const SimpleComplete = () => {
    //简单数据结构
    let lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD',
        'green', 'howard', 'kuzma', 'McGee', 'rando'
    ]
    //复杂的数据结构
    const lakersWithNumber = [
        { value: 'bradley', number: 11 },
        { value: 'pope', number: 1 },
        { value: 'caruso', number: 4 },
        { value: 'cook', number: 2 },
        { value: 'cousins', number: 15 },
        { value: 'james', number: 23 },
        { value: 'AD', number: 3 },
        { value: 'green', number: 14 },
        { value: 'howard', number: 39 },
        { value: 'kuzma', number: 0 }
    ]
    const handleFetchValue = (query: string) => {
        return lakers.filter((name: string) => name.includes(query)).map(name => ({ value: name }))
    }
    const handleFetchPromiseValue = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({ items }) => {
                console.log('items', items);
                const formatItems = items.slice(0, 10).map((item) => ({ value: item.login, ...item }))
                return formatItems
            })
    }
    const renderOption = (item: DataSourceType<GithubUserProps>) => {
        return <>
            <h3>name:{item.login}</h3>
            <p>url:{item.url}</p>
        </>
    }
    return <AutoComplete
        fetchSuggest={handleFetchPromiseValue}
        onSelect={action('selected')}
        // renderOptions={renderOption}
    />
}

storiesOf('AutoComplete Component', module)
    .add('autoComplete基本使用', SimpleComplete)
