import AdsCard from "./AdsCard"

const Ads = () => {
  return (
    <section className="mt-2 grid sm:grid-cols-2 lg:flex lg:flex-col gap-8">
      <AdsCard image="/adsImage.jpg" link="/contact" />
      <AdsCard image="/adsImage.jpg" link="/contact" />
      <AdsCard image="/adsImage.jpg" link="/contact" />
      <AdsCard image="/adsImage.jpg" link="/contact" />
    </section>
  )
}

export default Ads