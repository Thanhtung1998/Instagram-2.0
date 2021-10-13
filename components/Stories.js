import faker from 'faker';
import { useEffect, useState } from 'react'
import Story from './Story';
import { useSession } from 'next-auth/react'


function Stories() {

    const { data: session } = useSession()

    const [stories, setStories] = useState([])

    useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => (
            {
                ...faker.helpers.contextualCard(),
                id: i
            }
        ));
        setStories(suggestions)
        // console.log(suggestions);
    }, [])

    return (
        <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-md overflow-x-scroll scrollbar-thin scrollbar-thumb-black">

            {session && (<Story username={session?.user?.username} img={session?.user?.image} />)

            }

            {stories &&
                stories.map((profile) =>
                    (<Story key={profile.id} img={profile.avatar} username={profile.username} />))
            }
        </div>
    )
}

export default Stories
