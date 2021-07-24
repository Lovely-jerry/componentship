import React from 'react'
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import AutoComplete, { DataSourceType } from './autoComplete'

interface LakerPlayerProps {
    value: string;
    number: number;
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
    const handleFetchObjectValue = (query: string) => {
        return lakersWithNumber.filter((player) => player.value.includes(query))
    }
    const renderOptions = (item: DataSourceType<LakerPlayerProps>) => {
        return <>
            <h3>name:{item.value}</h3>
            <p>number:{item.number}</p>
        </>
    }
    return <AutoComplete
        fetchSuggest={handleFetchValue}
        onSelect={action('selected')}
        // fetchSuggest={handleFetchObjectValue}
        // renderOptions={renderOptions}
    />
}

storiesOf('AutoComplete Component', module)
    .add('autoComplete基本使用', SimpleComplete)