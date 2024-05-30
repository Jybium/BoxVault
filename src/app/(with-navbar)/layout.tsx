import React from 'react'
import Header from '@/components/app-reusables/LandingPage/Header'
import NavBar from '@/components/app-reusables/LandingPage/NavBar'

const layout = ({children}:{children: React.ReactNode}) => {
    return (
        <div className=''>
            <Header />

            <section className='relative flex justify-between pt-[70px]'>

                <aside>
                    <NavBar />
                </aside>

                <main className='relative h-full bg-cover bg-no-repeat overflow-y-auto w-[calc(100%-100px)] lg:w-[calc(100%-140px)] ml-auto px-5 mt-5'>

                    {children}
                </main>
            </section>
            
        </div>
    )
}

export default layout