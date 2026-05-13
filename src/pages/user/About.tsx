import Banner from "../../components/About/Banner"
import GetInTouch from "../../components/About/GetInTouch"
// import HowItWork from "../../components/About/HowItWork"
import Services from "../../components/About/Services"
import Sponsorship from "../../components/About/Sponsorship"
import WhoWeAre from "../../components/About/WhoWeAre"

const About = () => {
  return (
    <>
    <Banner/>
    <WhoWeAre/>
    <Services/>
    <GetInTouch/>
    {/* <HowItWork/> */}
    <Sponsorship/>
    </>
  )
}

export default About