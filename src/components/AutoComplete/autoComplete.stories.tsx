import React from 'react'
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import AutoComplete from './autoComplete'

const SimpleComplete = () => {
    let lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD',
        'green', 'howard', 'kuzma', 'McGee', 'rando'
    ]
    const handleFetchValue = (query: string) => {
        return lakers.filter((name: string) => name.includes(query))
    }
    const renderOptions = (item: string) => {
        return <h3>name:{item}</h3>
    }
    return <AutoComplete
        fetchSuggest={handleFetchValue}
        onSelect={action('selected')}
        renderOptions={renderOptions}
    />
}

storiesOf('AutoComplete Component', module)
    .add('autoComplete基本使用', SimpleComplete)
