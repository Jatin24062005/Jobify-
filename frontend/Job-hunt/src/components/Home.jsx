import React from "react"
import Navbar from "./shared/Navbar"
import Herosection from "./Herosection"
import { CarouselContent } from "./ui/carousel"
import CategoryCarousel from "./CategoryCarousel"
import Footer from "./shared/Footer"
import LatestJobs from "./LatestJobs.jsx"
const Home = () => {
 

  return (
    <div>
      <Navbar />
      <Herosection />
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home