import { useState, useEffect } from 'react'
import faker from 'faker'

function Suggestions() {

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const suggestions = [...Array(5)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        }))

        console.log(suggestions)

        setSuggestions(suggestions)
    }, [])

    return (
        <div className="mt-4 ml-10">
            <div className="flex justify-between text-sm mb-5">
                <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
                <button className="text-gray-600 font-semibold">See All</button>
            </div>
            {
                suggestions.map((data) => (
                    <div className="flex items-center mt-3 justify-between" key={data.id}>

                        <img className="w-16 h-16 rounded-full border p-[2px]" src={data.avatar} alt="" />
                        <div className="flex-1 ml-4">
                            <h2 className="font-semibold text-sm">{data.username}</h2>
                            <h3 className="text-xs text-gray-400">Works at {data.company.name}</h3>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Suggestions
