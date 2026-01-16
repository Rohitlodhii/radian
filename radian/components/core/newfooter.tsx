import { PeopleCanvas } from "./people"




const FooterTwo = () => {

  return (
    <div className='h-[70vh] md:h-screen relative flex flex-col gap-4  '>
        <PeopleCanvas/>
        <h1 className="absolute top-20 sm:top-1/5 md:top-24 left-1/2 -translate-x-1/2 text-8xl sm:text-[180px] md:text-[244px] font-bold font-cal">
            Radian
        </h1>
    </div>
  )
}

export default FooterTwo