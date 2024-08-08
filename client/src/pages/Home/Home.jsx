import React from 'react'
import Layout from '../../components/Layouts/Layout'
import SimpleSlider from './SimpleSlider'
import TrustedBenefits from './TrustedBenefits'
import PopularProducts from './PopularProducts'
import DisocuntBanner from './DisocuntBanner'
import LatestProducts from './LatestProducts'
import SingleBanner from './SingleBanner'
import NewsLetter from './NewsLetter'
import Brands from './Brands'

function Home() {
    return (
        <Layout>
            {/* hero slider */}
            <SimpleSlider />
            {/* banefits */}
            <TrustedBenefits/>
            {/* popular prodcuts */}
            <PopularProducts/>
            {/*2 way discount Banner */}
            <DisocuntBanner/>
            {/* Latest Products */}
            <LatestProducts/>
            {/* Single Banner */}
            <SingleBanner/>
            {/* Newssletter */}
            <NewsLetter/>
            {/* brands */}
            <Brands/>
        </Layout>
    )
}

export default Home