import { collection, getFirestore, query } from 'firebase/firestore'
import React from 'react'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { firebaseApp } from '~/lib/firebase'
import { heroImage } from '../domain/select-mode/utils/heroTypes'
import GoldGlass from '../shared/components/GoldGlass'
import { Header } from '../shared/components/Header'

export const Leaderboard = () => {
    const firestore = getFirestore(firebaseApp);
    const [users]  = useCollectionData(query(collection(firestore, 'users')))
    
  return (
    <div className="p-8">
        <Header>Leaderboard</Header>
        <div className="flex flex-col items-center">
            {users?.map((user, id )=> (
                <div key={id} className="mt-10 card w-2/3 h-20 shadow-sm flex flex-row justify-around items-center border-2">
                    <p>{id+1}</p>
                   <div className="avatar self-center">
                       
                        <div className="w-12 h-12 rounded-full">
                             <img src={user.avatar} alt="user avatar" />
                        </div>
                    </div>
                <p className="w-12 text-center font-black">{user.displayName}</p>
                <img src={heroImage[user.currentHero]} alt="user hero" className="w-20" />
                
                <div className="flex">
                    <p className="w-10 m-2 text-lg font-black">{user.points}</p>
                    <GoldGlass />
                </div>
            </div>
            
           ) )}
       </div>
    </div>
  )
}
