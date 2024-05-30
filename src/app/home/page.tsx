import Collections from '@/components/app-reusables/LandingPage/Collections'
import Header from '@/components/app-reusables/LandingPage/Header'
import NavBar from '@/components/app-reusables/LandingPage/NavBar'
import Swiper from '@/components/app-reusables/LandingPage/Swiper'


export default function Home() {
  return (
    <div className=''>
      <Header />

      <section className='relative flex justify-between pt-[70px]'>

        <aside>
          <NavBar />
        </aside>

        <main className='relative h-full bg-cover bg-no-repeat overflow-y-auto w-[calc(100%-100px)] lg:w-[calc(100%-140px)] ml-auto pl-5 mt-5'>

          <Swiper />
          <Collections />
        </main>
      </section>

    </div>
  )
}
